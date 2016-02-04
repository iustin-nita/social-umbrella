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
