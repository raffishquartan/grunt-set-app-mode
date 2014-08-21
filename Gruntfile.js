/*
 * grunt-set-app-mode
 * https://github.com/cfogelberg/grunt-set-app-mode
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      all: {
        src: [ "test/tmp", "test/coverage", "**/*~", "**/.*~" ]
      }
    },

    jshint: {
      all: [ "test/**/*.js", "tasks/**/*.js", "lib/**/*.js" ],
      options: {
        jshintrc: ".jshintrc",
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: "spec",
          clearRequireCache: true,
          require: "test/blanket"
        },
        src: ["test/**/*.js", "!test/blanket.js"]
      },
      coverage_html: {
        options: {
          reporter: "html-cov",
          quiet: true,
          captureFile: "test/coverage/coverage.html"
        },
        src: ["test/**/*.js"]
      },
      "mocha-lcov-reporter": {
        options: {
          reporter: "mocha-lcov-reporter",
          quiet: true,
          captureFile: "test/coverage/lcov.info"
        },
        src: ["test/**/*.js"]
      },
      "travis-cov": {
        options: {
          reporter: "travis-cov"
        },
        src: ["test/**/*.js"]
      }
    },

    coveralls: {
      options: {
        force: true
      },
      all: {
        src: "test/coverage/lcov.info"
      }
    }
  });

  grunt.loadTasks("tasks");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-coveralls");
  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.registerTask("test", ["jshint", "mochaTest"]);
  grunt.registerTask("default", ["clean", "test", "coveralls"]);
};
