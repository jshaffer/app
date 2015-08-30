module.exports = function() {

	var express = require("express"),
		router = express.Router();

	router.route("/test")
		.get(function(req, res) {
			res.send("/rest/test {GET} worked");
		})
		.post(function(req, res) {
			res.send("/rest/test {POST} worked");
		})
		.put(function(req, res) {
			res.send("/rest/test {PUT} worked");
		})
		.delete(function(req, res) {
			res.send("/rest/test {DELETE} worked");
		});

 	return router;
};
