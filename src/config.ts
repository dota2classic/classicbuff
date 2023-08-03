// export const local = process.env.DEV === "true";
export const local = false;

// export const PROD_URL = "http://localhost:6001";
export const PROD_URL = process.env.NEXT_PUBLIC_API_URL as string;

// export const WSS_PROD_URL = "ws://localhost:5010";
export const WSS_PROD_URL = process.env.NEXT_PUBLIC_WS_URL as string;
// export const WSS_PROD_URL = 'ws://5.101.51.116'
