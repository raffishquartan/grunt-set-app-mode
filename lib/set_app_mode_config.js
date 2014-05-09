/*
 * grunt-set-app-mode
 * https://github.com/cfogelberg/grunt-set-app-mode
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */

"use strict";

function SetAppModeConfig(options) {
  if(options.mode === undefined) {
    throw new Error("Target mode is undefined - usually specified on command line via '--mode={{MODE}}'");
  }
  else if(options.expected_modes === undefined) {
    throw new Error("expected_modes is undefined - this is strange because it has a default value");
  }
  else if(!Array.isArray(options.expected_modes)) {
    throw new Error("expected_modes is not an array");
  }
  else if(options.expected_modes.length === 0) {
    throw new Error("expected_modes has no entries");
  }
  else if(options.expected_modes.indexOf(options.mode) === -1) {
    throw new Error("Target mode '" + options.mode + "' was not in expected_modes");
  }
  else {
    this.mode = options.mode;
    this.expected_modes = options.expected_modes;
  }
};

SetAppModeConfig.prototype.get_mode = function() {
  return this.mode;
};

SetAppModeConfig.prototype.get_expected_modes = function() {
    return this.expected_modes;
};

module.exports = SetAppModeConfig;
