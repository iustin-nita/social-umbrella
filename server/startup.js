Meteor.startup(function() {
  if (Posts.find().count() === 0) {
    for (var i=1; i<23; i++) {
      var randomRating = Math.floor(Math.random() * (20 - (-3) + 1)) + (-3);
      Posts.insert(
      {
        source: "img_"+i+".jpg",
        description: "Some short post description"+i,
        addedBy: 'Tiger Woods',
        rating: randomRating,
        comments: [
          {
            commentAuthor: "some guy",
            commentBody: "Great stuff you posted",
            commentDate: "01.10.2015"
          },
          {
            commentAuthor: "some other guy",
            commentBody: "Don't worry, be happy!",
            commentDate: "01.10.2015"
          },

        ],

      }
      );
    }
    console.log('Startup Posts inserted: ' + Posts.find().count());
  }

});
