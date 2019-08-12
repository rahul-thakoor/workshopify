const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { execFile } = require("child_process");
const fs = require("fs");
let running_processes = {};

io.on("connection", function(socket) {
  console.log("connection");
  // console.log(socket.handshake.address);
  socket.emit("CONNECTED", "Connected to server");

  socket.on("STOP", function(node) {
    if (running_processes[node]) {
      console.log(`Killing process for node : ${node}`);
      running_processes[node].kill();
    }
  });

  socket.on("RUN", function(client_data) {
    console.log("running");
    let code = client_data.code;
    const template = `
    const { EtherPortClient } = require("etherport-client");
    const five = require("johnny-five");
    const path = require("path");
    const scriptName = path.basename(__filename, ".js");

    const board = new five.Board({
      port: new EtherPortClient({
        host: process.env[scriptName.toUpperCase()],
        port: 3030
      }),
      repl: false
    });

    board.on("ready", () => {
      console.log("Board is ready");
      ${code}
    });
    `;
    const data = new Uint8Array(Buffer.from(template));
    let nodeName = `node${client_data.node}.js`;

    fs.writeFile(nodeName, data, err => {
      if (err) {
        console.log(error);
      }

      if (running_processes[client_data.node]) {
        console.log(`Killing process for node : ${client_data.node}`);
        running_processes[client_data.node].kill();
      }

      const child = execFile("node", [nodeName]);

      running_processes[client_data.node] = child;

      running_processes[client_data.node].stdout.on("data", data => {
        let payload = {
          node: client_data.node,
          data: data
        };
        socket.emit("OUTPUT", payload);
      });

      running_processes[client_data.node].stderr.on("data", data => {
        let payload = {
          node: client_data.node,
          data: data
        };
        socket.emit("ERROR", payload);
      });
    });
  });
});

app.use(express.json());
app.use(express.static("public"));
server.listen(8080);
console.log("Server listening on port 8080");

app.get("/", function(req, res) {
  res.redirect("/node/1");
});

app.get("/node/:id", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
