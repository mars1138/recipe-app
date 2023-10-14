import { useRef } from 'react';
import Button from '../UI-elements/Button';

import classes from './Search.module.css';

const Search = (props) => {
  const inputRef = useRef();

  return (
    <form
      className={classes.search}
      onSubmit={(e) => {
        e.preventDefault();
        props.searchRecipe(inputRef.current.value);
      }}
    >
      <input
        className={classes.field}
        type="text"
        placeholder="Search over 1,000,000 recipes..."
        ref={inputRef}
      />
      <Button type="submit">
        <svg>
          <use href="src/assets/icons.svg#icon-search"></use>
        </svg>
        Search
      </Button>
    </form>
  );
};

export default Search;
