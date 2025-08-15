# cross-domain-emitter

跨载体的事件总线，用法类似于 node eventEmitter，但是进行了扩展使其变成一个可扩展不同类型的消息发送者和消息订阅者的一个发布订阅者模式。

## feature

- `同一window上下文事件分发`

- `同域跨Tab事件分发`:通过BroadcastChannel API实现同域不同Tab之间的实时通信，不支持时自动回退到localStorage。

- `跨iframe事件分发`:

  - `支持不同域名或相同域名多个iframe进行事件分发`

  - `支持单发，多发、广播事件`

  - `接入主文档的应用可以在以iframe形式接入和以直接挂载dom方式接入之间进行无缝切换。与主文档通信的相关事件分发代码不变。`


## usage

` pnpm add cross-domain-emitter -S`

or

`npm i cross-domain-emitter -S`

### 同域跨Tab通信（推荐）

使用 `sameOrigin` 模块，它会自动选择最佳的通信方式：

```typescript
import { SameOriginEventBus, createSameOriginEventBus } from "cross-domain-emitter";

// 创建SameOriginEventBus实例，优先使用BroadcastChannel
const sameOriginEventBus = createSameOriginEventBus({
  preferBroadcastChannel: true
});

// 监听消息
sameOriginEventBus.on("message", (data) => {
  console.log("收到来自其他Tab的消息:", data);
});

// 发送消息到其他Tab
sameOriginEventBus.sendToOtherTabs("message", "Hello from Tab A");

// 发送消息到所有Tab（包括当前Tab）
sameOriginEventBus.sendToAllTabs("notification", "Important message");

// 监听Tab连接/断开事件
sameOriginEventBus.onTabConnected((tabId) => {
  console.log(`Tab ${tabId} 已连接`);
});

sameOriginEventBus.onTabDisconnected((tabId) => {
  console.log(`Tab ${tabId} 已断开`);
});

// 检查当前使用的通信方式
console.log(`当前通信方式: ${sameOriginEventBus.getCurrentTransceiverType()}`);

// 手动切换通信方式
if (sameOriginEventBus.isBroadcastChannelSupported()) {
  sameOriginEventBus.switchToBroadcastChannel();
} else {
  sameOriginEventBus.switchToLocalStorage();
}
```

### 仅使用BroadcastChannel

如果你只需要BroadcastChannel功能：

```typescript
import { BroadcastChannelTransceiver, createBroadcastChannelTransceiver } from "cross-domain-emitter";

const broadcastChannelTransceiver = createBroadcastChannelTransceiver({
  channelName: 'my-channel'
});

// 直接使用BroadcastChannel进行通信
broadcastChannelTransceiver.send('event', 'data');
```

### 仅使用localStorage

如果你只需要localStorage功能：

```typescript
import { LocalStorageTransceiver, createLocalStorageTransceiver } from "cross-domain-emitter";

const localStorageTransceiver = createLocalStorageTransceiver({
  keyPrefix: 'my-app-'
});
```

### 跨iframe通信

#### 主文档（Server端）

```typescript
// main document  http://main.com
import { WindowServer } from "cross-domain-emitter";

const server = new WindowServer("uuid");
server.on("message",(data)=>{
    ...
})
const transceiver = server.addIframeTransceiver({
    iframe: iframe,
    host: 'http://iframe.com',//或者*
    url: 'pageUrl',
});

iframe.onload=()=>{
    transceiver.start();
}
```

#### iframe文档（Client端）

```typescript
// iframe document http://iframe.com
import { WindowClient } from "cross-domain-emitter";

const client = new WindowClient("uuid");

const transceiver = client.createIframeTransceiver(`http://main.com||"*"?uuidKey={主窗口传递的通信校验码}`);
// 或者transceiver.setUUID(uuid) 手动设置通信校验码
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

### Window模块

Window模块提供了跨iframe、跨窗口的通信能力，支持主从架构和点对点通信。

#### 架构说明

Window模块采用主从架构设计：

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   主文档        │    │   iframe A      │    │   iframe B      │
│  (WindowServer) │◄──►│  (WindowClient) │    │  (WindowClient) │
│                 │    │                 │    │                 │
│  • 管理连接     │    │  • 与主文档通信 │    │  • 与主文档通信 │
│  • 消息路由     │    │  • 发送消息     │    │  • 发送消息     │
│  • 安全控制     │    │  • 接收消息     │    │  • 接收消息     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**通信流程：**
1. 主文档创建WindowServer实例
2. 添加iframe并创建WindowTransceiver
3. iframe创建WindowClient实例
4. 建立双向通信通道
5. 通过postMessage进行消息传输

