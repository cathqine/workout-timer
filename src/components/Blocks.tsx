import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BlocksType {
  text: string;
  value: string;
  description: string;
  margin: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setShortDesc: React.Dispatch<React.SetStateAction<string>>;
  setMedDesc: React.Dispatch<React.SetStateAction<string>>;
  setLongDesc: React.Dispatch<React.SetStateAction<string>>;
  setCustomDesc: React.Dispatch<React.SetStateAction<string>>;
}

// consider moving to another file instead
// interface DataType {
//   workoutName: string,
//   secondsPerSet: string,
//   numSets: string,
// }

const Blocks = (props: BlocksType): ReactElement => {
  /*const [data, setData] = useState<DataType>({
    workoutName: '',
    secondsPerSet: '',
    numSets: '',
  });*/

  // const [secondsPerSet, setSecondsPerSet] = useState<string>('');
  // const [numSets, setNumSets] = useState<string>('');
  // const [type, setType] = useState<string>('time');

  // let location = props.page;
  // if (!props.disabled) {
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('seconds per set', '');
    localStorage.setItem('num sets', '');
  }, []);

  /* USES LOCAL STORAGE FOR IMMEDIATE EFFECTS */
  let redirectWithContents = () => {
    // collect data from stuff
    const val = props.value;
    if (localStorage.getItem('seconds per set') === '') {
      // setSecondsPerSet(val);
      // setData(prev => ({ ...prev, secondsPerSet: val }));
      localStorage.setItem('seconds per set', val);
      props.setText("Select total number of sets");
      props.setShortDesc("4 sets");
      props.setMedDesc("8 sets");
      props.setLongDesc("12 sets");
      props.setCustomDesc("? sets");
    } else if (localStorage.getItem('num sets') === '') {
      // setData(prev => ({ ...prev, numSets: val }));
      // setNumSets(val);
      localStorage.setItem('num sets', val);
      navigate("/new-workout");
    }
  }

  return (
    <>
      <button style={{ textDecoration: 'none', margin: `${props.margin}` }} onClick={() => redirectWithContents()}>
        <div className="center-contents" style={{ margin: `${props.margin}`, height: "10em", width: "14em", backgroundColor: "#BAD5DD", display: "flex", flexDirection: "column" }}>
          <div className="default-div" style={{ color: "white", backgroundColor: "transparent", marginBottom: "0.7em", fontSize: "2em" }}>{props.text}</div>
          <div className="default-div" style={{ color: "white", backgroundColor: "transparent" }}>{props.description}</div>
        </div>
      </button>
    </>
  );
}

export default Blocks;