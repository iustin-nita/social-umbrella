// this is image_share.js
Posts = new Mongo.Collection("posts");


// set up security on posts collection
Posts.allow({
  insert: function (userId, doc) {
    if (Meteor.user()) { //they are logged in
      console.log(doc);
      if(userId != doc.addedBy) {
        return false;
      }
       else { //the user is logged in, post has the correct id
        return true;
       }
    } else { // they are not logged in
      return false;
    }
  },
  // update: function (userId, doc, fields, modifier) {
  //   //...
  // },
  remove: function (userId, doc) {
    if (Meteor.user()) { //they are logged in
      console.log(doc);
      if(userId != doc.addedBy) {
        return false;
      }
       else { //the user is logged in, img has the correct id
        return true;
       }
    } else { // they are not logged in
      return false;
    }
  },
  fetch: ['owner'],
  // transform: function () {
  //   //...
  // }
});