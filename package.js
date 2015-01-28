Package.describe({
  name: 'dispatch:interpolator',
  version: '0.0.2',  
  summary: 'Interpolate values from a to b over time',
  git: 'https://github.com/DispatchMe/meteor-interpolator.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');

  api.use([
    'underscore'
  ], 'web');

  api.addFiles([
    'easing.js',
    'interpolate.js',
  ], 'web');

  api.export('Interpolator', 'web');
});
