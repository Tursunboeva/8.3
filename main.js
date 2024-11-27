"use strict";
const setState = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
const getState = (key) => {
    let isValid = localStorage.getItem(key);
    if (isValid) {
        return JSON.parse(isValid);
    }
};
let todos = getState("todos") || [];
let elForm = document.querySelector(".todo-form");
let elInput = document.querySelector(".todo-input");
let elList = document.querySelector(".todo-list");
elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        value: elInput.value,
    };
    todos.push(data);
    renderTodos(todos, elList);
    elInput.value = "";
    setState("todos", todos);
});
function renderTodos(arr, list) {
    list.innerHTML = "";
    arr.forEach((item, index) => {
        let elItem = document.createElement("li");
        elItem.className =
            "flex items-center justify-between p-2 bg-slate-300 rounded-md mb-2";
        elItem.innerHTML = `
            <span class="todo-text">${item.value}</span>
            <div class="flex gap-2">
                <button class="edit-btn bg-blue-500 text-white px-2 py-1 rounded-md" data-id="${index}">Edit</button>
                <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded-md" data-id="${index}">Delete</button>
            </div>
        `;
        list === null || list === void 0 ? void 0 : list.appendChild(elItem);
    });
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id") || "0");
            handleDelete(id);
        });
    });
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id") || "0");
            handleEdit(id);
        });
    });
}
function handleDelete(id) {
    todos.splice(id, 1);
    renderTodos(todos, elList);
    setState("todos", todos);
}
function handleEdit(id) {
    const todoToEdit = todos[id];
    elInput.value = todoToEdit.value;
    elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", function updateHandler(e) {
        e.preventDefault();
        todos[id].value = elInput.value;
        renderTodos(todos, elList);
        setState("todos", todos);
        elInput.value = "";
        elForm === null || elForm === void 0 ? void 0 : elForm.removeEventListener("submit", updateHandler);
    }, { once: true });
}
renderTodos(todos, elList);
