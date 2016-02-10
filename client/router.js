//config
// Router.configure({
//   layoutTemplate: 'app',
//   loadingTemplate: 'loading'
// });

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("app", {content: "notFound",header: 'navbar'});
  }
};

// Router.route('/', function () {
//   this.render('hero', {
//     to: "main"
//   });
// });

FlowRouter.route('/posts', {
  name: 'posts',
  action: function() {
    BlazeLayout.render("app", {content: "posts", header: 'navbar'});
  }
});

// Router.route('/posts', function () {
//   this.render('navbar', {
//     to: "navbar"
//   });
//   this.render('posts', {
//     to: "main"
//   });
// });

// Router.route('/add', function () {
//   this.layout('layout');
//   this.render('addPostPage');
//   this.render('navbar', { to: 'navbar'});
// });

FlowRouter.route('/add', {
  name: 'add',
  action: function() {
    BlazeLayout.render('app', {content: 'addPostPage'});
  }
});

// Router.route('/post/:_id', function () {
//   this.render('navbar', {
//     to: "navbar"
//   });
//   this.render('post', {
//     to: "main"
//   });
// });

// FlowRouter.route('/post/:id', {
//   name: 'postPage',
//   subscriptions: function(params, queryParams) {
//         this.register('post', Meteor.subscribe('posts', params.postId));
//     },
//   action: function(params, queryParams) {
//     BlazeLayout.render('app', {content: 'post', header:'navbar'});
//     console.log("Params:", params);
//         console.log("Query Params:", queryParams);
//   }
// });

FlowRouter.route('/post/:_id', {
    name: 'post',
    action: function (params) {
      console.log( params );
      BlazeLayout.render('app', {content: 'post'});
    }
});

// Router.route('/contact', function () {
//   this.render('navbar', {
//     to: "navbar"
//   });
//   this.render('contact', {
//     to: "main"
//   });
// });

FlowRouter.route('/contact', {
  name: 'contact',
  action: function() {
    BlazeLayout.render('app', {content: 'contact'});
  }
});
