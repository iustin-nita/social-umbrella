// Template.layout.onCreated(function() {
//   this.subscribe('notifications');
// })
Template.app.events({
	'click .log-out': function(event) {
			Meteor.logout(function() {
				FlowRouter.go('/');
			});
		},
});