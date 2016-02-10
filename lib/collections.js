// this is image_share.js
Posts = new Mongo.Collection("posts");
// var imageStore = new FS.Store.GridFS(“images”);

// Images = new FS.Collection(“images”, {
//  stores: [imageStore]
// });

// Images.deny({
//  insert: function(){
//  return false;
//  },
//  update: function(){
//  return false;
//  },
//  remove: function(){
//  return false;
//  },
//  download: function(){
//  return false;
//  }
//  });

// Images.allow({
//  insert: function(){
//  return true;
//  },
//  update: function(){
//  return true;
//  },
//  remove: function(){
//  return true;
//  },
//  download: function(){
//  return true;
//  }
// });


Posts.helpers({
  rating: function() {
    return this.likes - this.downvotes;
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
