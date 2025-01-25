import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

let userCount = 0;

let allSockets: WebSocket[] = [];

wss.on("error", (err) => {
  console.error("WebSocket server error:", err);
});

wss.on("connection", (socket) => {
  allSockets.push(socket);

  userCount++;
  console.log(`user connected! usercount:#${userCount} `);

  socket.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());
      console.log(`Received message: ${parsedMessage.text}`);
      const filteredSocket = allSockets.filter((singleSocket) => singleSocket !== socket);

      filteredSocket.forEach((singleSocket) => {
        if (singleSocket.readyState === WebSocket.OPEN) { // Check if socket is still open
          singleSocket.send(`{"text":"${parsedMessage.text}","type":"received"}`);
        }
      });
    } catch (error) {
      console.error("Error handling message:", error);
      socket.send("An error occurred while processing your message.");
    }
  });

  socket.on("error", (err) => {
    console.error("Error with client socket:", err);
  });

  socket.on("close", () => {
    userCount--;
    console.log(`user disconnected! usercount:#${userCount} `);
  });
});
