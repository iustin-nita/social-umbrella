

Meteor.methods({
  getInfo: function () {

    HTTP.call( 'GET', 'https://www.facebook.com/iustin.nitza', {

    }, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        console.log( response );
        return response;
      }
    });
  },
});
