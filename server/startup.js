Meteor.startup(function() {
  // Fixture data
  if (Posts.find().count() === 0) {
    var now = new Date().getTime();

  // create four users
  var teodorId = Meteor.users.insert({
    profile: { name: 'Teodor Nita', firstName: 'Teodor', lastName: 'Nita', profilePic: 'images/user5.png', gender: 'm'  }
  });
  var teodor = Meteor.users.findOne(teodorId);

  var sandaId = Meteor.users.insert({
    profile: { name: 'Sanda Luca', firstName: 'Sanda', lastName: 'Luca', profilePic: '/images/user3.png', gender: 'f' }
  });
  var sanda = Meteor.users.findOne(sandaId);

  var sinsuId = Meteor.users.insert({
    profile: { name: 'Sinsu Sins', firstName: 'Sinsu', lastName: 'Sins', profilePic: 'images/user4.png', gender: 'm'  }
  });
  var sinsu = Meteor.users.findOne(sinsuId);

  var cookieId = Meteor.users.insert({
    profile: { name: 'Cookie Black', firstName: 'Cookie', lastName: 'Black', profilePic: '/images/user7.png', gender: 'f' }
  });
  var cookie = Meteor.users.findOne(cookieId);
  

  var catId = Posts.insert({
    description: 'Super cool',
    userId: sanda._id,
    image: 'https://images.unsplash.com/photo-1455541029258-597a69778eed?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=35c801a9a82295e64a47b9db556f2d68',
    addedOn: new Date(now - 7 * 3600 * 1000)
  });

  Comments.insert({
    postId: catId,
    userId: sinsu._id,
    addedOn: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project sanda, can I get involved?'
  });
  Comments.insert({
    postId: catId,
    userId: sanda._id,
    addedOn: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Sinsu!'
  });

  Posts.insert({
    description: 'Meteor',
    userId: sanda._id,
    addedBy: sanda.profile.name,
    image: 'https://images.unsplash.com/photo-1455539084491-2d02703d31ce?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=d80249b7380b0c74f51c088370edc4c2',
    addedOn: new Date(now - 10 * 3600 * 1000)
  });
  Posts.insert({
    description: 'The Meteor Book',
    userId: cookie._id,
    addedBy: cookie.profile.name,
    image: 'https://images.unsplash.com/photo-1455539784245-e92a1368b18d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=ca68217f70201315969e16e600d7965b',
    addedOn: new Date(now - 12 * 3600 * 1000)
  });
  Posts.insert({
    description: 'The Spaghetti Book',
    userId: teodor._id,
    addedBy: teodor.profile.name,
    image: 'https://images.unsplash.com/photo-1455529141151-d17aac90e709?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=8f1f9a4a04eb5c8e77e6bc894192728c',
    addedOn: new Date(now - 12 * 3600 * 1000)
  });
  Posts.insert({
    description: 'The Pizza Book',
    userId: sinsu._id,
    addedBy: sinsu.profile.name,
    image: 'https://images.unsplash.com/photo-1455526050980-d3e7b9b789a4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=02892423ebe159c82e32121328cbe22b',
    addedOn: new Date(now - 12 * 3600 * 1000)
  });
  Posts.insert({
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis amet, labore, praesentium saepe hic aperiam dolores perspiciatis. Magnam modi beatae, dolore minima eveniet, unde, iure eos ea explicabo placeat perferendis.</div>',
    userId: sinsu._id,
    addedBy: sinsu.profile.name,
    image: 'https://images.unsplash.com/photo-1455525928928-837c99714248?crop=entropy&fit=crop&fm=jpg&h=875&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1725',
    addedOn: new Date(now - 12 * 3600 * 1000)
  });
}
});
// Meteor.startup(function() {
//   if (Posts.find().count() === 0) {

