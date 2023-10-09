import React from 'react';

const SiteContext = React.createContext({
  currentRecipe: {},
  query: '',
  queryResults: [],
  bookmarks: [],
  page: 1,
  storeQueryResults: (results) => {},
  setCurrentRecipe: (id) => {},
  toggleBookmark: (id) => {},
  clearBookmarks: () => {},
});

export default SiteContext;
