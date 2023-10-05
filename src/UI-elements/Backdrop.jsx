import ReactDom from 'react-dom';
import { motion } from 'framer-motion';

import classes from './Backdrop.module.css';

const Backdrop = (props) => {
  return ReactDom.createPortal(
    <motion.div
      className={classes.backdrop}
      onClick={props.onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backdropFilter: 'blur(1px)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: 'tween', bounce: 0 }}
    ></motion.div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
