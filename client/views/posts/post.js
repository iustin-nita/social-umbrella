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
      console.log(post);
      return post;
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

      Posts.update( {_id: post_id},
        {$inc: {likes: +1}, $push: {upvoters: userId}}
        );

    },
    'click .active.downvote': function(event) {
      var post_id = this._id;
      var userId = Meteor.userId();
      console.log(post_id);

      Posts.update({_id: post_id},
        {$inc: {downvotes: +1}, $push: {downvoters: userId}}
        );
    },

    'submit #add_comment_form': function() {
      var commentAuthor = Meteor.user().username;
      var commentBody = $('#commentBody').val();
      var post_id = this._id;
      var comment = {
        commentAuthor: commentAuthor,
        commentBody: commentBody,
        commentDate: new Date()
      };
      Posts.update(
        {_id: post_id },
        { $push: { comments: comment }}
      );

      return false;
    }

  });
