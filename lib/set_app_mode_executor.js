/*
 * grunt-set-app-mode
 * https://github.com/cfogelberg/grunt-set-app-mode
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 *
 * Class SRP: Apply GSAM as specified in a Gruntfile
 */

"use strict";

var grunt = require("grunt");

function SetAppModeExecutor(options) {
  if(!options.mode_groups) {
    throw new Error("options.mode_groups is falsy");
  }

  this.config = options.config;
  this.mode_groups = options.mode_groups;
}

SetAppModeExecutor.prototype.apply_all = function() {
  for(var i = 0; i < this.mode_groups.length(); ++i) {
    this.apply(this.mode_groups.get(i));
  }
};

SetAppModeExecutor.prototype.apply = function(mode_group) {
  grunt.file.copy(mode_group.get_src_filepath(this.config.get_mode()),
    mode_group.get_dest_filepath(this.config.get_mode()));

    var that = this;
    this.config.get_expected_modes().forEach(function(mode) {
      grunt.file.delete(mode_group.get_src_filepath_at_dest(mode));
    });
};

module.exports = SetAppModeExecutor;
