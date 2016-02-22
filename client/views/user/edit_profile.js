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
	},
	'click .delete-user-image': function(event, template) {
	  event.preventDefault();
	  var userId = FlowRouter.getParam('_id');
		var currentUser = Meteor.userId();
		var data ={};
		data.profilePic = '';
		data.userId = userId;
		if (userId === currentUser) {
			Meteor.call('deleteProfileImage', data, function (error, result) {
	      if(error) {
	        console.log(error);
	      } else {
	        console.log('nice');
	      }
	    });
		} else {
	    sAlert.warning("This needs to be your profile.", {effect:'genie'});
	  }

	},
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