import { useContext, useEffect, useState } from 'react';

import Button from '../../UI-elements/Button';
import SiteContext from '../store/site-context';
import classes from './Recipe.module.css';

// returns Recipe section that displays cook time, servings, user-created indicator icon, bookmark icon; for current recipe
const Details = (props) => {
  const [isSaved, setIsSaved] = useState();
  const siteCtx = useContext(SiteContext);

  useEffect(() => {
    //check if current recipe is bookmarked
    const saved = siteCtx.bookmarks.findIndex(
      (item) => item.id === props.recipeId
    );

    setIsSaved(saved < 0 ? false : true);
  });

  const decreaseHandler = () => {
    siteCtx.updateServings(props.servings - 1);
  };
  const increaseHandler = () => {
    siteCtx.updateServings(props.servings + 1);
  };
  const bookmarkHandler = () => {
    siteCtx.toggleBookmark(props.recipeId);
  };

  return (
    <div className={classes.details}>
      <div className={classes.info}>
        <svg>
          <use href="icons.svg#icon-clock"></use>
        </svg>
        <span className={classes.data}>{props.cookTime}</span>
        <span className={classes.text}>minutes</span>
      </div>
      <div className={classes.info}>
        <svg>
          <use href="icons.svg#icon-users"></use>
        </svg>
        <span className={classes.data}>{props.servings}</span>
        <span className={classes.text}>servings</span>

        <div className={classes.buttons}>
          <Button tiny onClick={decreaseHandler}>
            <svg>
              <use href="icons.svg#icon-minus-circle"></use>
            </svg>
          </Button>
          <Button tiny onClick={increaseHandler}>
            <svg>
              <use href="icons.svg#icon-plus-circle"></use>
            </svg>
          </Button>
        </div>
      </div>

      <div className={classes['user-created']}>
        {/* Recipe is user-created if user key is present */}
        {props.recipeKey && (
          <div>
            <svg>
              <use href="icons.svg#icon-user"></use>
            </svg>
          </div>
        )}
      </div>
      <Button round onClick={bookmarkHandler}>
        <svg className="">
          <use href={`icons.svg#icon-bookmark${isSaved ? '-fill' : ''}`}></use>
        </svg>
      </Button>
    </div>
  );
};

export default Details;
