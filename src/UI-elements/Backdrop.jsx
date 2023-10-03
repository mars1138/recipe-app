import ReactDom from 'react-dom';

import classes from './Backdrop.module.css';

const Backdrop = (props) => {
  return ReactDom.createPortal(
    <div className={classes.backdrop} onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
