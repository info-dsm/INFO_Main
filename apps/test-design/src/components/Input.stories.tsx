import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InputText } from "ui";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "INFO/Components",
  component: InputText,
  parameters: {
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof InputText>;

const Template: ComponentStory<typeof InputText> = (args) => (
  <InputText {...args} />
);
export const Input = Template.bind({});
Input.args = {
  placeholder: "",
  error: false,
  onInput: (e) => console.log(e.target.value),
};
