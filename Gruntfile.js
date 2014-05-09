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
          clearRequireCache: true
        },
        src: ["test/**/*.js"]
      },
    }
  });

  // Actually load this plugin"s task(s).
  grunt.loadTasks("tasks");

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-nodeunit");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-mocha-test");

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin"s task(s), then test the result.
  grunt.registerTask("test", ["clean", "set_app_mode", "nodeunit"]);

  // By default, lint and run all tests.
  grunt.registerTask("default", ["jshint", "test"]);

};
