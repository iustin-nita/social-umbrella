//accounts config
  Accounts.ui.config({
    requestPermissions: {
      facebook: ['public_profile', 'email']
    },
    requestOfflineToken: {
      // google: true
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL' //  One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
  });

  Avatar.setOptions({
  	defaultImageUrl: "/images/user1.png",
  	gravatarDefault: "/images/user1.png"
});