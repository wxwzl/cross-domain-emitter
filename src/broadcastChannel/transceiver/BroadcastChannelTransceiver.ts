import { nanoid } from "src/utils/nanoid";
import { BaseTransceiver, Signal, SignalOption, TransceiverHandler } from "../../core";
import { walkArray } from "../../utils/commonUtil";

enum Status {
  close = 0,
  open = 1,
}

export type BroadcastFilter = (event: MessageEvent) => boolean;

export interface CreateBroadcastChannelTransceiverOption {
  win: Window;
  filter?: BroadcastFilter;
  channelName?: string;
}

export class BroadcastChannelTransceiver extends BaseTransceiver {
  status: Status = Status.close;
  handlers: Array<TransceiverHandler> = [];
  channelName: string;
  filter: BroadcastFilter | undefined = undefined;
  uuid: string;
  broadcastChannel: BroadcastChannel | null = null;

  constructor(option: CreateBroadcastChannelTransceiverOption) {
    super();
    this.filter = option.filter;
    this.channelName = option.channelName || "cross-domain-emitter-broadcast-channel";
    this.uuid = nanoid();

    // 创建BroadcastChannel
    this.broadcastChannel = new BroadcastChannel(this.channelName);
  }

  private messageHandler(event: MessageEvent) {
    if (this.filter && !this.filter(event)) {
      return;
    }

    try {
      const data = event.data;
      if (data && typeof data === "object" && data.uuid !== this.uuid) {
        const signal = new Signal(data.uuid, data.name, data.data, data.option);
        signal.timestamp = data.timestamp;
        walkArray<TransceiverHandler>(this.handlers, (handler) => {
          handler.onMessage(signal);
        });
      }
    } catch (error) {
      console.error("Failed to handle broadcast message:", error);
    }
  }

  send(eventName: string, data?: unknown, option?: SignalOption) {
    if (this.status !== Status.open || !this.broadcastChannel) {
      return this;
    }

    const messageData = {
      uuid: this.uuid,
      name: eventName,
      data: data,
      option: option,
      timestamp: Date.now(),
    };

    try {
      this.broadcastChannel.postMessage(messageData);
    } catch (error) {
      console.error("Failed to send message via BroadcastChannel:", error);
    }

    return this;
  }

  start() {
    if (this.status === Status.close && this.broadcastChannel) {
      this.status = Status.open;

      // 设置消息处理器
      this.broadcastChannel.onmessage = this.messageHandler.bind(this);

      // 发送上线通知
      this.send("__tab_connected", { tabId: this.uuid }, { local: true });
    }
  }

  stop() {
    if (this.status === Status.open) {
      this.status = Status.close;

      // 发送下线通知
      this.send("__tab_disconnected", { tabId: this.uuid }, { local: true });

      if (this.broadcastChannel) {
        this.broadcastChannel.close();
        this.broadcastChannel = null;
      }
    }
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
    return this.status === Status.open && !!this.broadcastChannel;
  }

  /**
   * 检查BroadcastChannel是否可用
   */
  static isBroadcastChannelSupported(): boolean {
    return typeof BroadcastChannel !== "undefined";
  }
}

export function createBroadcastChannelTransceiver(option: CreateBroadcastChannelTransceiverOption) {
  return new BroadcastChannelTransceiver(option);
}
