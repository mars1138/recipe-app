import { useReducer } from 'react';

import SiteContext from './site-context';

const defaultSiteState = {
  currentRecipe: {},
  foundRecipes: [],
  bookmarks: [],
};

const siteReducer = (state, action) => {
  if (action.type === 'ADD') {
  }
  if (action.type === 'REMOVE') {
  }
  if (action.type === 'CLEAR') {
  }
};

const SiteProvider = (props) => {
  const [siteState, dispatchSiteAction] = useReducer(
    siteReducer,
    defaultSiteState
  );

  const addHandler = (item) => {
    dispatchSiteAction({
      type: 'ADD',
      item: item,
    });
  };

  const removeHandler = (id) => {
    dispatchSiteAction({ type: 'REMOVE', id: id });
  };

  const clearHandler = () => {
    dispatchSiteAction({ type: 'CLEAR' });
  };

  const siteContext = {
    currentRecipe: siteState.currentRecipe,
    foundRecipes: siteState.foundRecipes,
    bookmarks: siteState.bookmarks,
    addBookmark: addHandler,
    removeBookmark: removeHandler,
    clearBookmarks: clearHandler,
  };

  return (
    <SiteContext.Provider value={siteContext}>
      {props.children}
    </SiteContext.Provider>
  );
};

export default SiteProvider;
