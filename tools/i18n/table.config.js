export const SPREADSHEET_ID = "1OzZAI5gU0ETCU71qd9f5iezX-FC95POH4JNWEMk10U0"; // prod
// export const SPREADSHEET_ID = "1opXcE5puvj4ngDNvN6PCgbA49GTJiWln2iH6OfbyPZo" // test
export const SUMMARY_PATH = "src/i18n/_summary.json";

export const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
export const TOKEN_DIR = ".credentials/";
export const TOKEN_PATH = TOKEN_DIR + "sheets.googleapis.com-mdx-translate-sync.json";

const credentialsRaw = {
  installed: {
    client_id: "83062029682-5bavd890l18a2cmg8sadbtp2o5svo53h.apps.googleusercontent.com",
    project_id: "mdx-i18n",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://accounts.google.com/o/oauth2/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "e2mEZT1HT3evYmu-deKGdWf3",
    redirect_uris: ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
  }
};

export const credentials = {
  id: credentialsRaw.installed.client_id,
  secret: credentialsRaw.installed.client_secret,
  redirect: credentialsRaw.installed.redirect_uris[0]
};
