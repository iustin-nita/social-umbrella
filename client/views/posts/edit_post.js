// post template
Template.editPost.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var postId = FlowRouter.getParam('postId');
    self.subscribe('singlePost', postId);  
  });
});

Template.editPost.helpers({
  post: function() {
    var postId = FlowRouter.getParam('_id');
    var post = Posts.findOne({_id: postId}) || {};
    return post;
  },
  comments: function() {
    return Comments.find({postId: this._id});
  },

  isPostAuthor: function() {
    var userId = Meteor.userId();
    var post = this;
    console.log(post);
    if (post.userId === userId) {
      return true;
    }

  },
  active: function(){
    var userId = Meteor.userId();
    if (_.include(this.likers, userId)) {
      return 'active';
    }
    else {
      return 'inactive disabled';
    }
  }
});

Template.editPost.events({
  'click .delete-post-image': function(event, template) {
    event.preventDefault();
    var postId = this._id;
    var post = {id: postId};
    Meteor.call('deleteImage', post, function (error, result) {
      if(error) {
        console.log(error);
      } else {
        console.log('nice');
      }
    });
    
    console.log(post);

  },

  'click .js-del-post': function (event) {
    var post_id = this._id;
    $('#'+post_id).hide('slow', function() {
      Posts.remove({"_id": post_id});
      FlowRouter.go('/posts');
    });

  },

  'change .post-image': function(event, template) {
   FS.Utility.eachFile(event, function(file) {
     Images.insert(file, function (err, fileObj) {
       if (err){
              // handle error
            } else {
              // handle success depending what you need to do

              var imagesURL = "/cfs/files/images/" + fileObj._id;
              Session.set('imageURL', imagesURL);
            }
          });
   });
 },
 'submit .js-edit-post' : function(event, template) {
  var source, userId, image, description, post;
  userId = Meteor.userId();
  var currentPostId = this._id;
  console.log(this);
  console.log(currentPostId);
  description = event.target[0].value;
  image = Session.get('imageURL');
  if (image !== undefined) {
    console.log(image);
  } else {
    console.log('image is undefined');
  }
  if (description || image) {
    post = {
      id: currentPostId,
      image: image,
      description: description,
      editedOn: new Date(),
    };
    console.log(post);
    Meteor.call('editPost', post, function (error, result) {
      if(error) {
        console.log(error);
      } else {
        console.log('all good');
      }
    });
    event.target[0].value = '';
  } else {
    sAlert.info("Please write something cool.", {effect:'genie'});
  }

  return false;
},

});
