module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    clean: {
      total: {
        src: [ "build" ]
      }
    },

    copy: {
      build: {
        cwd: "src",
        src: [ "**" ],
        dest: "build",
        expand: true,
        mode: true
      }
    },

    set_app_mode: {
      set: {
        expected_modes: [ "dev", "staging", "prod" ]
        files: [
          {
            src: "src/server/config.{{MODE}}.js",
            dest: "build/server"
          },
          {
            src: "src/scripts/upstart/simple-error-server.{{MODE}}.override",
            dest: "build/scripts/upstart"
          }
        ]
      }
    }
  });

  grunt.registerTask("build", ["clean", "copy", "set_app_mode"]);
};
