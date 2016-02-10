
  //addPostPage template
  Template.addPostPage.events({
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
      source = event.target.source.value;

      extractMeta(source, function (err, res) {
        console.log(res);
        if (res.description) {
          description = res.description;
        } else if (res.title) {
          description = res.title;
        } else {
          description = "No description";
        }

        // if (res.image) {
        //   image = res.image;
        // } else {
        //   image = "http://placehold.it/150x150";
        // }
        image = Session.get('imageURL');
        console.log('before'+image);
        console.log('before'+description);
        if (Meteor.user()) {
          Posts.insert({
            source : source,
            image: image,
            description: description,
            addedOn: new Date().now,
            addedBy: author,
            likes: 0,
            downvotes: 0
          });
        }
      });
      console.log('after'+image);
      console.log('after'+description);


      FlowRouter.go('posts');

      return false;
    },



  });