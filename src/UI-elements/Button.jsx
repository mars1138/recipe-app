import classes from './Button.module.css';

const Button = (props) => {
  const buttonClasses = `${
    !props.navButton &&
    !props.pagination &&
    !props.tiny &&
    !props.round &&
    !props.modalClose &&
    classes.btn
  } ${props.small && classes.small} ${props.inverse && classes.inverse} ${
    props.disabled && classes.disabled
  } ${props.navButton && classes.nav} ${
    props.pagination && classes.pagination
  } ${props.tiny && classes.tiny} ${props.round && classes.round} ${
    props.modalClose && classes['modal-close']
  }`;

  return (
    <button
      className={buttonClasses}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