//     var dummy = [
//     {
//       "favoriteFruit": "apple",
//       "greeting": "Hello, Mercer! You have 9 unread messages.",
//       "friends": [
//       3,
//       {
//         "name": "Laura Castaneda",
//         "id": 1
//       }
//       ],
//       "range": [
//       0,
//       1,
//       2,
//       3,
//       4,
//       5,
//       6,
//       7,
//       8,
//       9
//       ],
//       "tags": [
//       7,
//       "do"
//       ],
//       "longitude": "166.47992",
//       "latitude": "-44.372527",
//       "registered": "Thursday, March 12, 2015 8:43 AM",
//       "about": "Sint nostrud proident duis duis pariatur tempor aliquip minim et laborum qui exercitation. Ut ullamco laboris occaecat exercitation sint dolor nisi sunt duis aute aute excepteur deserunt. Dolore officia dolore adipisicing aliqua. Ullamco ex nostrud incididunt irure irure non adipisicing aliqua minim est veniam do elit aliquip. Aute occaecat enim sit mollit incididunt pariatur et id reprehenderit quis sint excepteur. Pariatur reprehenderit commodo incididunt commodo deserunt ex Lorem fugiat exercitation.",
//       "address": "375 Willoughby Avenue, Edinburg, Montana, 3313",
//       "phone": "+1 (935) 559-3986",
//       "email": "mercer.rodriquez@norali.biz",
//       "company": "NORALI",
//       "name": {
//         "last": "Rodriquez",
//         "first": "Mercer"
//       },
//       "eyeColor": "brown",
//       "age": 22,
//       "picture": "http://lorempixel.com/800/800/?v=9452",
//       "balance": "$3,804.24",
//       "isActive": false,
//       "guid": "3a4e6d1c-54ea-4181-bb90-9f3790ae675b",
//       "index": 0,
//       "_id": "56bc778fd626c80cddd04ecc"
//     },
//     {
//       "favoriteFruit": "banana",
//       "greeting": "Hello, Page! You have 7 unread messages.",
//       "friends": [
//       3,
//       {
//         "name": "Laura Castaneda",
//         "id": 1
//       }
//       ],
//       "range": [
//       0,
//       1,
//       2,
//       3,
//       4,
//       5,
//       6,
//       7,
//       8,
//       9
//       ],
//       "tags": [
//       7,
//       "do"
//       ],
//       "longitude": "1.155091",
//       "latitude": "7.640418",
//       "registered": "Monday, March 30, 2015 3:58 AM",
//       "about": "Ullamco magna culpa excepteur culpa adipisicing amet laborum enim culpa dolore ut deserunt. Esse sit elit ut aliqua voluptate non. Occaecat ex est adipisicing sit esse laborum Lorem. Ut tempor aliquip incididunt cupidatat ea nostrud reprehenderit irure reprehenderit dolore voluptate.",
//       "address": "450 Langham Street, Haena, Maine, 8655",
//       "phone": "+1 (995) 549-3278",
//       "email": "page.gonzales@gronk.info",
//       "company": "GRONK",
//       "name": {
//         "last": "Gonzales",
//         "first": "Page"
//       },
//       "eyeColor": "brown",
//       "age": 38,
//       "picture": "http://lorempixel.com/800/800/?v=742",
//       "balance": "$1,993.97",
//       "isActive": false,
//       "guid": "44c0de3f-d446-4877-afbc-86a0c8baecc6",
//       "index": 1,
//       "_id": "56bc778f204030607de6f0cf"
//     },
//     {
//       "favoriteFruit": "banana",
//       "greeting": "Hello, Alissa! You have 6 unread messages.",
//       "friends": [
//       3,
//       {
//         "name": "Laura Castaneda",
//         "id": 1
//       }
//       ],
//       "range": [
//       0,
//       1,
//       2,
//       3,
//       4,
//       5,
//       6,
//       7,
//       8,
//       9
//       ],
//       "tags": [
//       7,
//       "do"
//       ],
//       "longitude": "-125.171739",
//       "latitude": "35.75834",
//       "registered": "Wednesday, May 21, 2014 7:30 AM",
//       "about": "Sit adipisicing adipisicing nulla sint elit voluptate incididunt adipisicing fugiat. Tempor sit proident consectetur magna in minim. Eiusmod ut sunt non nulla magna aute. Consectetur aliquip ea sit deserunt cupidatat ex aliqua. Ipsum ullamco aliquip ea sit est irure anim.",
//       "address": "717 Stuyvesant Avenue, Joppa, Alaska, 6491",
//       "phone": "+1 (928) 453-3499",
//       "email": "alissa.meyer@nipaz.org",
//       "company": "NIPAZ",
//       "name": {
//         "last": "Meyer",
//         "first": "Alissa"
//       },
//       "eyeColor": "brown",
//       "age": 22,
//       "picture": "http://lorempixel.com/800/800/?v=8028",
//       "balance": "$3,986.67",
//       "isActive": true,
//       "guid": "73dbccc1-ffc6-40fc-a204-d4c33812e243",
//       "index": 2,
//       "_id": "56bc778f86e505f9bea805b5"
//     },
//     {
//       "favoriteFruit": "strawberry",
//       "greeting": "Hello, Charlotte! You have 5 unread messages.",
//       "friends": [
//       3,
//       {
//         "name": "Laura Castaneda",
//         "id": 1
//       }
//       ],
//       "range": [
//       0,
//       1,
//       2,
//       3,
//       4,
//       5,
//       6,
//       7,
//       8,
//       9
//       ],
//       "tags": [
//       7,
//       "do"
//       ],
//       "longitude": "-9.284652",
//       "latitude": "21.83432",
//       "registered": "Tuesday, October 14, 2014 3:13 AM",
//       "about": "Eiusmod laboris adipisicing id dolore sint dolor cillum ipsum pariatur. Culpa elit duis incididunt aliquip ad aliqua id. Consectetur ad veniam voluptate adipisicing consectetur enim. Eu excepteur ut ullamco mollit esse aliquip. Do officia deserunt ut tempor ex. Cupidatat amet id culpa exercitation incididunt quis qui consequat minim ad voluptate elit non.",
//       "address": "768 Emmons Avenue, Caroleen, Georgia, 2046",
//       "phone": "+1 (900) 563-3745",
//       "email": "charlotte.finch@isotrack.us",
//       "company": "ISOTRACK",
//       "name": {
//         "last": "Finch",
//         "first": "Charlotte"
//       },
//       "eyeColor": "brown",
//       "age": 32,
//       "picture": "http://lorempixel.com/800/800/?v=852",
//       "balance": "$2,110.88",
//       "isActive": true,
//       "guid": "9416ff07-badb-4bf7-8043-5f7212e659ef",
//       "index": 3,
//       "_id": "56bc778f1f77bcf60f685d20"
//     },
//     {
//       "favoriteFruit": "banana",
//       "greeting": "Hello, Augusta! You have 9 unread messages.",
//       "friends": [
//       3,
//       {
//         "name": "Laura Castaneda",
//         "id": 1
//       }
//       ],
//       "range": [
//       0,
//       1,
//       2,
//       3,
//       4,
//       5,
//       6,
//       7,
//       8,
//       9
//       ],
//       "tags": [
//       7,
//       "do"
//       ],
//       "longitude": "-30.353948",
//       "latitude": "76.455423",
//       "registered": "Monday, March 23, 2015 11:51 AM",
//       "about": "Consequat ex amet sint magna dolor incididunt aute. Adipisicing nostrud voluptate cillum et ut proident nulla aute. Quis proident commodo pariatur do qui id aliqua ipsum minim veniam. Pariatur in sint consectetur magna laborum.",
//       "address": "375 Gem Street, Lopezo, Maryland, 583",
//       "phone": "+1 (905) 488-2124",
//       "email": "augusta.dotson@telequiet.tv",
//       "company": "TELEQUIET",
//       "name": {
//         "last": "Dotson",
//         "first": "Augusta"
//       },
//       "eyeColor": "green",
//       "age": 34,
//       "picture": "http://lorempixel.com/800/800/?v=4960",
//       "balance": "$3,901.22",
//       "isActive": false,
//       "guid": "0d826e23-c2a6-4eee-9861-6ce368f53bdf",
//       "index": 4,
//       "_id": "56bc778f7237bfebce50bbbc"
//     },
//     {
//       "favoriteFruit": "apple",
//       "greeting": "Hello, Marietta! You have 6 unread messages.",
//       "friends": [
//       3,
//       {
//         "name": "Laura Castaneda",
//         "id": 1
//       }
//       ],
//       "range": [
//       0,
//       1,
//       2,
//       3,
//       4,
//       5,
//       6,
//       7,
//       8,
//       9
//       ],
//       "tags": [
//       7,
//       "do"
//       ],
//       "longitude": "-125.947809",
//       "latitude": "58.788926",
//       "registered": "Monday, February 3, 2014 8:19 AM",
//       "about": "Commodo dolore consectetur anim dolore. Dolore eu id incididunt ipsum laborum Lorem magna in culpa. Occaecat eiusmod cillum ullamco Lorem. Laborum reprehenderit culpa duis officia excepteur nostrud reprehenderit minim mollit ea nostrud. Voluptate aliquip duis mollit proident in excepteur tempor officia magna ea velit dolore dolor est.",
//       "address": "996 Henry Street, Madrid, Delaware, 6554",
//       "phone": "+1 (976) 444-2774",
//       "email": "marietta.horton@lyrichord.co.uk",
//       "company": "LYRICHORD",
//       "name": {
//         "last": "Horton",
//         "first": "Marietta"
//       },
//       "eyeColor": "green",
//       "age": 29,
//       "picture": "http://lorempixel.com/800/800/?v=9853",
//       "balance": "$1,669.83",
//       "isActive": true,
//       "guid": "cd3c5178-d7df-4cd5-94e9-6ced07cdc1f6",
//       "index": 5,
//       "_id": "56bc778faae25b51438cce3e"
//     },
//     {
//       "favoriteFruit": "strawberry",
//       "greeting": "Hello, Christi! You have 9 unread messages.",
//       "friends": [
//       3,
//       {
//         "name": "Laura Castaneda",
//         "id": 1
//       }
//       ],
//       "range": [
//       0,
//       1,
//       2,
//       3,
//       4,
//       5,
//       6,
//       7,
//       8,
//       9
//       ],
//       "tags": [
//       7,
//       "do"
//       ],
//       "longitude": "-31.907002",
//       "latitude": "57.514584",
//       "registered": "Sunday, September 27, 2015 8:34 AM",
//       "about": "Nostrud amet Lorem culpa dolor Lorem commodo nostrud. Occaecat cillum mollit ea Lorem consequat irure voluptate elit dolor aliqua occaecat sint ipsum. Veniam do ipsum duis duis aute nisi ullamco. Lorem enim laborum mollit nisi tempor eiusmod aliqua duis Lorem. Reprehenderit nulla ut Lorem adipisicing est Lorem eiusmod. Consectetur esse adipisicing adipisicing aliqua enim laborum velit in. Nisi Lorem dolor pariatur in irure eu laborum pariatur pariatur duis adipisicing.",
//       "address": "259 Richards Street, Foscoe, Kentucky, 1434",
//       "phone": "+1 (895) 590-3484",
//       "email": "christi.chan@stucco.name",
//       "company": "STUCCO",
//       "name": {
//         "last": "Chan",
//         "first": "Christi"
//       },
//       "eyeColor": "brown",
//       "age": 29,
//       "picture": "http://lorempixel.com/800/800/?v=4214",
//       "balance": "$2,167.84",
//       "isActive": true,
//       "guid": "908d746c-fb21-43f5-9f28-bd5d70faeae7",
//       "index": 6,
//       "_id": "56bc778f3cd4be0b05d1f0a8"
//     },
//     {
//       "favoriteFruit": "strawberry",
//       "greeting": "Hello, Cathy! You have 5 unread messages.",
//       "friends": [
//       3,
//       {
//         "name": "Laura Castaneda",
//         "id": 1
//       }
//       ],
//       "range": [
//       0,
//       1,
//       2,
//       3,
//       4,
//       5,
//       6,
//       7,
//       8,
//       9
//       ],
//       "tags": [
//       7,
//       "do"
//       ],
//       "longitude": "-52.671084",
//       "latitude": "3.33647",
//       "registered": "Tuesday, July 15, 2014 10:21 AM",
//       "about": "Incididunt est eu elit amet duis dolor commodo non. Nulla laborum nostrud qui minim dolor excepteur. Et in voluptate deserunt id. Adipisicing consequat occaecat mollit officia labore. Duis sit elit ad cupidatat aliquip ut exercitation.",
//       "address": "779 Macon Street, Escondida, Oklahoma, 4395",
//       "phone": "+1 (854) 416-3643",
//       "email": "cathy.yates@andershun.io",
//       "company": "ANDERSHUN",
//       "name": {
//         "last": "Yates",
//         "first": "Cathy"
//       },
//       "eyeColor": "green",
//       "age": 25,
//       "picture": "http://lorempixel.com/800/800/?v=3200",
//       "balance": "$3,879.32",
//       "isActive": false,
//       "guid": "ab5a293c-8ef4-4c0e-8ec6-93baf923248b",
//       "index": 7,
//       "_id": "56bc778fdc7f630a59b4c72e"
//     },
//     {
//       "favoriteFruit": "apple",
//       "greeting": "Hello, May! You have 8 unread messages.",
//       "friends": [
//       3,
//       {
//         "name": "Laura Castaneda",
//         "id": 1
//       }
//       ],
//       "range": [
//       0,
//       1,
//       2,
//       3,
//       4,
//       5,
//       6,
//       7,
//       8,
//       9
//       ],
//       "tags": [
//       7,
//       "do"
//       ],
//       "longitude": "-98.674039",
//       "latitude": "42.762351",
//       "registered": "Thursday, May 29, 2014 8:52 PM",
//       "about": "Incididunt adipisicing quis fugiat sit exercitation proident consectetur eu et. Esse non ullamco culpa anim elit esse. Dolore dolore consectetur exercitation minim. Et esse laboris ipsum non non aliquip ut laboris anim fugiat occaecat. Amet incididunt magna deserunt tempor culpa commodo culpa sint sit quis voluptate aliquip quis pariatur.",
//       "address": "729 Bleecker Street, Homestead, Illinois, 5076",
//       "phone": "+1 (856) 464-2452",
//       "email": "may.park@cofine.me",
//       "company": "COFINE",
//       "name": {
//         "last": "Park",
//         "first": "May"
//       },
//       "eyeColor": "blue",
//       "age": 22,
//       "picture": "http://lorempixel.com/800/800/?v=8920",
//       "balance": "$1,048.26",
//       "isActive": false,
//       "guid": "a880495e-811e-4c41-99cd-54a4048d4735",
//       "index": 8,
//       "_id": "56bc778f921df24e603a415c"
//     },
//     ];

//     for (var i=1; i<80; i++) {
//       var randomLikes = Math.floor(Math.random() * (20 - (0) + 1)) + (0);
//       var randomQuoteText = '';
//       var randomImageURL = "http://lorempixel.com/1920/1080/?v="+1;
//       var randomDescription = dummy[i].about; 
//       var name = dummy[i].name.first + dummy[i].name.last;
//       var picture = dummy[i].picture;
//       var addedById = dummy[i]._id;


//       Posts.insert(
//       {
//         source: "https://en.wikipedia.org/wiki/Special:Random",
//         description:  randomDescription,
//         addedBy: name,
//         addedById: addedById,
//         addedOn: Date.now(),
//         likes: randomLikes,
//         image: picture,
//         likers: [],
//         comments: [
//         {
//           commentaddedBy: "some guy",
//           commentBody: "Great stuff you posted",
//           commentDate: "01.10.2015"
//         },
//         {
//           commentaddedBy: "some other guy",
//           commentBody: "Don't worry, be happy!",
//           commentDate: "07.10.2015"
//         },

//         ],

//       }
//       );
//     }
//     console.log('Startup Posts inserted: ' + Posts.find().count());
//   }

// });


