// import Button from '../UI-elements/Button';
import Search from './Search';
import Navigation from './Navigation';
import classes from './MainHeader.module.css';
// import Button from '../UI-elements/Button';

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <img src="logo.png" alt="Logo" className={classes.logo} />
      <Search searchRecipe={props.searchRecipe} />
      <Navigation addRecipe={props.addRecipe} />
      {/* <Button small inverse>JS Website</Button> */}
    </header>
  );
};

export default MainHeader;
