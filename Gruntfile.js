module.exports = function(grunt) {
	"use strict";
	
	var path = require("path"),
		sassFolder = path.join("assets", "sass"),
		wwwFolder = path.join("app", "www"),
		cssFolder = path.join(wwwFolder, "css"),
		jsFolder = path.join(wwwFolder, "js"),
		libsFolder = path.join(wwwFolder, "libs"),
		mediaFolder = path.join(wwwFolder, "media"),
		indexFile = path.join(__dirname, wwwFolder, "index.html"),
		cssMinFiles = {},
		cssCompressFiles = {},
		sassFiles = {};

	sassFiles[path.join(cssFolder, "site.css")] = path.join(sassFolder, "site.scss");
	cssMinFiles[path.join(cssFolder, "site.min.css")] = path.join(cssFolder, "site.css");
	cssCompressFiles[path.join(cssFolder, "site.min.gz.css")] = path.join(cssFolder, "site.min.css");

	grunt.initConfig({
		httpServer: {
			port: 8080,
			rootFolder: wwwFolder,
			indexFile: indexFile,
			contentFolders: {
				cssFolder: cssFolder,
				jsFolder: jsFolder,
				libsFolder: libsFolder,
				mediaFolder: mediaFolder
			}
		},
	    sass: {
			main: {
	        	options: {
	          		sourcemap: "none"
	        	},
				files: sassFiles
			}
		},
    	handlebars: {
			compile: {
				options: {
					namespace: "handlebars",
					amd: true,
					processName: function(filePath) {
						return path.basename(filePath, ".min.hbs");
					},
					processPartialName: function(filePath) {
						return path.basename(filePath, ".min.hbs");
					}
				},
				files: {
					"app/www/js/app/templates/app.templates.hbs.js": ["assets/templates-min/**/*.min.hbs"]
				}
			}
		},
		htmlmin: {
			handlebars: {
	        	options: {
	        		removeComments: true,
	        		collapseWhitespace: true
	      		},
        		expand: true,
        		cwd: 'assets/templates',
        		src: '*.hbs',
        		dest: 'assets/templates-min/',
        		ext: ".min.hbs"
	    	}
		},
		cssmin: {
			main: {
        		options: {
          			keepSpecialComments: 0,
          			sourceMap: false
        		},
				files: cssMinFiles
			}
		},
    	compress: {
      		css: {
        		options: {
          			mode: 'gzip'
        		},
        		files: cssCompressFiles
      		}
    	},
		watch: {
			handlebars: {
				files: ["assets/templates/**/*.hbs"],
				tasks: ["htmlmin:handlebars", "handlebars"],
				options: {
					spawn: false
				}
			},
      		css: {
				files: path.join(sassFolder, "**", "*.scss"),
				tasks: ["sass","cssmin","compress:css"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-handlebars");
	grunt.loadNpmTasks("grunt-contrib-htmlmin");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-compress");

	grunt.registerTask("web-server", "start a web server", function() {
		require("./app/server")({
			httpServer: grunt.config("httpServer"),
		});
	});

	grunt.registerTask("default", "start development environment", 
		[ "htmlmin", "handlebars", "sass", "cssmin", "compress", "web-server", "watch" ]);
};
