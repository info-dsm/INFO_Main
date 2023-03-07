import { Logo } from "ui";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";
const _Table = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: 200px;
  height: 200px;
  div {
    margin: 20px;
  }
`;
export default {
  title: "INFO/Components",
  component: _Table,
  argTypes: {
    backgroundColor: { control: "color", default: "#000" },
  },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof _Table>;
const Template: ComponentStory<typeof _Table> = (args) => {
  const arr: { main: boolean; onClick: () => void; key: string }[] = [
    { main: true, onClick: () => console.log("메인입니다."), key: "main" },
    { main: false, onClick: () => console.log("서브입니다."), key: "sub" },
  ];
  return (
    <_Table {...args}>
      {arr.map((item: { main: boolean; onClick: () => void; key: string }) => (
        <Logo {...item} />
      ))}
    </_Table>
  );
};
export const LogoUi = Template.bind({});
LogoUi.storyName = "Logo";
