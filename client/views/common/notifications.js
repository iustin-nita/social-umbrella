Template.notifications.helpers({ 
	notifications: function() {
	return Notifications.find({
		userId: Meteor.userId(), read: false
	}); },
	notificationCount: function(){
		return Notifications.find({
			userId: Meteor.userId(), read: false
		}).count();
	} ,
	

});

Template.notificationItem.helpers({
 notificationPostPath: function() {
	return FlowRouter.routes.post.path({_id: this.postId}); 
	},
	getComment: function(commentId) {
		console.log(commentId);
		return Comments.findOne({_id:commentId}).body;
	}
});

Template.notificationItem.events({
 'click .notificationLink': function() {
	Notifications.update(this._id, {$set: {read: true}}); 
}
});