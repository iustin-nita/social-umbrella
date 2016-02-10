// this is image_share.js
Posts = new Mongo.Collection("posts");
var imageStore = new FS.Store.GridFS("images", {
  // mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB
  mongoOptions: {},  // optional, see note below
  // transformWrite: myTransformWriteFunction, //optional
  // transformRead: myTransformReadFunction, //optional
  maxTries: 1, // optional, default 5
  chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                        // Default: 2MB. Reasonable range: 512KB - 4MB
});

Images = new FS.Collection("images", {
  stores: [imageStore]
});
Images.deny({
	insert: function(){
		return false;
	},
	update: function(){
		return false;
	},
	remove: function(){
		return false;
	},
	download: function(){
		return false;
	}
});

Images.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	},
	download: function(){
		return true;
	}
});


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
