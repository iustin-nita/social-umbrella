Template.userProfile.events({
	'click': function () {
		// ...
	}
});

Template.userProfile.helpers({
	foo: function () {
		// ...
	},
	isUser: function() {
		var userId = FlowRouter.getParam('_id');
		var currentUser = Meteor.userId();
		if (userId === currentUser) {
			return true;
		}
	},
	posts: function() {
		var userId = FlowRouter.getParam('_id');
      	var user = Meteor.users.findOne({_id: userId}) || {};
		return Posts.find({userId: userId}, {sort:{addedOn: -1}, limit: Session.get("postLimit")});
	},
	user: function() {
	      var userId = FlowRouter.getParam('_id');
	      var user = Meteor.users.findOne({_id: userId}) || {};
	      return user;
    },
});


$('.special.cards .image').dimmer({
  on: 'hover'
});