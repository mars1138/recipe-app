import Button from '../UI-elements/Button';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul className={classes['nav-list']}>
        <li>
          <Button navButton>
            <svg>
              <use href="src/assets/icons.svg#icon-edit"></use>
            </svg>
            <span>Add Recipe</span>
          </Button>
        </li>
        <li>
          <Button navButton>
            <svg>
              <use href="src/assets/icons.svg#icon-smile"></use>
            </svg>
            <span>Bookmarks</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
