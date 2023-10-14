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
  const { isSubmitting, error, sendRequest, clearError } = useHttpRequest();
  const siteCtx = useContext(SiteContext);

  const showAddHandler = () => {
    setAddRecipe(true);
  };
  const hideAddHandler = () => {
    setAddRecipe(false);
  };

  const searchHandler = async (query) => {
    const data = await sendRequest(
      `${import.meta.env.VITE_API_URL}?search=${query}&key=${
        import.meta.env.VITE_KEY
      }`
    );
    siteCtx.storeQueryResults(query, data.data.recipes);
  };

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('forkify-bookmarks'));
    if (bookmarks && bookmarks.length > 0) siteCtx.setBookmarks(bookmarks);
  }, []);

  const MainBody = (props) => {
    return (
      <Fragment>
        <SearchResults sendRequest={sendRequest} />
        <Recipe isLoading={isSubmitting} error={error} />
      </Fragment>
    );
  };

  return (
    <div className="container">
      <MainHeader addRecipe={showAddHandler} searchRecipe={searchHandler} />
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
