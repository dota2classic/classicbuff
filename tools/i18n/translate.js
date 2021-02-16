import fs from "fs";
import createTranslator from "google-translate";

import { locales } from "../../src/i18n";
import messages from "../../src/i18n/_default.json";

const API_KEY = "AIzaSyCu0yuR0nWqAt0hhLUrv1G1anrT0Xn4HDQ";

const googleLangs = {
  "en-US": "en",
  "es-ES": "es",
  "ja-JP": "ja",
  "ko-KR": "ko",
  "pt-PT": "pt",
  "ru-RU": "ru",
  "zh-CN": "zh-CN"
};

const withMessages = (googleTranslate, msgs) => lang =>
  new Promise((resolve, reject) => {
    const langForGoogle = googleLangs[lang];
    console.log(lang, langForGoogle);

    googleTranslate.translate(
      msgs.filter(msg => !msg.message).map(m => m.message || m.defaultMessage),
      langForGoogle,
      (err, translation) => {
        if (err) reject(err);

        const translatedMessages = msgs.map((m, index) => ({ ...m, message: translation[index].translatedText }));
        console.log(translatedMessages);

        fs.writeFile(`./src/i18n/${lang}.json`, JSON.stringify(translatedMessages, null, 2), error => {
          if (error) reject(error);

          console.log(lang);

          resolve();
        });
      }
    );
  });

function translate() {
  const translateToLang = withMessages(createTranslator(API_KEY), messages);

  return Promise.all(locales.map(translateToLang));
}

export default translate;
