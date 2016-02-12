Template.comments.events({
  'submit .add_comment_form': function(event, template) {
    var currentTarget, commentAuthor, commentBody, post_id,comment;
    currentTarget = event.target;
    if (Meteor.user()) {
      // alert(Meteor.user().profile);
      if (Meteor.user().profile === undefined) {
        commentAuthor = Meteor.user().username;
      } else {
        commentAuthor = Meteor.user().profile.name;
      }
      commentBody = event.target[0].value;
      post_id = this._id;
      // console.log(event.target[0].value);
      comment = {
        commentAuthor: commentAuthor,
        commentBody: commentBody,
        commentDate: new Date()
      };
      console.log(comment);
        Posts.update(
          {_id: post_id },
          { $push: { comments: comment }}
        );
      } else {
        Materialize.toast('You need to log in first', 4000);
      }
      return false;
    }
  });