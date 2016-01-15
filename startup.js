if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Images.find().count() == 0) {
      Images.insert(
        {
          img_src: "candidati-pas-1.jpg",
          img_alt: "some photo"
        }
      );
      Images.insert(
        {
          img_src: "candidati-pas-2.jpg",
          img_alt: "some photo"
        }
      );
      Images.insert(
        {
          img_src: "candidati-pas-3.jpg",
          img_alt: "some photo"
        }
      );
    }
  });
}