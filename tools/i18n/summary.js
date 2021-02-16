import { readFile } from "../lib/fs";
import { locales } from "../../src/i18n";
import defaults from "../../src/i18n/_default.json";

async function loadLocalizedMessages(locale) {
  const data = await readFile(`./src/i18n/${locale}.json`);
  return JSON.parse(data);
}

async function getSummary() {
  const messages = {};

  defaults.forEach(msg => {
    messages[msg.id] = msg;
  });

  for (let i = 0; i < locales.length; i++) {
    const msgs = await loadLocalizedMessages(locales[i]);
    msgs.forEach(msg => {
      if (messages[msg.id]) {
        messages[msg.id][locales[i]] = msg.message;
      }
    });
  }

  const rows = Object.keys(messages)
    .sort()
    .map(id => messages[id])
    .map(msg => [msg.id, msg.defaultMessage, msg.description].concat(locales.map(locale => msg[locale])));

  return rows;
}

export default getSummary;
