"use strict";

describe("end-to-end tests (grunt)", function() {
  var should = require("should");
  var grunt = require("grunt");
  var GruntSetAppMode = require("../lib/grunt_set_app_mode");


  it("registers itself with grunt", function() {
    should.exist(GruntSetAppMode.registerWithGrunt);
    GruntSetAppMode.registerWithGrunt(grunt);
    should.exist(grunt.task._tasks[GruntSetAppMode.taskName]);
    grunt.task._tasks[GruntSetAppMode.taskName].info.should.equal(GruntSetAppMode.taskDescription);
  });
});
