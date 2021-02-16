import GoogleAuth from "google-auth-library";
import google from "googleapis";

import { makeDir, readFile, writeFile } from "../lib/fs";
import { question } from "../lib/readline";

import { credentials, SCOPES, TOKEN_DIR, TOKEN_PATH } from "./table.config";

export const getRows = async config =>
  new Promise((resolve, reject) => {
    google.sheets("v4").spreadsheets.values.get(config, (err, resp) => (err ? reject(err) : resolve(resp.values)));
  });

export const updateRows = async config =>
  new Promise((resolve, reject) => {
    google.sheets("v4").spreadsheets.values.batchUpdate(config, (err, resp) => (err ? reject(err) : resolve(resp)));
  });

export const getAuth = async () => {
  if (!credentials) {
    throw new Error("No credentials");
  }
  return await authorize(credentials);
};

async function authorize(credentials) {
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(credentials.id, credentials.secret, credentials.redirect);

  try {
    const token = await readFile(TOKEN_PATH);
    oauth2Client.credentials = JSON.parse(token);
    return oauth2Client;
  } catch (e) {
    console.log("No stored credentials", e);
  }

  const token = await getNewToken(oauth2Client);

  await storeToken(token);
  console.log("Token stored to " + TOKEN_PATH);

  oauth2Client.credentials = token;

  return oauth2Client;
}

async function getNewToken(oauth2Client) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });

  console.log("Authorize this app by visiting this url: ", authUrl);

  const code = await question("Enter the code from that page here: ");

  return new Promise((resolve, reject) => {
    oauth2Client.getToken(code, (err, token) => (err ? reject(err) : resolve(token)));
  });
}

async function storeToken(token) {
  try {
    await makeDir(TOKEN_DIR);
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }

  return writeFile(TOKEN_PATH, JSON.stringify(token));
}
