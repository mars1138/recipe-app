import Button from '../../UI-elements/Button';
import classes from './Recipe.module.css';

const Directions = (props) => {
  return (
    <div className={classes.directions}>
      <h2>How to cook it</h2>
      <p className={classes.text}>
        This recipe was carefully designed and tested by
        <span className={classes.publisher}>The Pioneer Woman</span>. Please
        check out directions at their website.
      </p>
      <a
        className={classes.link}
        href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
        target="_blank"
      >
        <Button small>
          <span>Directions</span>
          <svg className={classes.icon}>
            <use href="src/assets/icons.svg#icon-arrow-right"></use>
          </svg>
        </Button>
      </a>
    </div>
  );
};

export default Directions;
