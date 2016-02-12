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

    isPostAuthor: function() {
      var user = Meteor.users.findOne({_id: user_id});
      var post = this;
      // if (post.author ==)

    },
    active: function(){
      var userId = Meteor.userId();
      if (!_.include(this.upvoters, userId) && !_.include(this.downvoters, userId)) {
        return 'btn-primary active';
      }
      else {
        return 'disabled';
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

    'click .active.like': function(event) {
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
    'click .inactive.like': function(event) {
      var post_id = this._id;
      var userId = Meteor.userId();
      console.log('inactive');
      Posts.update( {_id: post_id},
        {$inc: {likes: -1}, $pull: {likers: userId}}
        );
      $('.inactive.like').find('.material-icons').text('thumb_up');
      console.log($(this));
      $(this).removeClass('inactive disabled').addClass('active');
    },
    'mouseenter .inactive.like':function(event) {
      $('.inactive.like').find('.material-icons').text('thumb_down');
    },
    'mouseleave .inactive.like':function(event) {
      $('.inactive.like').find('.material-icons').text('thumb_up');
    },

    

  });
