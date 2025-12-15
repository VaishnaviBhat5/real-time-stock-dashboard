/*const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }  
});

const subscriptions = {}; 

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("subscribe", ({ email, stock }) => {
    if (!subscriptions[email]) subscriptions[email] = [];
    subscriptions[email].push(stock);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

setInterval(() => {
  for (const email in subscriptions) {
    subscriptions[email].forEach((stock) => {
      const price = (Math.random() * 1000 + 100).toFixed(2);
      io.emit("priceUpdate", { email, stock, price });
    });
  }
}, 1000);

server.listen(4000, () => {
  console.log("Server listening on 4000");
});*/

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://real-time-stock-dashboard-kdkgw9dbk-vaishnavi-bhats-projects.vercel.app/", // change after frontend deploy
    methods: ["GET", "POST"]
  }
});


const subscriptions = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("subscribe", ({ email, stock }) => {
    socket.join(email);

    if (!subscriptions[email]) {
      subscriptions[email] = [];
    }

    if (!subscriptions[email].includes(stock)) {
      subscriptions[email].push(stock);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

setInterval(() => {
  for (const email in subscriptions) {
    subscriptions[email].forEach((stock) => {
      const price = (Math.random() * 1000 + 100).toFixed(2);

      io.to(email).emit("priceUpdate", {
        stock,
        price
      });
    });
  }
}, 1000);

/*server.listen(4000, () => {
  console.log("Server running on port 4000");
});*/
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


