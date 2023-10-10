import { useState, Fragment, useContext, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import MainHeader from './Navigation/MainHeader';
import SearchResults from './components/SearchResults/SearchResults';
import Recipe from './components/Recipe/Recipe';
import AddRecipe from './components/AddRecipe';
import SiteContext from './components/store/site-context';
// import { downloadBookmarks } from '../util/bookmarks';

// import SiteProvider from './components/store/SiteProvider';

function App() {
  const [addRecipe, setAddRecipe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState();
  const siteCtx = useContext(SiteContext);

  const getRecipes = async (query, url) => {
    // const timeout = (s) => {
    //   return new Promise((_, reject) => {
    //     setTimeout(() => {
    //       reject(
    //         new Error(`Request took too long!  Timeout after ${s} seconds.`)
    //       );
    //     }, s * 1000);
    //   });
    // };

    try {
      const res = await fetch(url);
      // const res = await Promise.race(
      //   fetch(url),
      //   timeout(`${import.meta.env.VITE_TIMEOUT_SEC}`)
      // );
      console.log(res);
      const data = await res.json();
      console.log(data.data.recipes);

      if (!res.ok) throw new Error(`${data.message} (${res.status}😫)`);

      siteCtx.storeQueryResults(query, data.data.recipes);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const showAddHandler = () => {
    console.log('addrecipe...');
    setAddRecipe(true);
  };
  const hideAddHandler = () => {
    console.log('hide addrecipe...');
    setAddRecipe(false);
  };

  const searchHandler = (query) => {
    setIsLoading(true);
    console.log('searching...', query);

    getRecipes(
      query,
      `${import.meta.env.VITE_API_URL}?search=${query}&key=${
        import.meta.env.VITE_KEY
      }`
    );
  };

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('forkify-bookmarks'));
    // const bookmarks = downloadBookmarks();
    console.log('bookmarks: ', bookmarks);
    if (bookmarks && bookmarks.length > 0) siteCtx.setBookmarks(bookmarks);
  }, []);

  // if (bookmarks[0]) siteCtx.setBookmarks(bookmarks);

  const MainBody = (props) => {
    return (
      <Fragment>
        <SearchResults />
        <Recipe isLoading={isLoading} />
      </Fragment>
    );
  };

  return (
    // <SiteProvider>
    <div className="container">
      <MainHeader addRecipe={showAddHandler} searchRecipe={searchHandler} />
      <main className="main">
        <MainBody />
        <AnimatePresence>
          {addRecipe && <AddRecipe onClose={hideAddHandler} />}
        </AnimatePresence>
      </main>
    </div>
    // </SiteProvider>
  );
}

export default App;
