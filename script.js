let current = 0; // keeps track of total number of tasks in the tasklist.
let uniqueID = 0;


// Function to add task, alongwith corresponding buttons
const addTask = () => {


  const todo = document.querySelector("#task").value.trim();
  document.querySelector("#task").value = "";

  // Checking for empty textbox or spaces
  if (!todo || (todo.split("")[0] === " ")) {
    alert("Please Enter a Todo")
    return;
  }

  let placeholder = document.querySelector("#emptyPlaceholder")
  if (placeholder)
    placeholder.parentNode.removeChild(placeholder)

  current = current + 1;
  uniqueID = uniqueID + 1;


  const parentDiv = document.querySelector("#tasks");

  let newTask = document.createElement("div");
  // way to add ids to newly made html elements
  newTask.id = `task${uniqueID}`
  newTask.className = 'task'

  // Creating the content that newTask should hold. One <p> , One <div>
  // Creating a P element
  let taskText = document.createElement("p")
  taskText.id = `todo_${uniqueID}_name`
  taskText.innerHTML = `[${current}]&nbsp;&nbsp;&nbsp;${todo}`
  // Creating a div to contain 3 buttons
  let btnDiv = document.createElement("div")
  // Done button creation
  let doneButton = document.createElement("button")
  doneButton.setAttribute("onclick", `completeTask(${uniqueID})`)
  doneButton.setAttribute("class", "doneBtn")
  doneButton.setAttribute("id", `done_Btn_for_${uniqueID}`)
  doneButton.innerHTML = "<i class='fa-solid fa-check'></i>"
  // Remove button creation
  let removeButton = document.createElement("button")
  removeButton.setAttribute("onclick", `removeTaskFromList(${uniqueID})`)
  removeButton.setAttribute("class", "removeBtn")
  removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
  // Edit button creation
  let editButton = document.createElement("button")
  editButton.setAttribute("onclick", `edit(${uniqueID})`)
  editButton.setAttribute("class", "editBtn")
  editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>'
  // Adding the buttons to btnDiv, a div to contain 3 buttons
  btnDiv.appendChild(doneButton)
  btnDiv.appendChild(removeButton)
  btnDiv.appendChild(editButton)
  // Adding P and btnDiv to newTask
  newTask.appendChild(taskText) // the p
  newTask.appendChild(btnDiv) // the div containing 3 buttons
  // Finally adding the div called newTask to the page
  parentDiv.appendChild(newTask);

}


// Function to complete the task, adds strikethrough effect only
const completeTask = (id) => {
  const thisTaskParagraph = document.querySelector(`#todo_${id}_name`);
  console.log(thisTaskParagraph)
  if (thisTaskParagraph.style.textDecoration === "line-through") {
    thisTaskParagraph.style.textDecoration = "none";
    thisTaskParagraph.style.color = "white"
    document.querySelector(`#done_Btn_for_${id}`).innerHTML = "<i class='fa-solid fa-check'></i>"
  }
  else {
  thisTaskParagraph.style.textDecoration = "line-through"
  thisTaskParagraph.style.color = "#bababa"
  document.querySelector(`#done_Btn_for_${id}`).innerHTML = '<i class="fa-solid fa-rotate-left"></i>'
  }
}


// Function to delete the task from list, and change the serial number of each task
// by looping through entire tasklist. 
const removeTaskFromList = (id) => {
  const taskDiv = document.querySelector(`#task${id}`);
  taskDiv.parentNode.removeChild(taskDiv);

  current = current - 1;

  const allTasksList = document.querySelector(`#tasks`).children;
  console.log(allTasksList);

  for (let newCounter = 0; newCounter < current; newCounter++) {

    // the task p is the 1st child, I'm not accessing the p tags using their
    // ids such as task_id_name as here I need those tasks in an ordered manner.
    // I need all the tasks one by one. And id is not synchronous. Fetching the p
    // content through id only works if we know the id of that specific p.
    let currentTaskP = allTasksList[newCounter].children[0]; 
    let currentTaskText = currentTaskP.innerHTML; // the current task div text
    let taskText = currentTaskText.split("]&nbsp;&nbsp;&nbsp;")[1];
    currentTaskP.innerHTML = `[${newCounter + 1}]&nbsp;&nbsp;&nbsp;${taskText}`;
  }

  if(current === 0) {
    let placeholder = document.createElement("p")
    placeholder.style.textAlign = "center"
    placeholder.id = "emptyPlaceholder";
    placeholder.innerHTML = "No Tasks"
    document.querySelector("#tasks").appendChild(placeholder)
  }
}


const edit = (id) => {

  let modal = document.querySelector("#myModal");
  modal.style.display = "block"

  let modalContent = modal.children[0]; // Only one div
  let taskText = document.querySelector(`#todo_${id}_name`).innerHTML.split("]&nbsp;&nbsp;&nbsp;")[1];
  let serialNumber = document.querySelector(`#todo_${id}_name`).innerHTML.split("]&nbsp;&nbsp;&nbsp;")[0];
  serialNumber = serialNumber.split("")[1] // " '[6' -> [, 6 "

  let textBox = document.createElement("input")
  textBox.type = "text"
  textBox.value = taskText
  textBox.id = "editBox"

  let btn = document.createElement("button")
  btn.innerHTML = "Done"
  btn.id = "editDoneBtn"

  modalContent.appendChild(textBox)
  modalContent.appendChild(btn)

  btn.addEventListener("click", () => {
    let newTask = document.querySelector("#editBox").value;
    document.querySelector(`#todo_${id}_name`).innerHTML = `[${serialNumber}]&nbsp;&nbsp;&nbsp;${newTask}`
    
    textBox.parentNode.removeChild(textBox)
    btn.parentNode.removeChild(btn)

    modal.style.display = "none"
  })


  // Way to close modal when anywhere the window is clicked -> Important trick !
  window.onclick = event => {
    if (event.target == modal) {
      modal.style.display = "none";
      // removing, otherwise the elements stay, and every time edit is clicked, one
      // more set of textbox and button is added :)
      textBox.parentNode.removeChild(textBox)
      btn.parentNode.removeChild(btn)
    }
}
}


