/*
 * grunt-set-app-mode
 * https://github.com/cfogelberg/grunt-set-app-mode
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */

'use strict';

function GruntSetAppMode(task) {
	this.origTask = task;
	this.options = task.options(GruntSetAppMode.Defaults);
};

GruntSetAppMode.prototype = {
	run: function() {
	}
};

GruntSetAppMode.Defaults = {
	some_default_value: "foo"
};

GruntSetAppMode.task_name = "set_app_mode";
GruntSetAppMode.task_description = "Sets application mode in build by copying, e.g., config.production.js to config.js";
GruntSetAppMode.register_with_grunt = function(grunt) {
	grunt.registerMultiTask(GruntSetAppMode.task_name, GruntSetAppMode.task_description, function() {
		var task = new GruntSetAppMode(this);
		task.run();
	});
};

GruntSetAppMode.taskName = GruntSetAppMode.task_name;
GruntSetAppMode.taskDescription = GruntSetAppMode.task_description;
GruntSetAppMode.registerWithGrunt = GruntSetAppMode.register_with_grunt;

module.exports = GruntSetAppMode;
