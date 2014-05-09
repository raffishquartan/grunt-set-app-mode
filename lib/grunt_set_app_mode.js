/*
 * grunt-set-app-mode
 * https://github.com/cfogelberg/grunt-set-app-mode
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */

"use strict";

function GruntSetAppMode(task, mode) {
	this.origTask = task;
	this.options = task.options(GruntSetAppMode.Defaults);
  this.options.mode = mode; // task.options("mode") is a bash string object and messy - use additional param
  this.files = task.files;
};

GruntSetAppMode.prototype.run = function() {
  var done = this.async();

  this.requiresConfig("files");
  if(!grunt.option("mode")) {
    grunt.fail.fatal("mode was not set as an option");
  }
  else if(grunt.option("expected_modes").indexOf(grunt.option("mode")) === -1) {
    // unexpected mode
  }

  // note for future impl: iterate over files, an array of src/dest objects
  // -- see what it looks like and work out how to use

  // FLOW:
  // For each of files -->

  done(true);
};

GruntSetAppMode.Defaults = {
  expected_modes: [ "dev", "staging", "prod" ]
};

GruntSetAppMode.task_name = "set_app_mode";
GruntSetAppMode.task_description = "Sets application mode in build by copying, e.g., config.prod.js to config.js";
GruntSetAppMode.register_with_grunt = function(grunt) {
	grunt.registerMultiTask(GruntSetAppMode.task_name, GruntSetAppMode.task_description, function() {
		var task = new GruntSetAppMode(this, grunt.option("mode"));
		task.run();
	});
};

GruntSetAppMode.taskName = GruntSetAppMode.task_name;
GruntSetAppMode.taskDescription = GruntSetAppMode.task_description;
GruntSetAppMode.registerWithGrunt = GruntSetAppMode.register_with_grunt;

module.exports = GruntSetAppMode;
