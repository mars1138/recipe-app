import { useContext, useEffect, useState } from 'react';

import Button from '../../UI-elements/Button';
import SiteContext from '../store/site-context';
import classes from './Recipe.module.css';

const Details = (props) => {
  const [isSaved, setIsSaved] = useState();
  const siteCtx = useContext(SiteContext);

  useEffect(() => {
    const saved = siteCtx.bookmarks.findIndex(
      (item) => item.id === props.recipeId
    );

    setIsSaved(saved < 0 ? false : true);
  });

  const servingsHandler = (newServings) => {
    siteCtx.updateServings(newServings);
  };
  const bookmarkHandler = () => {
    siteCtx.toggleBookmark(props.recipeId);
  };

  return (
    <div className={classes.details}>
      <div className={classes.info}>
        <svg>
          <use href="src/assets/icons.svg#icon-clock"></use>
        </svg>
        <span className={classes.data}>{props.cookTime}</span>
        <span className={classes.text}>minutes</span>
      </div>
      <div className={classes.info}>
        <svg>
          <use href="src/assets/icons.svg#icon-users"></use>
        </svg>
        <span className={classes.data}>{props.servings}</span>
        <span className={classes.text}>servings</span>

        <div className={classes.buttons}>
          <Button
            tiny
            onClick={() => {
              servingsHandler(props.servings - 1);
            }}
          >
            <svg>
              <use href="src/assets/icons.svg#icon-minus-circle"></use>
            </svg>
          </Button>
          <Button
            tiny
            onClick={() => {
              servingsHandler(props.servings + 1);
            }}
          >
            <svg>
              <use href="src/assets/icons.svg#icon-plus-circle"></use>
            </svg>
          </Button>
        </div>
      </div>

      <div className={classes['user-created']}>
        <svg>
          <use href="src/assets/icons.svg#icon-user"></use>
        </svg>
      </div>
      <Button round onClick={bookmarkHandler}>
        <svg className="">
          <use
            href={`src/assets/icons.svg#icon-bookmark${isSaved ? '-fill' : ''}`}
          ></use>
        </svg>
      </Button>
    </div>
  );
};

export default Details;
