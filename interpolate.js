/* global Interpolator:true, easeLookup, generateSpringRK4, generateBezier */

Interpolator = function(method) {
  var self = this;

  if (!method || !method.length) {
    // The user must set method - we have no default
    throw new Error('Interpolator: No easing method selected');
  } else {

    if (method === ''+method) {
      if (typeof easeLookup[method] !== 'undefined') {
        // Set method to prebuild method
        method = easeLookup[method];
      } else {
        throw new Error('Interpolator: Invalid easing method "' + method + '"');
      }
    }

    if (typeof method === 'function') {

        // Set the custom function
        self.generator = function() {
          return method;
        };

    } else if (method.length === 1) {

      // Let the user set steps
      // self.generator = generateSteps(method[0]);
      throw new Error('Interpolator: Invalid easing array of 1');

    } else if (method.length === 2) {

      // Spring
      self.generator = function(duration) {
        // 0 = tension 1=friction
        return generateSpringRK4(method[0], method[1], duration);
      };

    } else if (method.length === 4) {

      // Make sure values are in [0..1]
      // Check high values
      if (Math.max.apply(this, method) > 1)
        throw new Error('Interpolator: Invalid custom bezier values, should be <= 1');
      // Check low values
      if (Math.min.apply(this, method) < 0)
        throw new Error('Interpolator: Invalid custom bezier values, should be => 0');

      // Set custom bezier
      self.generator = function() {
        return generateBezier.apply(this, method);
      };

    } else {
      throw new Error('Interpolator: Invalid method');
    }
  }
};

Interpolator.prototype.create = function(a, b, duration) {
  // Initialize the current interpolator
  var generator = this.generator(duration);

  return function(factor) {
    // Factor will be 0 - 1 equal to the position in duration time

    // Result
    var result = {};

    // Allow interpolation over multiple keys
    _.each(a, function(value, key) {
      result[key] = ((b[key] - value) * generator(factor)) + value;
    });

    // Return the interpolated values
    return result;
  };
};
