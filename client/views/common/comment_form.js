// Template.comments.helpers({
//   comments: function(post_id) {
//     console.log(this);
//     console.log(Comments.find({"post_id":post_id}, {sort:{addedOn: 1}}));
//     return Comments.find({"post_id":post_id}, {sort:{addedOn: 1}});
//   },
// });


Template.commentForm.events({
  'submit .add_comment_form': function(event, template) {
    var currentTarget, userId, user, body, post_id,comment, userName;
    currentTarget = event.target;
    if (Meteor.user()) {
      // alert(Meteor.user().profile);
      body = event.target[0].value;
      userId = Meteor.userId();
      user = Meteor.users.findOne({_id: userId});
          if (user) {
            if (user.services) {
              userName = user.services.facebook.name;
            } else {
              userName = user.profile.name;
            }
          } else {
            return 'anonymous';
          }
      // post_id = this._id;
      // console.log(event.target[0].value);
      // console.log(template);
      // console.log(event.target);
      var $body = $(event.target).find('[name=body]');
        comment = {
        body: $body.val(),
        postId: template.data._id,
        userId: userId,
        userName: userName
        };

      var errors = {};

      if(!comment.body) {
        sAlert.info("You should try to write something before!", {effect:'genie'});
      }
      Meteor.call('commentInsert', comment, function(error, commentId) {
        if (error){
          throwError(error.reason);
          sAlert.error("Oops! Something went wrong!"+error.reason+"", {effect:'genie'});
        } else {
          $body.val('');
        }
      });
      } else {
        sAlert.info("You should log in! It's easy!", {effect:'genie'});
      }
      return false;
    }
  });
