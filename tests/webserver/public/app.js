
function render() {
  const node = document.createElement("p");
  node.innerHTML = text;
  container.appendChild(node);
}
const client = new CrossDomainEmitter.WindowClient("uuid");

function isInSubApp() {
  if (window.parent === window) {
    return false;
  }
  return true;
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
  });
} else if (isInMainApp()) {}
client.on("message", (data) => {
  render(data);
});
addButton.addEventListener("click", () => {
  client.emit("message", text.value, {
    local: false
  });
});