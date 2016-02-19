Template.userProfile.events({
	'click': function () {
		// ...
	}
});

Template.userProfile.helpers({
	foo: function () {
		// ...
	},
	posts: function() {
		return Posts.find({userId: Meteor.userId()}, {sort:{addedOn: -1}, limit: Session.get("postLimit")});
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