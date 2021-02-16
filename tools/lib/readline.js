import readline from "readline";

export const question = text => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(text, code => {
      rl.close();
      resolve(code);
    });
  });
};
