import { useContext } from 'react';

import Preview from './Preview';
import SiteContext from '../store/site-context';

import classes from './ResultsList.module.css';

const ResultsList = (props) => {
  const siteCtx = useContext(SiteContext);
  let previewList = [];
  let content;

  // console.log('results: ', siteCtx.queryResults);

  if (siteCtx.queryResults.length > 0) {
    // console.log('Query results present!');
    siteCtx.queryResults.forEach((result) => {
      previewList.push(<Preview item={result} key={result.id} />);
    });

    content = <ul className={classes.results}>{previewList}</ul>;
  }

  return content ? content : '';
};

export default ResultsList;
