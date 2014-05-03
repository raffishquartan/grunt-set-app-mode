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

  it.skip("builds with valid mode creates output", function() {
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
    var file_a = content_of("test/src/config.dev.js");
    var file_b = content_of("tmp/config.js");
    file_a.should.eql.file_b;
  });

  it.skip("build with invalid mode fails task", function() {
    var config_valid = {
      files: [
        {
          src: ["test/src/config.{{MODE}}.js"],
          dest: ["tmp"]
        }
      ]
    };

    var set_task = GruntSetAppMode(config);
    grunt.task.run(set_task);
    // ASSERT task failed - how does grunt notify of task failure?
  });

  it.skip("missing dest in configuration files array object element fails task", function() {
    var config_no_src = {
      files: [
        {
          src: ["test/src/config.{{MODE}}.js"]
        }
      ]
    };

    // this.requiresConfig inside a task...
  });

  it.skip("missing src in configuration files array object element fails task", function() {
    var config_no_src = {
      files: [
        {
          dest: ["tmp"]
        }
      ]
    };

    // test this.requiresConfig inside a task
  });

  it.skip("specifying no objects in configuration files array raises warning", function() {
    var config_no_entries = {
      files: [
      ]
    };

    // this inside a task
  });

  it.skip("specifying no configuration files array raises warning", function() {
    var config_no_entries = {
    };

    // this inside a task
  });
});
