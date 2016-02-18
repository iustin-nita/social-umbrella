Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		// check(this.userId, String);
		// check(commentAttributes, {
		// 	postId: String,
		// 	body: String
		// });
		var post = Posts.findOne(commentAttributes.postId);
		if (!post)
			throw new Meteor.Error('invalid-comment', 'You must comment on a post');
		comment = _.extend(commentAttributes, {
			addedOn: new Date()
		});
		console.log('just before');
		console.log(comment);
		Posts.update(comment.postId, {$inc: {commentsCount: 1}});
		comment._id = Comments.insert(comment);
		// now create a notification, informing the user that there's been a comment
		  createCommentNotification(comment);
		return comment._id;
	}
});