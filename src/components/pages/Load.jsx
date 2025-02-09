import Button from "../Button";

const Load = () => {
  return (
    <>
      <div className="caption">Select:</div>
      <Button type="thick-rect-button" margin="1em auto 0 auto" location="/" text="New Workout" />
      <Button type="thick-rect-button" margin="3em auto 0 auto" location="/load-workouts" text="Load Workout" />
    </>
  );
}

export default Load;