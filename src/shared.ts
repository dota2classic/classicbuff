export interface Page<T> {
  data: T[];
  page: number;
  pages: number;
}

export const colors = {
  darkBg: "#0c0c0c",
  darkBg2: "#1c2024",
  evenDarkerBg: "#101213",
  almostBlack: "#0a0909",
  primaryText: "rgb(217,217,217)",
  primaryTextTint: "rgb(207,207,207)",
  primaryTextHighlight: "rgb(238,238,238)",
  primaryTextDark: "rgb(131,130,130)",
  primaryTextDark2: "rgb(83,82,82)",
  transparentTint: "rgba(65,168,252,0.15)",
  transparentTint2: "rgba(65,168,252,0.01)",
  transparentTint3: "rgba(65,168,252,0.05)",
  blueHighlight: "rgb(77,169,243)",
  blueHighlight2: "rgb(77,169,243, 0.5)",
  error: "rgb(198,38,38)",

  dota: {
    green: "#92a525",
    red: "#c23c2a"
  },

  position: {
    background: {
      gold: "#AF9500",
      silver: "#D7D7D7",
      bronze: "#6A3805",
      shit: "#101213"
    },
    foreground: {
      // gold: "rgb(238,238,238)",
      gold: "#AF9500",
      // silver: "rgb(238,238,238)",
      silver: "#D7D7D7",
      // bronze: "rgb(238,238,238)",
      bronze: "#91500d",
      shit: "rgb(83,82,82)"
    }
  },

  roles: {
    old: "#8d178d",
    human: "#cda71b",
    moderator: "#335ae7",
    admin: "#c10303"
  }
};
