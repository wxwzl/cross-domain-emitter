import { SignalOption, TransceiverHandler } from "../../core";
import { LocalStorageTransceiver, createLocalStorageTransceiver } from "../../localStorage";
import {
  BroadcastChannelTransceiver,
  createBroadcastChannelTransceiver,
} from "../../broadcastChannel";
import { nanoid } from "src/utils/nanoid";

export type SameOriginFilter = (event: Event | MessageEvent) => boolean;

export interface CreateSameOriginTransceiverOption {
  win?: Window;
  filter?: SameOriginFilter;
  channelName?: string;
  keyPrefix?: string;
  preferBroadcastChannel?: boolean;
}
export enum TransceiverType {
  broadcastChannel = 0,
  localStorage = 1,
}

export class SameOriginTransceiver {
  private context: Window;
  private filter?: SameOriginFilter;
  private channelName: string;
  private keyPrefix: string;
  private uuid: string;
  private preferBroadcastChannel: boolean;

  // 通信方式
  private localStorageTransceiver: LocalStorageTransceiver | null = null;
  private broadcastChannelTransceiver: BroadcastChannelTransceiver | null = null;
  public currentTransceiver: LocalStorageTransceiver | BroadcastChannelTransceiver | null = null;
  private currentType: TransceiverType = TransceiverType.localStorage;

  // 状态管理
  private isStarted = false;
  private handlers: TransceiverHandler[] = [];

  constructor(option: CreateSameOriginTransceiverOption) {
    this.context = option.win || window;
    this.filter = option.filter;
    this.channelName = option.channelName || "cross-domain-emitter-same-origin";
    this.keyPrefix = option.keyPrefix || "same-origin-";
    this.uuid = nanoid();
    this.preferBroadcastChannel = option.preferBroadcastChannel ?? true;

    this.initializeTransceivers();
  }

  private initializeTransceivers() {
    // 优先创建BroadcastChannel（如果支持且优先）
    if (SameOriginTransceiver.isBroadcastChannelSupported() && this.preferBroadcastChannel) {
      this.broadcastChannelTransceiver = createBroadcastChannelTransceiver({
        filter: this.filter,
        channelName: this.channelName,
      });
      this.currentTransceiver = this.broadcastChannelTransceiver;
      this.currentType = TransceiverType.broadcastChannel;
      return;
    }

    // 回退到localStorage
    this.localStorageTransceiver = createLocalStorageTransceiver({
      win: this.context,
      filter: this.filter,
      keyPrefix: this.keyPrefix,
    });
    this.currentTransceiver = this.localStorageTransceiver;
    this.currentType = TransceiverType.localStorage;
  }

  // 公共方法
  send(eventName: string, data?: unknown, option?: SignalOption) {
    if (!this.isStarted || !this.currentTransceiver) return this;
    this.currentTransceiver.send(eventName, data, option);
    return this;
  }

  start() {
    if (this.isStarted) return this;

    this.isStarted = true;
    if (this.currentTransceiver) {
      this.currentTransceiver.start();
    }
    return this;
  }

  stop() {
    if (!this.isStarted) return this;

    this.isStarted = false;
    if (this.currentTransceiver) {
      this.currentTransceiver.stop();
    }
    return this;
  }

  restart() {
    this.stop();
    this.start();
    return this;
  }

  // 处理器管理
  addHandler(handler: TransceiverHandler) {
    if (this.handlers.includes(handler)) return this;

    this.handlers.push(handler);
    if (this.currentTransceiver) {
      this.currentTransceiver.addHandler(handler);
    }
    return this;
  }

  removeHandler(handler: TransceiverHandler) {
    const index = this.handlers.indexOf(handler);
    if (index > -1) {
      this.handlers.splice(index, 1);
      if (this.currentTransceiver) {
        this.currentTransceiver.removeHandler(handler);
      }
    }
    return this;
  }

  clearHandler() {
    this.handlers = [];
    if (this.currentTransceiver) {
      this.currentTransceiver.clearHandler();
    }
    return this;
  }

  // 状态查询
  checkStatus(): boolean {
    return this.isStarted && !!this.currentTransceiver?.checkStatus();
  }

  getCurrentTransceiverType(): TransceiverType {
    return this.currentType;
  }

  static isBroadcastChannelSupported(): boolean {
    return BroadcastChannelTransceiver.isBroadcastChannelSupported();
  }

  // 通信方式切换
  switchToBroadcastChannel(): boolean {
    if (!SameOriginTransceiver.isBroadcastChannelSupported()) return false;

    // 如果已经是BroadcastChannel，无需切换
    if (this.currentType === TransceiverType.broadcastChannel) return true;

    // 创建BroadcastChannel收发器（如果不存在）
    if (!this.broadcastChannelTransceiver) {
      this.broadcastChannelTransceiver = createBroadcastChannelTransceiver({
        filter: this.filter,
        channelName: this.channelName,
      });
    }

    // 切换收发器
    this.switchTransceiver(this.broadcastChannelTransceiver, TransceiverType.broadcastChannel);
    return true;
  }

  switchToLocalStorage(): boolean {
    // 如果已经是localStorage，无需切换
    if (this.currentType === TransceiverType.localStorage) return true;

    // 创建localStorage收发器（如果不存在）
    if (!this.localStorageTransceiver) {
      this.localStorageTransceiver = createLocalStorageTransceiver({
        win: this.context,
        filter: this.filter,
        keyPrefix: this.keyPrefix,
      });
    }

    // 切换收发器
    this.switchTransceiver(this.localStorageTransceiver, TransceiverType.localStorage);
    return true;
  }

  private switchTransceiver(
    newTransceiver: LocalStorageTransceiver | BroadcastChannelTransceiver,
    newType: TransceiverType
  ) {
    // 停止当前收发器
    if (this.currentTransceiver && this.isStarted) {
      this.currentTransceiver.stop();
      this.currentTransceiver.clearHandler();
    }

    // 切换到新收发器
    this.currentTransceiver = newTransceiver;
    this.currentType = newType;

    // 重新添加所有处理器
    this.handlers.forEach((handler) => {
      newTransceiver.addHandler(handler);
    });

    // 如果已启动，启动新收发器
    if (this.isStarted) {
      newTransceiver.start();
    }
  }
}

export function createSameOriginTransceiver(option: CreateSameOriginTransceiverOption) {
  return new SameOriginTransceiver(option);
}
