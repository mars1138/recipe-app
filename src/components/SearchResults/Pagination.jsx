import { useContext } from 'react';
import Button from '../../UI-elements/Button';
import SiteContext from '../store/site-context';
import classes from './Pagination.module.css';

// prev and next buttons will appear based on current page, total number of query results, and #results displayed per page
const Pagination = () => {
  const siteCtx = useContext(SiteContext);
  const curPage = siteCtx.page;
  const totalResults = siteCtx.queryResults.length;
  const numPages = Math.ceil(totalResults / import.meta.env.VITE_RES_PER_PAGE);
  let prevPage = false;
  let nextPage = false;

  if (
    (curPage === numPages && numPages > 1) ||
    (curPage < numPages && curPage > 1)
  )
    prevPage = true;

  if ((curPage === 1 && numPages > 1) || curPage < numPages) nextPage = true;

  const prevHandler = () => siteCtx.setPage(curPage - 1);
  const nextHandler = () => siteCtx.setPage(curPage + 1);

  return (
    <div className={classes.pagination}>
      {prevPage && (
        <div className={classes.prev}>
          <Button pagination onClick={prevHandler}>
            <svg>
              <use href="icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page {curPage - 1}</span>
          </Button>
        </div>
      )}
      {nextPage && (
        <div className={classes.next}>
          <Button pagination onClick={nextHandler}>
            <span>Page {curPage + 1}</span>
            <svg>
              <use href="icons.svg#icon-arrow-right"></use>
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
