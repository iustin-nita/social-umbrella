Session.set("imageLimit", 6);

  lastScrollTop = 0;
  $(window).scroll(function(event) {
    
    // test if we are near the bottom of the window
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {

       // where we are
      var scrollTop = $(this).scrollTop();
      //test if we are going down
      if (scrollTop > lastScrollTop) {
       Session.set('imageLimit', Session.get('imageLimit') + 3);
     }
    lastScrollTop = scrollTop;
    }
  });

  Accounts.ui.config({
    requestPermissions: {
      // facebook: ['user_likes']
    },
    requestOfflineToken: {
      // google: true
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL' //  One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
  });

  Template.body.helpers({
    username: function() {
      if (Meteor.user()) {
        return Meteor.user().username;
      } else {
        return 'anonymous';
      }
    }
  });

  Template.body.events({
    'click .js-show-image-form':function(event){
      $('#open_image_form').leanModal();
    }, 
  });

  Template.images.helpers({
    images: function() {
    if (Session.get("userFilter")) { //they set a filter!
      return Images.find({addedBy: Session.get('userFilter')}, {sort:{addedOn: -1, rating:-1}});
    } else {
      return Images.find({}, {sort:{addedOn: -1, rating:-1}, limit: Session.get("imageLimit")});
    }
  },
  filtering_images :function() {
    if (Session.get("userFilter")) { //they set a filter!
      return true;
    } else {
      return false;
    }
  },
  currentUserFilter: function() {
    var currentUserId = Session.get("userFilter");

    return Meteor.users.findOne({_id: currentUserId}).username;
  },
  getUser: function(user_id) {
    var user = Meteor.users.findOne({_id: user_id});
    if (user) {
      return user.username;
    } else {
      return 'anonymous';
    }
  }
});

  Template.images.events({
    'click .js-del-image': function (event) {
      var image_id = this._id;
      console.log(image_id);
      $('#'+image_id).hide('slow', function() {
        Images.remove({"_id": image_id});
      });
    },
    'click .js-rate-image' : function (event) {
      var rating = $(event.currentTarget).data('userrating');
      var image_id = this.id;
      console.log(image_id);

      Images.update({_id: image_id},
        {$set: {rating: rating}}
        );
    },

    'click .js-set-image-filter' : function(event) {
      Session.set("userFilter", this.addedBy);
    },
    'click .js-unset-image-filter' : function(event) {
      Session.set("userFilter", undefined);
    }

  });

  Template.image_add_form.events({
    'submit .js-add-image' : function(event) {
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      if (Meteor.user()) {
        Images.insert({
          img_src : img_src,
          img_alt: img_alt,
          addedOn: new Date(),
          addedBy: Meteor.user()._id
        });
      }

      return false;
    }
  });

