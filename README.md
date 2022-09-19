# cross-domain-emitter

跨载体的事件总线，用法类似于 node eventEmitter，但是进行了扩展使其变成一个可扩展不同类型的消息发送者和消息订阅者的一个发布订阅者模式。

## feature

- `同一window上下文事件分发`

- `同域跨浏览器窗口事件分发`:通过localStorage为媒介，将事件发送至其他窗口。

- `跨iframe事件分发`:

  - `支持不同域名或相同域名多个iframe进行事件分发`

  - `支持单发，多发、广播事件`

  - `接入主文档的应用可以在以iframe形式接入和以直接挂载dom方式接入之间进行无缝切换。与主文档通信的相关事件分发代码不变。`





  

## usage

` pnpm add cross-domain-emitter -S`

or

`npm i cross-domain-emitter -S`


```
// main document  http://main.com
import { WindowServer } from "cross-domain-emitter";

const server = new WindowServer("uuid");
server.on("message",(data)=>{
    ...
})
const transceiver = server.addIframeTransceiver({
    iframe: iframe,
    host: 'http://iframe.com',
    url: 'pageUrl',
});

iframe.onload=()=>{
    transceiver.start();
}

```

```
// iframe document http://iframe.com
import { WindowClient } from "cross-domain-emitter";

const client = new WindowClient("uuid");

const transceiver = client.createIframeTransceiver(`http://main.com`);
transceiver.start();
transceiver.onConnected((error) => {
    if (error) {
        console.log(error);
        return;
    }
    client.emit("message",window.location.href+": 我连接上啦。",{
        local: false
    })
});

```

## API


## examples

![alt demo](./demo.gif)
 
 demo code in tests.