import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={classes.spinner}>
      <svg>
        <use href="icons.svg#icon-loader"></use>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
