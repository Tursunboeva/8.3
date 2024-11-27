const setState = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getState = (key: string): any => {
    let isValid = localStorage.getItem(key);
    if (isValid) {
        return JSON.parse(isValid);
    }
};

interface TodoType {
    value: string;
}

let todos: Array<TodoType> = getState("todos") || [];

let elForm: HTMLFormElement | null = document.querySelector(".todo-form");
let elInput: HTMLInputElement | null = document.querySelector(".todo-input");
let elList: HTMLUListElement | null = document.querySelector(".todo-list");


elForm?.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const data: TodoType = {
        value: (elInput as HTMLInputElement).value,
    };
    todos.push(data);
    renderTodos(todos, elList);
    (elInput as HTMLInputElement).value = "";
    setState("todos", todos);
});


function renderTodos(arr: TodoType[], list: HTMLUListElement | null): void {
    (list as HTMLUListElement).innerHTML = "";
    arr.forEach((item: TodoType, index: number) => {
        let elItem: HTMLLIElement | null = document.createElement("li");
        elItem.className =
            "flex items-center justify-between p-2 bg-slate-300 rounded-md mb-2";
        elItem.innerHTML = `
            <span class="todo-text">${item.value}</span>
            <div class="flex gap-2">
                <button class="edit-btn bg-blue-500 text-white px-2 py-1 rounded-md" data-id="${index}">Edit</button>
                <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded-md" data-id="${index}">Delete</button>
            </div>
        `;
        list?.appendChild(elItem);
    });

   
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = parseInt((btn as HTMLElement).getAttribute("data-id") || "0");
            handleDelete(id);
        });
    });

    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = parseInt((btn as HTMLElement).getAttribute("data-id") || "0");
            handleEdit(id);
        });
    });
}


function handleDelete(id: number) {
    todos.splice(id, 1);
    renderTodos(todos, elList);
    setState("todos", todos);
}


function handleEdit(id: number) {
    const todoToEdit = todos[id];
    (elInput as HTMLInputElement).value = todoToEdit.value; 
    elForm?.addEventListener(
        "submit",
        function updateHandler(e: Event) {
            e.preventDefault();
            todos[id].value = (elInput as HTMLInputElement).value; 
            renderTodos(todos, elList);
            setState("todos", todos);
            (elInput as HTMLInputElement).value = "";
            elForm?.removeEventListener("submit", updateHandler); 
        },
        { once: true }
    );
}


renderTodos(todos, elList);
