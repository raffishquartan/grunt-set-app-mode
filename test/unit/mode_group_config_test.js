/*
 * grunt-set-app-mode
 * https://github.com/cfogelberg/grunt-set-app-mode
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */

"use strict";

describe("ModeGroupGonfig", function() {
  var should = require("should");
  var ModeGroupConfig = require("../../lib/mode_group_config");



  var SRC_GLOB = "test/src/config.{{MODE}}.js";
  var DEST_DIR = "test/tmp";

  var EXPECTED_MODES = [ "dev", "staging", "prod" ];

  var VALID_MODE_GROUP_CONFIG = {
    src: SRC_GLOB,
    dest: DEST_DIR
  };

  var MISSING_DEST_MODE_GROUP_CONFIG = {
    src: SRC_GLOB
  };

  var MISSING_SRC_MODE_GROUP_CONFIG = {
    dest: DEST_DIR
  };

  var SOURCE_FILE_DOES_NOT_EXIST_CONFIG = {
    src: "src/foo.{{MODE}}.js",
    dest: DEST_DIR
  };



  // tests
  it("does not throw an error with valid files and expected_modes", function() {
    var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES);
  });

  it("returns the correct source glob", function() {
    var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES);
    mgc.get_src_glob().should.equal(SRC_GLOB.replace("{{MODE}}", "*"));
  });

  it("returns the correct dest", function() {
    var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES);
    mgc.get_dest().should.equal(DEST_DIR);
  });

  it("throws error when configuration dest is missing", function() {
    (function() {
      var mgc = new ModeGroupConfig(MISSING_DEST_MODE_GROUP_CONFIG, EXPECTED_MODES);
    }).should.throw();
  });

  it("throws error when configuration src is missing", function() {
    (function() {
      var mgc = new ModeGroupConfig(MISSING_SRC_MODE_GROUP_CONFIG, EXPECTED_MODES);
    }).should.throw();
  });
});
