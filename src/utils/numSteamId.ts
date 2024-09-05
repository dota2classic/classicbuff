export const steamIdToNum = (steamId: string) => {
  // return parseInt(steamId.substring(1, steamId.length - 1).split(":")[2]);
  console.log("Dont parse steamid here", steamId);
  return parseInt(steamId);
};

// [U:1:1093914365]

export const numToSteamId = (num: number | string) => {
  return `${num}`;
};
