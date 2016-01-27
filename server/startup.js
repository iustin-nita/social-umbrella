Meteor.startup(function() {
  if (Posts.find().count() === 0) {
    for (var i=1; i<23; i++) {
      Posts.insert(
      {
        source: "img_"+i+".jpg",
        description: "Some short post description"+i,
        addedBy: 'Tiger Woods',
        rating: 0
      }
      );
    }
    console.log('Startup Posts inserted: ' + Posts.find().count());
  }

});
