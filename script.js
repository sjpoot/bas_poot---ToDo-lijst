async function getResult() {
    return await fetchResult();
};

async function printResult() {
    let data = await getResult();
    try {
        return data;
    } catch (error) {
        console.log("Yep, nothing here!");
    }
}

// Aangemaakte taak of de al bestaande taken in de DOM zetten
function taskToDom(items) {

    const getList = document.getElementById("tasks");
    const newSpan = document.createElement("span");
    const newItem = document.createElement("input");
    const newLabel = document.createElement("label");
    const newButton = document.createElement("button")
    const newImage = document.createElement("img")
    const newBr = document.createElement("br");

    getList.appendChild(newSpan);
    newSpan.id = items._id;

    newSpan.appendChild(newItem);
    newItem.type = "checkbox";
    newItem.id = items._id;
    newItem.name = items.description;

    newSpan.appendChild(newLabel);
    newLabel.htmlFor = items._id;
    newLabel.innerHTML = items.description;
    newLabel.className = "text-label";

    newSpan.appendChild(newButton);
    newButton.appendChild(newImage);
    newButton.className = "delete-button";
    newImage.src = "./media/trashbin_klein_new.jpg";
    newImage.alt - "Verwijder Item";

    getList.appendChild(newBr);
}

// Bij het starten de bestaande taken ophalen
async function allItems() {
    let task = await getResult();
    try {
        let allTasks = task;
        allTasks.forEach(element => {
            taskToDom(element);
        });
    } catch (error) {
        return ("Ik kan deze taak niet toevoegen!")
    }
}

allItems();


// Nieuwe taak toevoegen
async function addItem() {
    let task = await getResult();
    try {
        let lastTask = task[task.length - 1];
        taskToDom(lastTask);
    } catch (error) {
        return ("Ik kan deze taak niet toevoegen!")
    }
}

const addClick = document.getElementById("addclick");

// Het invul veld clearen na het toevoegen.
function clearForm() {
    document.getElementById("addtask").value = '';
}

// Nieuwe taak naar de database schrijven
clickAddTask = function () {
    let addTask = document.getElementById("addtask").value;
    if (addTask != '') {
        postItem({ description: addTask, done: false });
        const newTask = printResult();
        addItem(newTask);
        clearForm();
        ;
    } else {
        alert("Je moet een taak invullen!")
    }
}

addClick.addEventListener("click", clickAddTask);

//Taak verwijderen
document.getElementById("tasks").addEventListener("click", function (task) {
    if (task.target && task.target.nodeName == "IMG") {
        const removeId = task.target.parentNode.parentNode.id;
        removeItem(apiUrl + removeId);
    }
});

//Taak doorstrepen wanneer checked
document.getElementById("tasks").addEventListener("change", function (task) {

    if (task.target && task.target.nodeName == "INPUT") {

        const labelText = task.target.parentNode.childNodes[1];
        labelText.style.textDecoration = task.target.checked ? 'line-through' : 'none';
    }
});

//Tekst taak aanpassen als je erop klikt 
document.getElementById("tasks").addEventListener("click", function (task) {
    if (task.target && task.target.nodeName == "LABEL") {
        console.log(task.target)
        const changeId = task.target.parentNode.id;
        let changeLabel = prompt(`Wil je de tekst van deze taak (${task.target.innerHTML}) aanpassen?\n Zo nee, hit return of klik OK!`)
        if (changeLabel != "") {
            console.log(changeLabel);
            putItem(changeId, { description: changeLabel });
        }
    }
})

