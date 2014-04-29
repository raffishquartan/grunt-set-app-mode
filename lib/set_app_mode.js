/*
 * grunt-set-app-mode
 * https://github.com/cfogelberg/grunt-set-app-mode
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */

'use strict';

function SetAppMode(task) {
	this.origTask = task;
	this.options = task.options(SetAppMode.Defaults);
};

SetAppMode.prototype = {
	run: function() {
	}
};

SetAppMode.Defaults = {
	some_default_value: "foo"
};

SetAppMode.task_name = "set_app_mode";
SetAppMode.task_description = "Sets application mode in build by copying, e.g., config.production.js to config.js";

SetAppMode.register_with_grunt = function(grunt) {
	grunt.registerMultiTask(SetAppMode.task_name, SetAppMode.task_description, function() {
		var task = new SetAppMode(this);
		task.run();
	});
};

module.exports = SetAppMode;
