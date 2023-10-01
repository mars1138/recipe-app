import classes from './Button.module.css';

const Button = (props) => {
  const buttonClasses = `${
    !props.navButton && !props.pagination && classes.btn
  } ${props.inverse && classes.inverse} ${props.disabled && classes.disabled} ${
    props.navButton && classes['btn-nav']
  } ${props.pagination && classes['btn-pagination']}`;

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
