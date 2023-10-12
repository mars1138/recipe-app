
import ResultsList from './ResultsList';
import Pagination from './Pagination';
import classes from './SearchResults.module.css';

const Copy = () => {
  return (
    <p className={classes.copy}>
      &copy; Copyright by&nbsp;
      <a
        className={classes.link}
        target="_blank"
        href="https://twitter.com/jonasschmedtman"
      >
        Jonas Schmedtmann
      </a>
    </p>
  );
};

const SearchResults = (props) => {
  return (
    <div className={classes.search}>
      <ResultsList sendRequest={props.sendRequest} />
      <Pagination />
      <Copy />
    </div>
  );
};

export default SearchResults;
