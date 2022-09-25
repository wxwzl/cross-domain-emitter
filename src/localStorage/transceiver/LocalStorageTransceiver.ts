import { BaseTransceiver, SignalOption, TransceiverHandler } from "../../core";
import { walkArray } from "../../utils/commonUtil";
import LocalStorageSignal from "./LocalStorageSignal";
enum Status {
  close = 0,
  open = 1,
}
export type Filter = (event: Event) => boolean;
export class LocalStorageTransceiver extends BaseTransceiver {
  status: Status = Status.close;
  handlers: Array<TransceiverHandler> = [];
  context: Window = window;
  keyPrefix = "";
  filter: Filter | undefined = undefined;
  uuid = "";
  constructor(option: CreateLocalStorageTransceiverOption) {
    super();
    this.context = option.win;
    this.filter = option.filter;
    if (option.keyPrefix) {
      this.keyPrefix = option.keyPrefix;
    }
    this.uuid = new Date().getTime() + "_" + Math.floor(Math.random() * 1000);
  }
  isValidName(eventName: string) {
    if (!this.keyPrefix || (eventName && eventName.indexOf(this.keyPrefix) === 0)) {
      return true;
    }
    return false;
  }
  getRealName(name: string) {
    return name.replace(this.keyPrefix, "");
  }
  messageHandler(event: StorageEvent) {
    console.log("event:", event);
    const eventName = event.key as string;
    const data = this.context.localStorage.getItem(eventName);
    if (!data) {
      return;
    }
    if (this.isValidName(eventName)) {
      const realName = this.getRealName(eventName);
      const signal = LocalStorageSignal.deserialize(realName, data);
      if (signal.uuid !== this.uuid) {
        if (!this.filter || this.filter(event)) {
          walkArray<TransceiverHandler>(this.handlers, (handler) => {
            handler.onMessage(signal);
          });
          this.context.localStorage.removeItem(eventName);
        }
      }
    }
  }
  send(eventName: string, data?: unknown, option?: SignalOption) {
    const name = this.getEventName(eventName);
    const str = new LocalStorageSignal(this.uuid, eventName, data, option).serialize();
    this.context.localStorage.setItem(name, str);
    return this;
  }
  getEventName(eventName: string) {
    return this.keyPrefix + eventName;
  }
  start() {
    if (this.status === Status.close) {
      this.status = Status.open;
      this.context.addEventListener("storage", this.messageHandler.bind(this));
    }
  }
  stop() {
    this.status = Status.close;
    this.context.removeEventListener("storage", this.messageHandler.bind(this));
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
  checkStatus(): boolean {
    return !!this.context;
  }
  readHistoryMessage() {
    const storage = this.context.localStorage;
    for (const key in storage) {
      const event = new StorageEvent("history");
      event.initStorageEvent(key);
      this.messageHandler(event);
    }
  }
}

export interface CreateLocalStorageTransceiverOption {
  win: Window;
  filter?: Filter;
  keyPrefix?: string;
}
export function createLocalStorageTransceiver(option: CreateLocalStorageTransceiverOption) {
  return new LocalStorageTransceiver(option);
}
