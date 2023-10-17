import { useContext } from 'react';
import Button from '../UI-elements/Button';

import Preview from '../components/SearchResults/Preview';
import SiteContext from './store/site-context';
import classes from './Bookmarks.module.css';

const Bookmarks = (props) => {
  const siteCtx = useContext(SiteContext);

  const content = [];

  siteCtx.bookmarks.forEach((item, i) => {
    content.push(<Preview item={item} key={i} />);
  });

  if (siteCtx.bookmarks.length > 0) {
    content.push(
      // <li key="clear">
        <div className={classes.button}>
          <Button
            small
            onClick={() => {
              siteCtx.clearBookmarks();
              props.onClear();
              // window.location.replace('/');
            }}
          >
            Clear
          </Button>
        </div>
      // </li>
    );
  }

  return content;
};

export default Bookmarks;
