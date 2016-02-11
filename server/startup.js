Meteor.startup(function() {
  if (Posts.find().count() === 0) {
    for (var i=1; i<100; i++) {
      var randomLikes = Math.floor(Math.random() * (20 - (0) + 1)) + (0);
      var randomQuoteText = '';
      var randomImageURL = "http://lorempixel.com/1920/1080";
      var randomQuote =  Meteor.call('getRandomQuote', function(err, response) {
        randomQuoteText = response.content.data[0].text;
        console.log('final'+ randomQuoteText);
        return randomQuoteText;
      });
      var randomImage =  "http://lorempixel.com/1920/1080/?v="+i;
      Posts.insert(
      {
        source: "https://en.wikipedia.org/wiki/Special:Random",
        description:  randomQuoteText,
        addedBy: "Iustin Nita",
        addedOn: Date.now(),
        likes: randomLikes,
        image: randomImage,
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

