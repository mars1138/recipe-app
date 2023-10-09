import { useContext } from 'react';

import Preview from '../components/SearchResults/Preview';
import SiteContext from './store/site-context';

const Bookmarks = () => {
  const siteCtx = useContext(SiteContext);

  const content = [];

  siteCtx.bookmarks.forEach((item, i) => {
    content.push(<Preview item={item} key={i} />);
  });

  return content;
};

export default Bookmarks;
