export interface Page<T> {
  data: T[];
  page: number;
  pages: number;
}

export const BaseGQLConfig = {
  pollInterval: 5000
};

export const colors = {
  darkBg: "#15191d",
  evenDarkerBg: "#101213",
  almostBlack: "#0a0909",
  primaryText: "rgb(217,217,217)",
  primaryTextHighlight: "rgb(238,238,238)",
  primaryTextDark: "rgb(131,130,130)",
  primaryTextDark2: "rgb(83,82,82)",
  transparentTint: "rgba(65,168,252,0.15)",
  transparentTint2: "rgba(65,168,252,0.01)",
  blueHighlight: "rgb(77,169,243)",
  error: "rgb(198,38,38)",

  dota: {
    green: "#92a525",
    red: "#c23c2a"
  },

  roles: {
    old: "#8d178d",
    human: "#cda71b",
    moderator: "#335ae7",
    admin: "#c10303"
  }
};
