import React, { ReactElement, useEffect, useState } from "react";
import Blocks from "../Blocks.tsx";
import Button from "../Button.tsx";
// import { useLocation } from "react-router-dom";

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
  let [customDesc, setCustomDesc] = useState<string>("? second per set");

  // const locate = useLocation();
  // useEffect(() => {
  // }, []);

  // // pass to the timer -- & store in backend things?
  // let [data, setData] = useState<DataType>({
  //   workoutName: 'empty',
  //   secondsPerSet: '0',
  //   numSets: '0',
  // });

  return (
    <>
      <div className="caption">{text}</div>
      <div className="flex-row center-contents default-div" style={{ marginBottom: "2em" }}>
        <Blocks color="#B9D2E7" margin="0em auto 0em auto" value={shortDesc.split(" ")[0]} text="Short" description={shortDesc} setText={setText} setShortDesc={setShortDesc} setMedDesc={setMedDesc} setLongDesc={setLongDesc} setCustomDesc={setCustomDesc} />
        <Blocks color="#85AFD1" margin="0em auto 0em auto" value={medDesc.split(" ")[0]} text="Medium" description={medDesc} setText={setText} setShortDesc={setShortDesc} setMedDesc={setMedDesc} setLongDesc={setLongDesc} setCustomDesc={setCustomDesc} />
      </div>
      <div className="flex-row center-contents default-div" style={{ marginBottom: "2em" }}>
        <Blocks color="#7AADD6" margin="0em auto 0em auto" value={longDesc.split(" ")[0]} text="Long" description={longDesc} setText={setText} setShortDesc={setShortDesc} setMedDesc={setMedDesc} setLongDesc={setLongDesc} setCustomDesc={setCustomDesc} />
        {/* <Blocks color="#467AA3" margin="0em auto 0em auto" value={customDesc.split(" ")[0]} text="Custom" description={customDesc} setText={setText} setShortDesc={setShortDesc} setMedDesc={setMedDesc} setLongDesc={setLongDesc} setCustomDesc={setCustomDesc} /> */}
      </div>
      {/* <Button location={"/"} margin={"auto"} type={"thin-rect-button"} text={"Restart"} /> */}
    </>
  );
}

export default Customs;