define(["jquery","underscore","backbone"], function($, _, Backbone) {
	console.log("testing sampleModule inclusion via require.js");

	return {
		run: function() {
			console.log("testing another components of sampleModule");
		}
	};
});