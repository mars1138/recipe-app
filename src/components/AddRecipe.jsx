import { Fragment, useState, useContext } from 'react';
import { motion } from 'framer-motion';

import Backdrop from '../UI-elements/Backdrop';
import Button from '../UI-elements/Button';
import LoadingSpinner from '../UI-elements/LoadingSpinner';
import SiteContext from '../components/store/site-context';
import { useHttpRequest } from '../components/hooks/http-hook';
import classes from './AddRecipe.module.css';

const AddRecipe = (props) => {
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
    const dataArray = [...new FormData(e.target)];
    const data = Object.fromEntries(dataArray);

    const ingredients = Object.entries(data)
      .filter((entry) => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map((ing) => {
        const ingArr = ing[1].split(',').map((el) => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format.  Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

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

  return (
    <Fragment>
      <Backdrop onClick={props.onClose} />
      <motion.div
        className={classes['add-recipe']}
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
      </motion.div>
    </Fragment>
  );
};

export default AddRecipe;
