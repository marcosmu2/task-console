require('colors');
const {
  inquirerMenu,
  pause,
  readInput,
  listTaskToDelete,
  confirm,
  showListChecklist,
} = require('./helpers/inquirer');
const { saveDB, readDb } = require('./helpers/saveFile');
const Task = require('./models/task');
const Tasks = require('./models/tasks');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();

  const taskDb = readDb();

  if (taskDb) {
    tasks.loadTaskFromArray(taskDb);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await readInput('Descripcion: ');
        tasks.createTask(desc);
        break;
      case '2':
        tasks.entireList();
        break;
      case '3':
        tasks.pendingCompleteList(true);
        break;
      case '4':
        tasks.pendingCompleteList(false);
        break;
      case '5':
        const ids = await showListChecklist(tasks.listArr);
        tasks.toggleComplete(ids);
        break;
      case '6':
        const id = await listTaskToDelete(tasks.listArr);
        if (id !== '0') {
          const ok = await confirm(
            `Are you sure you want to delete the task with id ${id}?`
          );
          if (ok) {
            tasks.deleteTask(id);
          }
        }
        break;
    }

    saveDB(tasks.listArr);

    if (opt !== '0') await pause();
  } while (opt !== '0');
};

main();
