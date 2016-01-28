// this is image_share.js
Posts = new Mongo.Collection("posts");

Posts.helpers({
  rating: function() {
    return this.upvotes - this.downvotes;
  }
});

// set up security on posts collection
Posts.allow({
  insert: function (userId, doc) {
    if (Meteor.user()) { //they are logged in
      console.log(doc);
      return true;
    } else { // they are not logged in
      throw new Meteor.Error('invalid', 'Please log in to vote');
    }
  },
  update: function (userId, doc, fields, modifier) {
    if (Meteor.user()) { //they are logged in
      return true;
    } else { // they are not logged in
      return false;
    }
  },
  remove: function (userId, doc) {
    if (Meteor.user()) { //they are logged in
      return true;
    } else { // they are not logged in
      console.log('else');
      return false;
    }
  },
  fetch: ['owner'],
  // transform: function () {
  //   //...
  // }
});
