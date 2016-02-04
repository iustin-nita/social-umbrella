Meteor.methods({ 'remoteGet': function(url, options) { return HTTP.get(url, options); } });
