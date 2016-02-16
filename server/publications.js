Meteor.publish('singlePost', function(id) {
  check(id, String);
  // Make a delay manually to show the loading state
  Meteor._sleepForMs(1000);
  return Posts.find({_id: id});
});


Meteor.publish('posts', function() {
  // Make a delay manually to show the loading state
  Meteor._sleepForMs(1000);
  return Posts.find({}, {sort:{addedOn: -1}});
});

Meteor.publish('comments', function(postId) {
check(postId, String);
return Comments.find({postId: postId});
});