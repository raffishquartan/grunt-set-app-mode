var _ = require("underscore");
var grunt = require("grunt");

var validators = {
  check_final_result: function(expected_modes, prefix, mode, dest_dir, src_dir) {
    _.each(expected_modes, function(a_mode) {
      var invalid_filepath = dest_dir + "/" + prefix + "." + a_mode + ".js"
      grunt.file.exists(invalid_filepath).should.equal(false, invalid_filepath + " should not exist");
    });
    var valid_filepath = dest_dir + "/" + prefix + ".js";
    grunt.file.exists(valid_filepath).should.equal(true, valid_filepath + " should exist");

    var valid_src_filepath = src_dir + "/" + prefix + "." + mode + ".js";
    var content_of_src = load_file_contents(valid_src_filepath);
    var content_of_dest = load_file_contents(valid_filepath);
    content_of_src.should.equal(content_of_dest, valid_filepath + " contents should equal " +
      valid_src_filepath + " contents");
  }
};

module.exports = validators;
