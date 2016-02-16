
  //addPostForm template
  Template.addPostForm.events({
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
    'submit .js-add-post' : function(event) {
      var source, author, image, description;
      author = Meteor.userId();
      description = event.target[0].value;
        image = Session.get('imageURL');
        // console.log(event);
        if (Meteor.user()) {
          if (description) {
            Posts.insert({
              image: image,
              description: description,
              addedOn: new Date().now,
              addedBy: author,
              likes: 0,
              likers: [],
              commentsCount: 0
            });
          } else {
            sAlert.info("Please write something cool.", {effect:'genie'});
          }
        } else {
        sAlert.info("You should log in!", {effect:'genie'});
        }
      return false;
    },

  });
