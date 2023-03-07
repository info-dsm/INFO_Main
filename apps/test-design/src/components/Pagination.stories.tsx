/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Pagination } from "ui";
export default {
  title: "INFO/Components",
  component: Pagination,
  argTypes: {
    lastIndex: { type: "number", min: 1, step: 4 },
  },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Pagination>;

export const lessPagin: ComponentStory<typeof Pagination> = ({ lastIndex }) => {
  const [nowIndex, setNowIndex] = useState<number>(1);
  const changeIndex = useCallback(
    (index: number) => {
      setNowIndex(index);
    },
    [nowIndex, setNowIndex]
  );
  return (
    <>
      <Pagination
        nowIndex={nowIndex}
        lastIndex={lastIndex}
        changeIndex={changeIndex}
      />
    </>
  );
};
lessPagin.storyName = "Pagination";
