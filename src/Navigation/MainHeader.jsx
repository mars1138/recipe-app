import Search from './Search';
import Navigation from './Navigation';
import classes from './MainHeader.module.css';

// returns header component
const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <img src="logo.png" alt="Logo" className={classes.logo} />
      <Search searchRecipe={props.searchRecipe} />
      <Navigation addRecipe={props.addRecipe} />
    </header>
  );
};

export default MainHeader;
