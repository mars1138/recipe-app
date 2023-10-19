import { useContext } from 'react';

import Preview from './Preview';
import SiteContext from '../store/site-context';
import classes from './ResultsList.module.css';

// returns list of recipe previews to display, based on #of results, current page, and items to display per page
const ResultsList = (props) => {
  const siteCtx = useContext(SiteContext);
  const curPage = siteCtx.page;
  const queryResults = siteCtx.queryResults;
  let previewList = [];
  let content;

  const getPageContents = (page) => {
    const start = (page - 1) * import.meta.env.VITE_RES_PER_PAGE;
    const end = page * import.meta.env.VITE_RES_PER_PAGE;

    return queryResults.slice(start, end);
  };

  if (siteCtx.queryResults.length > 0) {
    const pageContents = getPageContents(curPage);

    pageContents.forEach((result, i) => {
      previewList.push(
        <Preview
          item={result}
          key={i}
          index={i}
          recipeRequest={props.recipeRequest}
        />
      );
    });

    content = <ul className={classes.results}>{previewList}</ul>;
  }

  return previewList ? content : '';
};

export default ResultsList;
