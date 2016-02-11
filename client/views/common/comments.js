Template.comments.events({
  'submit .add_comment_form': function() {
      var currentTarget = event.currentTarget;
      var commentAuthor = Meteor.user().username;
      var commentBody = currentTarget.find('.commentBody').val();
      var post_id = this._id;
      console.log(currentTarget);
      var comment = {
        commentAuthor: commentAuthor,
        commentBody: commentBody,
        commentDate: new Date()
      };
      console.log(comment);
      // Posts.update(
      //   {_id: post_id },
      //   { $push: { comments: comment }}
      // );

      return false;
    }
  });