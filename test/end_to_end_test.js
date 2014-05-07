"use strict";

describe("end-to-end tests (grunt)", function() {
  var grunt; // require before each test to ensure it is fresh
  var should = require("should");
  var GruntSetAppMode = require("../lib/set_app_mode");

  function get_test_configuration() {
    return {
      set_app_mode: {
        options: {
          mode: "dev" // hard code target mode, expected_modes defaults to dev, staing, prod
        },
        files: [
          {
            src: ["src/config.{{MODE}}.js"],
            dest: ["tmp"]
          }
        ]
      }
    };
  };

  function load_file_contents(filepath) {
    return grunt.file.exists(filepath) ? grunt.file.read(filepath) : undefined;
  }



  beforeEach(function() {
    grunt = require("grunt");
    grunt.file.delete("tmp");
  });



  it("registers itself with grunt", function() {
      should.exist(GruntSetAppMode.registerWithGrunt);
      GruntSetAppMode.registerWithGrunt(grunt);
      should.exist(grunt.task._tasks[GruntSetAppMode.taskName]);
      grunt.task._tasks[GruntSetAppMode.taskName].info.should.equal(GruntSetAppMode.taskDescription);
  });

  it("copies target-specific mode file and removes mode-specific files", function() {
    GruntSetAppMode.registerWithGrunt(grunt);
    grunt.initConfig(get_test_configuration());
    grunt.task.run("set_app_mode");

    grunt.file.exists("src/config.dev.js").should.equal(false, "tmp/config.dev.js should not exist");
    grunt.file.exists("src/src/config.staging.js").should.equal(false, "tmp/config.staging.js should not exist");
    grunt.file.exists("src/config.prod.js").should.equal(false, "tmp/config.prod.js should not exist");
    grunt.file.exists("tmp/config.js").should.equal(true, "tmp/config.js does not exist");
    var content_of_src = load_file_contents("src/config.dev.js");
    var content_of_dest = load_file_contents("tmp/config.js");
    content_of_src.should.equal(content_of_dest, "tmp/config.js contents should equal src/config.dev.js contents");
  });
});
