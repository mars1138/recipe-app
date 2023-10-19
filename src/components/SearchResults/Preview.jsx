import { useContext } from 'react';

import SiteContext from '../store/site-context';
import classes from './Preview.module.css';

// returns component for displaying recipe list item from query results or bookmarks
const Preview = (props) => {
  const siteCtx = useContext(SiteContext);

  const previewClasses = `${classes.preview} ${
    siteCtx.currentRecipe && siteCtx.currentRecipe.id === props.item.id
      ? classes.selected
      : ''
  }`;

  // basic recipe info from query results will include a user key if the recipe was user created
  const userCreated = !props.item.key ? (
    ''
  ) : (
    <div className={classes['user-created']}>
      <svg>
        <use href="icons.svg#icon-user"></use>
      </svg>
    </div>
  );

  const getRecipeDetails = async (url) => {
    try {
      const data = await props.recipeRequest(url);
      return data.data.recipe;
    } catch (err) {
      console.log(err);
    }
  };

  const clickHandler = async () => {
    // don't need to make API call if already currentRecipe
    if (!siteCtx.currentRecipe || siteCtx.currentRecipe.id !== props.item.id) {
      const recipe = await getRecipeDetails(
        `${import.meta.env.VITE_API_URL}${props.item.id}`
      );
      siteCtx.setCurrentRecipe(recipe);
    }
  };

  return (
    <li className={previewClasses} onClick={clickHandler}>
      <a href={`#${props.item.id}`}>
        <figure>
          <img src={`${props.item.image_url}`} alt={props.item.title} />
        </figure>
        <div className={classes.data}>
          <h4>{props.item.title}</h4>
          <p>{props.item.publisher}</p>
          {userCreated}
        </div>
      </a>
    </li>
  );
};

export default Preview;
