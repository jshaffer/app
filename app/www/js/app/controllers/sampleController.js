define(["underscore", "backbone", "app/models/sampleModel", "app/views/sampleView"],
	function(_, Backbone, sampleModel, sampleView) {

		return function() {
			_.extend(this, Backbone.Events);
			var currentView = null;

			this.saveAccount = function(account) {
				model.save(function() {
					this.viewAccount();
				});
			};

			this.editAccount = function() {
				var myAccount = new sampleModel({
					name: "Pizza"
				});

				var editAccount = new sampleView({
					model: myAccount
				});

				this.listenTo(editAccount, "save-account", function(e) {
					this.saveAccount(e);
				});

				$("#app").append(editAccount.render());
				currentView = editAccount;
			};

			this.start = function() {
				this.editAccount();
			};
		};
	}
);