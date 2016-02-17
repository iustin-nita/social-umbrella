
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
      var source, userId, image, description, post;
      userId = Meteor.userId();
      description = event.target[0].value;
        image = Session.get('imageURL');
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
            Meteor.call('insertPost', post, function (error, result) {
                if (error){
                  console.log(error.reason);
                  sAlert.error("Oops! Something went wrong!"+error.reason+"", {effect:'genie'});
                } else {
                  event.target[0].value='';
                }
            });
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
