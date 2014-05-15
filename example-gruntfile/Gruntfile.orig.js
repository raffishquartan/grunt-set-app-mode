module.exports = function(grunt) {;

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  var mode = grunt.option('mode') || 'dev'
  grunt.initConfig({
    clean: {
      total: {
        src: [ "build" ]
      },
      tidy: {
        src: [ "build/**/*.dev.*", "build/**/*.staging.*", "build/**/*.prod.*" ]
      }
    },

    copy: {
      build: {
        cwd: "src",
        src: [ "**" ],
        dest: "build",
        expand: true,
        mode: true
      },
      config_dev: {
        nonull: true,
        cwd: "src",
        src: "src/server/config.dev.js",
        dest: "build/server/config.js",
        mode: true
      },
      config_staging: {
        nonull: true,
        cwd: "src",
        src: "src/server/config.staging.js",
        dest: "build/server/config.js",
        mode: true
      },
      config_prod: {
        nonull: true,
        cwd: "src",
        src: "src/server/config.prod.js",
        dest: "build/server/config.js",
        mode: true
      },
      override_dev: {
        nonull: true,
        cwd: "src",
        src: "src/scripts/upstart/simple-error-server.dev.override",
        dest: "build/scripts/upstart/simple-error-server.override",
        mode: true
      },
      override_staging: {
        nonull: true,
        cwd: "src",
        src: "src/scripts/upstart/simple-error-server.staging.override",
        dest: "build/scripts/upstart/simple-error-server.override",
        mode: true
      },
      override_prod: {
        nonull: true,
        cwd: "src",
        src: "src/scripts/upstart/simple-error-server.prod.override",
        dest: "build/scripts/upstart/simple-error-server.override",
        mode: true
      }
    }
  });

  grunt.registerTask("build", ["clean:total", "copy:build", "copy:config_" + mode, "copy:override_" + mode,
    "clean:tidy"]);
};
