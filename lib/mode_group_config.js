/*
 * grunt-set-app-mode
 * https://github.com/cfogelberg/grunt-set-app-mode
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 *
 * Class SRP: Store. validate and return the configuration for a single set of run mode-specific files
 */

"use strict";

var path = require("path");
var grunt = require("grunt");

function ModeGroupConfig(mode_group_files, expected_modes) {
  if(typeof mode_group_files.src !== "string") {
    throw new Error("ModeGroupConfig src '" + mode_group_files.src + "' is wrong type: " +
      typeof mode_group_files.src);
  }
  if(typeof mode_group_files.dest !== "string") {
    throw new Error("ModeGroupConfig dest '" + mode_group_files.src + "' is wrong type: " +
      typeof mode_group_files.src);
  }
  if(mode_group_files.src.indexOf("{{MODE}}") === -1) {
    throw new Error("ModeGroupConfig src '" + mode_group_files.src + "' does not contain {{MODE}}");
  }
  if(grunt.file.exists(mode_group_files.dest) && !grunt.file.isDir(mode_group_files.dest)) {
    throw new Error("ModeGroupConfig dest '" + mode_group_files.dest + "' is not a directory");
  }

  this.src_glob = mode_group_files.src.replace("{{MODE}}", "*");
  this.dest_dir = mode_group_files.dest;

  if(this.src_glob == undefined) {
    throw new Error("ModeGroupConfig src undefined");
  }
  if(this.dest_dir == undefined) {
    throw new Error("ModeGroupConfig dest undefined");
  }
  expected_modes.forEach(function(a_mode) {
    if(!grunt.file.exists(mode_group_files.src.replace("{{MODE}}", a_mode))) {
      throw new Error(mode_group_files.src.replace("{{MODE}}", a_mode) + " does not exist");
    }
  });
};

ModeGroupConfig.prototype.get_src_glob = function() {
  return this.src_glob;
};

ModeGroupConfig.prototype.get_src_filepath = function(mode) {
  return this.src_glob.replace("*", mode);
};

ModeGroupConfig.prototype.get_src_filename = function(mode) {
  return path.basename(this.get_src_filepath(mode));
};

ModeGroupConfig.prototype.get_dest_dir = function() {
  return this.dest_dir;
};

ModeGroupConfig.prototype.get_dest_filepath = function(mode) {
  return path.join(this.dest_dir, this.get_src_filename(mode).replace("." + mode, ""));
};

ModeGroupConfig.prototype.get_dest_glob = function() {
  return path.join(this.dest_dir, path.basename(this.get_src_glob()));
};

ModeGroupConfig.prototype.get_src_filepath_at_dest = function(mode) {
  return path.join(this.dest_dir, path.basename(this.get_src_glob().replace("*", mode)));
}

module.exports = ModeGroupConfig;
