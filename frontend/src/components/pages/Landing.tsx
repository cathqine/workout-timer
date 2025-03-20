import React, { ReactElement } from "react";
import Button from "../Button.tsx";

const Landing = (): ReactElement => {
  return (
    <>
      <p style={{ marginTop: "2.5em" }}>It's time</p>
      <p>to workout!</p>
      <Button type="thin-rect-button" margin="3em auto 0 auto" text="Start" location="/load" />
    </>
  );
}

export default Landing;