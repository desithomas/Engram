# demo-day


Project BowBow is the in-development codename for this demo day project. 

# Project BowBow 

A student focused academic planning application that is designed to help users organize their assignments, deadlines, review sessions, and course materials in one place. The application allows students to record assignment details, estimated the actual required work time, track their energy levels and progress, search their assignments, view reminders, nd selected related files such as PDFs, Python files, JavaScript files, notes and much more. The current front end prototype uses HTML, CSS, JavaScript and localStorage (browser local storage) with future plans for a backend, authentication, OCR, calendar integration, spaced repetition, active recall, and personalized workload recommendations.

If you use this product while it is still in development, please expect limited functionality and bugs as development continues. Bugs will be squashed!

## Tech Stack

* **HTML5:** 
* **CSS3:** 
* **JavaScript (ES6+):**

  <img width="1189" height="1130" alt="Screenshot 2026-11-01 at 9 03 37 PM" src="https://github.com/user-attachments/assets/6ca3ad7a-f971-4d44-abea-03a69bd27c11" />


## View on website:

https://projectbowbow.onrender.com/
  
## How to run locally

-Have Node.js installed 
-MongoDB Atlas account and database
-MongoDB network access configured for your development machine

## Installation 

Clone the repo and move into the project directory: 

```bash
git clone <repository-url>
cd project-solarflare
```

Install the dependencies with npm install 
Create a .env file with the following: 
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
SESSION_SECRET=replace-this-with-a-long-random-secret
PORT=8080

Run using **npm start**, then go to locahost:8080 in your browser to view

Note: ensure that the .gitignore contains .env 
node_modules 
.DS_Store

.DS_Store is only needed if you are running this locally on MacOS

