const fs = require("fs");
const Path = require("path");
const { Parser } = require("acorn");

const MyParser = Parser.extend(require("acorn-jsx")());

const walk = require("acorn-walk");

const { extend } = require("acorn-jsx-walk");
extend(walk.base);

let newJsxFile = fs.readFileSync("tools/i18n/test/jsx.tsx", "utf-8");

const parsed = MyParser.parse(newJsxFile);

const russianAlphabet = [
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ё",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ъ",
  "ы",
  "ь",
  "э",
  "ю",
  "я"
];

const countRussianLettersPercentage = str => {
  let totalSymbols = 0;
  let totalRussianSymbols = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c !== " ") {
      totalSymbols++;
      if (russianAlphabet.includes(c.toLowerCase())) {
        totalRussianSymbols++;
      }
    }
  }
  return totalRussianSymbols / totalSymbols;
};

const parsedStrings = [];

const record = node => {
  try {
    const formattedValue = node.value.replace(/\n/g, "").trim();
    if (formattedValue && countRussianLettersPercentage(formattedValue) > 0.7) {
      parsedStrings.push({
        formatted: formattedValue,
        original: node.value
      });
    }
  } catch (e) {}
};
walk.simple(parsed, {
  Literal: record,
  JSXText: record
});

const caseName = `generated_${new Date().getTime() + Math.round(Math.random() * 100)}`;
parsedStrings.forEach((str, index) => {
  const tmpCopy = newJsxFile.replace(`="${str.original}"`, `={i18n.${caseName}__${index}}`);
  if (tmpCopy === newJsxFile) {
    const tmpCopy2 = newJsxFile.replace(`={"${str.original}"}`, `={i18n.${caseName}__${index}}`);
    if (tmpCopy2 === newJsxFile) newJsxFile = newJsxFile.replace(str.original, `{i18n.${caseName}__${index}}`);
    else newJsxFile = tmpCopy2;
  } else {
    newJsxFile = tmpCopy;
  }
});

const messages = parsedStrings
  .map((str, index) => {
    return `
      ${caseName}__${index}: {
        id: \`\${INTL_KEY}.${caseName}__${index}\`,
        defaultMessage: \`${str.formatted}\`
      }`;
  })
  .join(",\n");

const generatedI18n = `
    import { defineMessages } from "react-intl";
    import { createI18n } from "utils/i18n";

    const INTL_KEY = "enterclass.${caseName}";

    const messages = defineMessages({
      ${messages}
    });

    export default createI18n(messages);
  `;

fs.writeFileSync("tools/i18n/test/result.i18n.ts", generatedI18n);
fs.writeFileSync("tools/i18n/test/jsx.tsx", newJsxFile);
