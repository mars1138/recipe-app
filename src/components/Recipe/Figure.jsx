import classes from './Recipe.module.css';

const Figure = (props) => {
  return (
    <figure className={classes.fig}>
      <img src="src/assets/test-1.jpg" alt="Tomato" />
      <h1 className="rassetspe__title">
        <span>Pasta with tomato cream sauce</span>
      </h1>
    </figure>
  );
};

export default Figure;
