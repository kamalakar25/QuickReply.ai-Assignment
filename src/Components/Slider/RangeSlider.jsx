/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./slider.css";

function RangeSlider({ min, max, onChange, step = 1, size, status }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [leftTooltipPosition, setLeftTooltipPostion] = useState();
  const [rightTooltipPosition, setRightTooltipPostion] = useState();

  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const trackRef = useRef(null);
  function widthPercentage(value) {
    return Math.floor(((value - min) / (max - min)) * 100);
  }

  // function updateThumbPosition() {
  //   const sliderWidth = sliderRef.current.offsetWidth;
  //   const customThumbWidth = customSliderRef.current.offsetWidth;
  //   const percentage = ((rangeValue - min) / (max - min)) * 100;
  //   const position = (percentage / 100) * (sliderWidth - customThumbWidth);
  //   if (position <= 0) {
  //     setThumbPosition(0);
  //   } else setThumbPosition(position);
  // }

  useEffect(() => {
    const widthSweptByLeftThumb = widthPercentage(minVal);

    const widthSweptByRightThumb = widthPercentage(maxVal);
    trackRef.current.style.left = widthSweptByLeftThumb + "%";
    trackRef.current.style.width = `${widthSweptByRightThumb - widthSweptByLeftThumb}%`;
    const leftSliderWidth = minValRef.current.offsetWidth;
    const tooltipPosition = Math.floor(
      (widthSweptByLeftThumb / 100) * leftSliderWidth
    );
    setLeftTooltipPostion(tooltipPosition);
  }, [minVal]);

  useEffect(() => {
    const widthSweptByLeftThumb = widthPercentage(minVal);
    const widthSweptByRightThumb = widthPercentage(maxVal);
    trackRef.current.style.right = widthSweptByRightThumb + "%";
    trackRef.current.style.width = `${widthSweptByRightThumb - widthSweptByLeftThumb}%`;
    const rightSliderWidth = maxValRef.current.offsetWidth;
    const tooltipPosition = Math.floor(
      (widthSweptByRightThumb / 100) * rightSliderWidth
    );
    setRightTooltipPostion(tooltipPosition);
  }, [maxVal]);

  return (
    <>
      <div className="slider-container">
        <input
          ref={minValRef}
          type="range"
          className={`left-thumb  multi-thumb slider thumb-zindex-3 slider-size-${size} slider-${status}`}
          min={min}
          max={max}
          value={minVal}
          step={step}
          onChange={(e) => {
            if (e.target.value < max) {
              const val = Math.min(e.target.value, maxVal - 1);
              setMinVal(val);
            }
          }}
        />
        {/* <div className="left-thumb-container"></div> */}
        <input
          step={step}
          ref={maxValRef}
          type="range"
          className={`right-thumb multi-thumb slider thumb-zindex-4 slider-size-${size} slider-${status}`}
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) => {
            if (e.target.value > minVal) {
              const val = Math.max(+e.target.value, minVal + 1);
              setMaxVal(val);
            }
          }}
        />
        {/* <div
          className="left-thumb left-thumb-size"
          // ref={customSliderRef}
          // style={{ transform: `translateX(${thumbPosition}px)` }}
        ></div>
        <div
          className="left-thumb left-thumb-size"
          // ref={customSliderRef}
          // style={{ transform: `translateX(${thumbPosition}px)` }}
        ></div> */}
        <div
          className="left-tooltip "
          style={{ left: `${leftTooltipPosition}px` }}
        >
          {minVal}
        </div>
        <div
          className="right-tooltip "
          style={{ left: `${rightTooltipPosition}px` }}
        >
          {maxVal}
        </div>
        <div ref={trackRef} className="multi-slider-track"></div>
      </div>
    </>
  );
}

export default RangeSlider;