#### 常见使用场景

**1. 微前端架构**
- 主应用管理多个子应用iframe,某些子应用可能同时存在进行iframe模式和wujie、qiankun、模块联邦等方式接入的
- 子应用间通过主应用进行通信
- 统一的用户状态、主题等的同步管理

**2. 第三方集成**
- 嵌入第三方服务（支付、地图、聊天等）
- 安全的消息传递
- 用户行为追踪

**3. 多窗口应用**
- 主窗口与弹出窗口通信
- 窗口间数据同步
- 统一的用户界面控制

**4. 跨域通信**
- 不同域名间的安全通信
- 白名单验证
- 消息加密传输

#### WindowServer

主文档端的事件总线，用于管理iframe连接。

**构造函数**
```typescript
new WindowServer(uuidKey: string)
```

**主要方法**

- `addIframeTransceiver(option: AddIframeTransceiverOption)`: 添加iframe收发器
- `changeIframeTransceiver(transceiver, option)`: 修改iframe收发器配置
- `removeIframeTransceiver(iframe)`: 移除iframe收发器
- `addWindowTransceiver(option)`: 添加窗口收发器
- `removeWindowTransceiver(transceiver)`: 移除窗口收发器
- `clearWindowTransceiver()`: 清理所有窗口收发器

**AddIframeTransceiverOption接口**
```typescript
interface AddIframeTransceiverOption {
  iframe: HTMLIFrameElement;           // iframe元素
  host: string;                        // 允许的主机域名
  allowHost?: Array<string>;           // 允许的主机列表
  url?: string;                        // iframe加载的URL
  uuidKey?: string;                    // UUID参数名
  uuidValue?: string;                  // UUID值，通信权限校验码
}
```

#### WindowClient

iframe端的事件总线，用于与主文档通信。

**构造函数**
```typescript
new WindowClient(uuidKey: string)
```

**主要方法**

- `createIframeTransceiver(host: string)`: 创建iframe收发器
- `getUUID(url: string)`: 从URL中提取UUID
- `addWindowTransceiver(option)`: 添加窗口收发器

#### WindowTransceiver

窗口通信收发器，负责具体的消息传输。

**创建方法**
```typescript
createWindowTransceiver(option: CreateWindowTransceiverOption)
```

**CreateWindowTransceiverOption接口**
```typescript
interface CreateWindowTransceiverOption {
  win: Window;                         // 目标窗口
  host: string;                        // 目标主机
  allowHost?: Array<string>;           // 允许的主机列表
  idGenerator?: Function | string;     // ID生成器
}
```

**主要方法**

- `start()`: 启动收发器
- `stop()`: 停止收发器
- `send(eventName, data, option)`: 发送消息
- `addHandler(handler)`: 添加消息处理器
- `removeHandler(handler)`: 移除消息处理器
- `clearHandler()`: 清理所有处理器
- `checkStatus()`: 检查连接状态
- `onConnected(callback)`: 监听连接成功事件
- `setUUID(uuid)`: 设置UUID
- `getUUID()`: 获取UUID
- `changeOption(option)`: 修改配置

#### createVirtualService 方法

用于快速封装对某个消息的收发接口

**主窗口**
```
const  userInfoService = createVirtualService(eventbus，"useInfo");
// 监听子窗口发起的获取用户信息
userInfoService.on((resolve)=>{
  // 获取用户信息，可以是异步操作
  resolve({name:'111'})
})
```

**子窗口**

```
const  userInfoService = createVirtualService(eventbus，"useInfo");

// 主动向主窗口获取用户信息
userInfoService.get().then((data)=>{
  console.log("userinfo:",data)
})
// 监听主窗口发送的用户信息变更
userInfoService.on((data)=>{
 console.log("userinfo changed:",data)
})
```

**状态枚举**
```typescript
enum Status {
  close = 0,      // 关闭状态
  open = 1,       // 打开状态
  connecting = 3, // 连接中
  error = 4       // 连接失败
}
```

**连接管理**

- `maxRetryTimes`: 最大重试次数（默认3次）
- `reconnectInterval`: 重连间隔（默认500ms）
- `onConnected(callback)`: 连接成功回调
- 自动重连机制，连接失败时自动重试

**安全特性**

- 支持主机白名单验证
- 支持跨域通信安全控制
- UUID认证机制防止消息伪造

#### 使用示例

**1. 主文档管理多个iframe**

