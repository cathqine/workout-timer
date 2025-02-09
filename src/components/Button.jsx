import React from 'react';
import { Link } from 'react-router-dom';

// centered button, actually
const Button = (props) => {
  let location = props.page;
  if (!props.disabled) {
    location = props.location;
  }
  return (
    <Link to={location} style={{ textDecoration: 'none', margin: `${props.margin}` }}>
      <div className={`button-grow center-contents ${props.type}`}>
        {props.text}
      </div>
    </Link>
  )
}
export default Button;