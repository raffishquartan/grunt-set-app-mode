# grunt-set-app-mode

> Sets application mode by copying, e.g. config.production.js to config.js

See `example-gruntfile/Gruntfile.orig.js` and `example-gruntfile/Gruntfile.set-app-mode.js` for an example of how the `grunt-set-app-mode` plugin can simplify a Gruntfile and make its intent clearer.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-set-app-mode --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-set-app-mode');
```

## The "set_app_mode" task

### Overview
In your project's Gruntfile, add a section named `set_app_mode` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  set_app_mode: {
    options: {
      expected_modes = [ "array", "of", "valid", "build", "modes", "eg", "production" ]
    },
    files: [
      {
        src: "relative/path/to/mode/files/filename.{{MODE}}.extension"
        dest: "directory/to/copy/mode/specific/filename.extension/to/"
      }.
      // ...
    ]
  }
});
```

### Options

#### options.expected_modes
Type: `Array of String`
Default value: `[ "dev", "staging", "prod" ]'`

### Usage Examples

Define `--mode=DESIRED_MODE` in the command line used to run grunt. E.g. `grunt test build deploy --mode=prod` (not wholly used yet in example Gruntfiles).

#### Default Options
In this example, the default expected modes are used to ensure the correct config file for the build target is included in the final build. Any files matching the pattern config.{{MODE}} for one of the default modes will be removed from the destination folder.

```js
grunt.initConfig({
  set_app_mode: {
    files: [
      {
        src: "src/config.{{MODE}}.js",
        dest: "build"
      }
    ]
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
