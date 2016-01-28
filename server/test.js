

Meteor.methods({
  getInfo: function (url) {

    HTTP.call( 'GET', url, {

    }, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        console.log( response );
        /*
         This will return the HTTP response object that looks something like this:
         {
           content: "String of content...",
           data: [{
             "body": "The body of the post with the ID 5."
             "id": 5,
             "title": "The title of the post with the ID 5.",
             "userId": 1
           }],
           headers: {  Object containing HTTP response headers }
           statusCode: 200
         }
        */
      }
    });
  },
});
