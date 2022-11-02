export default class Tasks {
  constructor() {
    this.arr = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  setLocalStorageItem = () => {
    localStorage.setItem('tasks', JSON.stringify(this.arr));
  }

  addNewTask = ({
    description,
    completed = false,
    index = this.arr.length,
  }) => {
    this.arr.push({ description, completed, index });
    this.setLocalStorageItem();
  };

  deleteTask = () => {
    // filter and return only elements that has completed = false
    this.arr = this.arr.filter((obj) => !obj.completed);
    this.arr.forEach((item, i) => {
      item.index = i;
    });
    this.setLocalStorageItem();
  };

  modifyTask = (id, description, completed) => {
    this.arr[id].description = description;
    this.arr[id].completed = completed;
    this.setLocalStorageItem();
  };
}
