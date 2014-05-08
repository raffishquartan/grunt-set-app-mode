"use strict";

describe("set app mode config unit tests", function() {
  var should = require("should");
  var SetAppModeConfig = require("../lib/SetAppModeConfig");

  var VALID_EXPECTED_MODES = [ "bronze", "silver", "gold" ];
  var VALID_MODE = "gold";
  var UNKNOWN_MODE = "platinum"

  var VALID_CONFIGURATION = {
    expected_modes: VALID_EXPECTED_MODES,
    mode: VALID_MODE,
  };

  var UNKNOWN_MODE_CONFIGURATION = {
    expected_modes: VALID_EXPECTED_MODES,
    mode: UNKNOWN_MODE,
  };

  var NO_EXPECTED_MODES_CONFIGURATION = {
    mode: VALID_MODE
  };

  var EMPTY_EXPECTED_MODES_CONFIGURATION = {
    expected_modes: [],
    mode: VALID_MODE
  };

  var NO_MODE_CONFIGURATION = {
    expected_modes: VALID_EXPECTED_MODES
  };

  it.skip("stores the mode 'gold' when using VALID_CONFIGURATION", function() {
    var config = new SetAppModeConfig(VALID_CONFIGURATION);
    SetAppModeConfig.get_mode().should.equal("smart");
  });

  it.skip("stores the correct expected_modes when using VALID_CONFIGURATION", function() {
    var config = new SetAppModeConfig(VALID_CONFIGURATION);
    SetAppModeConfig.get_expected_modes().should.containEql("dev");
    SetAppModeConfig.get_expected_modes().should.containEql("staging");
    SetAppModeConfig.get_expected_modes().should.containEql("prod");
  });

  it.skip("throws an Error when the specified mode is not in the list of expected modes", function() {
    var config = new SetAppModeConfig(UNKNOWN_MODE_CONFIGURATION).should.throw();
  });

  it.skip("throws an Error when the list of expected_modes is empty", function() {
    var config = new SetAppModeConfig(EMPTY_EXPECTED_MODES_CONFIGURATION).should.throw();
  });

  it.skip("throws an Error when the list of expected_modes is not present", function() {
    var config = new SetAppModeConfig(NO_EXPECTED_MODES_CONFIGURATION).should.throw();
  });

  it.skip("throws an Error when the mode is not set", function() {
    var config = new SetAppModeConfig(NO_MODE_CONFIGURATION).should.throw();
  });
});
