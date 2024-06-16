/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

function DiscreteSlider({
  onChange,
  status,
  size,
  rangeValue,
  min,
  max,
  step,
}) {
  const [progressBar, setProgressBar] = useState(0);
  const sliderRef = useRef();
  const customSliderRef = useRef();
  const discreteSliderRef = useRef();
  const [thumbPosition, setThumbPosition] = useState();
  let dicretePoints = 0;
  function updateProgressBar() {
    const percentage = Math.floor(((rangeValue - min) / (max - min)) * 100);
    setProgressBar(percentage);
  }
  if (customSliderRef.current) {
    const totalRange = max - min;
    const stepDistance = step / totalRange;
    dicretePoints =
      Math.floor(stepDistance * sliderRef.current.offsetWidth) - 2;
  }

  function updateThumbPosition() {
    const sliderWidth = sliderRef.current.offsetWidth;
    const customThumbWidth = customSliderRef.current.offsetWidth;

    const percentage = ((rangeValue - min) / (max - min)) * 100;
    const position = (percentage / 100) * (sliderWidth - customThumbWidth);
    if (position <= 0) {
      setThumbPosition(0);
    } else setThumbPosition(position);
  }
  function handleChange(e) {
    const { value } = e.target;
    onChange(+value);
    updateThumbPosition();
  }
  useEffect(() => {
    updateProgressBar();
    updateThumbPosition();
  }, [rangeValue]);
  return (
    <>
      {/* <h3>{rangeValue}</h3> */}
      <div className="slider-container">
        <input
          ref={sliderRef}
          type="range"
          className={`slider slider-size-${size} slider-${status}`}
          min={min}
          max={max}
          value={rangeValue}
          onChange={handleChange}
          step={step}
        />
        <div
          className={`thumb thumb-size-${size}`}
          ref={customSliderRef}
          style={{ transform: `translateX(${thumbPosition}px)` }}
        ></div>
        <div
          className="tooltip"
          style={{ transform: `translateX(${thumbPosition}px)` }}
        >
          {rangeValue || 0}
        </div>
        {/* <div
          className="absolute w-6 h-6 rounded-full pointer-events-none  z-30 bg-white  shadow-md flex items-center justify-center
           before:content-[''] before:w-3 before:h-3 before:bg-green-400 before:z-50 before:rounded-full hover:before:cursor-pointer  "
        ></div> */}
        <div className="discrete-slider" ref={discreteSliderRef}>
          {Array(Math.floor(max / step))
            .fill("")
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className={`slider-dot ${thumbPosition > dicretePoints * index ? "slider-dot-white" : null}`}
                  style={{
                    left: `${dicretePoints * index}px`,
                  }}
                ></div>
              );
            })}
        </div>
        <div
          style={{ width: progressBar + "%" }}
          className={`progress-bar`}
        ></div>
      </div>
    </>
  );
}

export default DiscreteSlider;
