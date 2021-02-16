import extract from "react-intl-cra";
import mergeToFiles from "./merge-to-files";

const GLOB_PATTERN = "./src/**/*.{js,i18n.ts}";

/**
 * Extract react-intl messages and write it to src/messages/_default.json
 * Also extends known localizations
 */
async function compileI18n() {
  const messages = extract(GLOB_PATTERN);
  await mergeToFiles(messages, false);
}

export default compileI18n;
