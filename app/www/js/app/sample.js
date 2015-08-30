(function() {
	var dependencies = [ "jquery", "underscore", "backbone", "app/controllers/sampleController", "app/sampleModule" ];
	function sample($, _, Backbone, AppController, sampleModule) {

		var appController = new AppController();
		appController.start();

		sampleModule.run();
	}

	define(dependencies, sample);
})();
