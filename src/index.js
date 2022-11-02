import './style.css';
import Tasks from './tasks.js';

const toDoTasks = new Tasks();
const listContent = document.querySelector('.list-content');

// populate list items
const populateListItems = (arrayOfTasks) => {
  listContent.innerHTML = '';
  arrayOfTasks.forEach((task) => {
    listContent.innerHTML += `
    <li>
      <button class="check-btn" ><i class="fa-solid fa-check ${task.completed ? 'active' : ''}"></i></button>
      <div class="container ${task.completed ? 'active' : ''}">
      <div contenteditable="true" class="content-description">${task.description}</div>
      </div>
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </li>
    `;
  });
};
// Sort array by indexes
const sortArray = (arr) => arr.sort((a, b) => a.index - b.index);

const populateListItemsWithCheckBtns = (arr) => {
  populateListItems(sortArray(arr));
  // After populating list items, we add click listener on check marks
  const checkBtns = document.querySelectorAll('.check-btn');
  checkBtns.forEach((checkBtn, index) => {
    checkBtn.addEventListener('click', () => {
      checkBtn.childNodes[0].classList.toggle('active');
      checkBtn.nextElementSibling.classList.toggle('active');
      if (checkBtn.childNodes[0].classList.contains('active')) {
        toDoTasks.modifyTask(index, checkBtn.nextElementSibling.textContent.trim(), true);
      } else {
        toDoTasks.modifyTask(index, checkBtn.nextElementSibling.textContent.trim(), false);
      }
    });
  });
};
populateListItemsWithCheckBtns(sortArray(toDoTasks.arr));

// form
const inputText = document.querySelector('#type-list');
const form = document.querySelector('.submit-item');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (inputText.value.trim().length > 0) {
    toDoTasks.addNewTask({
      description: inputText.value,
    });
    populateListItemsWithCheckBtns(sortArray(toDoTasks.arr));
    form.reset();
  }
});

// Clear completed Tasks
const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => {
  toDoTasks.deleteTask();
  populateListItemsWithCheckBtns(sortArray(toDoTasks.arr));
});

// Modify values
const modifyTaskLists = document.querySelectorAll('.content-description');
modifyTaskLists.forEach((modifyTask, index) => {
  modifyTask.addEventListener('input', () => {
    toDoTasks.modifyTask(index, modifyTask.textContent, toDoTasks.arr[index].completed);
  });
});

// Refresh Button
const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', () => {
  refreshBtn.classList.remove('active');
  setInterval(() => {
    refreshBtn.classList.add('active');
  }, 10);
  populateListItemsWithCheckBtns(sortArray(toDoTasks.arr));
});
