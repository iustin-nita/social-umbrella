Meteor.startup(function() {
    if (Images.find().count() === 0) {
      for (var i=1; i<23; i++) {
        Images.insert(
        {
          img_src: "img_"+i+".jpg",
          img_alt: "photo_"+i,
          addedBy: 'just for test'
        }
        );
      }
    console.log('Startup Images inserted: ' + Images.find().count());
    }

  });