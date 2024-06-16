import { useState } from "react";
import "./App.css";
import RangeSlider from "./Components/Slider/RangeSlider";
import ContinousSlider from "./Components/Slider/ContinousSlider";
import DiscreteSlider from "./Components/Slider/DiscreteSlider";

function App() {
  const [value, setValue] = useState(0);
  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <ContinousSlider
          min={0}
          max={100}
          rangeValue={value}
          onChange={(v) => {
            setValue(v);
          }}
          step={1}
        />
        <DiscreteSlider
          min={0}
          max={100}
          rangeValue={value}
          onChange={(v) => {
            setValue(v);
          }}
          step={10}
        />
        {/* <Slider
        /> */}
        <RangeSlider min={0} max={100} onChange={(v) => setValue(v)} />
      </div>
    </>
  );
}

export default App;
