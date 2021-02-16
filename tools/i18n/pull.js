import { writeFile } from "../lib/fs";

import { getAuth, getRows } from "./table.utils";
import { SPREADSHEET_ID, SUMMARY_PATH } from "./table.config";
import { locales } from "../../src/i18n";

import mergeToFiles from "./merge-to-files";

async function loadData(auth) {
  const rows = await getRows({
    auth: auth,
    spreadsheetId: SPREADSHEET_ID,
    range: "A:" + String.fromCharCode("A".charCodeAt(0) + 3 + locales.length)
  });

  if (rows.length === 0) {
    throw new Error("No data found in table.");
  }

  const header = rows.shift();

  return rows.map(row => {
    const obj = {};

    header.forEach((key, index) => {
      obj[key] = row[index];
    });

    return obj;
  });
}

async function syncWithTable() {
  const auth = await getAuth();
  const messages = await loadData(auth);

  await mergeToFiles(messages);

  await writeFile(SUMMARY_PATH, JSON.stringify(messages, null, 2));
}

export default syncWithTable;
