import ResultsList from './ResultsList';
import Pagination from './Pagination';
import LoadingSpinner from '../../UI-elements/LoadingSpinner';
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

// this component occupies the left side of the main component.  Displays query results & pagination button & acknowledgement for instructor who developed the vanilla JS version of this app
const SearchResults = (props) => {
  return (
    <div className={classes.search}>
      {props.querySubmitting && <LoadingSpinner />}
      {!props.querySubmitting && (
        <>
          <ResultsList recipeRequest={props.recipeRequest} />
          <Pagination />
        </>
      )}
      <Copy />
    </div>
  );
};

export default SearchResults;
