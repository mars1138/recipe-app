import Button from '../../UI-elements/Button';
import classes from './Recipe.module.css';

// returns current recipe component that provides link to external site for cooking directions
const Directions = (props) => {
  return (
    <div className={classes.directions}>
      <h2>How to cook it</h2>
      <p className={classes.text}>
        This recipe was carefully designed and tested by&nbsp;
        <span className={classes.publisher}>{props.publisher}</span>. Please
        check out directions at their website.
      </p>
      <a className={classes.link} href={props.link} target="_blank">
        <Button small>
          <span>Directions</span>
          <svg className={classes.icon}>
            <use href="icons.svg#icon-arrow-right"></use>
          </svg>
        </Button>
      </a>
    </div>
  );
};

export default Directions;
