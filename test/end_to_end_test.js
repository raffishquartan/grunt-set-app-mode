"use strict";

describe("end-to-end tests (grunt)", function() {
  var should = require("should");
  var grunt; // require before each test to ensure it is fresh
  var Validators = require("../test/lib/validators");
  var GruntSetAppMode = require("../lib/grunt_set_app_mode");

  var TEST_CONFIGURATION = {
    set_app_mode: {
      options: {
        mode: "dev" // hard code target mode, expected_modes defaults to dev, staging, prod
      },
      files: [
        {
          src: ["src/config.{{MODE}}.js"],
          dest: ["tmp"]
        }
      ]
    }
  };

  function load_file_contents(filepath) {
    return grunt.file.exists(filepath) ? grunt.file.read(filepath) : undefined;
  };



  beforeEach(function() {
    grunt = require("grunt");
    if(grunt.file.exists("tmp")) {
      grunt.file.delete("tmp");
    }
  });



  it("registers itself with grunt", function() {
    should.exist(GruntSetAppMode.registerWithGrunt);
    GruntSetAppMode.registerWithGrunt(grunt);
    should.exist(grunt.task._tasks[GruntSetAppMode.taskName]);
    grunt.task._tasks[GruntSetAppMode.taskName].info.should.equal(GruntSetAppMode.taskDescription);
  });

  // TODO: Get the mochaTest task to wait on set_app_mode to finish (currently queuing runs it after by default)
  it.skip("copies target-specific mode file and removes mode-specific files", function() {
    GruntSetAppMode.registerWithGrunt(grunt);
    grunt.initConfig(TEST_CONFIGURATION);
    grunt.task.run("set_app_mode");

    Validators.check_final_result(["dev", "staging", "prod"], "config", "dev", "tmp", "src");
  });
});
