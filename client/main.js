
	//global helpers
	Template.registerHelper('formatDate', function(date) {
		return moment(new Date(date)).format('DD-MM-YYYY');
		// moment(new Date(string))
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


	