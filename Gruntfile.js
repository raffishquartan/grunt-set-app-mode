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
  grunt.registerTask("test", ["jshint", "mochaTest"]);
  grunt.registerTask("default", ["test"]);
};
