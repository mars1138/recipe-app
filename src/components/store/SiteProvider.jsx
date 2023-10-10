import { useReducer } from 'react';

import SiteContext from './site-context';

const testCurrentRecipe = {
  id: '5ed6604591c37cdc054bce52',
  cooking_time: 30,
  image_url:
    'http://forkify-api.herokuapp.com/images/candysushitk410x27375b4.jpg',
  publisher: 'All Recipes',
  servings: 4,
  source_url: 'http://allrecipes.com/Recipe/Candied-Yams/Detail.aspx',
  title: 'Candied Yams',
  ingredients: [
    { quantity: 1, unit: '', description: 'can sweet potatoes' },
    { quantity: 0.25, unit: 'cup', description: 'butter cut into pieces' },
    { quantity: 0.5, unit: 'cup', description: 'brown sugar' },
    { quantity: 1.5, unit: 'cups', description: 'miniature marshmallows' },
  ],
};
const testQueryResults = [
  {
    publisher: 'Tasty Kitchen',
    image_url:
      'http://forkify-api.herokuapp.com/images/candysushitk410x27375b4.jpg',
    title: 'Candy Sushi',
    id: '5ed6604691c37cdc054bd104',
  },
  {
    publisher: 'All Recipes',
    image_url: 'http://forkify-api.herokuapp.com/images/525291c620.jpg',
    title: 'Candied Yams',
    id: '5ed6604591c37cdc054bce52',
  },
  {
    publisher: 'Closet Cooking',
    image_url:
      'http://forkify-api.herokuapp.com/images/Peppermint2BCandy2BCane2BPopcorn2B5002B041859f68037.jpg',
    title: 'Peppermint Candy Cane Popcorn',
    id: '5ed6604591c37cdc054bcac2',
  },
];
const testBookmarks = [
  {
    id: '5ed6604691c37cdc054bd104',
    image_url:
      'http://forkify-api.herokuapp.com/images/candysushitk410x27375b4.jpg',
    publisher: 'Tasty Kitchen',
    title: 'Candy Sushi',
  },
  {
    id: '5ed6604591c37cdc054bcac2',
    image_url:
      'http://forkify-api.herokuapp.com/images/Peppermint2BCandy2BCane2BPopcorn2B5002B041859f68037.jpg',
    publisher: 'Closet Cooking',
    title: 'Peppermint Candy Cane Popcorn',
  },
  {
    id: '5ed6604591c37cdc054bce52',
    image_url:
      'http://forkify-api.herokuapp.com/images/candysushitk410x27375b4.jpg',
    publisher: 'All Recipes',
    title: 'Candied Yams',
  },
];

const defaultSiteState = {
  currentRecipe: null,
  query: '',
  queryResults: [],
  bookmarks: [...testBookmarks],
  page: 1,
};

const siteReducer = (state, action) => {
  if (action.type === 'QUERY') {
    // console.log(action.results);

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
    const updatedCurrent = action.id;

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
    console.log('action.bk: ', action.bookmarks);
    const updatedBookmarks = action.bookmarks;
    // action.bookmarks.forEach((bk) => {
    //   updatedBookmarks.push(bk);
    // });
    console.log(updatedBookmarks);
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

    updatedRecipe.servings = action.servings;

    updatedRecipe.ingredients.forEach((ing) => {
      ing.quantity =
        (ing.quantity * action.servings) / state.currentRecipe.servings;
    });

    console.log(updatedRecipe);

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

    return {
      currentRecipe: state.currentRecipe,
      query: state.query,
      queryResults: state.queryResults,
      bookmarks: [],
      page: state.page,
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

  const currentHandler = (id) => {
    dispatchSiteAction({
      type: 'CURRENT',
      id: id,
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
  };

  return (
    <SiteContext.Provider value={siteContext}>
      {props.children}
    </SiteContext.Provider>
  );
};

export default SiteProvider;
