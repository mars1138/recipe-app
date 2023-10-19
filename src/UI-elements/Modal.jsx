import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';
import Button from '../UI-elements/Button';
import classes from './Modal.module.css';

const ModalOverlay = (props) => {
  // optional footer can be used if different layout desired
  const content = (
    <div className={classes.modal}>
      <h2 className={classes.header}>{props.header}</h2>
      <div className={classes.message}>{props.children}</div>
      {props.footer && <div>{props.footer}</div>}
      {!props.footer && (
        <div className={classes.footer}>
          <Button small onClick={props.onClose}>
            Close
          </Button>
        </div>
      )}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  // Backdrop is optional, via props
  return (
    <Fragment>
      {props.backdrop && <Backdrop onClick={props.onClose} />}
      {<ModalOverlay {...props} />}
    </Fragment>
  );
};

export default Modal;
