// Meteor.methods({ 'remoteGet': function(url, options) { return HTTP.get(url, options); } });
var randomQuoteURL = 'http://q.uote.me/api.php?p=json';
Meteor.methods({'getRandomQuote': function(url, options) {
	this.unblock();
	try {
		var result = HTTP.get(randomQuoteURL); 
		return  result;
	} catch(e) {
		return false;
	}
}
});