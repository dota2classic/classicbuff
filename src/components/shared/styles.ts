import { darken } from "polished";

export const colors = {
  common: {
    menu: "#324B5D",
    background: "#F8FAFB"
  },

  frame: {
    stroke: "#BDCFDB",
    bar: "#DEE7ED",
    tiling: "#E8EEF3",
    card: "#FFFFFF"
  },

  text: {
    header: "#2D4353",
    main: "#121B21",
    secondary: "#7B8F9D",
    white: "#F3F9FB"
  },

  icon: {
    enable: "#324B5D",
    secondary: "#9CB6C9",
    white: "#F3F9FB"
  },

  button: {
    main: "#0071C2",
    main_disable: "#BAD4E6",
    secondary: "#84C7F7",
    attention: "#F44336"
  },

  stroke: {
    secondary: "#CDDBE4"
  },

  // fixme: unused color => remove func
  createHover: (color: string) => darken(0.1, colors.frame.tiling)
};
