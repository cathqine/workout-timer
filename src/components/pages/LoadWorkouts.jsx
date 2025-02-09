import Button from "../Button";

const LoadWorkouts = () => {
  let nums = [0, 1, 2, 3]; // currently hardcoded
  return (
    <>
      <div className="caption">Load Workout</div>
      <div className="load-workout-container flex-col">
        <Button type="load-workout-button" location={`/workout-start-${nums[0]}`} text={`Workout ${nums[0]}`} />
        <Button type="load-workout-button" margin="1em 0em 0em 0em" location={`/workout-start-${nums[0]}`} text={`Workout ${nums[1]}`} />
        <Button type="load-workout-button" margin="1em 0em 0em 0em" location={`/workout-start-${nums[0]}`} text={`Workout ${nums[2]}`} />
        <Button type="load-workout-button" margin="1em 0em 0em 0em" location={`/workout-start-${nums[0]}`} text={`Workout ${nums[3]}`} />
        {/* <Button type="load-workout-button" top="1em" location={`/workout-start-${nums[0]}`} text={`Workout ${nums[0]}`} /> */}
      </div>
    </>
  );
}

export default LoadWorkouts;