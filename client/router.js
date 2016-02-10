
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


FlowRouter.route('/add', {
  name: 'add',
  action: function() {
    BlazeLayout.render('app', {content: 'addPostPage', header:'navbar'});
  }
});


FlowRouter.route('/post/:_id', {
    name: 'post',
    action: function (params) {
      console.log( params );
      BlazeLayout.render('app', {content: 'post', header:'navbar'});
    }
});


FlowRouter.route('/contact', {
  name: 'contact',
  action: function() {
    BlazeLayout.render('app', {content: 'contact',header:'navbar'});
  }
});
