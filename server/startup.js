Meteor.startup(function() {
  if (Posts.find().count() === 0) {
    for (var i=1; i<25; i++) {
      var randomUplikes = Math.floor(Math.random() * (20 - (0) + 1)) + (0);
      Posts.insert(
      {
        source: "https://www.google.ro/#safe=off&q=year+190+"+i,
        description: "Search on google for year 190"+i,
        addedBy: "Smart guy",
        addedOn: Date.now(),
        likes: randomUplikes,
        image: "http://placehold.it/150x150",
        likers: [],
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
