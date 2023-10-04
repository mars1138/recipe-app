import classes from './Preview.module.css';

const Preview = (props) => {
  return (
    <li className={classes.preview}>
      <a href="#23456">
        <figure>
          <img src="src/assets/test-1.jpg" alt="Test" />
        </figure>
        <div className={classes.data}>
          <h4>Pasta with Tomato Cream ...</h4>
          <p>The Pioneer Woman</p>
          <div className={classes['user-created']}>
            <svg>
              <use href="src/assets/icons.svg#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
};

export default Preview;
