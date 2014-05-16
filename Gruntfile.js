/*
 * grunt-set-app-mode
 * https://github.com/raffishquartan/grunt-set-app-mode
 *
 * Copyright (c) 2014 raffishquartan
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        "**/*.js"
      ],
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
        src: ["test/**/*.js"]
      },
      coverage: {
        options: {
          reporter: "html-cov",
          quiet: true,
          captureFile: "test/coverage.html"
        },
        src: ["test/**/*.js"]
      },
      "travis-cov": {
        options: {
          reporter: "travis-cov"
        },
        src: ["test/**/*.js"]
      }
    }
  });

  grunt.loadTasks("tasks");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.registerTask("test", ["mochaTest"]);
  grunt.registerTask("default", ["test"]);
};
