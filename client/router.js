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
  this.layout('layout');
  this.render('addPostPage');
  this.render('navbar', { to: 'navbar'});
});

Router.route('/post/:_id', function () {
  this.render('navbar', {
    to: "navbar"
  });
  this.render('post', {
    to: "main"
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
