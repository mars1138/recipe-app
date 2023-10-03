import classes from './Recipe.module.css';

const Ingredients = (props) => {
  return (
    <div className={classes.ingredients}>
      <h2>Recipe ingredients</h2>
      <ul className={classes['ingredient-list']}>
        <li className={classes['ingredient']}>
          <svg className="recipe__icon">
            <use href="src/assets/icons.svg#icon-check"></use>
          </svg>
          <div className={classes.quantity}>1000</div>
          <div className={classes.description}>
            <span className={classes.unit}>g&nbsp;&nbsp;</span>
            pasta
          </div>
        </li>

        <li className={classes['ingredient']}>
          <svg>
            <use href="src/assets/icons.svg#icon-check"></use>
          </svg>
          <div className={classes.quantity}>0.5</div>
          <div className={classes.description}>
            <span className={classes.unit}>cup&nbsp;&nbsp;</span>
            ricotta cheese
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Ingredients;
