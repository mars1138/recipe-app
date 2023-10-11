import { useContext } from 'react';

import SiteContext from '../store/site-context';
import classes from './Preview.module.css';

const Preview = (props) => {
  const siteCtx = useContext(SiteContext);

  console.log(props.item.key);

  const previewClasses = `${classes.preview} ${
    siteCtx.currentRecipe && siteCtx.currentRecipe.id === props.item.id
      ? classes.selected
      : ''
  }`;

  const bookmarked = siteCtx.bookmarks.findIndex(
    (item) => item.id === props.item.id
  );

  const userCreated = !props.item.key ? (
    ''
  ) : (
    <div className={classes['user-created']}>
      <svg>
        <use href="src/assets/icons.svg#icon-user"></use>
      </svg>
    </div>
  );

  //   const timeout = (s) => {
  //     return new Promise((_, reject) => {
  //       setTimeout(() => {
  //         reject(
  //           new Error(`Request took too long!  Timeout after ${s} seconds.`)
  //         );
  //       }, s * 1000);
  //     });
  //   };

  const getRecipeDetails = async (url) => {
    try {
      const res = await fetch(url);
      //   console.log(res);
      const data = await res.json();
      //   console.log(data);

      if (!res.ok) throw new Error(`${data.message} (${res.status}😫)`);

      //   setIsLoading(false);
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
      console.log(recipe);
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
