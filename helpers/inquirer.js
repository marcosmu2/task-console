const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do? ',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Create task`,
      },
      {
        value: '2',
        name: `${'2.'.green} List task`,
      },
      {
        value: '3',
        name: `${'3.'.green} List completed task`,
      },
      {
        value: '4',
        name: `${'4.'.green} List pending task`,
      },
      {
        value: '5',
        name: `${'5.'.green} Complete task(s)`,
      },
      {
        value: '6',
        name: `${'6.'.green} Delete task`,
      },

      {
        value: '0',
        name: `${'0.'.green} Exit`,
      },
    ],
  },
];

const inputPause = [
  {
    type: 'input',
    name: 'inPause',
    message: `Press ${'ENTER'.green} to continue`,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('==========================='.green);
  console.log('     Select an option '.green);
  console.log('===========================\n'.green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  console.log('\n');
  await inquirer.prompt(inputPause);
};

const readInput = async (message) => {
  const genericInput = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a value';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(genericInput);
  return desc;
};

const listTaskToDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });

  choices.unshift({ value: '0', name: '0.'.green + ' Cancelar' });

  const questions = {
    type: 'list',
    name: 'id',
    message: 'Borrar',
    choices,
  };

  const { id } = await inquirer.prompt(questions);

  return id;
};

const confirm = async (message) => {
  const question = {
    type: 'confirm',
    name: 'ok',
    message,
  };

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showListChecklist = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completadoEn ? true : false,
    };
  });

  const questions = {
    type: 'checkbox',
    name: 'ids',
    message: 'Selects',
    choices,
  };

  const { ids } = await inquirer.prompt(questions);

  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTaskToDelete,
  confirm,
  showListChecklist,
};
