import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '../UI-elements/Button';
import classes from './Navigation.module.css';
import Bookmarks from '../components/Bookmarks';
import SiteContext from '../components/store/site-context';

const Navigation = (props) => {
  const [hover, setHover] = useState(false);
  const siteCtx = useContext(SiteContext);
  let dropDown;

  const hoverHandler = () => {
    setHover((prev) => !prev);
  };

  const message = (
    <li className={classes.message}>
      <div>
        <svg>
          <use href="src/assets/icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>
        No bookmarks yet. Find a nice recipe and bookmark it <span>:-)</span>
      </p>
    </li>
  );

  dropDown = (
    <motion.div
      className={classes.bookmarks}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ul className={classes['bookmarks-list']}>
        {siteCtx.bookmarks.length > 0 && <Bookmarks />}
        {!siteCtx.bookmarks.length > 0 && message}
      </ul>
    </motion.div>
  );

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
          <AnimatePresence>{hover && dropDown}</AnimatePresence>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
