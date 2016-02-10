
	//posts template
	Template.posts.helpers({
		postsIndex: () => PostsIndex, // instanceof EasySearch.Index
		inputAttributes: function () {
			return { 'class': 'easy-search-input', 'placeholder': 'Start searching...' };
		},
		posts: function() {
		if (Session.get("userFilter")) { //they set a filter!
			return Posts.find({addedBy: Session.get('userFilter')}, {sort:{likes:-1}});
		} else {
			return Posts.find({}, {sort:{likes: -1}, limit: Session.get("postLimit")});
		}
	},
	filtering_posts :function() {
		if (Session.get("userFilter")) { //they set a filter!
			return true;
		} else {
			return false;
		}
	},
	currentUserFilter: function() {
		var currentUserId = Session.get("userFilter");

		return Meteor.users.findOne({_id: currentUserId}).username;
	},
	getUser: function(user_id) {
		var user = Meteor.users.findOne({_id: user_id});
		if (user) {
			return user.profile.name;
		} else {
			return 'anonymous';
		}
	},
	active: function(){
		var userId = Meteor.userId();
		if (!_.include(this.upvoters, userId)) {
			return 'btn-primary active';
		}
		else {
			return 'disabled';
		}
	},
	limit: function() {
		return Session.get('postLimit');
	}
});

	Template.posts.events({

		'click .js-del-post': function (event) {
			var post_id = this._id;
			console.log(post_id);
			$('#'+post_id).hide('slow', function() {
				posts.remove({"_id": post_id});
			});
		},
		'click .js-rate-post' : function (event) {
			var rating = $(event.currentTarget).data('userrating');
			var post_id = this.id;
			console.log(post_id);

			posts.update({_id: post_id},
				{$set: {rating: rating}}
				);
		},

		'click .js-set-post-filter' : function(event) {
			Session.set("userFilter", this.addedBy);
		},
		'click .js-unset-post-filter' : function(event) {
			Session.set("userFilter", undefined);
		},

		'click .active.like': function(event) {
			var post_id = this._id;
			var userId = Meteor.userId();

			Posts.update( {_id: post_id},
				{$inc: {likes: +1}, $push: {upvoters: userId}}
				);
			$(this).removeClass('active');

		},
	});

