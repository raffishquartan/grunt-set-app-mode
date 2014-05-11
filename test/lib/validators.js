var grunt = require("grunt");

function load_file_contents(filepath) {
  if(grunt.file.exists(filepath)) {
    return grunt.file.read(filepath);
  }
  else {
    throw new Error(filepath + " does not exist");
  }
};

var Validators = {
  check_final_result: function(expected_modes, prefix, mode, dest_dir, src_dir) {
    if(expected_modes === undefined || prefix === undefined || mode === undefined || dest_dir === undefined ||
      src_dir === undefined) {
      throw new Error("Error: One of Valiators.check_final_result parameters is undefined");
    }

    expected_modes.forEach(function(a_mode) {
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

module.exports = Validators;
