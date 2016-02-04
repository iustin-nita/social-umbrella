PostsIndex = new EasySearch.Index({
  collection: Posts,
  limit: 20,
  defaultSearchOptions: {
    limit: 10,
  },
  fields: ['source', 'description', 'addedBy'],
  engine: new EasySearch.Minimongo()
});
