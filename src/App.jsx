import { useState, Fragment } from 'react';

import MainHeader from './Navigation/MainHeader';
import SearchResults from './components/SearchResults/SearchResults';
import Recipe from './components/Recipe/Recipe';
import AddRecipe from './components/AddRecipe';
import Modal from './UI-elements/Modal';

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
    <main className="container">
      <MainHeader addRecipe={showAddHandler} />
      <MainBody />
      {addRecipe && <AddRecipe onClose={hideAddHandler} />}
    </main>
  );
}

export default App;
