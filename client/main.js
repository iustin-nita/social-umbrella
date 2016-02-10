
	//global helpers
	Template.registerHelper('formatDate', function(date) {
		return moment(date).format('DD-MM-YYYY');
	});

	Template.registerHelper('subtraction', function(a,b) {
		var subtraction = a - b;
		return subtraction;
	});

	//body template
	Template.body.helpers({
		username: function() {
			if (Meteor.user()) {
				return Meteor.user().username;
			} else {
				return 'anonymous';
			}
		}
	});

	Template.body.events({
		'click .js-show-post-form':function(event){
			$('.js-show-post-form').leanModal();
			console.log(event);
		},

	});


	