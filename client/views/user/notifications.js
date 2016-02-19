Template.notifications.helpers({ 
	notifications: function() {
	return Notifications.find({
		userId: Meteor.userId()}, {sort: {date: -1}, limit: Session.get("notificationsLimit")}
	 );
},
	notificationCount: function(){
		return Notifications.find({
			userId: Meteor.userId(), read: false
		}).count();
	} ,

});

Template.notifications.events({
	'click .show-more': function (event) {
		event.preventDefault();
		Session.set('notificationsLimit', Session.get('notificationsLimit')+5);
	}
});

Template.notificationItem.helpers({
 notificationPostPath: function() {
	return FlowRouter.routes.post.path({_id: this.postId}); 
	},
	getComment: function(commentId) {
		console.log(commentId);
		return Comments.findOne({_id:commentId}).body;
	},

});

Template.notificationItem.events({
 'click .notificationLink': function() {
	Notifications.update(this._id, {$set: {read: true}}); 
}
});