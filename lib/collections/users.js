Meteor.methods({
		editProfile: function(profileProps) {
			var userId = Meteor.userId();
			check(this.userId, String);
			user = Meteor.users.findOne({_id: userId});
			console.log(profileProps);
	          if (user) {
	  			post = _.extend(postAttributes, {
	  				addedOn: new Date(),
	  				userId: userId,
	  			});
				console.log('just before');
				console.log(post);
				Posts.update(post.id, {$set: post}, function(error) {
					if (error) {
						console.log(error);
					sAlert.error("Something went wrong! " + error, {effect: 'genie'});
					} else {
					FlowRouter.go('/post/'+post.id);
					sAlert.success("Post edited! ", {effect: 'genie'});
					}
				});

	          } else {
	            console.log('you need to log in');
	          }
			
		},
});