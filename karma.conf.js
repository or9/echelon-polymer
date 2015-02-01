module.exports = function karmaConfig (karma) {
	"use strict";

	karma.set({
		singleRun: false,
		autoWatch: false,
		logLevel: karma.LOG_ERROR,

		reporters: ["spec", "coverage"],
		browsers: ["CrossSitePhantomJS"],
		plugins: ["karma-*"],

		preprocessors: {
			"dist/**/*.js": ["coverage"]
		},

		frameworks: [
			"mocha",
			"chai"
		],

		files: [
		],

		customLaunchers: {
			CrossSitePhantomJS: {
				base: "PhantomJS",
				options: {
					settings: {
						webSecurityEnabled: false
					}
				}
			}
		}

	});
};
