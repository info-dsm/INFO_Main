import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button, MiniButton } from "ui";
import styled from "styled-components";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "INFO/Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Button>;
const _Spacing = styled.div`
  div {
    margin-bottom: 10px;
  }
`;
export const lessButton: ComponentStory<typeof Button> = () => (
  <>
    <_Spacing>
      <MiniButton size="small" less={5}>
        1
      </MiniButton>
      <MiniButton size="large" less={5}>
        추가
      </MiniButton>
      <Button text={"선도기업"} onClick={() => console.log("as")}></Button>
    </_Spacing>
  </>
);
lessButton.storyName = "less";
export const RoundButton: ComponentStory<typeof Button> = () => (
  <>
    <_Spacing>
      <MiniButton size="small" less={20}>
        1
      </MiniButton>
      <MiniButton size="large" less={20}>
        추가
      </MiniButton>
    </_Spacing>
  </>
);
RoundButton.storyName = "round";
