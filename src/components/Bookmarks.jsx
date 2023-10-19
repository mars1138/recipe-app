import { useContext } from 'react';
import Button from '../UI-elements/Button';

import Preview from '../components/SearchResults/Preview';
import SiteContext from './store/site-context';
import classes from './Bookmarks.module.css';

// returns dropdown component that lists bookmark Preview components
const Bookmarks = (props) => {
  const siteCtx = useContext(SiteContext);
  const content = [];

  siteCtx.bookmarks.forEach((item, i) => {
    content.push(<Preview item={item} key={i} />);
  });

  // add button to clear bookmarks list
  if (siteCtx.bookmarks.length > 0) {
    content.push(
      <div className={classes.button}>
        <Button
          small
          onClick={() => {
            siteCtx.clearBookmarks();
            props.onClear();
          }}
        >
          Clear
        </Button>
      </div>
    );
  }

  return content;
};

export default Bookmarks;
