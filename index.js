let formElem;
let doneMap = jsonToMap(localStorage.getItem('doneList')) || new Map();


function dragElement(elmnt) {
    document.getElementById(elmnt.id + "Head").style.cursor = "move";
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "Head")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "Head").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function createTable() {

    document.getElementById('createTable').classList.add('active');
}

function hideCreateTable() {

    document.getElementById('createTable').classList.remove('active');
}

function createTask(title, body, ...args) {

    let timestamp;
    console.log(args);
    if (args.length !== 0) {
        timestamp = args[0];
        console.log(timestamp);
    } else {
        timestamp = new Date().getTime();
    }
    let task = new Task(title, body, timestamp);


    task = JSON.stringify(task);
    localStorage.setItem(title + timestamp.toString(), task);
    renderTask(title + timestamp.toString());
}

function renderAllTasks() {

    for (let key of Object.keys(localStorage)) {
        if (key !== 'doneList')
            renderTask(key);
    }
    console.log(localStorage.getItem('doneList'));
}

function renderTask(key) {

    let lcTaskData = JSON.parse(localStorage.getItem(key));

    let lcTaskTitle = lcTaskData._title;
    let lcTaskBody = lcTaskData._body;

    let lcTaskTimestamp = lcTaskData._args[0].toString();


    // EditForm creation
    let wrapper = document.getElementById('wrapper');
    let task = document.createElement('div');
    task.classList.add('task');
    let form = document.createElement('form');
    form.classList.add('taskEditForm');
    let taskTitleEdit = document.createElement('input');
    taskTitleEdit.classList.add('taskTitleEdit');
    taskTitleEdit.type = 'text';
    taskTitleEdit.value = lcTaskTitle;
    let taskBodyEdit = document.createElement('input');
    taskBodyEdit.classList.add('taskBodyEdit');
    taskBodyEdit.type = 'text';
    taskBodyEdit.value = lcTaskBody;
    let taskSave_btn = document.createElement('input');
    taskSave_btn.classList.add('taskSave_btn');
    taskSave_btn.type = 'button';
    taskSave_btn.value = "Save"
    taskSave_btn.addEventListener('click', onSaveClick);

    // Task data 
    let taskData = document.createElement('div');
    taskData.classList.add('taskData');
    let taskTitle = document.createElement('h3');
    taskTitle.appendChild(document.createTextNode(lcTaskTitle));
    taskTitle.classList.add('taskTitle');
    let taskBody = document.createElement('p');
    taskBody.appendChild(document.createTextNode(lcTaskBody));
    taskBody.classList.add('taskBody');
    let taskBtns = document.createElement('div');
    taskBtns.classList.add('taskBtns');
    let taskEdit_btn = document.createElement('button');
    taskEdit_btn.type = 'button';
    taskEdit_btn.classList.add('taskEdit_btn');
    taskEdit_btn.appendChild(document.createTextNode('Edit'));
    taskEdit_btn.addEventListener('click', toggleEdit);
    let taskDelete_btn = document.createElement('button');
    taskDelete_btn.type = 'button';
    taskDelete_btn.classList.add('taskDelete_btn');
    taskDelete_btn.appendChild(document.createTextNode('Delete'));
    taskDelete_btn.addEventListener('click', onDeleteClick);
    let taskDone_btn = document.createElement('button');
    taskDone_btn.type = 'button';
    taskDone_btn.classList.add('taskDone_btn');
    taskDone_btn.appendChild(document.createTextNode('Done'));
    taskDone_btn.addEventListener('click', onDoneClick);

    // Task timestamp
    let tmstmp = document.createElement('p');
    tmstmp.classList.add('taskTimestamp');
    tmstmp.appendChild(document.createTextNode(lcTaskTimestamp));

    // if (localStorage.getItem('doneList') == true) {
    //     task.classList.add('done');
    // }
    if (jsonToMap(localStorage.getItem('doneList')).get(lcTaskTimestamp) == true) {
        task.classList.add('done');
    }


    wrapper.appendChild(task);
    task.appendChild(form);
    form.appendChild(taskTitleEdit);
    form.appendChild(taskBodyEdit);
    form.appendChild(taskSave_btn);
    task.appendChild(taskData);
    taskData.appendChild(taskTitle);
    taskData.appendChild(taskBody);
    taskData.appendChild(taskBtns);
    taskBtns.appendChild(taskEdit_btn);
    taskBtns.appendChild(taskDelete_btn);
    taskBtns.appendChild(taskDone_btn);
    task.appendChild(tmstmp);

}

function toggleEdit(event) {

    event.preventDefault();
    event.target.style.visibility = 'hidden';
    event.target.parentNode.parentNode.parentNode.childNodes[0].classList.add('active');

    event.target.parentNode.parentNode.style.display = "none";

}

function onDeleteClick(event) {

    event.preventDefault();

    let node = event.target.parentNode.parentNode.parentNode;
    let title = event.target.parentNode.parentNode.childNodes[0].innerHTML;
    let timestamp = node.childNodes[2].innerHTML;

    localStorage.removeItem(title + timestamp.toString());
    node.remove();
}

function onSaveClick(event) {

    event.preventDefault();
    let target = event.target.parentNode;
    let newTitle = target.childNodes[0].value;
    let newBody = target.childNodes[1].value;

    let tmsp = target.parentNode.childNodes[2].innerHTML;

    let oldTitle = target.parentNode.childNodes[1].childNodes[0].innerHTML;
    localStorage.removeItem(oldTitle + tmsp);
    createTask(newTitle, newBody, tmsp);
    target.parentNode.remove();

}

function onDoneClick(event) {

    event.preventDefault();

    let target = event.target.parentNode.parentNode.parentNode;
    target.classList.add('done');

    doneMap.set(target.childNodes[2].innerHTML, true);
    console.log(JSON.stringify(doneMap));
    localStorage.setItem('doneList', mapToJson(doneMap));
    console.log(localStorage.getItem('doneList'));
}

function rootClearStorage() {
    localStorage.clear();
}

function addFormDataListener() {
    formElem.addEventListener('formdata', (e) => {


        // Get the form data from the event object
        let data = Array.from(e.formData);

        if (data[0][1] !== '') {
            createTask(data[0][1], data[1][1]);
        } // Array[['title', title], ['description', body]]

    });
}

function onSubmit(event) {


    event.preventDefault();

    new FormData(formElem);
}

function ready() {

    dragElement(document.getElementById("createTable"));

    document.getElementById('addNew_btn').addEventListener('click', createTable);
    document.getElementById('cancel_btn').addEventListener('click', hideCreateTable);

    document.getElementById('createForm').addEventListener('submit', onSubmit);
    formElem = document.getElementById('createForm');
    addFormDataListener();
    // rootClearStorage();
    renderAllTasks();
}

class Task {
    constructor(title, body, ...args) {

        this._title = title;
        this._body = body;
        if (args) { this._args = args; }
    }

    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }

    get body() {
        return this._body;
    }
    set body(value) {
        this._body = value;
    }

    get args() {
        return this._args;
    }

}

// function TaskFormObj(obj){


// }


document.addEventListener("DOMContentLoaded", ready);

function mapToJson(map) {
    return JSON.stringify([...map]);
}

function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}