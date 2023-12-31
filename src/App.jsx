import { useState, Fragment, useContext, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import MainHeader from './Navigation/MainHeader';
import SearchResults from './components/SearchResults/SearchResults';
import Recipe from './components/Recipe/Recipe';
import AddRecipe from './components/AddRecipe';
import SiteContext from './components/store/site-context';
import { useHttpRequest } from './components/hooks/http-hook';

function App() {
  const [addRecipe, setAddRecipe] = useState(false);
  const siteCtx = useContext(SiteContext);
  const {
    isSubmitting: querySubmitting,
    error: queryError,
    sendRequest: queryRequest,
    clearError: clearQueryError,
  } = useHttpRequest();
  const {
    isSubmitting: recipeSubmitting,
    error: recipeError,
    sendRequest: recipeRequest,
    clearError: clearRecipeError,
  } = useHttpRequest();

  // display AddRecipe modal
  const showAddHandler = () => {
    setAddRecipe(true);
  };
  // close AddRecipe modal
  const hideAddHandler = () => {
    setAddRecipe(false);
  };

  const searchHandler = async (query) => {
    clearQueryError();
    clearRecipeError();
    try {
      // API returns object that contains array of query results
      const data = await queryRequest(
        `${import.meta.env.VITE_API_URL}?search=${query}&key=${
          import.meta.env.VITE_KEY
        }`
      );
      siteCtx.storeQueryResults(query, data.data.recipes);
    } catch (err) {
      // no query results found
      siteCtx.storeQueryResults(query, []);
    }
  };

  useEffect(() => {
    // retrieve bookmarks saved from previous browser session
    const bookmarks = JSON.parse(localStorage.getItem('forkify-bookmarks'));
    if (bookmarks && bookmarks.length > 0) siteCtx.setBookmarks(bookmarks);
  }, []);

  const MainBody = (props) => {
    return (
      <Fragment>
        <SearchResults
          querySubmitting={querySubmitting}
          recipeRequest={recipeRequest}
        />
        <Recipe
          recipeSubmitting={recipeSubmitting}
          recipeErr={recipeError}
          queryErr={queryError}
        />
      </Fragment>
    );
  };

  return (
    <div className="container">
      <MainHeader addRecipe={showAddHandler} searchRecipe={searchHandler} recipeRequest={recipeRequest}/>
      <main className="main">
        <MainBody />
        <AnimatePresence>
          {addRecipe && <AddRecipe onClose={hideAddHandler} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
