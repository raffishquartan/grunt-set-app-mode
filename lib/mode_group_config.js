/*
 * grunt-set-app-mode
 * https://github.com/cfogelberg/grunt-set-app-mode
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */

"use strict";

var grunt = require("grunt");

function ModeGroupConfig(mode_group_files, expected_modes) {
  this.src = mode_group_files.src.replace("{{MODE}}", "*");
  this.dest = mode_group_files.dest;

  if(this.src == undefined) {
    throw new Error("ModeGroupConfig src undefined");
  }
  if(this.dest == undefined) {
    throw new Error("ModeGroupConfig dest undefined");
  }
  expected_modes.forEach(function(a_mode) {
    if(!grunt.file.exists(mode_group_files.src.replace("{{MODE}}", a_mode))) {
      throw new Error(mode_group_files.src.replace("{{MODE}}", a_mode) + " does not exist");
    }
  })
};

ModeGroupConfig.prototype.get_src_glob = function() {
  return this.src;
};

ModeGroupConfig.prototype.get_dest = function() {
  return this.dest;
};

module.exports = ModeGroupConfig;
