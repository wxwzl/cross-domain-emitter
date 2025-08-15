import { BaseTransceiver } from "src/core";
import EventBus from "../core/EventBus";
import {
  SameOriginTransceiver,
  createSameOriginTransceiver,
  SameOriginFilter,
  TransceiverType,
} from "./transceiver/SameOriginTransceiver";

export interface CreateSameOriginEventBusOption {
  channelName?: string;
  keyPrefix?: string;
  filter?: SameOriginFilter;
  preferBroadcastChannel?: boolean;
}

export default class SameOriginEventBus extends EventBus {
  private transceiver: SameOriginTransceiver;
  private channelName: string;
  private keyPrefix: string;

  constructor(option: CreateSameOriginEventBusOption = {}) {
    super();
    this.channelName = option.channelName || "cross-domain-emitter-same-origin";
    this.keyPrefix = option.keyPrefix || "same-origin-";

    // 创建SameOrigin收发器
    this.transceiver = createSameOriginTransceiver({
      win: window,
      filter: option.filter,
      channelName: this.channelName,
      keyPrefix: this.keyPrefix,
      preferBroadcastChannel: option.preferBroadcastChannel,
    });

    // 绑定收发器
    this.bindTransceiver(this.transceiver.currentTransceiver as BaseTransceiver);

    // 启动收发器
    this.transceiver.start();
  }

  /**
   * 发送消息到其他tab
   * @param eventName 事件名
   * @param data 数据
   * @param option 选项
   */
  sendToOtherTabs(eventName: string, data?: unknown, option?: any) {
    return this.emit(eventName, data, { ...option, local: false });
  }

  /**
   * 发送消息到所有tab（包括当前tab）
   * @param eventName 事件名
   * @param data 数据
   * @param option 选项
   */
  sendToAllTabs(eventName: string, data?: unknown, option?: any) {
    // 先发送到当前tab
    this.emit(eventName, data, { ...option, local: true });
    // 再发送到其他tab
    return this.sendToOtherTabs(eventName, data, option);
  }

  /**
   * 监听其他tab的连接事件
   * @param callback 回调函数
   */
  onTabConnected(callback: (tabId: string) => void) {
    this.on("__tab_connected", (data: { tabId: string }) => {
      callback(data.tabId);
    });
  }

  /**
   * 监听其他tab的断开连接事件
   * @param callback 回调函数
   */
  onTabDisconnected(callback: (tabId: string) => void) {
    this.on("__tab_disconnected", (data: { tabId: string }) => {
      callback(data.tabId);
    });
  }

  /**
   * 获取当前使用的通信方式
   */
  getCurrentTransceiverType(): TransceiverType {
    return this.transceiver.getCurrentTransceiverType();
  }

  isBroadcastChannelSupported(): boolean {
    return SameOriginTransceiver.isBroadcastChannelSupported();
  }
  /**
   * 切换到BroadcastChannel（如果支持）
   */
  switchToBroadcastChannel() {
    const oldTransceiver = this.transceiver.currentTransceiver as BaseTransceiver;
    if (this.transceiver.switchToBroadcastChannel()) {
      this.unBindTransceiver(oldTransceiver);
      this.bindTransceiver(this.transceiver.currentTransceiver as BaseTransceiver);
      return true;
    }
    return false;
  }

  /**
   * 切换到localStorage
   */
  switchToLocalStorage() {
    const oldTransceiver = this.transceiver.currentTransceiver as BaseTransceiver;
    if (this.transceiver.switchToLocalStorage()) {
      this.unBindTransceiver(oldTransceiver);
      this.bindTransceiver(this.transceiver.currentTransceiver as BaseTransceiver);
      return true;
    }
    return false;
  }
  /**
   * 检查通信状态
   */
  checkStatus(): boolean {
    return this.transceiver.checkStatus();
  }

  /**
   * 停止同域通信
   */
  stop() {
    this.transceiver.stop();
    this.unBindTransceiver(this.transceiver.currentTransceiver as BaseTransceiver);
  }

  /**
   * 重新启动同域通信
   */
  restart() {
    this.transceiver.restart();
  }

  /**
   * 强制刷新连接
   */
  refreshConnection() {
    this.transceiver.stop();
    this.transceiver.start();
  }
}

/**
 * 创建SameOriginEventBus的工厂函数
 */
export function createSameOriginEventBus(
  option?: CreateSameOriginEventBusOption
): SameOriginEventBus {
  return new SameOriginEventBus(option);
}
