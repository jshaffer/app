(function() {
	var dependencies = [ "jquery", "handlebars", "underscore", "backbone", "app/templates/app.templates.hbs" ];

	function sampleView($, Handlebars, _, Backbone, templates) {

		return Backbone.View.extend({

			id: "account-edit",
			tagName: "div",

			events: {
				"click button": "saveAccount"
			},

			saveAccount: function() {
				this.trigger("save-account", {
					firstName: $("#firstName").val(),
					lastName: $("#lastName").val(),
				});
			},

			template: function(model) {
				return templates["welcome"](model);
			},

			render: function() {
				this.$el.append(this.template(this.model.toJSON()));
				return this.$el;
			}
		});
	}
	define(dependencies, sampleView);
})();
