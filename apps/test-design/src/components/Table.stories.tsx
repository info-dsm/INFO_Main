import React, { useState, useCallback } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Toast } from "ui";
export default {
  title: "INFO/Components",
  component: Toast,
} as ComponentMeta<typeof Toast>;
const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;
export const TableUi = Template.bind({});
TableUi.storyName = "Toast";
TableUi.args = {
  children: "안녕하세요",
};
