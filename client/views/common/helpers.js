Template.registerHelper("getUser", function (user_id) {
	var user = Meteor.users.findOne({_id: user_id});
	if (user) {
		return user.profile.firstName;
	} else {
		return 'anonymous';
	}
});
Template.registerHelper("getProfilePic", function (user_id) {
	var user = Meteor.users.findOne({_id: user_id});
	if (user) {
		if (user.services) {
			if(user.services.facebook) {
				console.log('asdas');
				return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
			} 
			else if(user.profile) {
				return user.profile.profilePic;
			}
		}  else if(user.profile) {
			console.log(user);
			return user.profile.profilePic;
		}
		else {
			return '/images/Anonymous.png';
		}
	}

});
Template.registerHelper("getLink", function (user_id) {
	var user = Meteor.users.findOne({_id: user_id});
	if (user) {
		if (user.services.facebook) {
			return user.profile.link;
		} else {
			return "/";
		}
	} else {
		return '/';
	}

});

Template.registerHelper("notifications", function(user_id) {
	var user = Meteor.users.findOne({_id: user_id});
	if (user) {
		Notifications.find();
	}
});