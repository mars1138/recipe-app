import Button from '../../UI-elements/Button';
import classes from './Pagination.module.css';

const Pagination = (props) => {
  return (
    <div className={classes.pagination}>
      <Button pagination>
        <svg>
          <use href="src/assets/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page 1</span>
      </Button>
      <Button pagination>
        <span>Page 3</span>
        <svg>
          <use href="src/assets/icons.svg#icon-arrow-right"></use>
        </svg>
      </Button>
    </div>
  );
};

export default Pagination;
