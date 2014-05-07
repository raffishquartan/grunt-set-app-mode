"use strict";

describe("unit tests", function() {
  var grunt = require("grunt");
  var should = require("should");



  it.skip("fails task when built with invalid target mode", function() {
    var config_valid = {
      files: [
        {
          src: ["test/src/config.{{MODE}}.js"],
          dest: ["tmp"]
        }
      ]
    };

    var set_task = new GruntSetAppMode(config_valid);
    grunt.task.run(set_task);
    // ASSERT task failed - how does grunt notify of task failure?
  });

  it.skip("fails task when a configuration files array object element is missing the dest", function() {
    var config_no_src = {
      files: [
        {
          src: ["test/src/config.{{MODE}}.js"]
        }
      ]
    };

    // this.requiresConfig inside a task...
  });

  it.skip("fails task when a configuration files array object element is missing the src", function() {
    var config_no_src = {
      files: [
        {
          dest: ["tmp"]
        }
      ]
    };

    // test this.requiresConfig inside a task
  });

  it.skip("raises warning when configuration files array is empty", function() {
    var config_no_entries = {
      files: [
      ]
    };

    // this inside a task
  });

  it.skip("raises warning when configuration does not specify any files array", function() {
    // THIS TEST DOES NOT WORK YET - don't build task
    var config_no_entries = {
    };

    GruntSetAppMode.registerWithGrunt(grunt);
    var set_task = new GruntSetAppMode(config_no_entries);
    grunt.task.run(set_task);
    // this inside a task
  });
});
