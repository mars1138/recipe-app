import { Fragment, useState, useContext } from 'react';
import { motion } from 'framer-motion';

import Backdrop from '../UI-elements/Backdrop';
import Button from '../UI-elements/Button';
import LoadingSpinner from '../UI-elements/LoadingSpinner';
import Modal from '../UI-elements/Modal';
import SiteContext from '../components/store/site-context';
import { useHttpRequest } from '../components/hooks/http-hook';
import classes from './AddRecipe.module.css';

// returns window with form to create new recipe, with backdrop
const AddRecipe = (props) => {
  const [formError, setFormError] = useState();
  const { isSubmitting, error, sendRequest, clearError } = useHttpRequest();
  const siteCtx = useContext(SiteContext);

  const createRecipeObject = (data) => {
    const { recipe } = data.data;

    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }),
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormError(null);
    const dataArray = [...new FormData(e.target)];
    const data = Object.fromEntries(dataArray);
    let ingredients;

    try {
      // ingredient fields must follow string format of 'Quantity,Unit,Description', with no spaces after commas
      ingredients = Object.entries(data)
        .filter((entry) => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map((ing, i) => {
          const ingArr = ing[1].split(',').map((el) => el.trim());
          if (ingArr.length !== 3) throw new Error(`${i}`);

          const [quantity, unit, description] = ingArr;
          return { quantity: quantity ? +quantity : null, unit, description };
        });
    } catch (err) {
      setFormError(+err.message);
      return;
    }

    const recipe = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
      ingredients,
    };

    const url = `${import.meta.env.VITE_API_URL}?key=${
      import.meta.env.VITE_KEY
    }`;

    const returnData = await sendRequest(url, recipe);
    const returnRecipe = createRecipeObject(returnData);

    siteCtx.setCurrentRecipe(returnRecipe);
    siteCtx.toggleBookmark(returnRecipe.id);
  };

  const addClasses = `${classes['add-recipe']} ${
    error && classes['add-error']
  }`;

  return (
    <Fragment>
      {error && (
        <Modal header="Error: Unable to save recipe!" onClose={clearError}>
          {error.message}
        </Modal>
      )}
      <Backdrop onClick={props.onClose} />
      <motion.div
        className={addClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, type: 'tween' }}
      >
        <h1>Add Recipe</h1>
        <Button modalClose onClick={props.onClose}>
          &times;
        </Button>
        {isSubmitting && (
          <div className={classes.spinner}>
            <LoadingSpinner />
          </div>
        )}
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
              className={formError + 1 === 1 ? classes.alert : ''}
              defaultValue="0.5,kg,Rice"
              type="text"
              required
              name="ingredient-1"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 2</label>
            <input
              className={formError + 1 === 2 ? classes.alert : ''}
              defaultValue="1,,Avocado"
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 3</label>
            <input
              className={formError + 1 === 3 ? classes.alert : ''}
              defaultValue=",,salt"
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 4</label>
            <input
              className={formError + 1 === 4 ? classes.alert : ''}
              type="text"
              name="ingredient-4"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 5</label>
            <input
              className={formError + 1 === 5 ? classes.alert : ''}
              type="text"
              name="ingredient-5"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 6</label>
            <input
              className={formError + 1 === 6 ? classes.alert : ''}
              type="text"
              name="ingredient-6"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
          </div>

          <div className={classes.error}>
            {formError && (
              <p>{`Wrong ingredient format in ingredient #${
                +formError + 1
              }.  Please use the correct format: 'Qty,Unit,Description'`}</p>
            )}
            {!formError && <p>&nbsp;</p>}
          </div>

          <div className={classes.button}>
            <Button type="submit" small>
              <svg>
                <use href="icons.svg#icon-upload-cloud"></use>
              </svg>
              <span>Upload</span>
            </Button>
          </div>
        </form>
      </motion.div>
    </Fragment>
  );
};

export default AddRecipe;
