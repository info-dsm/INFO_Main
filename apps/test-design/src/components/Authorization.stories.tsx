import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AuthorizationInput } from "ui";
import styled from "styled-components";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "INFO/Components",
  component: AuthorizationInput,
  parameters: {
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AuthorizationInput>;

const Template: ComponentStory<typeof AuthorizationInput> = (args) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(true);
  const onFocus = () => {
    setError(false);
    console.log("focus");
  };
  return (
    <AuthorizationInput
      {...{ ...args, value, error, onFocus }}
      onInput={(e) => setValue(e.target.value)}
    />
  );
};
export const Input = Template.bind({});
Input.args = {
  placeholder: "",
  aut: "",
  onClick: () => console.log(""),
  comment: "잘못된 이메일입니다.",
};
Input.storyName = "Authorization";
