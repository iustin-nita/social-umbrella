Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		// check(this.userId, String);
		// check(commentAttributes, {
		// 	postId: String,
		// 	body: String
		// });
		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);
		if (!post)
			throw new Meteor.Error('invalid-comment', 'You must comment on a post');
		comment = _.extend(commentAttributes, {
			
			addedOn: moment(new Date())
		});
		console.log('just before');
		console.log(comment);
		Posts.update(comment.postId, {$inc: {commentsCount: 1}});
		return Comments.insert(comment);
	}
});