//! All elements are selected
const form = document.querySelector('#todoAddForm');
const addInput = document.querySelector('#todoName');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const clearButton = document.querySelector('#todoClearButton');
const filterInput = document.querySelector('#todoSearch');

let todos = [];

runEvents();

function runEvents() {
    form.addEventListener('submit', addTodo);
    document.addEventListener('DOMContentLoaded', pageLoaded);
    secondCardBody.addEventListener('click', removeTodoToUI);
    clearButton.addEventListener('click', allTodoEveryWhere);
    filterInput.addEventListener('keyup', filter);
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoLists = document.querySelectorAll('.list-group-item');

    if (todoLists.length > 0) {
        todoLists.forEach((todo) => {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute('style', 'display:block');
            } else {
                todo.setAttribute('style', 'display:none ! important');
            }
        });
    } else {
        showAlert('warning', 'You must add at least 1 todo to filter.');
    }
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach((todo) => {
        addTodoToUI(todo);
    });
}

function removeTodoToUI(e) {
    if (e.target.className === 'fa fa-remove') {
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        removeTodoToStorage(todo.textContent);
        showAlert('success', 'Todo removed');
    }
}

function allTodoEveryWhere() {
    const todoLists = document.querySelectorAll('.list-group-item');
    if (todoLists.length > 0) {
        todoLists.forEach((todo) => {
            todo.remove();
        });

        todos = [];
        localStorage.setItem('todos', JSON.stringify(todos));
        showAlert('success', ' Successfully deleted');
    } else {
        showAlert('warning', 'There must be at least 1 todo to delete.');
    }
}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach((todo, index) => {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (InputEvent == null || inputText == '') {
        showAlert('warning', 'Please enter a text');
    } else {
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert('success', 'Todo added successfully');
    }
    e.preventDefault();
}

function addTodoToUI(newTodo) {
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
    <a href="#" class="delete-item">
        <i class="fa fa-remove"></i>
    </a>
</li>
*/

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    li.textContent = newTodo;

    const a = document.createElement('a');
    a.href = '#';
    a.className = 'delete-item';

    const i = document.createElement('i');
    i.className = 'fa fa-remove';

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = '';
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
}

function showAlert(type, message) {
    /*     <div class="alert alert-warning" role="alert">
    A simple success alert—check it out!
  </div> */

    const div = document.createElement('div');
    //div.className = 'alert alert-' + type;
    div.className = `alert alert-${type} mt-4`;
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 2500);
}
