# simple-task-management-tool

This project is a simple web application for **managing tasks** locally in your browser. It helps you organize your schedule by separating items into a **To-Do List** and a **Today List**, with data persistence handled entirely by **Browser Cookies**.

## 🎯 Features

* **List Management:** Manage tasks by sorting them into a **To-Do List** and a **Today List**.
* **Data Persistence:** Task data is stored locally using **Browser Cookies** (`JSON.stringify` is used to handle complex data structures), ensuring your tasks remain after closing and reopening the application.
* **Task Operations:** Easily **add**, **check/uncheck** (mark as complete), and **delete** tasks.

## 🚀 How to Use

### Adding a Task

<img width="1270" height="580" alt="Image" src="https://github.com/user-attachments/assets/637e2074-0e0d-4a83-b20e-4f7b48a75c8e" />

1.  Fill in the **"What to do?"** (task content) and **"deadline"** fields.
2.  Check **only one** of the "ToDo" or "Today" checkboxes.
3.  Click the **"Add Task"** button. The new task will be added to the corresponding table.

### Managing Tasks

<img width="1254" height="588" alt="Image" src="https://github.com/user-attachments/assets/3be851ce-ff27-4caa-b00a-86f72fed5f4a" />

* **Completion:** If you have finished a task, you can mark it complete by checking the **CK (Check)** checkbox.
* **Deletion:** To permanently remove a task, click the **"delete"** button in the last column. The line will immediately disappear from the table, and the updated data will be saved to your Cookie.

---

## 💻 Used Techniques

* **Languages:** JavaScript, HTML + CSS
* **Persistence:** Browser Cookies (using `JSON.stringify` / `JSON.parse` and `encodeURIComponent` for safe data handling).
* **Core JavaScript:** Vanilla JavaScript is used for dynamic DOM manipulation and data logic.

---

## 🛠️ Setup

No special server or build process is required, as this is a purely client-side application.

1.  Download the project files (e.g., `index.html` and `mission6.js`).
2.  Open the main HTML file (`index.html`) directly in any modern web browser.

---

## 🤝 Contribution

Bug reports, feature suggestions, and Pull Requests are always welcome!

1.  Please open an **Issue** to discuss the bug or feature first.
2.  **Fork** the repository and create your feature branch.
3.  Submit a **Pull Request**.

---

## ⚖️ License

This project is provided under the **MIT License**.
