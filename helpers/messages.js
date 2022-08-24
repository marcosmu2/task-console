const { resolve } = require('path');

require('colors');

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log('==========================='.green);
    console.log('     Select an option '.green);
    console.log('===========================\n'.green);

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question('Select an opction: ', (opt) => {
      readLine.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`Press ${'ENTER'.green} to continue`, () => {
      readLine.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
