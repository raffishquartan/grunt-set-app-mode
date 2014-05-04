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

  	// Plugin tasks
	  clean: {
			total: {
			  src: [ "build" ]
			},
			tidy: {
				src: [ "build/**/*.dev.*", "build/**/*.staging.*", "build/**/*.prod.*" ]
			}
  	},

  	// TODO: Fix grunt-contrib-copy/tasks/copy.js - mode not set and defaults to false, default it to true
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

  grunt.registerTask("build:dev", ["clean:total", "copy:build", "copy:config_dev", "copy:override_dev",
    "clean:tidy"]);
  grunt.registerTask("build:staging", ["clean:total", "copy:build", "copy:config_staging",
    "copy:override_staging", "clean:tidy"]);
  grunt.registerTask("build:prod", ["clean:total", "copy:build", "copy:config_prod", "copy:override_prod",
    "clean:tidy"]);
};
