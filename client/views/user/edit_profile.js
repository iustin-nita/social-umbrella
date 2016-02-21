Template.editProfile.events({
	'submit .js-edit-profile': function () {
		if(Meteor.user()) {
			Meteor.call('editProfile', profileProps, function (error, result) {
				if (error) {
					console.log(error);
				} else {
					alert('yuhuu');
				}
			});
		}
	}
});

Template.editProfile.helpers({
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
	      console.log(userId);
	      return user;
    },
});


$('.special.cards .image').dimmer({
  on: 'hover'
});