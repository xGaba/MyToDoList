//VARIABLES
const form = document.querySelector('#form');
const tasklist = document.querySelector('#task-list');
const body = document.querySelector('#body');

let tasks = [];
let emptyListMessage = null;


//EVENTS
eventListeners()

function eventListeners() {
    //User add some new task
    form.addEventListener('submit', addTask)

    //Document ready
    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        createHTML()
    })
}


//FUNCTONS
function addTask(e) {
    e.preventDefault();
    
    const task = document.querySelector('#task').value;
        
    if(task === ''){
        showError('No tasks have been added');
        return;
    }         
    
    //Object for the task
    const taskObj = {
        id : Date.now(), //Milliseconds from 1/1/1970, I will use it as a unique ID
        task : task 
    }

    //Adding the new task to the tasks array
    tasks = [...tasks, taskObj];
    
    //Creating HTML at "My tasks in progress"
    createHTML();

    //Restarting the form
    form.reset();
}

function showError(error) {
    const errorMessage = document.createElement('P');
    errorMessage.textContent = error;
    errorMessage.classList.add('error')

    //Adding the error message at the end of the body
    body.appendChild(errorMessage)

    setTimeout(() => {
        body.removeChild(body.lastChild)
    }, 3000);
}

    //Shows a list with the tasks added
function createHTML() {

    clearHTML();

    if (tasks.length > 0){
        tasks.forEach(task => {
            
            //Creating a button the remove the task
            const btnRemove = document.createElement('A');
            btnRemove.textContent = 'X'
            btnRemove.classList.add('remove-task')
            
            //Create the HMTL
            const li = document.createElement('LI');
            const textFormat = task.task.toLowerCase()
            li.textContent = textFormat.charAt(0).toUpperCase() + textFormat.slice(1);
            li.classList.add ('newLi')

            //Insert btnRemove at HTML
            tasklist.appendChild(btnRemove)

            //Insert text at HMTL
            tasklist.appendChild(li);

            //Adding function to btnRemove
            btnRemove.onclick = () => {
                removetask(task.id);
            }

        });
    };

    if (emptyListMessage){
        form.removeChild(emptyListMessage);
        emptyListMessage = null;
    } else {
        if (tasks.length === 0) {
            emptyListMessage = document.createElement('P');
            emptyListMessage.textContent = 'Your to do list is currently empty';
            emptyListMessage.classList.add('emptyTaskList');
            form.appendChild(emptyListMessage);}
    }

    syncStorage();
}

    //Clear HTML
function clearHTML() {
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    };
};

    //Remove task with btnRemove
function removetask(id) {
    tasks = tasks.filter( task => task.id !== id );
    createHTML();
};

    //Adding tasks to local storage
function syncStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


