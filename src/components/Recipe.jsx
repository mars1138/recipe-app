import classes from './Recipe.module.css';

const Recipe = (props) => {
  return (
    <div className={classes.recipe}>
      <div className="message">
        <div>
          <svg>
            <use href="src/assets/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>Start by searching for a recipe or an ingredient. Have fun!</p>
      </div>
    </div>
  );
};

export default Recipe;
