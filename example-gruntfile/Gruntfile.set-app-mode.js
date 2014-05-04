module.exports = function(grunt) {
  var _ = require("underscore");

  var build_tasks = _.filter(grunt.cli.tasks, function(arg) {
    return arg.indexOf("build:") !== -1;
  });
  var build_modes = _.map(build_tasks, function(task) {
    return task.substring(task.indexOf(":") + 1);
  });
  if(build_modes.length > 1) {
    grunt.log.error("Multiple build tasks specified: " + JSON.stringify(build_tasks));
  }
  else {
    var build_mode = build_modes[0];
  }

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    // Configuration files and variables
    pkg: grunt.file.readJSON("package.json"),
    app_info: grunt.file.readJSON("app_info.json"),
    build_mode: build_mode,

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
      options: {
        expected_modes: [ "dev", "staging", "prod" ]
      },
      files: [
        {
          src: "src/server/config.{{MODE}}.js",
          dest: "build/server"
        },
        {
          src: "src/scripts/upstart/simple-error-server.{{MODE}}.override"
          dest: "build/scripts/upstart"
        }
      ]
    }
  });

  grunt.registerTask("build:dev", ["clean:total", "copy:build", "set_app_mode"]);
  grunt.registerTask("build:staging", ["clean:total", "copy:build", "set_app_mode"]);
  grunt.registerTask("build:prod", ["clean:total", "copy:build", "set_app_mode"]);
};
