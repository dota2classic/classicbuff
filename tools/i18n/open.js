import open from "open";

import { SPREADSHEET_ID } from "./table.config";

async function openI18nTable() {
  open(`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`);
}

export default openI18nTable;
