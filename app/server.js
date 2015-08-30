module.exports = function(config) {

	var http = require("http"),
		express = require("express"),
		app = express(),
		bodyParser = require("body-parser"),
		contentFolders = config.httpServer.contentFolders;

	app.use("/css", express.static(contentFolders.cssFolder, {
		setHeaders: function(res, filePath) {
			res.setHeader("Content-Type", "text/css");
			if (/.gz.css$/.test(filePath)) {
				res.setHeader("Content-Encoding", "gzip");
			}
		}
	}));

	app.use("/js", express.static(contentFolders.jsFolder, {
		setHeaders: function(res, filePath) {
			res.setHeader("Content-Type", "text/javascript");
			if (/.gz.js$/.test(filePath)) {
				res.setHeader("Content-Encoding", "gzip");
			}
		}
	}));

	app.use("/libs", express.static(contentFolders.libsFolder));

	//rest service
	app.use("/rest", bodyParser.json());
	var rest = require("./routers/rest")();
	app.use("/rest", rest);

	//serving index.html
	app.use("/", function(req, res) {
		res.sendFile(config.httpServer.indexFile, function(err) {
			if (err) {
				res.status(err.status).end();
			}
		});
	});

	http.createServer(app).listen(config.httpServer.port, function() {
		console.log("web server running on port: " + config.httpServer.port);
	});
};
