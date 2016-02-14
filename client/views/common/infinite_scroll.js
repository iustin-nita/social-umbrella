// infinite scroll
  Session.set("postLimit", 3);
  lastScrollTop = 0;
  $(window).scroll(function(event) {

    // test if we are near the bottom of the window
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       // where we are
       var scrollTop = $(this).scrollTop();
      //test if we are going down
      if (scrollTop > lastScrollTop) {
        // console.log(Session.get('postLimit'));
        Session.set('postLimit', Session.get('postLimit')+3);
       // PostsIndex.config.defaultSearchOptions.limit = PostsIndex.config.defaultSearchOptions.limit + 5;
       $('.card-image img').addClass(animationName).one(animationend, function() {
        $(this).removeClass(animationName);
        console.log('adnimated');
       });

     }
     lastScrollTop = scrollTop;
   }

 });
