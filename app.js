const add_input = document.querySelector("#add-input"); 
const add_button = document.querySelector("#add-todo");
const todo_div = document.getElementById("todo_comeup");
let input_holder = [];

//Retrieve todo items from local storage    storedTodos = null
const storedTodos = localStorage.getItem("todos");


//If not null, put them into an array.
if (storedTodos !== null) {
    input_holder = JSON.parse(storedTodos);
}


// Recreate todos when the page is loaded.
document.addEventListener("DOMContentLoaded", DomLoader);

function DomLoader() {
    input_holder.forEach(function(element) {
        createTodoElement(element);    //All todos will be kept in.
    });
}


add_button.addEventListener("click", todo_adder);

function todo_adder() {
    let input_value = add_input.value; 
    console.log(input_value);

    // Display alert if no input is provided.
    if (input_value === "") {
        let input_warning = document.createElement("div");
        let button_warning = document.createElement("button");
        
        input_warning.className = "alert alert-danger alert-dismissible fade show";
        input_warning.role = "alert";
        input_warning.innerHTML = "Please, enter an input.";
        
        button_warning.type = "button";
        button_warning.className = "close";
        button_warning.setAttribute("data-dismiss", "alert");
        button_warning.setAttribute("aria-label", "Close");
        button_warning.innerHTML = '<span aria-hidden="true">&times;</span>';

        input_warning.appendChild(button_warning);
        
        const input_div = document.querySelector("#input-warning");
        input_div.appendChild(input_warning);
    } 

    // Add the user input to localStorage.
    else {
        input_holder.push(input_value);
        localStorage.setItem("todos", JSON.stringify(input_holder));  // Updating local storage
        createTodoElement(input_value);
        add_input.value = "";
    }
}

// Function to create the todo element.
function createTodoElement(input_value) {
    let todo = document.createElement("div");
    todo.className = "card";
    
    let inner_todo = document.createElement("div");
    inner_todo.className = "card-body d-flex justify-content-between align-items-center";
    inner_todo.innerHTML = input_value;

    let delete_button = document.createElement("button");
    delete_button.className = "btn btn-danger btn-sm";
    delete_button.id = "delete-button";
    delete_button.style.width = "30px";
    delete_button.innerHTML = "&times;";

    // Remove the todo when the "x" button is clicked.
    delete_button.addEventListener("click", function() {
        todo.remove();
        input_holder = input_holder.filter(function(item) {
            return item !== input_value;
        });
        localStorage.setItem("todos", JSON.stringify(input_holder)); // Updating local storage
    });
    
    inner_todo.appendChild(delete_button);
    todo.appendChild(inner_todo);
    todo_div.appendChild(todo);
}

const clear_button = document.getElementById("clear-todos");
clear_button.addEventListener("click", todo_cleaner);

function todo_cleaner() {
    const input_div2 = document.querySelector("#input-warning");

    // Display success message if there are todos to clear.
    if (input_holder.length !== 0) {
        const deleted_warning = document.createElement("div");
        deleted_warning.className = "alert alert-success alert-dismissible fade show";
        deleted_warning.role = "alert";
        deleted_warning.innerHTML = "All todos are cleared.";
    
        const deleted_warning_button = document.createElement("button");
        deleted_warning_button.type = "button";
        deleted_warning_button.className = "close";
        deleted_warning_button.setAttribute("data-dismiss", "alert");
        deleted_warning_button.setAttribute("aria-label", "Close");
        deleted_warning_button.innerHTML = '<span aria-hidden="true">&times;</span>';
    
        deleted_warning.appendChild(deleted_warning_button);
        input_div2.appendChild(deleted_warning);
    } 
    // Display error message if there are no todos to clear.
    else {
        const empty_clear_warning = document.createElement("div");
        empty_clear_warning.className = "alert alert-danger alert-dismissible fade show";
        empty_clear_warning.role = "alert";
        empty_clear_warning.innerHTML = `
            There is nothing to clear.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>`;
        input_div2.appendChild(empty_clear_warning);
    }

    while (todo_div.firstChild) {
        todo_div.removeChild(todo_div.firstChild);
    }
    input_holder = [];
    localStorage.setItem("todos", JSON.stringify(input_holder));  // Updating local storage
}

const search_input = document.querySelector("#search-input");

search_input.addEventListener("input", value_finder);

// Searching todos.
function value_finder() {
    const search_value = search_input.value.trim().toLowerCase();
    const todos = todo_div.querySelectorAll(".card");

    todos.forEach(function(todo) {
        const todoText = todo.textContent.trim().toLowerCase();
        if (todoText.includes(search_value)) {
            todo.style.display = "block";
        } else {
            todo.style.display = "none";
        }
    });
}
