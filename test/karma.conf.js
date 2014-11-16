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
          'app/bower_components/json3/lib/json3.js',
          'app/bower_components/angular-animate/angular-animate.js',
          'app/bower_components/angular-cookies/angular-cookies.js',
          'app/bower_components/angular-resource/angular-resource.js',
          'app/bower_components/angular-sanitize/angular-sanitize.js',
          'app/bower_components/angular-touch/angular-touch.js',
          'app/bower_components/angular-order-object-by/src/ng-order-object-by.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/mockfirebase/dist/mockfirebase.js',
          'app/bower_components/angularfire/dist/angularfire.js', ,
          'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'test/spec/**/*.js',
          'app/scripts/**/*.js'

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
