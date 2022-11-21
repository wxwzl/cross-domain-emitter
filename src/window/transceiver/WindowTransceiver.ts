import { isFunction, isObject, isString, walkArray } from "../../utils/commonUtil";
import BaseTransceiver, {
  SignalOption,
  TransceiverHandler,
} from "../../core/transceiver/BaseTransceiver";
import WindowSignal from "./WindowSignal";
import { nanoid } from "nanoid";
/**
 * 接收器状态
 * 0 处于关闭状态，1处于打开状态，3 处于链接中状态，4：处于链接失败状态，只有处于打开状态才能可接收和发送数据
 *
 * @enum {number}
 */
enum Status {
  close = 0,
  open = 1,
  connecting = 3,
  error = 4,
}
export class WindowTransceiver extends BaseTransceiver {
  handlers: Array<TransceiverHandler> = [];
  context: Window = window;
  status: Status = Status.close;
  host = "";
  allowHost: Array<string> | undefined = [];
  id = "";
  private uuidKey = "";
  private uuidValue = "";
  maxRetryTimes = 3;
  private retryTimes = -1;
  reconnectInterval = 500;
  private timeOutId: NodeJS.Timer | null = null;
  connectError: Error | undefined = undefined;

  private connectedCall: Array<(error?: Error) => void> = [];

  constructor(option: createWindowTransceiverOption) {
    super();
    this.context = option.win;
    this.host = option.host;
    this.allowHost = option.allowHost;
    this.id = option.idGenerator
      ? isFunction(option.idGenerator)
        ? option.idGenerator()
        : option.idGenerator
      : nanoid();
  }
  messageHandler(event: Event & { origin: string; data: any }) {
    if (!this.checkStatus()) {
      this.stop();
      return;
    }
    if (
      (this.allowHost && this.allowHost.includes(event.origin)) ||
      this.host === event.origin ||
      this.host === "*"
    ) {
      let signal: null | WindowSignal = null;
      if (isString(event.data)) {
        signal = WindowSignal.deserialize(event.data);
      } else if (isObject(event.data) && event.data.name) {
        signal = WindowSignal.copyFrom(event.data);
      }
      if (isObject<WindowSignal>(signal) && signal._uuid === this.uuidValue) {
        if (signal.name === "connect") {
          this.send("connected");
          return;
        }
        if (signal.name === "connected") {
          this.connected();
          return;
        }
        if (!signal.option) {
          signal.option = {};
        }
        signal.option.event = event;
        signal.option.transceiver = this;
        walkArray<TransceiverHandler>(this.handlers, (handler) => {
          handler.onMessage(signal as WindowSignal);
        });
      }
    }
  }
  send(eventName: string, data?: unknown, option?: SignalOption) {
    if (!this.uuidValue) {
      this.connectError = new Error("uuidValue is empty.");
      return this;
    }
    if (this.status === Status.close) {
      return this;
    }
    if ((window as any).structuredClone != undefined) {
      this.context.postMessage(
        new WindowSignal(this.uuidValue, eventName, data, option),
        this.host
      );
    } else {
      this.context.postMessage(
        new WindowSignal(this.uuidValue, eventName, data, option).serialize(),
        this.host
      );
    }
    return this;
  }
  start() {
    if (this.status === Status.close || this.status === Status.error) {
      this.status = Status.connecting;
      window.addEventListener("message", this.messageHandler.bind(this));
      this.connect();
    }
  }
  stop() {
    this.status = Status.close;
    this.resetProperties();
    window.removeEventListener("message", this.messageHandler.bind(this));
  }
  clearHandler() {
    this.handlers = [];
  }
  addHandler(handler: TransceiverHandler) {
    let flag = true;
    walkArray(this.handlers, (target) => {
      if (target === handler) {
        flag = false;
        return true;
      }
    });
    if (flag) {
      this.handlers.push(handler);
    }
  }
  removeHandler(handler: TransceiverHandler) {
    walkArray(this.handlers, (target, index) => {
      if (target === handler) {
        this.handlers.splice(index, 1);
        return true;
      }
    });
  }
  checkStatus() {
    if (this.context) {
      return true;
    }
    return false;
  }
  setUUID(str: string) {
    this.uuidValue = str;
  }
  getUUID() {
    return this.uuidValue;
  }
  setUUIDKey(str: string) {
    this.uuidKey = str;
  }
  getUUIDKey() {
    return this.uuidKey;
  }
  changeOption(option: createWindowTransceiverOption) {
    this.context = option.win;
    this.host = option.host;
    this.allowHost = option.allowHost;
  }
  private connect() {
    if (this.retryTimes <= this.maxRetryTimes) {
      this.retryTimes++;
      this.send("connect");
      this.timeOutId = setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    } else {
      this.connectError = new Error("connection retry fail.");
      this.connectedFailure();
    }
  }
  private connected() {
    this.resetProperties();
    this.status = Status.open;
    this.excuteConnectedCall();
  }
  private excuteConnectedCall(error?: Error) {
    while (this.connectedCall.length > 0) {
      const handler = this.connectedCall.shift();
      if (handler) {
        handler(error);
      }
    }
  }
  private connectedFailure() {
    this.status = Status.error;
    this.excuteConnectedCall(this.connectError);
    this.resetProperties();
  }
  private onConnected(callBack: (error?: Error) => void) {
    switch (this.status) {
      case Status.open:
        callBack();
        return;
      case Status.error:
        callBack(this.connectError);
        return;
      default:
        this.connectedCall.push(callBack);
    }
  }
  private resetProperties() {
    this.retryTimes = -1;
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
      this.timeOutId = null;
    }
  }
}
export interface createWindowTransceiverOption {
  win: Window;
  host: string;
  allowHost?: Array<string>;
  idGenerator?: Function | string;
}
export default function createWindowTransceiver(option: createWindowTransceiverOption) {
  return new WindowTransceiver(option);
}
