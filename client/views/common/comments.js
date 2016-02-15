Template.comments.events({
  'submit .add_comment_form': function(event, template) {
    var currentTarget, userId, body, post_id,comment;
    currentTarget = event.target;
    if (Meteor.user()) {
      // alert(Meteor.user().profile);
      body = event.target[0].value;
      post_id = this._id;
      // console.log(event.target[0].value);
      comment = {
        userId: Meteor.userId(),
        body: body,
      };

      var errors = {};

      if(!comment.body) {
        Materialize.toast('Please write something...', 4000);
      }
      console.log(comment);

      Meteor.call('commentInsert', comment, function(error, commentId) {
        if (error){
          throwError(error.reason);
        } else {
          $body.val('');
        }
      });
      } else {
        Materialize.toast('You need to log in first', 4000);
      }
      return false;
    }
  });

// Template.comments.helpers({
//   getUser: function(user_id) {
//     var user = Meteor.users.findOne({_id: user_id});
//     if (user) {
//       if (user.services.facebook) {
//         return user.services.facebook.name;
//       } else {
//         return user.profile.name;
//       }
//     } else {
//       console.log('aici'+user);
//       return 'anonymous';
//     }
//   },
//   getProfilePic: function(user_id) {
//     var user = Meteor.users.findOne({_id: user_id});
//     if (user) {
//       if (user.services.facebook) {
//         return user.services.facebook.name;
//       } else {
//         return user.profile.profilePic;
//       }
//     } else {
//       return '/images/user6.png';
//     }
//   },
// });