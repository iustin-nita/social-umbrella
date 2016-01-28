Meteor.startup(function() {
  if (Posts.find().count() === 0) {
    for (var i=1; i<15; i++) {
      var randomUpvotes = Math.floor(Math.random() * (20 - (-3) + 1)) + (-3);
      var randomDownvotes = Math.floor(Math.random() * (20 - (-3) + 1)) + (-3);
      Posts.insert(
      {
        source: "https://www.google.ro/#safe=off&q=year+190+"+i,
        description: "Search on google for year 190"+i,
        addedBy: "Smart guy",
        addedOn: Date.now(),
        upvotes: randomUpvotes,
        downvotes: randomDownvotes,
        upvoters: [],
        downvoters: [],
        comments: [
          {
            commentAuthor: "some guy",
            commentBody: "Great stuff you posted",
            commentDate: "01.10.2015"
          },
          {
            commentAuthor: "some other guy",
            commentBody: "Don't worry, be happy!",
            commentDate: "07.10.2015"
          },

        ],

      }
      );
    }
    console.log('Startup Posts inserted: ' + Posts.find().count());
  }

});
