void ((doc, storage, location) => {
  const oUsername = doc.querySelector("#username");
  const oEnterBtn = doc.querySelector("#enter");

  const init = () => {};
  bindEvent();
  function bindEvent() {
    oEnterBtn.addEventListener("click", handlerBtnClick, false);
  }
  function handlerBtnClick() {
    const username = oUsername.value.trim();
    if (username.length < 6) {
      alert("X");
      return;
    }
    storage.setItem("username", username);
    location.href = "index.html";
  }
  init();
})(document, localStorage, location);
