Real-Time Stock Dashboard (Socket.IO + React)

A real-time stock price dashboard built with React (Vite) on the frontend and Node.js + Express + Socket.IO on the backend.
Multiple users can subscribe to different stocks, and dashboards update asynchronously in real time.

Features

User login with validation (name, email, password)

Real-time stock price updates using WebSockets

Multiple users supported simultaneously

Independent stock subscriptions per user

Live dashboard updates without refresh

Professional UI with responsive layout

Logout support

Modular frontend and backend architecture

Tech Stack
Frontend

React (Vite)

JavaScript

CSS

Socket.IO Client

Backend

Node.js

Express

Socket.IO

Project Structure
stock_dashboard/
├── client/          # React frontend

│   ├── src/

│   ├── index.html

│   ├── vite.config.js

│   └── package.json

├── server/          # Node.js backend

│   ├── index.js

│   └── package.json

└── README.md

Setup Instructions
Prerequisites

Node.js v22.12.0 or later

npm

Git

Backend Setup
cd server
npm install
node index.js


Backend runs on:

http://localhost:4000

Frontend Setup
cd client
npm install
npm run dev


Frontend runs on:

http://localhost:5173

Real-Time Functionality

Each user subscribes to selected stocks

Backend generates price updates every second

Updates are broadcast via Socket.IO

Frontend filters updates per subscribed stock

Multiple users receive updates independently

Validation Rules

Full Name: minimum 2 characters

Email: must include @ and .

Password: minimum 8 characters and at least one symbol

Deployment Ready

Frontend can be deployed to Vercel / Netlify

Backend can be deployed to Render / Railway

WebSocket communication supported in production

Example Use Case

User A subscribes to GOOG, TSLA

User B subscribes to AMZN, NVDA

Both dashboards update live and independently
