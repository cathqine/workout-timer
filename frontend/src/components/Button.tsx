import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface PropsType {
  location: string;
  margin: string;
  type: string;
  text: string;
}
// centered button, actually
const Button = (props: PropsType): ReactElement => {
  // let location = props.page;
  // if (!props.disabled) {
  let location = props.location;
  // }
  return (
    <Link to={location} style={{ textDecoration: 'none', margin: `${props.margin}` }}>
      <div className={`button-grow center-contents ${props.type}`}>
        {props.text}
      </div>
    </Link>
  )
}
export default Button;