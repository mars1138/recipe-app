import { useContext } from 'react';

import Preview from './Preview';
import SiteContext from '../store/site-context';

import classes from './ResultsList.module.css';

const ResultsList = (props) => {
  const siteCtx = useContext(SiteContext);
  const curPage = siteCtx.page;
  const queryResults = siteCtx.queryResults;
  let previewList = [];
  let content;

  const getSearchResultsPage = (page) => {
    // state.search.page = page;

    const start = (page - 1) * import.meta.env.VITE_RES_PER_PAGE;
    const end = page * import.meta.env.VITE_RES_PER_PAGE;

    return queryResults.slice(start, end);
  };

  if (siteCtx.queryResults.length > 0) {
    const pageContents = getSearchResultsPage(curPage);
    console.log('pageContents: ', pageContents);

    pageContents.forEach((result, i) => {
      previewList.push(
        <Preview
          item={result}
          key={i}
          index={i}
          sendRequest={props.sendRequest}
        />
      );
    });

    content = <ul className={classes.results}>{previewList}</ul>;
  }

  return content ? content : '';
};

export default ResultsList;
