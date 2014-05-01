describe("grunt-set-app-mode", function() {
  describe("build with valid mode creates output", function() {
    grunt.initConfig({
      set_app_mode: {
        files: [
          {
            src: ["test/src/config.{{MODE}}.js"]
            dest: ["tmp"]
          }
        ]
      }
    });

    // NOW DO BUILD IN HERE - MODE = DEV

    // ASSERT FILES ARE EQUAL AT END
  });

  describe("build with invalid mode raises error", function() {
    grunt.initConfig({
      set_app_mode: {
        files: [
          {
            src: ["test/src/config.{{MODE}}.js"]
            dest: ["tmp"]
          }
        ]
      }
    });

    // NOW DO BUILD IN HERE - MODE = DEVELOPMENT

    // ASSERT throws error at end
  });
});
