import Preview from './Preview';

import classes from './ResultsList.module.css';

const ResultsList = () => {
  return (
    <ul className={classes.results}>
      <Preview />
    </ul>
  );
};

export default ResultsList;
