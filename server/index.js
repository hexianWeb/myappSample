const { WebSocketServer } = require("ws");
const Ws = require("ws");
void ((Ws) => {
  const server = new WebSocketServer({ port: 8000 });
  const init = () => {
    bindEvent();
  };
  function bindEvent() {
    server.on("open", handleOpen, false);
    server.on("close", handleClose, false);
    server.on("error", handleError, false);
    server.on("connection", handleConnection, false);
  }

  function handleOpen() {
    console.log("ws=open");
  }
  function handleClose() {
    console.log("ws=close");
  }
  function handleError() {
    console.log("ws=error");
  }
  function handleConnection(ws) {
    ws.on("message", handleMsg);
  }
  function handleMsg(msg) {
    let data = msg.toString();
    server.clients.forEach((c) => {
      c.send(data);
    });
  }
  init();
})(Ws);
