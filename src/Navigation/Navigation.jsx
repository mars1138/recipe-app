import { useState } from 'react';

import Button from '../UI-elements/Button';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  const [hover, setHover] = useState(false);
  let dropDown;

  const hoverHandler = () => {
    setHover((prev) => !prev);
  };

  if (!props.data) {
    dropDown = (
      <div className={classes.bookmarks}>
        <ul className="bookmarks__list">
          <div className="message">
            <div>
              <svg>
                <use href="src/assets/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
          </div>
        </ul>
      </div>
    );
  } else {
    dropDown = '';
  }

  return (
    <nav className={classes.nav}>
      <ul className={classes['nav-list']}>
        <li>
          <Button navButton onClick={props.addRecipe}>
            <svg>
              <use href="src/assets/icons.svg#icon-edit"></use>
            </svg>
            <span>Add Recipe</span>
          </Button>
        </li>
        <li
          className={classes['bookmark-item']}
          onMouseEnter={hoverHandler}
          onMouseLeave={hoverHandler}
        >
          <Button navButton>
            <svg>
              <use href="src/assets/icons.svg#icon-smile"></use>
            </svg>
            <span>Bookmarks</span>
          </Button>
          {hover && dropDown}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
