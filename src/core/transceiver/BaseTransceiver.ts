import EventBus from "../EventBus";

export interface TransceiverHandler {
  onMessage: (data: Signal) => void;
}
export default abstract class BaseTransceiver {
  abstract send(eventName: string, data?: unknown, option?: SignalOption): void;
  abstract start(): void;
  abstract stop(): void;
  abstract addHandler(handler: TransceiverHandler): void;
  abstract removeHandler(handler: TransceiverHandler): void;
  abstract clearHandler(): void;
  abstract checkStatus(): boolean;
}

export interface SignalOption {
  returnEvent?: string;//
  local?: boolean;
  transceiver?: BaseTransceiver; //会在收发器接收到消息时由收发器额外添加
  emitter?: EventBus;
  event?: Event; //会在收发器接收到消息时由收发器额外添加
}
export interface Signal {
  name: string;
  data: unknown;
  option?: SignalOption;
}
