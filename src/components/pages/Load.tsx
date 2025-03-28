import React, { ReactElement } from "react";
import Button from "../Button.tsx";

const Load = (): ReactElement => {
  return (
    <>
      <div className="caption">Select:</div>
      <Button type="thick-rect-button" margin="1em auto 0 auto" location="/customs" text="New Workout" />
      <Button type="thick-rect-button" margin="3em auto 0 auto" location="/load" text="Load Workout (Coming soon...)" /> {/* "/load-workouts" */}
    </>
  );
}

export default Load;