import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Password } from "ui";
import styled from "styled-components";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "INFO/Components",
  component: Password,
  parameters: {
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Password>;

const Template: ComponentStory<typeof Password> = (args) => {
  return <Password {...args} />;
};
export const Pass = Template.bind({});
Pass.args = {
  placeholder: "",
  error: false,
};
Pass.storyName = "Password";
