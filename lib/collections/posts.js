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
