// post template
  Template.post.onCreated(function() {
    var self = this;
    self.autorun(function() {
      var postId = FlowRouter.getParam('postId');
      self.subscribe('singlePost', postId);  
    });
  });
  
  Template.post.helpers({
    getUser: function(user_id) {
      var user = Meteor.users.findOne({_id: user_id});
      if (user) {
        return user.username;
      } else {
        return 'anonymous';
      }
    },
    post: function() {
      var postId = FlowRouter.getParam('_id');
      var post = Posts.findOne({_id: postId}) || {};
      return post;
    },
    comments: function() {
      return Comments.find({postId: this._id});
    },

    isPostAuthor: function() {
      var user = Meteor.users.findOne({_id: user_id});
      var post = this;
      // if (post.author ==)

    },
    active: function(){
      var userId = Meteor.userId();
      if (_.include(this.likers, userId)) {
        return 'active';
      }
      else {
        return 'inactive disabled';
      }
    }
  });

  Template.post.events({

    'click .js-del-post': function (event) {
      var post_id = this._id;
      $('#'+post_id).hide('slow', function() {
        Posts.remove({"_id": post_id});
        FlowRouter.go('/posts');
      });

    },

    'click .inactive.like': function(event) {
      var post_id = this._id;
      var userId = Meteor.userId();
      if(userId) {
        Posts.update( {_id: post_id},
          {$inc: {likes: +1}, $push: {likers: userId}}
          );
        $(this).removeClass('active').addClass('inactive');
      } else {
          Materialize.toast('Please log in to like posts', 4000) // 4000 is the duration of the toast
      }

    },
    'click .active.like': function(event) {
      var post_id = this._id;
      var userId = Meteor.userId();
      console.log('inactive');
      Posts.update( {_id: post_id},
        {$inc: {likes: -1}, $pull: {likers: userId}}
        );
      $(this).removeClass('inactive disabled').addClass('active');
    },

  });
