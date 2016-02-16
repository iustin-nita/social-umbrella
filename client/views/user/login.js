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
          return error;
         } else {
           FlowRouter.go('/');
         }
     });
     return false;
   },
   'click #login-facebook': function(event) {
    Meteor.loginWithFacebook({ requestPermissions: ['email', 'public_profile', 'user_friends', 'user_likes']}, function(err){
        if (err) {
            throw new Meteor.Error("Facebook login failed");
        }
        
        // console.log(Meteor.user().services.facebook.name);
        // console.log(Meteor.user().services.facebook.id);
        // console.log(Meteor.user().services.facebook.email);
        // console.log(Meteor.user().services.facebook.gender);   
        FlowRouter.go('/');         
    });
   }
 });

