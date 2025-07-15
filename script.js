let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
// This function is called when the page loads to render the todos

    function renderTodos() {
        // Save the current todos to localStorage
        localStorage.setItem("todos", JSON.stringify(allTodos));

        const list = document.getElementById('todoList');
        list.innerHTML = ''; // Clear existing list

        allTodos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${todo.done ? '<del>' + todo.text + '</del>' : todo.text}</span>
                <button onclick="deleteTodo(${index})" class="btn btn-danger btn-sm">Delete</button>
                <button onclick="editTodo(${index})" class="btn btn-primary btn-sm">Edit</button>
                <button onclick="markDone(${index})" class="btn btn-success btn-sm">Done</button>
                <hr>
            `;
            document.getElementById('todoList').appendChild(listItem);
        });
    }

    function addTodo() {
        const input = document.getElementById('todoInput');
        const value = input.value.trim();

        if (!value) return;

        allTodos.push({ text: value, done: false });
        input.value = '';
        renderTodos(); // Update the DOM immediately
    }

    function deleteTodo(index) {
        allTodos.splice(index, 1);
        renderTodos();
    }

    function editTodo(index) {
        const newValue = prompt("Edit your todo:", allTodos[index].text);
        if (newValue !== null && newValue.trim() !== "") {
            allTodos[index].text = newValue.trim();
            renderTodos();
        }
    }

    function markDone(index) {
        allTodos[index].done = true;
        renderTodos();
    }

    document.getElementById('themeToggleBtn').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    // Update the icon based on the theme
    const themeIcon = document.getElementById('themeIcon');
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
         themeIcon.src = "https://img.icons8.com/ios-filled/50/000000/sun.png"; // Replace with actual sun image
    } else {
        localStorage.setItem('theme', 'light');
         // Replace with actual moon image
        themeIcon.src = "https://img.icons8.com/ios-filled/50/000000/moon.png";
    }
});

// Load the saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
    const themeIcon = document.getElementById('themeIcon');
    themeIcon.src = savedTheme === 'dark' ? "https://img.icons8.com/ios-filled/50/000000/sun.png" : "https://img.icons8.com/ios-filled/50/000000/moon.png";
}

renderTodos(); // Initial render of todos
