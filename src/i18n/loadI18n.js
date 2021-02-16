const messages = {
  en: () => import("./en-US.json"),
  ru: () => import("./ru-RU.json")
};

const toObject = arr => {
  const obj = {};
  arr.default.forEach(item => (obj[item.id] = item.message || item.defaultMessage));
  return obj;
};

export const locales = Object.keys(messages);

export const fullNames = {
  "en-US": "English",
  "ru-RU": "Russian"
};

export default locale => {
  return (messages[locale] || messages["ru"])().then(toObject);
};
