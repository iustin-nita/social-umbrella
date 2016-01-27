//routing

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('hero', {
    to: "main"
  });
});

Router.route('/posts', function () {
  this.render('navbar', {
    to: "navbar"
  });
  this.render('posts', {
    to: "main"
  });
});

Router.route('/post/:_id', function () {
  this.render('navbar', {
    to: "navbar"
  });
  this.render('post', {
    to: "main",
    data: function() {
      return Posts.findOne({_id: this.params._id});
    }
  });
});

Router.route('/contact', function () {
  this.render('navbar', {
    to: "navbar"
  });
  this.render('contact', {
    to: "main"
  });
});

  // infinite scroll
  Session.set("postLimit", 6);
  lastScrollTop = 0;
  $(window).scroll(function(event) {

    // test if we are near the bottom of the window
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {

       // where we are
       var scrollTop = $(this).scrollTop();
      //test if we are going down
      if (scrollTop > lastScrollTop) {
       Session.set('postLimit', Session.get('postLimit') + 3);
     }
     lastScrollTop = scrollTop;
   }
 });



  //accounts config
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
    'click .js-show-post-form':function(event){
      $('.js-show-post-form').leanModal();
      console.log(event);
    }, 
  });

  Template.posts.helpers({
    posts: function() {
    if (Session.get("userFilter")) { //they set a filter!
      return Posts.find({addedBy: Session.get('userFilter')}, {sort:{addedOn: -1, rating:-1}});
    } else {
      return Posts.find({}, {sort:{addedOn: -1, rating:-1}, limit: Session.get("postLimit")});
    }
  },
  filtering_posts :function() {
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

  Template.posts.events({
    'click .js-del-post': function (event) {
      var post_id = this._id;
      console.log(post_id);
      $('#'+post_id).hide('slow', function() {
        posts.remove({"_id": post_id});
      });
    },
    'click .js-rate-post' : function (event) {
      var rating = $(event.currentTarget).data('userrating');
      var post_id = this.id;
      console.log(post_id);

      posts.update({_id: post_id},
        {$set: {rating: rating}}
        );
    },

    'click .js-set-post-filter' : function(event) {
      Session.set("userFilter", this.addedBy);
    },
    'click .js-unset-post-filter' : function(event) {
      Session.set("userFilter", undefined);
    }

  });

  Template.post_add_form.events({
    'submit .js-add-post' : function(event) {
      var source, img_alt;
      source = event.target.source.value;
      img_alt = event.target.img_alt.value;
      if (Meteor.user()) {
        Posts.insert({
          source : source,
          img_alt: img_alt,
          addedOn: new Date(),
          addedBy: Meteor.user()._id
        });
      }

      return false;
    }
  });

