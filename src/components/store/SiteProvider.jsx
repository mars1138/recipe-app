import { useReducer } from 'react';

import SiteContext from './site-context';

const defaultSiteState = {
  currentRecipe: null,
  query: '',
  queryResults: [],
  bookmarks: [],
  page: 1,
};

const siteReducer = (state, action) => {
  if (action.type === 'QUERY') {
    const updatedResults = [...action.results];

    return {
      currentRecipe: state.currentRecipe,
      query: action.query,
      queryResults: updatedResults,
      bookmarks: state.bookmarks,
      page: state.page,
    };
  }

  if (action.type === 'CURRENT') {
    const updatedCurrent = action.newCurrent;

    return {
      currentRecipe: updatedCurrent,
      query: state.query,
      queryResults: state.queryResults,
      bookmarks: state.bookmarks,
      page: state.page,
    };
  }

  if (action.type === 'TOGGLE') {
    let updatedBookmarks;

    const existingIndex = state.bookmarks.findIndex(
      (item) => item.id === action.id
    );
    // console.log(existingIndex);

    if (existingIndex >= 0) {
      updatedBookmarks = state.bookmarks.filter(
        (item) => item.id !== action.id
      );
      //   console.log('updatedBookmarks: ', updatedBookmarks);
    } else {
      const newItem = {
        id: state.currentRecipe.id,
        image_url: state.currentRecipe.image_url,
        publisher: state.currentRecipe.publisher,
        title: state.currentRecipe.title,
      };
      updatedBookmarks = [...state.bookmarks.concat(newItem)]; // return new array, do not manipulate existing state.
      //   console.log('updatedBookmarks: ', updatedBookmarks);
    }

    localStorage.setItem('forkify-bookmarks', JSON.stringify(updatedBookmarks));

    return {
      currentRecipe: state.currentRecipe,
      query: state.query,
      queryResults: state.queryResults,
      bookmarks: updatedBookmarks,
      page: state.page,
    };
  }

  if (action.type === 'BOOKMARKS') {
    const updatedBookmarks = action.bookmarks;

    return {
      currentRecipe: state.currentRecipe,
      query: state.query,
      queryResults: state.queryResults,
      bookmarks: updatedBookmarks,
      page: state.page,
    };
  }

  if (action.type === 'SERVINGS') {
    const updatedRecipe = { ...state.currentRecipe };
    const updatedIng = [...state.currentRecipe.ingredients];
    updatedRecipe.servings = action.servings;

    updatedIng.forEach((ing) => {
      ing.quantity =
        (ing.quantity * action.servings) / state.currentRecipe.servings;
    });

    updatedRecipe.ingredients = [...updatedIng];

    return {
      currentRecipe: updatedRecipe,
      query: state.query,
      queryResults: state.queryResults,
      bookmarks: state.bookmarks,
      page: state.page,
    };
  }

  if (action.type === 'CLEAR') {
    localStorage.clear('forkify-bookmarks');
    const recipe = state.currentRecipe;
    const results = state.queryResults;

    return {
      currentRecipe: recipe,
      query: state.query,
      queryResults: results,
      bookmarks: [],
      page: state.page,
    };
  }

  if (action.type === 'PAGE') {
    return {
      currentRecipe: state.currentRecipe,
      query: state.query,
      queryResults: state.queryResults,
      bookmarks: state.bookmarks,
      page: action.page,
    };
  }
};

const SiteProvider = (props) => {
  const [siteState, dispatchSiteAction] = useReducer(
    siteReducer,
    defaultSiteState
  );

  const queryHandler = (query, results) => {
    dispatchSiteAction({
      type: 'QUERY',
      query: query,
      results: results,
    });
  };

  const currentHandler = (newCurrent) => {
    dispatchSiteAction({
      type: 'CURRENT',
      newCurrent: newCurrent,
    });
  };

  const toggleHandler = (id) => {
    dispatchSiteAction({
      type: 'TOGGLE',
      id: id,
    });
  };

  const bookmarksHandler = (bookmarks) => {
    dispatchSiteAction({
      type: 'BOOKMARKS',
      bookmarks: bookmarks,
    });
  };

  const servingsHandler = (servings) => {
    dispatchSiteAction({
      type: 'SERVINGS',
      servings: servings,
    });
  };

  const clearHandler = () => {
    dispatchSiteAction({ type: 'CLEAR' });
  };

  const pageHandler = (page) => {
    dispatchSiteAction({ type: 'PAGE', page: page });
  };

  const siteContext = {
    currentRecipe: siteState.currentRecipe,
    query: siteState.query,
    queryResults: siteState.queryResults,
    bookmarks: siteState.bookmarks,
    page: siteState.page,
    storeQueryResults: queryHandler,
    setCurrentRecipe: currentHandler,
    toggleBookmark: toggleHandler,
    setBookmarks: bookmarksHandler,
    updateServings: servingsHandler,
    clearBookmarks: clearHandler,
    setPage: pageHandler,
  };

  return (
    <SiteContext.Provider value={siteContext}>
      {props.children}
    </SiteContext.Provider>
  );
};

export default SiteProvider;
