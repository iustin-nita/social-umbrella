//config accounts template


// protect route if not logged in 
// FlowRouter.route('/add', {
//   triggersEnter: [AccountsTemplates.ensureSignedIn],
//   action: function() {
//     BlazeLayout.render('app', {content: 'signIn'});
//   }
// });

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("app", {content: "notFound",header: 'navbar'});
  }
};

FlowRouter.route('/', {
  name: 'homepage',
  action: function() {
    BlazeLayout.render("app", {content: "posts", header: 'navbar'});
  }
});


FlowRouter.route('/posts', {
  name: 'posts',
  action: function() {
    BlazeLayout.render("app", {content: "posts", header: 'navbar'});
  }
});


// FlowRouter.route('/add', {
//   name: 'add',
//   action: function() {
//     BlazeLayout.render('app', {content: 'addPostPage', header:'navbar'});
//   }
// });

FlowRouter.route('/loader', {
  name: 'loader',
  action: function() {
    BlazeLayout.render('app', {content: 'loading', header:'navbar'});
  }
});


FlowRouter.route('/post/:_id', {
    name: 'post',
    action: function (params) {
      BlazeLayout.render('app', {content: 'post', header:'navbar'});
    }
});


FlowRouter.route('/user/:_id', {
    name: 'userProfile',
    action: function (params) {
      BlazeLayout.render('app', {content: 'userProfile', header:'navbar'});
    }
});


FlowRouter.route('/post/:_id/edit', {
    name: 'editPost',
    action: function (params) {
      BlazeLayout.render('app', {content: 'editPost', header:'navbar'});
    }
});


FlowRouter.route('/contact', {
  name: 'contact',
  action: function() {
    BlazeLayout.render('app', {content: 'contact',header:'navbar'});
  }
});

FlowRouter.route('/login', {
   name: 'login',
   action: function() {
   BlazeLayout.render('app', {
      content: 'login',
      header: 'navbar'
   });
  }
});

FlowRouter.route('/register', {
   name: 'register',
   action: function() {
   BlazeLayout.render('app', {
      content: 'register',
      header: 'navbar'
   });
  }
});

// AccountsTemplates.configureRoute('changePwd');
// AccountsTemplates.configureRoute('forgotPwd');
// AccountsTemplates.configureRoute('resetPwd');
// AccountsTemplates.configureRoute('signIn');
// AccountsTemplates.configureRoute('signUp');
// AccountsTemplates.configureRoute('verifyEmail');


//example custom
// AccountsTemplates.configureRoute('login', {
//   layoutType: 'blaze',
//   name: 'login',
//   path: '/login',
//   template: 'onboarding',
//   layoutTemplate: 'app',
//   layoutRegions: {
//     nav: 'navbar',
//   },
//   contentRegion: 'content'
// });

