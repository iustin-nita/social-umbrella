Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object
   user.profile.firstName = options.firstName;
   user.profile.lastName = options.lastName;
   user.profile.name = options.firstName+' '+options.lastName;
   user.profile.profilePic = options.profilePic || "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
   // Returns the user object
   return user;
});