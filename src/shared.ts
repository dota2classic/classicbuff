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
  primaryText: "rgb(217,217,217)",
  primaryTextHighlight: "rgb(238,238,238)",
  primaryTextDark: "rgb(131,130,130)",
  primaryTextDark2: "rgb(83,82,82)",
  transparentTint: "rgba(65,168,252,0.15)",
  error: "rgb(198,38,38)",

  roles: {
    old: "#800080",
    human: "#cda71b",
    moderator: "#335ae7",
    admin: "#c10303"
  }
};
