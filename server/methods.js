// Meteor.methods({ 'remoteGet': function(url, options) { return HTTP.get(url, options); } });
var randomQuoteURL = 'http://q.uote.me/api.php?p=json';
Meteor.methods({'getRandomQuote': function(url, options) {
	return HTTP.get(randomQuoteURL, function (error, result) {
	      if(error) {
	          console.log('http get FAILED!');
	      } else {
	          console.log('http get SUCCES');
	          if (result.statusCode === 200) {
	              var post = data.shift();
	              console.log(post);
	              return post;
	          }
	      }
	});
}})