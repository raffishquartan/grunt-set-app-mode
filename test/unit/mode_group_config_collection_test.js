/*
 * grunt-set-app-mode
 * https://github.com/cfogelberg/grunt-set-app-mode
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */

// Allow indirectly-executed (should-executed) function literals to pass jshint IIFE warning:
/*jshint -W068 */

"use strict";

describe("ModeGroupConfigCollection", function() {
  var should = require("should");
  var ModeGroupConfig = require("../../lib/mode_group_config");
  var ModeGroupConfigCollection = require("../../lib/mode_group_config_collection");



  var SRC_DIR = "test/src";
  var DEST_DIR = "test/tmp";
  var SRC_METAL_PREFIX_A = "mode";
  var SRC_METAL_PREFIX_B = "other";
  var EXPECTED_MODES_METAL = [ "bronze", "silver", "gold" ];

  var MODE_GROUP_CONFIG_A = {
    orig: {
      src: SRC_DIR + "/mode.{{MODE}}.js",
      dest: DEST_DIR
    }
  };
  var MODE_GROUP_CONFIG_B  = {
    orig: {
      src: SRC_DIR + "/other.{{MODE}}.js",
      dest: DEST_DIR
    }
  };
  var VALID_FILES_ARRAY_METAL = [ MODE_GROUP_CONFIG_A, MODE_GROUP_CONFIG_B ];

  var EMPTY_FILES_ARRAY = [];

  var MODE_GROUP_NO_ORIG = {
    src: SRC_DIR + "/other.{{MODE}}.js",
    dest: DEST_DIR
  };
  var MODE_GROUP_NO_ORIG_ARRAY = [ MODE_GROUP_CONFIG_A, MODE_GROUP_NO_ORIG ];



  it("has the correct length", function() {
    var mgcc = new ModeGroupConfigCollection(VALID_FILES_ARRAY_METAL, EXPECTED_MODES_METAL);
    mgcc.length().should.equal(2);
  });

  it("can be iterated over without errors", function() {
    var mgcc = new ModeGroupConfigCollection(VALID_FILES_ARRAY_METAL, EXPECTED_MODES_METAL);
    for(var i = 0; i < mgcc.length(); ++i) {
      mgcc.get(i);
    }
  });

  it("builds mode group config objects in the constructor parameter order", function() {
    var mgcc = new ModeGroupConfigCollection(VALID_FILES_ARRAY_METAL, EXPECTED_MODES_METAL);
    var mode_group_config_a = new ModeGroupConfig(MODE_GROUP_CONFIG_A.orig, EXPECTED_MODES_METAL);
    var mode_group_config_b = new ModeGroupConfig(MODE_GROUP_CONFIG_B.orig, EXPECTED_MODES_METAL);

    mgcc.get(0).should.eql(mode_group_config_a);
    mgcc.get(1).should.eql(mode_group_config_b);
  });

  it("throws error when files array is empty", function() {
    (function() {
      var mgcc = new ModeGroupConfigCollection(EMPTY_FILES_ARRAY, EXPECTED_MODES_METAL);
    }).should.throw();
  });

  it("throws error when files array has no 'orig' property", function() {
    (function() {
      var mgcc = new ModeGroupConfigCollection(MODE_GROUP_NO_ORIG_ARRAY, EXPECTED_MODES_METAL);
    }).should.throw();
  });
});
