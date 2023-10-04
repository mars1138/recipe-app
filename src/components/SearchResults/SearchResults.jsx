import ResultsList from './ResultsList';
import Pagination from './Pagination';

import classes from './SearchResults.module.css';

const Copy = () => {
  return (
    <p className="copyright">
      &copy; Copyright by
      <a
        className="twitter-link"
        target="_blank"
        href="https://twitter.com/jonasschmedtman"
      >
        Jonas Schmedtmann
      </a>
    </p>
  );
};

const SearchResults = () => {
  return (
    <div className={classes.search}> 
      <ResultsList />
      <Pagination />
      <Copy />
    </div>
  );
};

export default SearchResults;
