import { fn } from "@storybook/test";
import { useArgs } from "@storybook/preview-api";
import Slider from "./Slider";
import { func } from "prop-types";
import RangeSlider from "../Components/Slider/RangeSlider";

export default {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { onChange: fn() },
  argTypes: {
    type: {
      control: {
        type: "radio",
      },
      options: ["Continuous", "Discrete", "Range"],
    },
    status: {
      type: {
        control: { type: "radio" },
      },
      options: ["default", "hover", "focus"],
    },
    size: {
      type: {
        control: { type: "radio" },
      },
      options: ["24", "32"],
    },
  },
};

const Template = (args) => {
  const [{ rangeValue }, updateArgs] = useArgs(0);
  function onChange(newValue) {
    updateArgs({ rangeValue: newValue });
  }
  return <Slider {...args} onChange={onChange} rangeValue={rangeValue} />;
};

export const Continuous = Template.bind({});
Continuous.args = {
  type: "Continuous",
  min: 0,
  max: 100,
  step: 1,
  // Other continuous slider props
};

export const Discrete = Template.bind({});
Discrete.args = {
  type: "Discrete",
  min: 0,
  max: 100,
  step: 10,
  // Other discrete slider props
};

export const Range = Template.bind({});
Range.args = {
  type: "Range",
  min: 0,
  max: 100,
  step: 1,
};
