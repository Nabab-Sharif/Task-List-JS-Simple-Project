
// Define UI element
let form = document.querySelector("#task_form");
let taskList = document.querySelector("ul");
let clearBtn = document.querySelector("#clear_task_btn");
let filter = document.querySelector("#task_filter");
let taskInput = document.querySelector("#new_task");

// Define event listeners
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

//Define function
//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task!");
  } else {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    taskList.appendChild(li);
    
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);

    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";

  }
  e.preventDefault();
}


//Remove Task function create
function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      let ele = e.target.parentElement;
      ele.remove();
      //console.log(ele);
      removeFromLS(ele);
    }
  }
}


//For Clear Task function create
function clearTask(e) {
  //taskList.innerHTML = "";
  // It is work faster 
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}


//For Filter Task function create 
function filterTask(e) {
  let text = e.target.value.toLowerCase();
  //console.log(text);
  document.querySelectorAll('li').forEach((task) => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !=-1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });

}


// For Store in Local Storage function create
function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks')===null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// function create
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }


  tasks.forEach(task => {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(task + " "));
    
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}



//For LocalStorage from item remove function create
function removeFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];;\
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  let li = taskItem;
  li.removeChild(li.lastChild); //<a></a> it will removeChild()

  tasks.forEach((task,index)=>{
    if(li.textContent.trim()===task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}