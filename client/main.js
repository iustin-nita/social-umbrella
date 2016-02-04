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

Router.route('/add', function () {
  this.render('navbar', {
    to: "navbar"
  });
  this.render('addPostPage', {
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

// Router.route('/contact', function () {
//   this.render('navbar', {
//     to: "navbar"
//   });
//   this.render('contact', {
//     to: "main"
//   });
// });

  // infinite scroll
  Session.set("postLimit", 3);
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

  //global helpers
  Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY');
  });

  Template.registerHelper('subtraction', function(a,b) {
    var subtraction = a - b;
    return subtraction;
  });

  //body template
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


  //posts template
  Template.posts.helpers({
    postsIndex: () => PostsIndex, // instanceof EasySearch.Index
    posts: function() {
    if (Session.get("userFilter")) { //they set a filter!
      return Posts.find({addedBy: Session.get('userFilter')}, {sort:{upvotes:-1}});
    } else {
      return Posts.find({}, {sort:{upvotes: -1}, limit: Session.get("postLimit")});
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
  },
  active: function(){
    var userId = Meteor.userId();
    if (!_.include(this.upvoters, userId) && !_.include(this.downvoters, userId)) {
      return 'btn-primary active';
    }
    else {
      return 'disabled';
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
    },

    'click .active.upvote': function(event) {
      var post_id = this._id;
      var userId = Meteor.userId();

      Posts.update( {_id: post_id},
        {$inc: {upvotes: +1}, $push: {upvoters: userId}}
        );
      $(this).removeClass('active');

    },
    'click .active.downvote': function(event) {
      var post_id = this._id;
      var userId = Meteor.userId();
      console.log(post_id);

      Posts.update({_id: post_id},
        {$inc: {downvotes: +1}, $push: {downvoters: userId}}
        );
      $(this).removeClass('active');
    },
  });

// post template
  Template.post.helpers({
    getUser: function(user_id) {
      var user = Meteor.users.findOne({_id: user_id});
      if (user) {
        return user.username;
      } else {
        return 'anonymous';
      }
    },

    active: function(){
      var userId = Meteor.userId();
      if (!_.include(this.upvoters, userId) && !_.include(this.downvoters, userId)) {
        return 'btn-primary active';
      }
      else {
        return 'disabled';
      }
    }
  });

  Template.post.events({

    'click .js-del-post': function (event) {
      var post_id = this._id;
      $('#'+post_id).hide('slow', function() {
        Posts.remove({"_id": post_id});
        Router.go('/posts');
      });

    },

    'click .active.upvote': function(event) {
      var post_id = this._id;
      var userId = Meteor.userId();

      Posts.update( {_id: post_id},
        {$inc: {upvotes: +1}, $push: {upvoters: userId}}
        );

    },
    'click .active.downvote': function(event) {
      var post_id = this._id;
      var userId = Meteor.userId();
      console.log(post_id);

      Posts.update({_id: post_id},
        {$inc: {downvotes: +1}, $push: {downvoters: userId}}
        );
    },

    'submit #add_comment_form': function() {
      var commentAuthor = Meteor.user().username;
      var commentBody = $('#commentBody').val();
      var post_id = this._id;
      var comment = {
        commentAuthor: commentAuthor,
        commentBody: commentBody,
        commentDate: new Date()
      };
      Posts.update(
        {_id: post_id },
        { $push: { comments: comment }}
      );

      return false;
    }

  });


  //addPostPage template
  Template.addPostPage.events({
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

        if (res.image) {
          image = res.image;
        } else {
          image = "http://placehold.it/150x150";
        }
        console.log('before'+image);
        console.log('before'+description);
        if (Meteor.user()) {
          Posts.insert({
            source : source,
            image: image,
            description: description,
            addedOn: new Date().now,
            addedBy: author,
            upvotes: 0,
            downvotes: 0
          });
        }
      });
      console.log('after'+image);
      console.log('after'+description);


      Router.go('posts');

      return false;
    }
  });
