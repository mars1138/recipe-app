import classes from './Recipe.module.css';
import fracty from 'fracty';

// returns current recipe ingredients list section.  Fracty used to turn floating point quantities into fractions.
const Ingredients = (props) => {
  let list = [];

  if (props.ingredients?.length > 0) {
    props.ingredients.forEach((item, i) => {
      list.push(
        <li className={classes['ingredient']} key={i}>
          <svg className="recipe__icon">
            <use href="icons.svg#icon-check"></use>
          </svg>
          <div className={classes.quantity}>{fracty(item.quantity)}</div>
          <div className={classes.description}>
            <span className={classes.unit}>{item.unit}&nbsp;</span>
            {item.description}
          </div>
        </li>
      );
    });
  }

  const ingList = <ul className={classes['ingredient-list']}>{list}</ul>;

  return (
    <div className={classes.ingredients}>
      <h2>Recipe ingredients</h2>
      {ingList}
    </div>
  );
};

export default Ingredients;
