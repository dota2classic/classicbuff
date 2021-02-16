import Promise from "bluebird";
import { readFile, writeFile } from "../lib/fs";
import { locales } from "../../src/i18n";

async function writeMessages(fileName, msgs) {
  await writeFile(fileName, `${JSON.stringify(msgs, null, 2)}\n`);
}

async function writeLangMessages(fileName, msgs) {
  const langObj = msgs.reduce((all, curr) => {
    all[curr.id] = curr.message;
    return all;
  }, {});

  await writeFile(fileName, `${JSON.stringify(langObj, null, 2)}\n`);
}

async function mergeToFile(locale, messages, toBuild) {
  const fileName = `src/i18n/${locale}.json`;
  const langFileName = `src/lang/${locale.split("-")[0]}.json`;
  const originalMessages = {};

  let oldFile;
  try {
    oldFile = await readFile(fileName);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  let oldJson = [];
  try {
    oldJson = JSON.parse(oldFile);
  } catch (err) {
    console.error(`Error parsing messages JSON in file ${fileName}`);
  }

  oldJson.forEach(message => {
    originalMessages[message.id] = message;
    originalMessages[message.id].prevFilepath = message.filepath;
    delete originalMessages[message.id].filepath;
  });

  messages.forEach(newMsg => {
    const id = newMsg.id;
    originalMessages[id] = originalMessages[id] || { id };

    const msg = originalMessages[id];
    msg.description = newMsg.description || msg.description;
    msg.defaultMessage = newMsg.defaultMessage || msg.defaultMessage;
    msg.message = (newMsg[locale] || msg.message) && (newMsg[locale] || msg.message).trim();
    msg.filepath = newMsg.filepath || msg.prevFilepath;

    delete msg.prevFilepath;

    if (locale !== "_default") {
      msg.message = msg[locale] || msg.message || "";
    }
  });

  const result = Object.keys(originalMessages)
    .map(key => originalMessages[key])
    .filter(msg => msg.filepath || msg.message || msg.id.startsWith("notification."));

  await writeMessages(fileName, result);

  if (locale !== "_default") {
    await writeLangMessages(langFileName, result);
  }

  if (toBuild && locale !== "_default") {
    const buildFileName = `build/messages/${locale}.json`;
    try {
      await writeMessages(buildFileName, result);
      console.info(`Build messages updated: ${buildFileName}`);
    } catch (err) {
      console.error(`Failed to update ${buildFileName}`);
    }
  }
}

async function updateMessages(messages, toBuild) {
  await Promise.all(["_default", ...locales].map(locale => mergeToFile(locale, messages, toBuild)));
}

export default updateMessages;
