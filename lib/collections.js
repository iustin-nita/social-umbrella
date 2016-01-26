// this is image_share.js
Images = new Mongo.Collection("images");


// set up security on images collection
Images.allow({
  insert: function (userId, doc) {
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
  // update: function (userId, doc, fields, modifier) {
  //   //...
  // },
  // remove: function (userId, doc) {
  //   //...
  // },
  // // fetch: ['owner'],
  // transform: function () {
  //   //...
  // }
});