import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Header } from "ui";
import { Logo } from "ui";
export default {
  title: "INFO/Header",
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <Header {...args}>
    <Logo main={true} onClick={() => console.log("logo")} key="main" />
  </Header>
);
export const HeaderUi = Template.bind({});
HeaderUi.args = {
  bgColor: "#fff",
  admin: true,
  menu: [
    {
      onClick: () => console.log("모집공고"),
      key: "모집공고",
      selected: true,
    },
    {
      onClick: () => console.log("회사"),
      key: "회사",
      selected: false,
    },
  ],
};
HeaderUi.storyName = "DefaultHeader";

// export const LoggedIn = Template.bind({});
// LoggedIn.args = {
//   user: {
//     name: "Jane Doe",
//   },
// };

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};
