import React from 'react';

const SiteContext = React.createContext({
  currentRecipe: {},
  foundRecipes: [],
  bookmarks: [],
  addBookmark: (id) => {},
  removeBookmark: (id) => {},
  clearBookmarks: () => {},
});

export default SiteContext;
