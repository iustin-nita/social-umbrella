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
        commentAuthorId: Meteor.userId(),
        commentBody: commentBody,
        commentDate: new Date()
      };
      console.log(comment);
        Posts.update(
          {_id: post_id },
          { $push: { comments: comment }}
        );
        event.target[0].value = '';
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