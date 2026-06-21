// ── LocalStorage helpers ──────────────────────────────────────────────────────

function loadUsers() {
  return JSON.parse(localStorage.getItem("tm_users") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("tm_users", JSON.stringify(users));
}

function loadTasks(email) {
  return JSON.parse(localStorage.getItem("tm_tasks_" + email) || "[]");
}

function saveTasks(email, tasks) {
  localStorage.setItem("tm_tasks_" + email, JSON.stringify(tasks));
}

function loadSession() {
  return localStorage.getItem("tm_session") || null;
}

function saveSession(email) {
  localStorage.setItem("tm_session", email);
}

function clearSession() {
  localStorage.removeItem("tm_session");
}

// ── State ─────────────────────────────────────────────────────────────────────

let currentUser = null;

// ── Page navigation ───────────────────────────────────────────────────────────

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// ── Auth ──────────────────────────────────────────────────────────────────────

function register() {
  const email    = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const msg      = document.getElementById("regMsg");

  if (!email || !password) {
    msg.textContent = "Please enter all details.";
    msg.className = "msg error";
    return;
  }

  const users = loadUsers();
  if (users[email]) {
    msg.textContent = "User already exists.";
    msg.className = "msg error";
    return;
  }

  users[email] = password;
  saveUsers(users);
  saveTasks(email, []);

  msg.textContent = "Registered successfully! You can now log in.";
  msg.className = "msg success";
  document.getElementById("regEmail").value = "";
  document.getElementById("regPassword").value = "";
}

function login() {
  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const msg      = document.getElementById("loginMsg");

  const users = loadUsers();
  if (users[email] && users[email] === password) {
    currentUser = email;
    saveSession(email);
    document.getElementById("welcomeMsg").textContent = "Logged in as: " + email;
    msg.textContent = "";
    showPage("dashboardPage");
    displayTasks();
  } else {
    msg.textContent = "Invalid email or password.";
    msg.className = "msg error";
  }
}

function resetPassword() {
  const email       = document.getElementById("forgotEmail").value.trim();
  const newPass     = document.getElementById("newPassword").value.trim();
  const confirmPass = document.getElementById("confirmPassword").value.trim();
  const msg         = document.getElementById("forgotMsg");

  if (!email || !newPass || !confirmPass) {
    msg.textContent = "Please fill in all fields.";
    msg.className = "msg error";
    return;
  }

  const users = loadUsers();
  if (!users[email]) {
    msg.textContent = "No account found with that email.";
    msg.className = "msg error";
    return;
  }

  if (newPass !== confirmPass) {
    msg.textContent = "Passwords do not match.";
    msg.className = "msg error";
    return;
  }

  users[email] = newPass;
  saveUsers(users);

  msg.textContent = "Password reset successfully! You can now log in.";
  msg.className = "msg success";

  document.getElementById("forgotEmail").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmPassword").value = "";

  setTimeout(() => {
    msg.textContent = "";
    showPage("authPage");
  }, 2000);
}

function logout() {
  currentUser = null;
  clearSession();
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("loginMsg").textContent = "";
  showPage("authPage");
}

// ── Tasks ─────────────────────────────────────────────────────────────────────

function getTasks() {
  if (!currentUser) return [];
  return loadTasks(currentUser);
}

function setTasks(tasks) {
  if (!currentUser) return;
  saveTasks(currentUser, tasks);
}

function addTask() {
  const input    = document.getElementById("taskInput");
  const text     = input.value.trim();
  const dueDate  = document.getElementById("taskDueDate").value;
if (!text) {
    alert("Please enter a task.");
    return;
  }

  const tasks = getTasks();
  tasks.push({
    text,
    completed: false,
    dueDate:   dueDate || null,
        createdAt: new Date().toISOString()
  });
  setTasks(tasks);

  input.value = "";
  document.getElementById("taskDueDate").value = "";
  document.getElementById("taskPriority").value = "medium";
  input.focus();
  displayTasks();
}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  setTasks(tasks);
  displayTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  setTasks(tasks);
  displayTasks();
}

// ── Due date helpers ──────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function dueDateStatus(dueDateStr) {
  if (!dueDateStr) return null;
  const today = todayStr();
  if (dueDateStr < today) return "overdue";
  if (dueDateStr === today) return "today";
  return "upcoming";
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

// ── Priority ordering ─────────────────────────────────────────────────────────



// ── Open tasks page ───────────────────────────────────────────────────────────

function openTasksPage() {
  showPage('tasksPage');
  displayTasks();
}

// ── Display ───────────────────────────────────────────────────────────────────

function displayTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;
const filterStatEl   = document.getElementById("filterStatus");
  const sortEl         = document.getElementById("sortBy");
    const filterStatus   = filterStatEl ? filterStatEl.value : "all";
  const sortBy         = sortEl       ? sortEl.value       : "newest";

  list.innerHTML = "";

  // Attach original index before any filtering/sorting
  let tasks = getTasks().map((t, i) => ({
    ...t,dueDate:   t.dueDate   || null,
    completed: t.completed || false,
    _index: i
  }));

  // Update count badge
  const countBadge = document.getElementById("taskCount");
  if (countBadge) {
    const total     = tasks.length;
    const done      = tasks.filter(t => t.completed).length;
    countBadge.textContent = `${done}/${total} done`;
  }

  // Filter by status
  if (filterStatus === "pending") {
    tasks = tasks.filter(t => !t.completed);
  } else if (filterStatus === "completed") {
    tasks = tasks.filter(t => t.completed);
  }
  // Sort
  if (sortBy === "duedate") {
    tasks.sort((a,b)=>0);
  } else {
    // newest first
    tasks.sort((a, b) => b._index - a._index);
  }

  if (tasks.length === 0) {
    list.innerHTML = "<li class='empty-msg'>No tasks found.</li>";
    return;
  }

  tasks.forEach((task) => {
    const status    = dueDateStatus(task.dueDate);
    const isOverdue = status === "overdue" && !task.completed;let dueBadge = "";
    if (task.dueDate) {
      const statusClass = isOverdue ? "overdue" : (status === "today" ? "today" : "");
      const label = isOverdue        ? `⚠ Overdue · ${formatDate(task.dueDate)}`
                  : status === "today" ? `📅 Today`
                  :                      `📅 ${formatDate(task.dueDate)}`;
      dueBadge = `<span class="badge badge-due ${statusClass}">${label}</span>`;
    }

    const li = document.createElement("li");
    li.className = `priority-${task.priority}${isOverdue ? " overdue" : ""}`;
    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox"
          ${task.completed ? "checked" : ""}
          onchange="toggleTask(${task._index})">
        <div class="task-info">
          <span class="task-text ${task.completed ? 'completed' : ''}">${escapeHtml(task.text)}</span>
          <div class="task-badges">${dueBadge}
          </div>
        </div>
      </div>
      <button class="delete-btn" onclick="deleteTask(${task._index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Boot ──────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  if (taskInput) {
    taskInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") addTask();
    });
  }

  // Restore session
  const savedUser = loadSession();
  if (savedUser) {
    const users = loadUsers();
    if (users[savedUser]) {
      currentUser = savedUser;
      document.getElementById("welcomeMsg").textContent = "Logged in as: " + savedUser;
      showPage("dashboardPage");
      displayTasks();
    } else {
      clearSession();
    }
  }
});
