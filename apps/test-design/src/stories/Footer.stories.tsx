import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Footer } from "ui";
export default {
  title: "INFO/Footer",
  component: Footer,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => <Footer />;
export const HeaderUi = Template.bind({});
HeaderUi.storyName = "DefaultFooter";
