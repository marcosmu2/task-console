const Task = require('./task');

class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  get listArr() {
    const list = [];

    Object.keys(this._list).forEach((key) => {
      list.push(this._list[key]);
    });

    return list;
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTaskFromArray(taksInput = []) {
    taksInput.forEach((t) => (this._list[t.id] = t));
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  entireList() {
    this.showList(this.listArr);
  }

  pendingCompleteList(complete = true) {
    complete
      ? this.showList(this.listArr.filter((t) => t.completadoEn))
      : this.showList(this.listArr.filter((t) => !t.completadoEn));
  }

  showList(list = []) {
    let count = 1;
    console.log();
    list.forEach((t) => {
      console.log(
        `${count.toString().green} ${t.desc} :: ${
          t.completadoEn ? t.completadoEn.green : 'Pending'.red
        }`
      );
      count++;
    });
  }

  toggleComplete(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completadoEn) {
        task.completadoEn = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        const taskToModify = this._list[task.id];
        taskToModify.completadoEn = null;
      }
    });
  }
}

module.exports = Tasks;
