const parse = require("./parser.js").default;
const fs = require("fs");
const Path = require("path");

const filePath = process.argv[2];

const overwrite = process.argv[3] === "true";

const recursive = process.argv[4] === "true";

const diagnostic = process.argv[5] === "true";

const findLineFromIndex = (str, index) => {
  let acc = 0;
  const lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (index > acc && index <= acc + line.length) return i;
    acc += line.length;
  }
};

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

const whatWeWant = /(?:>)?([()ёа-яa-z.!?\-\s]+)(?:<\/)?/im;

// key={"value"}
const bracketsInlineProp = /(?:=)(?:{)("[()ёа-яa-z.!?\n\-\s]+")(?:})/gim;
// key="value"
const inlineProp = /(?:=)("[()ёа-яa-z.!?\-\s]+")/gim;

const rawStringRegex = /("[()ёа-яa-z.!?\-\s]+")/gim;

const inlineStringLiterals = /(?:>)([()ёа-яa-z.!?\-\s]+)(?:<\/)/gim;

function getCandidates(str, regex) {
  const rawJsx = str.match(regex);
  if (!rawJsx) return [];

  return rawJsx
    .map(it => {
      try {
        return it.match(whatWeWant)[1];
      } catch (e) {
        return null;
      }
    })
    .filter(it => !!it)
    .map(it => it.replace(/\n/g, "").trim())
    .filter(it => it && countRussianLettersPercentage(it) > 0.7);
}

function camelize(text) {
  text = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return text.substr(0, 1).toLowerCase() + text.substr(1);
}

function doParsing(path) {
  const rawJSXFile = fs.readFileSync(path, "utf-8");

  const caseName = camelize(Path.parse(path).name);
  const i18nFileName = caseName + ".i18n.ts";

  const parsedStrings = getCandidates(rawJSXFile, bracketsInlineProp)
    .concat(getCandidates(rawJSXFile, inlineProp))
    .concat(getCandidates(rawJSXFile, inlineStringLiterals));
  // console.log(getCandidates(rawJSXFile, bracketsInlineProp));
  // console.log(getCandidates(rawJSXFile, inlineProp));
  // console.log(getCandidates(rawJSXFile, inlineStringLiterals));

  // const rawJsx = rawJSXFile.match(/[a-z\s}]>([()ёа-яa-z.!?\-\s]+)/gim);
  //
  // if (!rawJsx) return;

  // const parsedStrings = rawJsx.map(it => it.substring(1).replace(/>\s*\n*/, "")).filter(it => !!it);

  let newJsxFile = `import i18n from "./${i18nFileName.replace(".ts", "")}";\n` + rawJSXFile;

  parsedStrings.forEach((str, index) => {
    const tmpCopy = newJsxFile.replace(`="${str}"`, `={i18n.${caseName}__${index}}`);
    if (tmpCopy === newJsxFile) {
      const tmpCopy2 = newJsxFile.replace(`={"${str}"}`, `={i18n.${caseName}__${index}}`);
      if (tmpCopy2 === newJsxFile) newJsxFile = newJsxFile.replace(str, `{i18n.${caseName}__${index}}`);
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
        defaultMessage: \`${str}\`
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

  const i18npath = Path.join(Path.parse(path).dir, i18nFileName);

  if ((parsedStrings.length > 0 && !fs.existsSync(i18npath)) || overwrite) {
    fs.writeFileSync(i18npath, generatedI18n);
    fs.writeFileSync(path, newJsxFile);
  } else {
    if (parsedStrings.length > 0) {
      if (diagnostic) {
        const problemLines = [];

        const testRegexp = new RegExp(/[а-яА-Я]+/g);
        // const rawLiterals =
        const matches = rawJSXFile.match(testRegexp);
        matches.forEach(match => {
          const line = findLineFromIndex(rawJSXFile, rawJSXFile.indexOf(match));
          if (!problemLines.includes(line)) {
            problemLines.push(line);
          }
        });
        console.log();
        console.log(`
    File ${path} DIAGNOSTIC.
    ${problemLines.map(it => `file://${Path.resolve(path)}(${it})`).join("\n    ")}
    New not-extracted strings:
    ${parsedStrings.join(";\n")}`);
      } else {
        console.log(`
    File ${path} contains raw string.
    ${parsedStrings.join(";\n")}`);
      }
    }
  }
}

function processPath(path) {
  if (fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(path2 => {
      if (fs.lstatSync(Path.join(path, path2)).isDirectory()) {
        if (recursive) processPath(Path.join(path, path2));
      } else {
        if (!path2.endsWith(".i18n.ts") && !path2.endsWith(".stories.tsx")) doParsing(Path.join(path, path2));
      }
    });
  } else {
    doParsing(path);
  }
}

console.log("working in ", filePath);
console.log("Overwrite?", overwrite);
console.log("Recursive?", recursive);
processPath(filePath);
