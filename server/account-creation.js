Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object
   user.profile.firstName = options.firstName;
   user.profile.lastName = options.lastName;
   user.profile.name = options.firstName+' '+options.lastName;
   if (user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')  ) {
        var result = Meteor.http.get('https://graph.facebook.com/' + user.services.facebook.id + '?access_token=' + user.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, age_range, location, link, friends');

   user.profile.firstName = result.data.first_name;
   user.profile.lastName = result.data.last_name;
   user.profile.name = result.data.first_name+' '+result.data.last_name;
   user.profile.email = result.data.email;
   user.profile.location = result.data.location;
   user.profile.gender = result.data.gender;
   user.profile.age = result.data.age_range;
   user.profile.birthday = result.data.birthday;
   user.profile.link = result.data.link;
   user.profile.friends = result.data.friends;
   user.profile.createdOn = new Date();
        console.log(result.data.first_name);
        console.log(result.data.last_name);
        console.log(result.data.birthday);
        console.log(result.data.email);
        console.log(result.data.gender);
        console.log(result.data.location);
        console.log(result.data.link);
        console.log(result.data.friends);
        console.log(result.data.age_range);
}
   user.profile.profilePic = options.profilePic || "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
   // Returns the user object
   console.log(user);
   return user;
});