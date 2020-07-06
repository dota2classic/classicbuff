export const steamIdToNum = (steamId: string) => {
  return parseInt(steamId.substring(1, steamId.length - 1).split(":")[2]);
};

// [U:1:1093914365]

export const numToSteamId = (num: number) => {
  return `[U:1:${num}]`;
};
