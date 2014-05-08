"use strict";

describe("SetAppModeExecutor unit tests", function() {
  var _ = require("underscore");
  var should = require("should");
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



  function validate_application(expected_modes, prefix, mode) {
    _.each(expected_modes, function(a_mode) {
      var invalid_filepath = DEST_DIR + "/" + prefix + "." + a_mode + ".js"
      grunt.file.exists(invalid_filepath).should.equal(false, invalid_filepath + " should not exist");
    });
    var valid_filepath = DEST_DIR + "/" + prefix + ".js";
    grunt.file.exists(valid_filepath).should.equal(true, valid_filepath + " should exist");

    var valid_src_filepath = SRC_DIR + "/" + prefix + "." + mode + ".js";
    var content_of_src = load_file_contents(valid_src_filepath);
    var content_of_dest = load_file_contents(valid_filepath);
    content_of_src.should.equal(content_of_dest, valid_filepath + " contents should equal " +
      valid_src_filepath + " contents");
  }



  beforeEach(function() {
    grunt = require("grunt");
    grunt.file.delete("tmp");
    var config = get_test_configuration();
    grunt.file.copy(config.files[0].src, config.files[0].dest);
  });



  it("can apply a valid SetAppModeConfig and files array", function() {
    var exec = new SetAppModeExecutor(VALID_SETAPPMODECONFIG_EXPECTED_DEFAULT, VALID_FILES_ARRAY_DEFAULT_CONFIG);
    exec.apply();
    validate_application(VALID_SETAPPMODECONFIG_EXPECTED_MODES_DEFAULT,
      VALID_SETAPPMODECONFIG_SRC_PREFIX_DEFAULT, VALID_SETAPPMODECONFIG_MODE_DEFAULT);
  });

  it("can apply a valid SetAppModeConfig and multi-element files array", function() {
    var exec = new SetAppModeExecutor(VALID_SETAPPMODECONFIG_EXPECTED_METAL, VALID_FILES_ARRAY_METAL_MODE);
    exec.apply();
    validate_application(VALID_SETAPPMODECONFIG_EXPECTED_MODES_METAL,
      VALID_SETAPPMODECONFIG_SRC_PREFIX_METAL_A, VALID_SETAPPMODECONFIG_MODE_METAL);
    validate_application(VALID_SETAPPMODECONFIG_EXPECTED_MODES_METAL,
      VALID_SETAPPMODECONFIG_SRC_PREFIX_METAL_B, VALID_SETAPPMODECONFIG_MODE_METAL);
  });

  it("throws error when configuration files array is empty", function() {
    (function() {
      var exec = new SetAppModeExecutor(VALID_SETAPPMODECONFIG_EXPECTED_DEFAULT, EMPTY_FILES_ARRAY);
    }).should.throw();
  });

  it("throws error when configuration files array is undefined", function() {
    (function() {
      var exec = new SetAppModeExecutor(VALID_SETAPPMODECONFIG_EXPECTED_DEFAULT, UNDEFINED_FILES_ARRAY);
    }).should.throw();
  });

  it("throws error when configuration files array is null", function() {
    (function() {
      var exec = new SetAppModeExecutor(VALID_SETAPPMODECONFIG_EXPECTED_DEFAULT, NULL_FILES_ARRAY);
    }).should.throw();
  });
});
