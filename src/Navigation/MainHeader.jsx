import Button from '../UI-elements/Button';
import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <img src="src/assets/logo.png" alt="Logo" className={classes.logo} />
      <form className={classes.search}>
        <input
          className={classes.field}
          type="text"
          placeholder="Search over 1,000,000 recipes..."
        />
        <Button type="submit">Search</Button>
      </form>
      <Navigation />
    </header>
  );
};

export default MainHeader;
