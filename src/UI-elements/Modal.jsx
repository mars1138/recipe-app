import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';
import Button from '../UI-elements/Button';
import classes from './Modal.module.css';

const ModalOverlay = (props) => {
  const content = (
    <div className={classes.modal}>
      <h2>{props.header}</h2>
      <div>{props.children}</div>

      {props.footer && <div>{props.footer}</div>}

      {!props.footer && (
        <div>
          <Button onClick={props.onClose}>Close</Button>
        </div>
      )}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onClose} />}
      {props.show && <ModalOverlay {...props} />}
    </Fragment>
  );
};

export default Modal;
