// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-09-17 using
// generator-karma 0.8.3

module.exports = function (config) {
    config.set({

        basePath: '../',

      exclude: [
        'app/scripts/lib/*.js'
      ],

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/mockfirebase/dist/mockfirebase.js',
            'app/bower_components/angularfire/dist/angularfire.js',
            'test/spec/**/*.js',
          //'app/scripts/**/*.js'
          'app/scripts/*/{*.js,!(lib)/**/*.js}'

        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
