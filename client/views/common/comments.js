Template.comments.helpers({
  comments: function(post_id) {
    console.log(this);
    console.log(Comments.find({"post_id":post_id}, {sort:{addedOn: 1}}));
    return Comments.find({"post_id":post_id}, {sort:{addedOn: 1}});
  },
});


Template.comments.events({
  'submit .add_comment_form': function(event, template) {
    var currentTarget, userId, body, post_id,comment;
    currentTarget = event.target;
    if (Meteor.user()) {
      // alert(Meteor.user().profile);
      body = event.target[0].value;
      // post_id = this._id;
      // console.log(event.target[0].value);
      console.log(template);
      console.log(event.target);
      var $body = $(event.target).find('[name=body]');
        var comment = {
        body: $body.val(),
        postId: template.data._id
        };

      var errors = {};

      if(!comment.body) {
        alert('Please write something...', 4000);
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
        alert('You need to log in first');
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