import Button from '../../UI-elements/Button';
import classes from './Recipe.module.css';

const Details = (props) => {
  return (
    <div className={classes.details}>
      <div className={classes.info}>
        <svg>
          <use href="src/assets/icons.svg#icon-clock"></use>
        </svg>
        <span className={classes.data}>45</span>
        <span className={classes.text}>minutes</span>
      </div>
      <div className={classes.info}>
        <svg>
          <use href="src/assets/icons.svg#icon-users"></use>
        </svg>
        <span className={classes.data}>4</span>
        <span className={classes.text}>servings</span>

        <div className={classes.buttons}>
          <Button tiny>
            <svg>
              <use href="src/assets/icons.svg#icon-minus-circle"></use>
            </svg>
          </Button>
          <Button tiny>
            <svg>
              <use href="src/assets/icons.svg#icon-plus-circle"></use>
            </svg>
          </Button>
        </div>
      </div>

      <div className={classes['user-created']}>
        <svg>
          <use href="src/assets/icons.svg#icon-user"></use>
        </svg>
      </div>
      <Button round>
        <svg className="">
          <use href="src/assets/icons.svg#icon-bookmark-fill"></use>
        </svg>
      </Button>
    </div>
  );
};

export default Details;
