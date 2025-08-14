
const eventBus =new  CrossDomainEmitter.EventBus();
const transceiver = CrossDomainEmitter.createLocalStorageTransceiver({win:window,keyPrefix:"test-"});
CrossDomainEmitter.hingeJointTransceiver(transceiver,eventBus)
transceiver.start();
const appName = document.getElementById("name").innerHTML;
function getMessage(str){
  return appName+":"+str;
}
addButton.addEventListener("click",()=>{
  eventBus.emit("message",getMessage(text.value),{local:false});
})
function render(text) {
  const node = document.createElement("p");
  node.innerHTML = text;
  container.appendChild(node);
}
eventBus.on("message",(str)=>{
  render(str)
});