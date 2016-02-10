PostsIndex = new EasySearch.Index({
  collection: Posts,
  sort: function () {
    return { likes: -1 };
  },
  defaultSearchOptions: {
    limit: 5,
  },
  fields: ['source', 'description', 'addedBy'],
  engine: new EasySearch.Minimongo()
});
