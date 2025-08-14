import { nanoid } from "nanoid";
import { SignalOption } from "../transceiver/BaseTransceiver";
import { isFunction } from "../../utils/commonUtil";
import EventBus from "./index";
export type ServiceCallBack = (
  data: unknown,
  option: SignalOption | undefined,
  resolve: (value: unknown) => void
) => void;

/**
 *
 * 返回 模拟的 Broswer/Server 模式 的请求。
 * 请求标识：eventName 即http请求中的请求路径
 * set: 设置响应的处理函数（调用resolve 发送处理结果）/或固定的值
 * get：发起请求 获取set 设置的数据
 * on: 接收 set 主动推送的数据变化
 * off: 停止接收set 主动推送的数据变化
 * destroy: 销毁
 * @param {EventBus} instance
 * @param {string} eventName
 * @returns
 */
export function createVirtualService(instance: EventBus, eventName: string) {
  const reqEvent = eventName + "_req";
  const updateEvent = eventName + "_update";
  let lastData: unknown = null;
  const returnEvents = new Set<string>();
  return {
    get() {
      return new Promise((resolve) => {
        const returnEvent = reqEvent + "_" + nanoid();
        returnEvents.add(returnEvent);
        instance.once(returnEvent, (data) => {
          returnEvents.delete(returnEvent);
          resolve(data);
        });
        instance.emit(reqEvent, null, { returnEvent: returnEvent });
      });
    },
    set(callBack: ServiceCallBack | unknown, clear = true) {
      if (clear) {
        instance.off(reqEvent);
      }
      instance.on(reqEvent, (data, option: SignalOption) => {
        let targetEvent = reqEvent;
        if (option && option.returnEvent) {
          targetEvent = option.returnEvent;
        }
        if (isFunction(callBack)) {
          new Promise((resolve) => {
            (callBack as ServiceCallBack)(data, option, resolve);
          }).then((data) => {
            instance.emit(targetEvent, data);
          });
        } else {
          instance.emit(targetEvent, callBack);
        }
      });
      if (isFunction(callBack)) {
        (callBack as ServiceCallBack)(undefined, undefined, (data) => {
          instance.emit(updateEvent, { newVal: data, oldVal: lastData });
          lastData = data;
        });
      } else {
        instance.emit(updateEvent, { newVal: callBack, oldVal: lastData });
        lastData = callBack;
      }
    },
    on(callBack: (data: { newVal: unknown; oldVal?: unknown }) => void) {
      instance.on(updateEvent, callBack);
    },
    off(callBack: (data: { newVal: unknown; oldVal?: unknown }) => void) {
      instance.off(updateEvent, callBack);
    },
    destroy() {
      returnEvents.forEach((eventName) => {
        instance.off(eventName);
      });
      instance.off(reqEvent);
      instance.off(updateEvent);
    },
  };
}
