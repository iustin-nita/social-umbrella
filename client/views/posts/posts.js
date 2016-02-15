	Template.posts.onCreated(function() {
	  var self = this;
	  self.autorun(function() {
	    self.subscribe('posts');  
	  });
	});
	
	//posts template
	Template.posts.helpers({
		postsIndex: () => PostsIndex, // instanceof EasySearch.Index
		inputAttributes: function () {
			return { 'class': 'easy-search-input', 'placeholder': 'Start searching...' };
		},
		posts: function() {
			return Posts.find({}, {sort:{addedOn: 1}, limit: Session.get("postLimit")});
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
	// getUser: function(user_id) {
	// 	var user = Meteor.users.findOne({_id: user_id});
	// 	if (user) {
	// 		if (user.services.facebook) {
	// 			return user.services.facebook.name;
	// 		} else {
	// 			return user.profile.name;
	// 		}
	// 	} else {
	// 		return 'anonymous';
	// 	}
	// },
	// getProfilePic: function(user_id) {
	// 	var user = Meteor.users.findOne({_id: user_id});
	// 	if (user) {
	// 		if (user.services.facebook) {
	// 			return user.services.facebook.name;
	// 		} else {
	// 			return user.profile.profilePic;
	// 		}
	// 	} else {
	// 		return '/images/user6.png';
	// 	}
	// },
	active: function(){
		var userId = Meteor.userId();
		if (!_.include(this.likers, userId)) {
			return 'btn-primary active';
		}
		else {
			return 'inactive disabled';
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
		// 'click .like': function(event) {
		// 	event.preventDefault();
		// 	Meteor.call('getRandomQuote', function(err, result) {
		// 		if(err) {
		// 			console.log(err);
		// 		} else {
		// 			console.log(result.data.data[0].text);
		// 			// var quoteData = result.data[0];
		// 			// console.log(quoteData);
		// 			// return quoteData.text;
		// 			Session.set('testQuote', result.data.data[0].text);
		// 		}
		// 	});
		// 	console.log(Session.get('textQuote'));
		// 	return Session.get('textQuote');
		// },
		'click .active.like': function(event) {
			var post_id = this._id;
			var userId = Meteor.userId();
			if(userId) {
				Posts.update( {_id: post_id},
					{$inc: {likes: +1}, $push: {likers: userId}}
					);
				$('.like').find('span').text('Liked');
				$(this).removeClass('active').addClass('inactive');
			} else {
				  Materialize.toast('Please log in to like posts', 4000); // 4000 is the duration of the toast
			}

		},
		'click .inactive.like': function(event) {
			var post_id = this._id;
			var userId = Meteor.userId();
			console.log('inactive');
			Posts.update( {_id: post_id},
				{$inc: {likes: -1}, $pull: {likers: userId}}
				);
			$('.inactive.like').find('.material-icons').text('thumb_up');
			console.log($(this));
			$('.like').find('span').text('Like');
			$(this).removeClass('inactive disabled').addClass('active');
		},
		'mouseenter .inactive.like':function(event) {
			$('.inactive.like').find('span').text('Unlike');
			$('.inactive.like').find('.material-icons').text('thumb_down');
		},
		'mouseleave .inactive.like':function(event) {
			$('.inactive.like').find('span').text('Like');
			$('.inactive.like').find('.material-icons').text('thumb_up');
		}
	});

