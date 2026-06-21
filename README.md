# Task Manager Web Application

A simple **Task Manager** web application built using **HTML, CSS, and JavaScript** with browser-based storage using **LocalStorage**. The application allows users to register, log in, manage tasks, set due dates, and track task completion without requiring a backend server.

---

## Features

### User Authentication

* User Registration
* User Login
* Password Reset
* Session Persistence
* Logout Functionality

### Task Management

* Create Tasks
* View Tasks
* Mark Tasks as Completed
* Delete Tasks
* Assign Due Dates
* Track Task Status

### Task Organization

* Filter by:

  * All Tasks
  * Pending Tasks
  * Completed Tasks
* Sort by:

  * Newest First
  * Due Date
  * Priority (planned)

### Due Date Tracking

* Upcoming Tasks
* Tasks Due Today
* Overdue Tasks

### User Experience

* Responsive Interface
* Dashboard View
* Dedicated Tasks Page
* Task Completion Counter
* Automatic Login Session Recovery

---

## Technologies Used

* HTML5
* CSS3
* JavaScript 
* LocalStorage API

---

## Project Structure

* **index.html** – User interface and application layout
* **style.css** – Styling and responsive design
* **script.js** – Application functionality and business logic
* **README.md** – Project documentation

---

## How the Application Works

### Registration

Users can create an account using an email address and password. User credentials are stored in the browser's LocalStorage.

### Login

Registered users can log in using their credentials. After successful authentication, the application loads the user's dashboard and task data.

### Password Reset

Users can reset their password by entering their registered email address and providing a new password.

### Task Creation

Users can add tasks and optionally assign a due date. Each task stores:

* Task description
* Completion status
* Due date
* Creation timestamp

### Task Management

Users can:

* View all tasks
* Mark tasks as completed
* Delete tasks
* Track due dates
* Monitor overdue items

---

## Data Storage

The application uses the browser's LocalStorage to store:

* User accounts
* User tasks
* Login sessions

All data remains available between browser sessions unless LocalStorage is manually cleared.

---

## Installation and Usage

### Option 1: Open Directly

1. Download the project files.
2. Open `index.html` in any modern web browser.

### Option 2: Use VS Code Live Server

1. Install the Live Server extension.
2. Open the project folder in Visual Studio Code.
3. Start Live Server.
4. Access the application in your browser.

---

## Application Pages

* Register Page
* Login Page
* Password Reset Page
* Dashboard
* Tasks Management Page

---

## Future Enhancements

* Task Priority Management
* Edit Existing Tasks
* Search and Filter Improvements
* Dark Mode
* Cloud Database Integration
* User Profiles
* Email Verification
* Task Categories and Tags
* Notifications and Reminders

---

## Limitations

* Passwords are stored locally and are not encrypted.
* Data is stored only in the browser.
* Clearing browser storage removes all saved data.
* Priority functionality is partially planned but not fully implemented.

---

## License

This project is intended for educational and learning purposes and may be modified or extended as needed.

---

## Author

Developed as a frontend Task Manager application using HTML, CSS, and JavaScript.
