import React, { ReactElement, useEffect, useState } from "react";
import Blocks from "../Blocks.tsx";

// consider moving to another file instead
interface DataType {
  workoutName: string,
  secondsPerSet: string,
  numSets: string,
}

// consider form submission type - before moving and and displaying a different view
const Customs = (): ReactElement => {
  let [text, setText] = useState<string>("Choose your set time");
  let [shortDesc, setShortDesc] = useState<string>("30 second per set");
  let [medDesc, setMedDesc] = useState<string>("40 second per set");
  let [longDesc, setLongDesc] = useState<string>("50 second per set");

  useEffect(() => {
    setText("Select total number of sets");
  }, []);

  // pass to the timer -- & store in backend things?
  let [data, setData] = useState<DataType>({
    workoutName: 'empty',
    secondsPerSet: '0',
    numSets: '0',
  });

  return (
    <>
      {/* HARDCODED -- think about {text} */}
      <div className="caption">{text}</div>
      <div className="flex-row center-contents default-div" style={{ marginBottom: "2em" }}>
        <Blocks location="/workout-start-0" margin="0em auto 0em auto" text="Short" description={shortDesc} />
        <Blocks location="/workout-start-0" margin="0em auto 0em auto" text="Medium" description={medDesc} />
      </div>
      {/* HARDCODED !!!!!!! */}
      <div className="flex-row center-contents default-div" style={{ marginBottom: "2em" }}>
        <Blocks location="/workout-start-0" margin="0em auto 0em auto" text="Long" description={longDesc} />
        <Blocks location="/workout-start-0" margin="0em auto 0em auto" text="Custom" description="? second per set" />
      </div>
    </>
  );
}

export default Customs;