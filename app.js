const inp = document.getElementById("inp")
const btn = document.getElementById("btn")
const parentList = document.getElementById("list")
const warningMessage = document.getElementById("para")


function addItem() {
    if (inp.value !== "") {
        parentList.innerHTML = ""
        warningMessage.innerText = ""
        let todoArr = []
        let getTodos = localStorage.getItem("todos")
        if (getTodos) {
            let parseTodo = JSON.parse(getTodos)
            todoArr = parseTodo
        };
        const obj = {
            todos: inp.value,
            id: new Date().getTime()
        }
        todoArr.push(obj)
        localStorage.setItem("todos", JSON.stringify(todoArr))
        inp.value = ""
        renderTodo(todoArr)
        clearAll(todoArr)
    } else {
        warningMessage.innerText = "Fill the form!"
    }
}

function renderTodo(array) {
    parentList.innerHTML = ""
    for (let i = 0; i < array.length; i++) {
        const item = array[i].todos
        parentList.innerHTML += `<li class="liElem">
        <span class="inner-elem">${item}</span>
            <button class="editElem" id="editBtn" onclick="editElem(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg></button>
            <button class="delElem" onclick="delItem(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg></button>
            <button class="saveBtn">Save</button>
            <button class="cancel"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg></button>
            </li>`
    }
    footer()
}

function getItem() {
    const getAllTodos = localStorage.getItem("todos")
    const parse = JSON.parse(getAllTodos)
    renderTodo(parse)
}

function footer() {
    const items = localStorage.getItem("todos")
    const parse = JSON.parse(items)
    if (parse.length < 1 || parse.length === 1) {
        parentList.innerHTML += `<div class="clearAll">
            <p class="clearText">You have ${parse.length} item left:</p>
            <button class="clearbtn">ClearAll</button>
        </div>`
    } else {
        parentList.innerHTML += `<div class="clearAll">
            <p class="clearText">You have ${parse.length} items left:</p>
            <button class="clearbtn">ClearAll</button>
        </div>`
    }
}

function showSaveButton(index) {
    const saveBtn = document.querySelectorAll(".saveBtn")
    saveBtn[index].classList.add("saveBtnShow")
}

function showCancelButton(index) {
    const cancelBtn = document.querySelectorAll(".cancel")
    cancelBtn[index].classList.add("cancelBtnShow")
}

function cancelButton(index) {
    const saveBtn = document.querySelectorAll(".saveBtn")
    const cancelBtn = document.querySelectorAll(".cancel")
    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            saveBtn[index].classList.remove("saveBtnShow")
            cancelBtn[index].classList.remove("cancelBtnShow")
        })
    })
}

function editEvent() {
    inp.focus()
    const saveBtn = document.querySelectorAll(".saveBtn")
    const todoId = localStorage.getItem("todos")
    const parse = JSON.parse(todoId)
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            if (inp.value !== "") {
                warningMessage.innerText = ""
                parse[i].todos = inp.value
                localStorage.setItem("todos", JSON.stringify(parse))
                renderTodo(parse)
                inp.value = ""
            } else {
                warningMessage.innerText = "Fill the required field!"
            }
        })
    })
}

function editElem(index) {
    const editBtn = document.querySelectorAll("#editBtn")
    const liElems = document.querySelectorAll(".liElem")
    // console.log(liElems[index].value)
    editBtn.forEach((eb, index) => {
        eb.addEventListener("click", () => {
            const arr = localStorage.getItem("todos")
            const parse = JSON.parse(arr)
            showSaveButton(index)
            showCancelButton(index)
            cancelButton(index)
            editEvent()
            console.log(liElems[index].value)
            if (liElems[index].classList.contains("saveBtnShow") && liElems[index].classList.contains("cancelBtnShow")) {
                console.log("hello")
                liElems[parse.length - liElems[index].value].classList.remove("cancelBtnShow")
            }
        })
    })
}
function delItem(index) {
    const todoId = localStorage.getItem("todos")
    const parse = JSON.parse(todoId)
    parse.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(parse))
    renderTodo(parse)
}

function clearAll(array) {
    const clearBtn = document.querySelector(".clearbtn")
    clearBtn.addEventListener("click", () => {
        array = []
        localStorage.setItem("todos", JSON.stringify(array))
        renderTodo(array)
    })
}

btn.addEventListener("click", addItem)
getItem()
clearAll()