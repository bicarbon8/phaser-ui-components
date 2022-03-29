// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', 'karma-typescript'],
      files: [
          './test/**/*.ts',
          './src/**/*.ts'
      ],
      preprocessors: {
        '**/*.ts': ['karma-typescript'],
        'src/**/*.ts': ['coverage']
      },
      client: {
        jasmine: {
          // you can add configuration options for Jasmine here
          // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
          // for example, you can disable the random execution with `random: false`
          // or set a specific seed with `seed: 4321`
        },
        clearContext: false, // leave Jasmine Spec Runner output visible in browser
        captureConsole: true
      },
      jasmineHtmlReporter: {
        suppressAll: true // removes the duplicated traces
      },
      coverageReporter: {
        dir: 'coverage/',
        subdir: function(browser) {
          // normalization process to keep a consistent browser name across different
          // OS
          return browser.toLowerCase().split(/[ /-]/)[0];
        },
        reporters: [
          { type: 'html' },
          { type: 'text-summary' }
        ],
        check: {
          emitWarning: false,
          global: {
            statements: 40,
            branches: 20,
            functions: 40,
            lines: 40
          }
        }
      },
      mime: { 'text/x-typescript': ['ts','tsx'] },
      reporters: ['progress', 'kjhtml', 'coverage'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessCI'],
      customLaunchers: {
        ChromeHeadlessCI: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox']
        }
      },
      browserDisconnectTimeout: 10000,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 100000,
      singleRun: true,
      restartOnFileChange: true,
      concurrency: Infinity
    });
  };