import classes from './Search.module.css';

const Search = (props) => {
  return (
    <form className={classes.search}>
      <input
        className={classes.field}
        type="text"
        placeholder="Search over 1,000,000 recipes..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default Search;
