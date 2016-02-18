Posts = new Mongo.Collection("posts");
Meteor.methods({
	likePost: function(postId) { 
		check(this.userId, String); 
		check(postId, String);
		var affected = Posts.update({
			 _id: postId,
			likers: {$ne: this.userId}
		}, {
			$addToSet: {likers: this.userId},
			$inc: {likes: 1}
		});
		if (! affected)
			sAlert.error("You weren't able to upvote that post. Maybe try logging in?");
	},
	unlikePost: function(postId) { 
		check(this.userId, String); 
		check(postId, String);
		var affected = Posts.update({
			 _id: postId,
			likers: {$eq: this.userId}
		}, {
			$pop: {likers: this.userId},
			$inc: {likes: -1}
		});
		if (! affected)
			sAlert.error("You weren't able to upvote that post. Maybe try logging in?", {effect: 'genie'});
	},

	insertPost: function(postAttributes) {
		check(this.userId, String);
		var userId = Meteor.userId();
		user = Meteor.users.findOne({_id: userId});
          if (user) {
            if (user.services.facebook) {
              userName = user.services.facebook.name;
            } else {
              userName = user.profile.name;
            }
          } else {
            return 'anonymous';
          }
		post = _.extend(postAttributes, {
			addedOn: new Date(),
			userId: userId,
			userName: userName
		});
		console.log('just before');
		console.log(post);
		var postId = Posts.insert(post);
		return {
			_id: postId
		};
	},
	editPost: function(postAttributes) {
		var userId = Meteor.userId();
		check(this.userId, String);
		user = Meteor.users.findOne({_id: userId});
		console.log(postAttributes);
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
				} else {
					console.log('success');
					console.log(Posts.findOne({_id: 'post.id'}));
					// FlowRouter.go('/');
				}
			});

          } else {
            console.log('you need to log in');
          }
		
	},
	deleteImage: function(post) {
		var userId = Meteor.userId();
		user = Meteor.users.findOne({_id: userId});
          if (user) {
			console.log('just before');
			console.log(post);
			Posts.update(post.id, {$set: {image: ''} });
          } else {
            console.log('you need to log in');
          }
		
	},

});

// set up security on posts collection
Posts.allow({
	insert: function (userId, doc) {
		if (Meteor.user()) { //they are logged in
			console.log(doc);
			return true;
		} else { // they are not logged in
			throw new Meteor.Error('invalid', 'Please log in to vote');
		}
	},
	update: function(userId, post) { return ownsDocument(userId, post); }, 
	remove: function(userId, post) { return ownsDocument(userId, post); },
	fetch: ['owner'],
	// transform: function () {
	//   //...
	// }
});
