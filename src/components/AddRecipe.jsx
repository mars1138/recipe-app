import { Fragment } from 'react';

import Backdrop from '../UI-elements/Backdrop';
import Button from '../UI-elements/Button';

import classes from './AddRecipe.module.css';

const AddRecipe = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    props.onClose();
  };

  return (
    <Fragment>
      <Backdrop onClick={props.onClose} />
      <div className={classes['add-recipe']}>
        <h1>Add Recipe</h1>
        <Button modalClose onClick={props.onClose}>
          &times;
        </Button>
        <form className={classes.upload} onSubmit={submitHandler}>
          <div className={classes.column}>
            <h3 className="heading">Recipe data</h3>
            <label>Title</label>
            <input defaultValue="TEST23" required name="title" type="text" />
            <label>URL</label>
            <input
              defaultValue="TEST23"
              required
              name="sourceUrl"
              type="text"
            />
            <label>Image URL</label>
            <input defaultValue="TEST23" required name="image" type="text" />
            <label>Publisher</label>
            <input
              defaultValue="TEST23"
              required
              name="publisher"
              type="text"
            />
            <label>Prep time</label>
            <input
              defaultValue="23"
              required
              name="cookingTime"
              type="number"
            />
            <label>Servings</label>
            <input defaultValue="23" required name="servings" type="number" />
          </div>

          <div className={classes.column}>
            <h3 className="heading">Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              defaultValue="0.5,kg,Rice"
              type="text"
              required
              name="ingredient-1"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 2</label>
            <input
              defaultValue="1,,Avocado"
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 3</label>
            <input
              defaultValue=",,salt"
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 4</label>
            <input
              type="text"
              name="ingredient-4"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 5</label>
            <input
              type="text"
              name="ingredient-5"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 6</label>
            <input
              type="text"
              name="ingredient-6"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
          </div>

          <div className={classes.button}>
            <Button type="submit" small>
              <svg>
                <use href="src/assets/icons.svg#icon-upload-cloud"></use>
              </svg>
              <span>Upload</span>
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddRecipe;
