Posts = new Mongo.Collection("posts");


Posts.helpers({
	rating: function() {
		return this.likes - this.downvotes;
	}
});

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
            if (user.services) {
              userName = user.services.facebook.name;
            } else {
              userName = user.profile.name;
            }
          } else {
            return 'anonymous';
          }
		post = _.extend(postAttributes, {
			addedOn: moment(new Date()),
			userId: userId,
			userName: userName
		});
		console.log('just before');
		console.log(post);
		var postId = Posts.insert(post);
		return {
		_id: postId
		};
	}
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
	update: function (userId, doc, fields, modifier) {
		if (Meteor.user()) { //they are logged in
			return true;
		} else { // they are not logged in
			return false;
		}
	},
	remove: function (userId, doc) {
		if (Meteor.user()) { //they are logged in
			return true;
		} else { // they are not logged in
			console.log('else');
			return false;
		}
	},
	fetch: ['owner'],
	// transform: function () {
	//   //...
	// }
});
