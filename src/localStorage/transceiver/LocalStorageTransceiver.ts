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
  constructor(option: CreateLocalStorageTransceiverOption) {
    super();
    this.context = option.win;
    this.filter = option.filter;
    if (option.keyPrefix) {
      this.keyPrefix = option.keyPrefix;
    }
  }
  isValidName(eventName: string) {
    if (!this.keyPrefix || (eventName && eventName.indexOf(this.keyPrefix) === 0)) {
      return true;
    }
    return false;
  }
  messageHandler(event: StorageEvent) {
    const eventName = event.key as string;
    if (this.isValidName(eventName)) {
      if (this.filter && this.filter(event)) {
        const data = this.context.localStorage.getItem(eventName);
        const signal = LocalStorageSignal.deserialize(eventName, data);
        walkArray<TransceiverHandler>(this.handlers, (handler) => {
          handler.onMessage(signal);
        });
        this.context.localStorage.removeItem(eventName);
      }
    }
  }
  send(eventName: string, data?: unknown, option?: SignalOption) {
    const name = this.getEventName(eventName);
    this.context.localStorage.setItem(
      name,
      new LocalStorageSignal(eventName, data, option).serialize()
    );
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
export default function createWindowTransceiver(option: CreateLocalStorageTransceiverOption) {
  return new LocalStorageTransceiver(option);
}
