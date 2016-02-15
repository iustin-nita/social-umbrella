Template.registerHelper("getUser", function (user_id) {
    var user = Meteor.users.findOne({_id: user_id});
		if (user) {
			if (user.services.facebook) {
				return user.services.facebook.name;
			} else {
				return user.profile.name;
			}
		} else {
			return 'anonymous';
		}
});
Template.registerHelper("getProfilePic", function (user_id) {
    var user = Meteor.users.findOne({_id: user_id});
		if (user) {
			if (user.services.facebook) {
				return user.services.facebook.name;
			} else {
				return user.profile.profilePic;
			}
		} else {
			return '/images/user6.png';
		}
});