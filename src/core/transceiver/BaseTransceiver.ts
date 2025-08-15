export interface TransceiverHandler {
  onMessage: (data: SignalPart) => void;
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
  returnEvent?: string; //
  local?: boolean;
  transceiver?: BaseTransceiver; //会在收发器接收到消息时由收发器额外添加
  emitterId?: string;
  event?: Event; //会在收发器接收到消息时由收发器额外添加
}
export interface SignalPart {
  name: string;
  data: unknown;
  option?: SignalOption;
}
export class Signal {
  uuid = "";
  name = "";
  data: any = null;
  option!: SignalOption;
  timestamp: number;
  constructor(uuid: string, name: string, data?: unknown, option?: SignalOption) {
    this.uuid = uuid;
    this.name = name;
    this.data = data;
    this.timestamp = Date.now();
    if (option) {
      this.option = option;
    }
  }
  serialize() {
    return JSON.stringify(this);
  }
  static deserialize(serializeStr: string | null) {
    if (serializeStr) {
      try {
        const data = JSON.parse(serializeStr);
        const signal = new Signal(data.uuid, data.name, data.data, data.option);
        signal.timestamp = data.timestamp;
        return signal;
      } catch (error) {
        console.log(error);
        return new Signal("", "unknown", serializeStr);
      }
    } else {
      return new Signal("", "unknown");
    }
  }
  static copyFrom(data: { uuid: string; name: string; data?: unknown; option?: SignalOption }) {
    return new Signal(data.uuid, data.name, data.data, data.option);
  }
}
