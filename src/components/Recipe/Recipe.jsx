import { Fragment } from 'react';
import { useState } from 'react';

import Figure from './Figure';
import Details from './Details';
import Ingredients from './Ingredients';
import Directions from './Directions';
import LoadingSpinner from '../../UI-elements/LoadingSpinner';
import classes from './Recipe.module.css';

const Recipe = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [curRecipe, setCurRecipe] = useState(true);
  const [searchError, setSearchError] = useState(false);

  const noRecipeFound = (
    <div className={classes.error}>
      <div>
        <svg>
          <use href="src/assets/icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>No recipes found for your query. Please try again!</p>
    </div>
  );

  const startSearch = (
    <div className={classes.message}>
      <div>
        <svg>
          <use href="src/assets/icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </div>
  );

  return (
    <div className={classes.recipe}>
      {!curRecipe && startSearch}

      {isLoading && <LoadingSpinner />}

      {searchError && noRecipeFound}

      {!searchError && curRecipe && (
        <Fragment>
          <Figure />
          <Details />
          <Ingredients />
          <Directions />
        </Fragment>
      )}
    </div>
  );
};

export default Recipe;
