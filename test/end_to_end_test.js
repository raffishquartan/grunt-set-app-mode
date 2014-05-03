"use strict";

describe("end-to-end tests", function() {
  var grunt = require("grunt");
  var should = require("should");;

  function content_of(file_a) {
    return false;
  };

  describe.skip("build with valid mode creates output", function() {
    var configValid = {
      files: [
        {
          src: ["test/src/config.{{MODE}}.js"],
          dest: ["tmp"]
        }
      ]
    };

    var set_task = new GruntSetAppMode(config);
    grunt.task.run(set_task);
    var file_a = content_of("test/src/config.dev.js");
    var file_b = content_of("tmp/config.js");
    file_a.should.eql.file_b;
  });

  describe.skip("build with invalid mode fails task", function() {
    var configValid = {
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

  describe.skip("missing dest in configuration files array object element fails task", function() {
    var config_no_src = {
      files: [
        {
          src: ["test/src/config.{{MODE}}.js"]
        }
      ]
    };

    // this.requiresConfig inside a task...
  });

  describe.skip("missing src in configuration files array object element fails task", function() {
    var config_no_src = {
      files: [
        {
          dest: ["tmp"]
        }
      ]
    };

    // test this.requiresConfig inside a task
  });

  describe.skip("specifying no objects in configuration files array raises warning", function() {
    var config_no_entries = {
      files: [
      ]
    };

    // this inside a task
  });

  describe.skip("specifying no configuration files array raises warning", function() {
    var config_no_entries = {
    };

    // this inside a task
  });
});
