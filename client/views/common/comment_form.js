// Template.comments.helpers({
//   comments: function(post_id) {
//     console.log(this);
//     console.log(Comments.find({"post_id":post_id}, {sort:{addedOn: 1}}));
//     return Comments.find({"post_id":post_id}, {sort:{addedOn: 1}});
//   },
// });


Template.commentForm.events({
  'submit .add_comment_form': function(event, template) {
    var currentTarget, userId, user, body, post_id,comment;
    currentTarget = event.target;
    if (Meteor.user()) {
      // alert(Meteor.user().profile);
      body = event.target[0].value;
      userId = Meteor.userId();
      // post_id = this._id;
      // console.log(event.target[0].value);
      // console.log(template);
      // console.log(event.target);
      var $body = $(event.target).find('[name=body]');
        comment = {
        body: $body.val(),
        postId: template.data._id,
        userId: userId
        };

      var errors = {};

      if(!comment.body) {
        alert('Please write something...', 4000);
      }
      Meteor.call('commentInsert', comment, function(error, commentId) {
        if (error){
          throwError(error.reason);
        } else {
          $body.val('');
        }
      });
      } else {
        alert('You need to log in first');
      }
      return false;
    }
  });
