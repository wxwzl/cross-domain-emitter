function render(text) {
  const node = document.createElement("p");
  node.innerHTML = text;
  iframeContainer.appendChild(node);
}
const client = new CrossDomainEmitter.WindowClient("uuid");

function isInSubApp() {
  if (window.parent === window) {
    return false;
  }
  return true;
}

function changeMode(server, client) {
  server.addEmitter(client);
  server.store.addEmitter(client.store);
  client.addEmitter(server);
  client.store.addEmitter(server.store);
}

function isInMainApp() {
  if (window.parent === window && window._mainServer) {
    return true;
  }
  return false;
}
if (isInSubApp()) {
  const transceiver = client.createIframeTransceiver(`http://${host}:5003`);
  transceiver.start();
  transceiver.onConnected((error) => {
    if (error) {
      console.log(error);
      return;
    }
    client.emit("message", window.location.href + ": 我连接上啦。", {
      local: false
    })
  });
} else if (isInMainApp()) {
  changeMode(window._mainServer,client);
}else{
  
}
client.on("message", (data) => {
  render(data);
});
addButton.addEventListener("click", () => {
  client.emit("message", text.value, {
    local: false
  });
});
toASite.addEventListener("click", () => {
  client.emit("goto", "A");
});
toBSite.addEventListener("click", () => {
  client.emit("goto", "B");
});
toCSite.addEventListener("click", () => {
  client.emit("goto", "C");
});