Interpolator
============

This is a simple package that adds in an object `Interpolator` for interpolation between object `a` and `b` values over time.

Ex.:

```js
  var method = new Interpolator('linear');

  // Create function
  var foo = method.create({ x: 0, y: 0 }, { x: 10, y: 0 });

  var posA = foo(0); // returns { x: 0, y: 0}
  var posB = foo(0.5); // returns { x: 5, y: 0}
  var posB = foo(1); // returns { x: 10, y: 0}

  // Spring physics array of two (tension, friction)
  var spring = new Interpolator([250, 15]);

  // The physics spring is the only method to require a duration
  // set for proper calculation
  var bar = method.create({ x: 0, y: 0, z:0 }, { x: 10, y: 0, z: 0 }, 1000);

  // Custom cubic bezier array of four
  var bezier = new Interpolator([ 0.25, 0.1, 0.25, 1.0 ]);

  // Custom function - here a linear function
  var linear = new Interpolator(function(factor) { return factor; });
```

__Bultin static__
* "linear"
* "swing"
* "spring"

__Builtin bezier__
* "ease",
* "ease-in",
* "ease-out",
* "ease-in-out",
* "easeInSine",
* "easeOutSine",
* "easeInOutSine",
* "easeInQuad",
* "easeOutQuad",
* "easeInOutQuad",
* "easeInCubic",
* "easeOutCubic",
* "easeInOutCubic",
* "easeInQuart",
* "easeOutQuart",
* "easeInOutQuart",
* "easeInQuint",
* "easeOutQuint",
* "easeInOutQuint",
* "easeInExpo",
* "easeOutExpo",
* "easeInOutExpo",
* "easeInCirc",
* "easeOutCirc",
* "easeInOutCirc"

### Credit
__Bezier curve__ function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License

__Runge-Kutta spring physics__ function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License

Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation.

__Velocity js__ and __famous__for inspiration.
