import { css } from "styled-components";

export const color = {
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
  }
};

export const text = {
  button: css`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    /* identical to box height, or 114% */

    color: #c4c4c4;
  `,
  input: {
    text: css`
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      /* identical to box height, or 114% */

      color: #c4c4c4;
    `,
    caption: css`
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;

      color: #c4c4c4;
    `,

    digit: css`
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 14px;
      /* or 100% */

      letter-spacing: 0.05em;
      font-feature-settings: "tnum" on, "lnum" on;

      color: #c4c4c4;
    `,

    tableBlock: css`
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 14px;
      /* identical to box height, or 100% */

      color: #c4c4c4;
    `
  }
};
