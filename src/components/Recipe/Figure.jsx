import classes from './Recipe.module.css';

// returns current recipe image and title
const Figure = (props) => {
  return (
    <figure className={classes.fig}>
      <img src={props.imgUrl} alt={props.title} />
      <h1>
        <span>{props.title}</span>
      </h1>
    </figure>
  );
};

export default Figure;
