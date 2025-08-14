import { BaseTransceiver, SignalOption, TransceiverHandler } from "../../core";
import { walkArray } from "../../utils/commonUtil";
import { LocalStorageTransceiver, createLocalStorageTransceiver } from "../../localStorage";
import {
  BroadcastChannelTransceiver,
  createBroadcastChannelTransceiver,
} from "../../broadcastChannel";

enum Status {
  close = 0,
  open = 1,
}

export type SameOriginFilter = (event: Event | MessageEvent) => boolean;

export interface CreateSameOriginTransceiverOption {
  win: Window;
  filter?: SameOriginFilter;
  channelName?: string;
  keyPrefix?: string;
  preferBroadcastChannel?: boolean; // 是否优先使用BroadcastChannel
}

export class SameOriginTransceiver extends BaseTransceiver {
  status: Status = Status.close;
  handlers: Array<TransceiverHandler> = [];
  context: Window = window;
  channelName: string;
  keyPrefix: string;
  filter: SameOriginFilter | undefined = undefined;
  uuid: string;
  preferBroadcastChannel: boolean;

  // 通信方式
  localStorageTransceiver: LocalStorageTransceiver | null = null;
  broadcastChannelTransceiver: BroadcastChannelTransceiver | null = null;
  currentTransceiver: BaseTransceiver | null = null;

  constructor(option: CreateSameOriginTransceiverOption) {
    super();
    this.context = option.win;
    this.filter = option.filter;
    this.channelName = option.channelName || "cross-domain-emitter-same-origin";
    this.keyPrefix = option.keyPrefix || "same-origin-";
    this.uuid = new Date().getTime() + "_" + Math.floor(Math.random() * 1000);
    this.preferBroadcastChannel = option.preferBroadcastChannel ?? true;

    this.initializeTransceivers();
  }

  private initializeTransceivers() {
    // 检查BroadcastChannel支持并创建（如果支持）
    if (this.isBroadcastChannelSupported()) {
      this.broadcastChannelTransceiver = createBroadcastChannelTransceiver({
        win: this.context,
        filter: this.filter ? (event) => this.filter!(event) : undefined,
        channelName: this.channelName,
      });

      // 如果优先使用BroadcastChannel，直接选择它
      if (this.preferBroadcastChannel) {
        this.currentTransceiver = this.broadcastChannelTransceiver;
        console.log("使用BroadcastChannel进行同域通信");
        return;
      }
    }

    // 如果不支持BroadcastChannel或优先使用localStorage，创建localStorage收发器
    this.localStorageTransceiver = createLocalStorageTransceiver({
      win: this.context,
      filter: this.filter ? (event) => this.filter!(event) : undefined,
      keyPrefix: this.keyPrefix,
    });

    this.currentTransceiver = this.localStorageTransceiver;
    console.log("使用localStorage进行同域通信");
  }

  private isBroadcastChannelSupported(): boolean {
    return typeof (this.context as any).BroadcastChannel !== "undefined";
  }

  send(eventName: string, data?: unknown, option?: SignalOption) {
    if (this.status !== Status.open || !this.currentTransceiver) {
      return this;
    }

    return this.currentTransceiver.send(eventName, data, option);
  }

  start() {
    if (this.status === Status.close) {
      this.status = Status.open;

      // 启动当前收发器
      if (this.currentTransceiver) {
        this.currentTransceiver.start();
      }
    }
  }

  stop() {
    if (this.status === Status.open) {
      this.status = Status.close;

      // 停止当前收发器
      if (this.currentTransceiver) {
        this.currentTransceiver.stop();
      }
    }
  }

  clearHandler() {
    this.handlers = [];

    // 清理当前收发器
    if (this.currentTransceiver) {
      this.currentTransceiver.clearHandler();
    }
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

      // 添加到当前收发器
      if (this.currentTransceiver) {
        this.currentTransceiver.addHandler(handler);
      }
    }
  }

  removeHandler(handler: TransceiverHandler) {
    walkArray(this.handlers, (target, index) => {
      if (target === handler) {
        this.handlers.splice(index, 1);
        return true;
      }
    });

    // 从当前收发器移除
    if (this.currentTransceiver) {
      this.currentTransceiver.removeHandler(handler);
    }
  }

  checkStatus(): boolean {
    return this.status === Status.open && !!this.currentTransceiver;
  }

  /**
   * 获取当前使用的通信方式
   */
  getCurrentTransceiverType(): "broadcastChannel" | "localStorage" {
    if (this.currentTransceiver === this.broadcastChannelTransceiver) {
      return "broadcastChannel";
    }
    return "localStorage";
  }

  /**
   * 切换到BroadcastChannel（如果支持）
   */
  switchToBroadcastChannel(): boolean {
    if (this.isBroadcastChannelSupported() && this.broadcastChannelTransceiver) {
      this.currentTransceiver = this.broadcastChannelTransceiver;
      if (this.status === Status.open) {
        this.broadcastChannelTransceiver.start();
      }
      return true;
    }
    return false;
  }

  /**
   * 切换到localStorage
   */
  switchToLocalStorage(): boolean {
    // 如果localStorage收发器不存在，创建它
    if (!this.localStorageTransceiver) {
      this.localStorageTransceiver = createLocalStorageTransceiver({
        win: this.context,
        filter: this.filter ? (event) => this.filter!(event) : undefined,
        keyPrefix: this.keyPrefix,
      });
    }

    this.currentTransceiver = this.localStorageTransceiver;
    if (this.status === Status.open) {
      this.localStorageTransceiver.start();
    }
    return true;
  }

  /**
   * 获取连接的tab数量
   */
  getConnectedTabCount(): number {
    if (
      this.currentTransceiver === this.broadcastChannelTransceiver &&
      this.broadcastChannelTransceiver
    ) {
      return this.broadcastChannelTransceiver.getConnectedTabCount();
    } else {
      // localStorage无法准确获取连接数
      return 1;
    }
  }
}

export function createSameOriginTransceiver(option: CreateSameOriginTransceiverOption) {
  return new SameOriginTransceiver(option);
}
