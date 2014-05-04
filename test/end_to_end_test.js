"use strict";

describe("end-to-end tests", function() {
  var grunt = require("grunt");
  var should = require("should");
  var GruntSetAppMode = require("../lib/set_app_mode");

  function content_of(file_a) {
    return false;
  };



  it("registers itself with grunt", function() {
      should.exist(GruntSetAppMode.registerWithGrunt);

      GruntSetAppMode.registerWithGrunt(grunt);

      // Check that it registered
      should.exist(grunt.task._tasks[GruntSetAppMode.taskName]);
      grunt.task._tasks[GruntSetAppMode.taskName].info.should.equal(GruntSetAppMode.taskDescription);
  });

  it.skip("copies target-specific mode file and removes other with valid config and target mode", function() {
    var config_valid = {
      options: {
        expected_modes: [ "dev", "staging", "prod" ]
      },
      files: [
        {
          src: ["test/src/config.{{MODE}}.js"],
          dest: ["tmp"]
        }
      ]
    };

    var set_task = new GruntSetAppMode(config_valid);
    grunt.task.run(set_task);
    var file_a = content_of("test/src/config.dev.js");
    var file_b = content_of("tmp/config.js");
    file_a.should.eql.file_b;
  });

  it.skip("fails task when built with invalid target mode", function() {
    var config_valid = {
      options: {
        expected_modes: [ "dev", "staging", "prod" ]
      },
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

  it.skip("fails task when target mode is not set", function() {
    // THIS TEST DOES NOT WORK YET - don't build task
    var config_no_entries = {
      options: {
        expected_mode: [ "dev", "staging", "prod" ]
      }
    };

    GruntSetAppMode.registerWithGrunt(grunt);
    var set_task = new GruntSetAppMode(config_no_entries);
    grunt.task.run(set_task);
    // this inside a task
  });

  it.skip("fails task when a configuration files array object element is missing the dest", function() {
    var config_no_src = {
      options: {
        expected_modes: [ "dev", "staging", "prod" ]
      },
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
      options: {
        expected_modes: [ "dev", "staging", "prod" ]
      },
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
      options: {
        expected_modes: [ "dev", "staging", "prod" ]
      },
      files: [
      ]
    };

    // this inside a task
  });

  it.skip("raises warning when configuration does not specify any files array", function() {
    // THIS TEST DOES NOT WORK YET - don't build task
    var config_no_entries = {
      options: {
        expected_modes: [ "dev", "staging", "prod" ]
      }
    };

    GruntSetAppMode.registerWithGrunt(grunt);
    var set_task = new GruntSetAppMode(config_no_entries);
    grunt.task.run(set_task);
    // this inside a task
  });
});
