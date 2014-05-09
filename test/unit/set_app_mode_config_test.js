"use strict";

describe("SetAppModeConfig unit tests", function() {
  var should = require("should");
  var SetAppModeConfig = require("../../lib/set_app_mode_config");



  var VALID_EXPECTED_MODES = [ "bronze", "silver", "gold" ];
  var VALID_MODE = "gold";
  var UNKNOWN_MODE = "platinum";

  var VALID_CONFIGURATION = {
    expected_modes: VALID_EXPECTED_MODES,
    mode: VALID_MODE,
  };

  var NO_MODE_CONFIGURATION = {
    expected_modes: VALID_EXPECTED_MODES
  };

  var NO_EXPECTED_MODES_CONFIGURATION = {
    mode: VALID_MODE
  };

  var EXPECTED_MODES_IS_NOT_AN_ARRAY = {
    expected_modes: VALID_MODE,
    mode: VALID_MODE
  };

  var EMPTY_EXPECTED_MODES_CONFIGURATION = {
    expected_modes: [],
    mode: VALID_MODE
  };

  var UNKNOWN_MODE_CONFIGURATION = {
    expected_modes: VALID_EXPECTED_MODES,
    mode: UNKNOWN_MODE,
  };



  it("stores the mode 'gold' when using VALID_CONFIGURATION", function() {
    var config = new SetAppModeConfig(VALID_CONFIGURATION);
    config.get_mode().should.equal(VALID_MODE);
  });

  it("stores the correct expected_modes when using VALID_CONFIGURATION", function() {
    var config = new SetAppModeConfig(VALID_CONFIGURATION);
    VALID_EXPECTED_MODES.forEach(function(a_valid_mode) {
      config.get_expected_modes().should.containEql(a_valid_mode);
    });
  });

  it("throws an Error when mode is not set", function() {
    (function() {
      var config = new SetAppModeConfig(NO_MODE_CONFIGURATION)
    }).should.throw();
  });

  it("throws an Error when list of expected_modes is not present", function() {
    (function() {
      var config = new SetAppModeConfig(NO_EXPECTED_MODES_CONFIGURATION).should.throw();
    }).should.throw();
  });

  it("throws an Error when expected_modes is not an array", function() {
    (function() {
      var config = new SetAppModeConfig(EXPECTED_MODES_IS_NOT_AN_ARRAY).should.throw();
    }).should.throw();
  });

  it("throws an Error when list of expected_modes is empty", function() {
    (function() {
      var config = new SetAppModeConfig(EMPTY_EXPECTED_MODES_CONFIGURATION).should.throw();
    }).should.throw();
  });

  it("throws an Error when specified mode is not in the list of expected modes", function() {
    (function() {
      var config = new SetAppModeConfig(UNKNOWN_MODE_CONFIGURATION).should.throw();
    }).should.throw();
  });
});
