	Template.posts.onCreated(function() {
	  var self = this;
	  self.autorun(function() {
	    self.subscribe('posts');  
	  });
	});
	
	//posts template
	Template.posts.helpers({
	//postsIndex: () => PostsIndex, // instanceof EasySearch.Index
	inputAttributes: function () {
		return { 'class': 'easy-search-input', 'placeholder': 'Start searching...' };
	},
	posts: function() {
		return Posts.find({}, {sort:{addedOn: 1}, limit: Session.get("postLimit")});
	},
	comments: function() {
		return Comments.find({postId: this._id});
	},
	ownPost: function() {
		return this.userId === Meteor.userId(); },
	domain: function() {
		var a = document.createElement('a'); a.href = this.url;
		return a.hostname;
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
	active: function(){
		var userId = Meteor.userId();
		if (_.include(this.likers, userId)) {
			return 'active';
		}
		else {
			return 'inactive';
		}
	},
	limit: function() {
		return Session.get('postLimit');
	}
});

	Template.posts.events({
		// 'mouseenter .ui.avatar.image' : function(event) {
		// 	$(event.target).popup();
		// 	console.log(this);
		// },
		'click .js-del-post': function (event) {
			var post_id = this._id;
			console.log(post_id);
			$('#'+post_id).hide('slow', function() {
				posts.remove({"_id": post_id});
			});
		},

		'click .js-set-post-filter' : function(event) {
			Session.set("userFilter", this.addedBy);
		},
		'click .js-unset-post-filter' : function(event) {
			Session.set("userFilter", undefined);
		},
		'click .inactive.like': function(event) {
			var post_id = this._id;
			var userId = Meteor.userId();
			if(userId) {
				Meteor.call('likePost', post_id);
				$(this).removeClass('active').addClass('inactive');
			} else {
				sAlert.info("You may try to log in.", {effect:'genie'});
			}
		},
		'click .active.like': function(event) {
			var post_id = this._id;
			var userId = Meteor.userId();
			if(userId) {
				Meteor.call('unlikePost', post_id);
				$(this).removeClass('inactive').addClass('active');
			} else {
				sAlert.info("You may try to log in.", {effect:'genie'});
			}
		},
	});