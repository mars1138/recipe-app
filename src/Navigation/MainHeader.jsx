// import Button from '../UI-elements/Button';
import Search from './Search';
import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <img src="src/assets/logo.png" alt="Logo" className={classes.logo} />
      <Search searchRecipe={props.searchRecipe} />
      <Navigation addRecipe={props.addRecipe} />
    </header>
  );
};

export default MainHeader;
