import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface BlocksType {
  text: string;
  description: string;
  margin: string;
  location: string;
}

const Blocks = (props: BlocksType): ReactElement => {
  // let location = props.page;
  // if (!props.disabled) {
  let location = props.location;
  // }
  // implement onClick functionality (think <button>)
  let redirectWithContents = () => {

  }

  return (
    <>
      <Link to={location} style={{ textDecoration: 'none', margin: `${props.margin}` }}>
        <div className="center-contents" style={{ margin: `${props.margin}`, height: "10em", width: "14em", backgroundColor: "#BAD5DD", display: "flex", flexDirection: "column" }}>
          <div className="default-div" style={{ color: "white", backgroundColor: "transparent", marginBottom: "0.7em", fontSize: "2em" }}>{props.text}</div>
          <div className="default-div" style={{ color: "white", backgroundColor: "transparent" }}>{props.description}</div>
        </div>
      </Link>
    </>
  );
}

export default Blocks;