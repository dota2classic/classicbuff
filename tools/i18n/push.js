import { getAuth, updateRows } from "./table.utils";
import { SPREADSHEET_ID } from "./table.config";
import getSummary from "./summary";
import { locales } from "../../src/i18n";

function calcFactor(a) {
  return a
    .slice(3)
    .map((item, key) => (item && item.length ? 0 : 1 << (a.length - key)))
    .reduce((a, b) => a + b, 0);
}

async function updateData(auth) {
  const summary = await getSummary();

  const values = [["id", "defaultMessage", "description"].concat(locales)].concat(
    summary.sort((a, b) => calcFactor(a) - calcFactor(b))
  );

  const result = await updateRows({
    auth: auth,
    spreadsheetId: SPREADSHEET_ID,
    resource: {
      valueInputOption: "RAW",
      data: [
        {
          range: "A:" + String.fromCharCode("A".charCodeAt(0) + 3 + locales.length),
          values
        }
      ]
    }
  });

  console.log(result);
}

async function writeToTable() {
  const auth = await getAuth();

  await updateData(auth);
}

export default writeToTable;
