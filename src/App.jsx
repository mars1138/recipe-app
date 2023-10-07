import { useState, Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';

import MainHeader from './Navigation/MainHeader';
import SearchResults from './components/SearchResults/SearchResults';
import Recipe from './components/Recipe/Recipe';
import AddRecipe from './components/AddRecipe';
import SiteProvider from './components/store/SiteProvider';

function App() {
  const [addRecipe, setAddRecipe] = useState(false);

  const showAddHandler = () => {
    console.log('addrecipe...');
    setAddRecipe(true);
  };
  const hideAddHandler = () => {
    console.log('hide addrecipe...');
    setAddRecipe(false);
  };

  const MainBody = (props) => {
    return (
      <Fragment>
        <SearchResults />
        <Recipe />
      </Fragment>
    );
  };

  return (
    <SiteProvider>
      <div className="container">
        <MainHeader addRecipe={showAddHandler} />
        <main className="main">
          <MainBody />
          <AnimatePresence>
            {addRecipe && <AddRecipe onClose={hideAddHandler} />}
          </AnimatePresence>
        </main>
      </div>
    </SiteProvider>
  );
}

export default App;
