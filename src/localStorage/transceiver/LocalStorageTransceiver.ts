import { BaseTransceiver, SignalOption, TransceiverHandler } from "../../core";
import { walkArray } from "../../utils/commonUtil";
enum Status {
  close = 0,
  open = 1,
}
export type Filter = (event: Event) => boolean;
export class LocalStorageTransceiver extends BaseTransceiver {
  status: Status = Status.close;
  handlers: Array<TransceiverHandler> = [];
  context: Window = window;
  filter: Filter | null = null;
  constructor(option: CreateLocalStorageTransceiverOption) {
    super();
    this.context = option.win;
    this.filter = option.filter;
  }
  messageHandler(event: Event) {
    if (this.filter && this.filter(event)) {
      walkArray<TransceiverHandler>(this.handlers, (handler) => {});
    }
  }
  send(eventName: string, data?: unknown, option?: SignalOption) {
    return this;
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
}

export interface CreateLocalStorageTransceiverOption {
  win: Window;
  filter: Filter;
}
export default function createWindowTransceiver(
  option: CreateLocalStorageTransceiverOption
) {
  return new LocalStorageTransceiver(option);
}
