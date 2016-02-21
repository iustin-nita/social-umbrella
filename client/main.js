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


	Template.navbar.events({
		'click .ui.dropdown.user-menu': function () {
			$('.ui.dropdown.user-menu').dropdown('show');
		},
		'click .ui.dropdown.notifications-menu': function() {
		$('.ui.dropdown.notifications-menu').dropdown({
			selector: {
				item         : '.event',
			}
		});
	}
	});