```typescript
import { WindowServer } from "cross-domain-emitter";

const server = new WindowServer("app_id");

// 添加多个iframe
const iframe1 = document.getElementById("iframe1") as HTMLIFrameElement;
const iframe2 = document.getElementById("iframe2") as HTMLIFrameElement;

const transceiver1 = server.addIframeTransceiver({
  iframe: iframe1,
  host: "https://app1.example.com",
  url: "https://app1.example.com/page.html"
});

const transceiver2 = server.addIframeTransceiver({
  iframe: iframe2,
  host: "https://app2.example.com",
  url: "https://app2.example.com/page.html"
});

// 监听消息
server.on("user_login", (data) => {
  console.log("用户登录:", data);
});

// 广播消息到所有iframe
server.emit("update_ui", { theme: "dark" });
```

**2. iframe与主文档通信**

```typescript
import { WindowClient } from "cross-domain-emitter";

const client = new WindowClient("app_id");

// 创建与主文档的通信
const transceiver = client.createIframeTransceiver("https://main.example.com?uuidKey={主窗口传递的uuid}");

// 启动通信
transceiver.start();

// 监听连接状态
transceiver.onConnected((error) => {
  if (error) {
    console.error("连接失败:", error);
    return;
  }
  
  console.log("连接成功！");
  
  // 发送消息到主文档
  client.emit("iframe_ready", {
    title: document.title,
    url: window.location.href
  });
});

// 监听主文档消息
client.on("theme_change", (data) => {
  document.body.className = data.theme;
});
```

**3. 动态管理iframe连接**

```typescript
// 动态添加iframe
function addDynamicIframe(url: string, host: string) {
  const iframe = document.createElement("iframe");
  iframe.src = url;
  document.body.appendChild(iframe);
  
  const transceiver = server.addIframeTransceiver({
    iframe,
    host,
    url
  });
  
  iframe.onload = () => {
    transceiver.start();
  };
  
  return { iframe, transceiver };
}

// 移除iframe
function removeIframe(iframe: HTMLIFrameElement) {
  server.removeIframeTransceiver(iframe);
  iframe.remove();
}
```

### SameOriginEventBus

整合localStorage和BroadcastChannel的同域通信事件总线类。

#### 构造函数选项

- `channelName`: 通信频道名称，默认为 'cross-domain-emitter-same-origin'
- `keyPrefix`: localStorage键前缀，默认为 'same-origin-'
- `filter`: 消息过滤器函数
- `preferBroadcastChannel`: 是否优先使用BroadcastChannel，默认为true

#### 主要方法

- `sendToOtherTabs(eventName, data, option)`: 发送消息到其他Tab
- `sendToAllTabs(eventName, data, option)`: 发送消息到所有Tab
- `onTabConnected(callback)`: 监听Tab连接事件
- `onTabDisconnected(callback)`: 监听Tab断开事件
- `getCurrentTransceiverType()`: 获取当前使用的通信方式
- `switchToBroadcastChannel()`: 切换到BroadcastChannel
- `switchToLocalStorage()`: 切换到localStorage
- `isBroadcastChannelSupported()`: 检查BroadcastChannel支持
- `checkStatus()`: 检查通信状态
- `stop()`: 停止通信
- `restart()`: 重新启动通信
- `refreshConnection()`: 强制刷新连接

## examples

![alt demo](./demo.gif)
 
 demo code in tests.

### 同域通信演示

在 `examples/public/tab-communication.html` 中提供了完整的使用示例，包括：

1. **基本通信**: 创建和配置SameOriginEventBus
2. **强制localStorage**: 强制使用localStorage进行通信
3. **动态切换**: 运行时切换通信方式
4. **消息过滤**: 自定义消息过滤器
5. **实际应用**: 购物车同步,用户信息同步，账户金额等数字同步等实际场景

### 跨iframe通信演示
在 `examples/public/index.html` 中提供了完整的使用示例，包括：

1. **基本通信**
2. **通信权限校验**: 主应用通过url下发通信校验码
3. **iframe模式和同一个window上下文兼容通信**
4. **消息单发、多发**: 自定义消息过滤器
5. **异步通信链接建立时机的监听**: 避免因不知道iframe加载完成时机，而不知道何时才该发起通信的问题

### 测试

运行测试来验证功能：

```bash
npm test
```

## 浏览器兼容性

- **BroadcastChannel**: Chrome 54+, Firefox 38+, Safari 15.4+
- **localStorage**: 所有现代浏览器
- **Window模块**: 
  - **postMessage API**: IE 8+, Chrome 1+, Firefox 3+, Safari 4+
  - **iframe通信**: 所有支持iframe的现代浏览器
  - **跨域通信**: 需要目标域名支持CORS或配置正确的安全策略
- **自动降级**: 不支持的浏览器自动使用localStorage方案


