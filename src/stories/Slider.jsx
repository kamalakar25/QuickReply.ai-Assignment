import ContinousSlider from "../Components/Slider/ContinousSlider";
import RangeSlider from "../Components/Slider/RangeSlider";
import DiscreteSlider from "../Components/Slider/DiscreteSlider";

function Slider({ type, ...otherProps }) {
  switch (type) {
    case "Continuous":
      return <ContinousSlider {...otherProps} />;
    case "Discrete":
      return <DiscreteSlider {...otherProps} />;
    case "Range":
      return <RangeSlider {...otherProps} />;
    default:
      throw new Error("Invalid Slider type");
  }
}

export default Slider;
