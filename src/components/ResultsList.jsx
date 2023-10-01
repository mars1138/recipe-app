import classes from './ResultsList.module.css';

const ResultsList = () => {
  return (
    <ul className={classes.list}>
      <li className="preview">
        <a className="preview__link preview__link--active" href="#23456">
          <figure className="preview__fig">
            <img src="src/assets/test-1.jpg" alt="Test" />
          </figure>
          <div className="preview__data">
            <h4 className="preview__title">Pasta with Tomato Cream ...</h4>
            <p className="preview__publisher">The Pioneer Woman</p>
            <div className="preview__user-generated">
              <svg>
                <use href="src/assets/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    </ul>
  );
};

export default ResultsList;
