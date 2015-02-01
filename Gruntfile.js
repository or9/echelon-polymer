module.exports = function gruntRunner(grunt) {
	"use strict";

	var pkg = grunt.file.readJSON("package");
	var gruntConfig = require("tasks/gruntConfig");
	var fs = require("fs");
	grunt.initConfig(gruntConfig);

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-compress");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-contrib-htmlmin");
	grunt.loadNpmTasks("grunt-shell");
	grunt.loadNpmTasks("grunt-mocha");


	grunt.registerTask("xml", "Generate Config and gmapp XML", generateXml);
	grunt.registerTask("incrementVersion", "Increment build version in package.json", incrementVersion);

	grunt.registerTask("watch", "Default watch", ["watch"]);

	grunt.registerTask("test", "Run tests against already built app without cleaning first", [
			"mocha"
	]);
	grunt.registerTask("default", "default build will output radio-ready app", [
		"clean",
		"copy",
		"uglify",
		"cssmin",
		"htmlmin",
		"imagemin"
	]);

	function incrementVersion(target) {
		var version = pkg.version.split(".");
		var bower = grunt.file.readJSON("bower.json");
		version[2] = version[2] * 1 + 1;
		pkg.version = version.join(".");
		bower.version = pkg.version;
		util.log("Incrementing build version to " + pkg.version);
		fs.writeFileSync("./package.json", JSON.stringify(pkg, undefined, 2));
		fs.writeFileSync("./bower.json", JSON.stringify(bower, undefined, 2));
	}

	function generateXml(target) {
		target = target || "default";
		util.log("Generate XML. Target: " + target);
		task.configxml.toXml(target);
	}
};
