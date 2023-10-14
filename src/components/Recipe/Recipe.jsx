import { Fragment, useState, useContext, useEffect } from 'react';

import Figure from './Figure';
import Details from './Details';
import Ingredients from './Ingredients';
import Directions from './Directions';
import LoadingSpinner from '../../UI-elements/LoadingSpinner';
import SiteContext from '../store/site-context';
import classes from './Recipe.module.css';

const Recipe = (props) => {
  const siteCtx = useContext(SiteContext);
  const isLoading = props.isLoading;
  const curRecipe = siteCtx.currentRecipe;

  const noRecipeFound = (
    <div className={classes.error}>
      <div>
        <svg>
          <use href="icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>No recipes found for your query. Please try again!</p>
    </div>
  );

  const startSearch = (
    <div className={classes.message}>
      <div>
        <svg>
          <use href="icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>
        Start by searching for a recipe or an ingredient. Click on a result to
        show full details. Have fun!
      </p>
    </div>
  );

  return (
    <div className={classes.recipe}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !curRecipe && startSearch}
      {!isLoading && props.error && noRecipeFound}
      {!isLoading && !props.error && curRecipe && (
        <Fragment>
          <Figure imgUrl={curRecipe.image_url} title={curRecipe.title} />
          <Details
            cookTime={curRecipe.cooking_time}
            servings={curRecipe.servings}
            recipeId={curRecipe.id}
            recipeKey={curRecipe.key}
          />
          <Ingredients ingredients={curRecipe.ingredients} />
          <Directions
            publisher={curRecipe.publisher}
            link={curRecipe.source_url}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Recipe;
