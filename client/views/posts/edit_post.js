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
    'click .delete-post-image': function() {

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
    'submit .js-edit-post' : function(event) {
      var source, userId, image, description, post;
      userId = Meteor.userId();
      description = event.target[0].value;
        image = Session.get('imageURL');
        console.log(image);
        // console.log(event);
        if (Meteor.user()) {
          if (description || image) {
            post = {
              image: image,
              description: description,
              likes: 0,
              likers: [],
              commentsCount: 0,
              };
              console.log(post);
            // Meteor.call('insertPost', post, function (error, result) {
            //     if (error){
            //       console.log(error.reason);
            //       sAlert.error("Oops! Something went wrong!"+error.reason+"", {effect:'genie'});
            //     } else {
            //       event.target[0].value='';
            //     }
            // });
            event.target[0].value = '';
          } else {
            sAlert.info("Please write something cool.", {effect:'genie'});
          }
        } else {
        sAlert.info('You should <a href="/login" class="underline">log in!</a>', {effect:'genie', html: true});
        }
      return false;
    },

  });
