/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LittleSelectComplete } from "ui";
export default {
  title: "INFO/Components",
  component: LittleSelectComplete,
} as ComponentMeta<typeof LittleSelectComplete>;

export const SelectUi: ComponentStory<typeof LittleSelectComplete> = () => {
  const [now, setNow] = useState<string>("기본");
  const changeIndex = useCallback(
    (item: string) => {
      setNow(item);
    },
    [now, setNow]
  );
  return (
    <>
      <LittleSelectComplete
        now={now}
        list={["기본", "년도 검색"]}
        onClick={changeIndex}
      />
    </>
  );
};
SelectUi.storyName = "Select";
