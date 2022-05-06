!((doc, WebSocket, localStorage) => {
  const oList = doc.querySelector("#list");
  const oMsg = doc.querySelector("#msg");
  const oSendBtn = doc.querySelector("#send");
  const ws = new WebSocket("ws://localhost:8000");
  let username = "";
  const init = () => {
    bindEvent();
  };
  function bindEvent() {
    oSendBtn.addEventListener("click", handleSendBtn, false);
    ws.addEventListener("open", handleOpen, false);
    ws.addEventListener("error", handleError, false);
    ws.addEventListener("message", handleMessage, false);
    ws.addEventListener("close", handleClose, false);
  }
  function handleSendBtn() {
    console.log("send MESSAGE");
    const msg = oMsg.value;
    if (!msg.trim().length) {
      return;
    }

    let data = JSON.stringify({
      user: username,
      message: msg,
    });
    // console.log(data);
    ws.send(data);
    oMsg.value = "";
  }
  function handleOpen() {
    console.log("ws open");
    username = localStorage.getItem("username");
    if (!username) {
      location.href = "entry.html";
      return;
    }
  }
  function handleError() {
    console.log("ws error");
  }
  function handleMessage(msg) {
    console.log("ws message");
    let msgData = msg.data;
    oList.appendChild(createMsg(msgData));
  }
  function createMsg(data) {
    const { user, message } = JSON.parse(data);
    // console.log(JSON.parse(data));
    const oItem = doc.createElement("li");
    oItem.innerHTML = `
      <p>
        <span> ${user}</span>
      </p>
      <p>
        <span> ${message}</span>
      </p>
    `;
    return oItem;
  }
  function handleClose() {
    console.log("ws close");
  }
  init();
})(document, WebSocket, localStorage);
