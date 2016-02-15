Template.login.events({
  'click #login-button': function(e, t) {
     e.preventDefault();
     // Getting values from fields on page
     var email = $('#login-email').val(),
         password = $('#login-password').val();
     // Calling the loginWithPassword function on the user
     Meteor.loginWithPassword(email, password, function(error) {
         if (error) {
          // Returning a sweetAlert
          return Materialize.toast('Unfortunately, something happened: '+(error)+'. Please try again', 4000);
         } else {
           FlowRouter.go('/');
         }
     });
     return false;
   },
   'click #login-facebook': function(event) {
    Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error(err);
            }
        });
   }
 });

