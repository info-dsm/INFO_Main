import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Success } from "ui";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "INFO/Components",
  component: Success,
  parameters: {
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Success>;

const Template: ComponentStory<typeof Success> = (args) => (
  <Success {...args} />
);
export const SuccessQ = Template.bind({});
SuccessQ.args = {
  text: "",
};
