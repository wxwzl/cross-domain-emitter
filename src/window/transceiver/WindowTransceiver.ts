import { isObject, isString, walkArray } from "../../utils/commonUtil";
import BaseTransceiver, { TransceiverHandler } from "../../core/transceiver/BaseTransceiver";
import WindowSignal from "./WindowSignal";
/**
 * 接收器状态
 * 0 处于关闭状态，1处于打开状态，只有处于打开状态才能🉑接收和发送数据
 *
 * @enum {number}
 */
enum Status {
  close = 0,
  open = 1,
}
export class WindowTransceiver extends BaseTransceiver {
  handlers: Array<TransceiverHandler> = [];
  context: Window = window;
  status: Status = Status.close;
  host = "";
  allowHost: Array<string> = [];
  constructor(option: createWindowTransceiverOption) {
    super();
    this.context = option.win;
    this.host = option.host;
    this.allowHost = option.allowHost;
  }
  messageHandler(event: Event & { origin: string; data: any }) {
    if (!this.allowHost || this.allowHost.length === 0 || this.allowHost.includes(event.origin)) {
      let signal: null | WindowSignal = null;
      if (isString(event.data)) {
        signal = WindowSignal.deserialize(event.data);
      } else if (isObject(event.data) && event.data.name) {
        signal = WindowSignal.copyFrom(event.data);
      }
      if (isObject<WindowSignal>(signal)) {
        walkArray<TransceiverHandler>(this.handlers, (handler) => {
          handler.onMessage(signal as WindowSignal);
        });
      }
    }
  }
  send(eventName: string, data?: unknown, option?: any) {
    if (this.status !== Status.open) {
      return;
    }
    if (window.structuredClone != undefined) {
      this.context.postMessage(new WindowSignal(eventName, data, option), this.host);
    } else {
      this.context.postMessage(new WindowSignal(eventName, data, option).serialize(), this.host);
    }
  }
  start() {
    this.status = Status.open;
    window.addEventListener("message", this.messageHandler.bind(this));
  }
  stop() {
    this.status = Status.close;
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
}
export interface createWindowTransceiverOption {
  win: Window;
  host: string;
  allowHost: Array<string>;
}
export default function createWindowTransceiver(option: createWindowTransceiverOption) {
  return new WindowTransceiver(option);
}
