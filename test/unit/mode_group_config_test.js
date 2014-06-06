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

describe("ModeGroupGonfig", function() {
  var should = require("should");
  var path = require("path");
  var ModeGroupConfig = require("../../lib/mode_group_config");



  var TARGET_MODE = "dev";
  var EXPECTED_MODES = [ TARGET_MODE, "staging", "prod" ];
  var EXPECTED_MODES_ONE_WRONG = [ "bronze", "silver", "GOLD" ];
  var SRC_MODE_GLOB_ARRAY = ["test/src/config.{{MODE}}.js"];
  var SRC_NON_EXISTENT_GLOB_ARRAY = ["src/config.js"];
  var SRC_FILES_DO_NOT_EXIT_GLOB_ARRAY = ["src/foo.{{MODE}}.js"];
  var DEST_DIR = "test/tmp";
  var DEST_FILE = "test/src/config.dev.js";

  var VALID_MODE_GROUP_CONFIG = {
    src: SRC_MODE_GLOB_ARRAY,
    dest: DEST_DIR
  };

  var MISSING_DEST_MODE_GROUP_CONFIG = {
    src: SRC_MODE_GLOB_ARRAY
  };

  var MISSING_SRC_MODE_GROUP_CONFIG = {
    dest: DEST_DIR
  };

  var SOURCE_FILE_DOES_NOT_EXIST_CONFIG = {
    src: SRC_FILES_DO_NOT_EXIT_GLOB_ARRAY,
    dest: DEST_DIR
  };

  var DESTINATION_IS_A_FILE_CONFIG = {
    src: SRC_MODE_GLOB_ARRAY,
    dest: DEST_FILE
  };

  var SOURCE_NON_EXISTENT_GLOB_CONFIG = {
    src: SRC_NON_EXISTENT_GLOB_ARRAY,
    dest: DEST_DIR
  };



  it("does not throw an error with valid files and expected_modes", function() {
    var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES);
  });

  it("returns the correct source glob", function() {
    var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES);
    mgc.get_src_glob().should.equal(SRC_MODE_GLOB_ARRAY[0].replace("{{MODE}}", "*"));
  });

  it("returns the correct src filepath", function() {
    var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES);
    mgc.get_src_filepath(TARGET_MODE).should.equal(SRC_MODE_GLOB_ARRAY[0].replace("{{MODE}}", TARGET_MODE));
  });

  it("returns the correct src filename", function() {
    var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES);
    var src_filename = path.basename(SRC_MODE_GLOB_ARRAY[0].replace("{{MODE}}", TARGET_MODE));
    mgc.get_src_filename(TARGET_MODE).should.equal(src_filename);
  });

  it("returns the correct dest", function() {
    var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES);
    mgc.get_dest_dir().should.equal(DEST_DIR);
  });

  it("returns the correct destination filename", function() {
    var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES);
    var dest_filepath = path.join(DEST_DIR, path.basename(SRC_MODE_GLOB_ARRAY[0].replace(".{{MODE}}", "")));
    mgc.get_dest_filepath(TARGET_MODE).should.equal(dest_filepath);
  });

  it("returns the correct destination glob", function() {
    var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES);
    var dest_filepath = path.join(DEST_DIR, path.basename(SRC_MODE_GLOB_ARRAY[0].replace("{{MODE}}", "*")));
    mgc.get_dest_glob(TARGET_MODE).should.equal(dest_filepath);
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

  it("throws error src does not contain '{{MODE}}'", function() {
    (function() {
      var mgc = new ModeGroupConfig(SOURCE_NON_EXISTENT_GLOB_CONFIG, EXPECTED_MODES);
    }).should.throw();
  });

  it("throws error when destination is a file not a directory", function() {
    (function() {
      var mgc = new ModeGroupConfig(DESTINATION_IS_A_FILE_CONFIG, EXPECTED_MODES);
    }).should.throw();
  });

  it("throws error when source file not present for one or more expected modes", function() {
    (function() {
      var mgc = new ModeGroupConfig(VALID_MODE_GROUP_CONFIG, EXPECTED_MODES_ONE_WRONG);
    }).should.throw();
  });
});
