var webpackConf = require('./webpack.config.js');

// todo: coverage.
module.exports = function (config) {
  config.set({
      basePath: '../',
      frameworks: ['jasmine'],
    files: [
        'node_modules/babel-polyfill/dist/polyfill.js',
        'config/test-entry.js',
    ],
    preprocessors: {
        'config/test-entry.js'
            : ['webpack', 'sourcemap'],
    },
    webpack: {
      module: webpackConf.module,
      resolve: webpackConf.resolve,
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    reporters: ['progress', 'coverage', 'kjhtml', 'spec'],

    specReporter: {
      maxLogLines: 10
    },

      client: {
        clearContext: false // so kjhtml output shows in browser
      },

    port: 9876,
    colors: true,
    // logLevel: config.LOG_DEBUG,
    autoWatch: true,
      // browsers: ['PhantomJS', 'Chrome', 'Firefox'],
      browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
