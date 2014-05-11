"use strict";

describe("SetAppModeExecutor", function() {
  var should = require("should");
  var grunt; // require before each test to ensure it is fresh
  var SetAppModeConfig = require("../../lib/set_app_mode_config");
  var SetAppModeExecutor = require("../../lib/set_app_mode_executor");



  var VALID_SETAPPMODECONFIG_MODE_DEFAULT = "staging";
  var VALID_SETAPPMODECONFIG_EXPECTED_MODES_DEFAULT = [ "dev", VALID_SETAPPMODECONFIG_MODE_DEFAULT, "prod" ];
  var VALID_SETAPPMODECONFIG_SRC_PREFIX_DEFAULT = "config";

  var VALID_SETAPPMODECONFIG_MODE_METAL = "gold";
  var VALID_SETAPPMODECONFIG_EXPECTED_MODES_METAL = [ "bronze", "silver", VALID_SETAPPMODECONFIG_MODE_METAL ];
  var VALID_SETAPPMODECONFIG_SRC_PREFIX_METAL_A = "mode";
  var VALID_SETAPPMODECONFIG_SRC_PREFIX_METAL_B = "other";

  var DEST_DIR = "tmp";
  var SRC_DIR = "src"

  var VALID_SETAPPMODECONFIG_EXPECTED_DEFAULT = new SetAppModeConfig({
    expected_modes: VALID_SETAPPMODECONFIG_EXPECTED_MODES_DEFAULT,
    mode: VALID_SETAPPMODECONFIG_MODE_DEFAULT
  });

  var VALID_SETAPPMODECONFIG_EXPECTED_METAL = new SetAppModeConfig({
    expected_modes: VALID_SETAPPMODECONFIG_EXPECTED_MODES_METAL,
    mode: VALID_SETAPPMODECONFIG_MODE_METAL
  });

  var VALID_FILES_ARRAY_DEFAULT_CONFIG = [{
    src: [ SRC_DIR + "/" + VALID_SETAPPMODECONFIG_SRC_PREFIX_DEFAULT + ".{{MODE}}.js" ],
    dest: [ DEST_DIR ]
  }];

  var VALID_FILES_ARRAY_METAL_MODE = [{
    src: [ SRC_DIR + "/" + VALID_SETAPPMODECONFIG_SRC_PREFIX_METAL_A + ".{{MODE}}.js" ],
    dest: [ DEST_DIR ]
  }, {
    src: [ SRC_DIR + "/" + VALID_SETAPPMODECONFIG_SRC_PREFIX_METAL_B + ".{{MODE}}.js" ],
    dest: [ DEST_DIR ]
  }];

  var EMPTY_FILES_ARRAY = [];

  var UNDEFINED_FILES_ARRAY = undefined;

  var NULL_FILES_ARRAY = null;



  beforeEach(function() {
    grunt = require("grunt");
    if(grunt.file.exists(DEST_DIR)) {
      grunt.file.delete(DEST_DIR);
    }
  });

  it.skip("can apply a valid SetAppModeConfig and files array", function() {
    var exec = new SetAppModeExecutor(VALID_SETAPPMODECONFIG_EXPECTED_DEFAULT, VALID_FILES_ARRAY_DEFAULT_CONFIG);
    exec.apply();
    validate_application(VALID_SETAPPMODECONFIG_EXPECTED_MODES_DEFAULT,
      VALID_SETAPPMODECONFIG_SRC_PREFIX_DEFAULT, VALID_SETAPPMODECONFIG_MODE_DEFAULT, DEST_DIR, SRC_DIR);
  });

  it.skip("can apply a valid SetAppModeConfig and multi-element files array", function() {
    var exec = new SetAppModeExecutor(VALID_SETAPPMODECONFIG_EXPECTED_METAL, VALID_FILES_ARRAY_METAL_MODE);
    exec.apply();
    validate_application(VALID_SETAPPMODECONFIG_EXPECTED_MODES_METAL,
      VALID_SETAPPMODECONFIG_SRC_PREFIX_METAL_A, VALID_SETAPPMODECONFIG_MODE_METAL);
    validate_application(VALID_SETAPPMODECONFIG_EXPECTED_MODES_METAL,
      VALID_SETAPPMODECONFIG_SRC_PREFIX_METAL_B, VALID_SETAPPMODECONFIG_MODE_METAL, DEST_DIR, SRC_DIR);
  });

  it.skip("throws error when configuration files array is empty", function() {
    (function() {
      var exec = new SetAppModeExecutor(VALID_SETAPPMODECONFIG_EXPECTED_DEFAULT, EMPTY_FILES_ARRAY);
    }).should.throw();
  });

  it.skip("throws error when configuration files array is undefined", function() {
    (function() {
      var exec = new SetAppModeExecutor(VALID_SETAPPMODECONFIG_EXPECTED_DEFAULT, UNDEFINED_FILES_ARRAY);
    }).should.throw();
  });

  it.skip("throws error when configuration files array is null", function() {
    (function() {
      var exec = new SetAppModeExecutor(VALID_SETAPPMODECONFIG_EXPECTED_DEFAULT, NULL_FILES_ARRAY);
    }).should.throw();
  });
});
