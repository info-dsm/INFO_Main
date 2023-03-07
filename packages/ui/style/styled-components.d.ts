import "styled-components";
type MainKey =
  | "black"
  | "black40"
  | "black50"
  | "black60"
  | "black80"
  | "blue"
  | "indigo"
  | "cobalt"
  | "white"
  | "red"
  | "gray"
  | "gray2"
  | "pink"
  | "skeleton"
  | "violet";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [key in MainKey]: string;
    };
    graduation: string;
  }
}
