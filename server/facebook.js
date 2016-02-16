Meteor.methods({
	getFacebookData: function () {
		var user = Meteor.user();
		if (user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')  ) {
        var result = Meteor.http.get('https://graph.facebook.com/v2.4/' + user.services.facebook.id + '?access_token=' + user.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location, link, friends');

   user.profile.firstName = result.data.first_name;
   user.profile.lastName = result.data.last_name;
   user.profile.name = result.data.first_name+' '+result.data.last_name;
   user.profile.email = result.data.email;
   user.profile.location = result.data.location;
   user.profile.gender = result.data.gender;
   user.profile.birthday = result.data.birthday;
   user.profile.link = result.data.link;
   user.profile.friends = result.data.friends;
        console.log(result.data.first_name);
        console.log(result.data.last_name);
        console.log(result.data.birthday);
        console.log(result.data.email);
        console.log(result.data.gender);
        console.log(result.data.location);
        console.log(result.data.link);
        console.log(result.data.friends);
}
	}
});