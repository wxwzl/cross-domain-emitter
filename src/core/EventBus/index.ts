import BaseTransceiver, { Signal, SignalOption } from "../transceiver/BaseTransceiver";
import { isArray, walkArray } from "../../utils/commonUtil";
import EventEmitter from "@wxwzl/eventemitter";
import { nanoid } from "nanoid";

export default class EventBus extends EventEmitter {
  id = nanoid();
  transceivers: Array<BaseTransceiver> = [];
  emitters: Array<EventBus> = [];
  emit(
    eventName: string,
    data?: unknown,
    option?: SignalOption,
    transceivers?: BaseTransceiver | EventBus | Array<BaseTransceiver | EventBus>
  ) {
    if (!option || option.local !== false) {
      super.emit(eventName, data, option);
    }
    if (!option) {
      option = {};
    }
    if (!option.emitterId) {
      option.emitterId = this.id;
    }
    if (transceivers) {
      if (isArray(transceivers)) {
        walkArray<BaseTransceiver | EventBus>(
          transceivers as Array<BaseTransceiver | EventBus>,
          (handler) => {
            if (handler instanceof BaseTransceiver) {
              if (handler && handler.checkStatus()) {
                handler.send(eventName, data, option);
              }
            } else if (handler instanceof EventBus) {
              handler.onMessage({
                data: data,
                name: eventName,
                option: option,
              });
            }
          }
        );
      } else {
        if (transceivers instanceof BaseTransceiver) {
          if (transceivers.checkStatus()) {
            transceivers.send(eventName, data, option);
          }
        } else if (transceivers instanceof EventBus) {
          transceivers.onMessage({
            data: data,
            name: eventName,
            option: option,
          });
        }
      }
      return this;
    }
    if (!option || option.local !== true) {
      this.emitters.forEach((emitter) => {
        emitter.onMessage({ data: data, name: eventName, option: option });
      });
      const defaultTransceivers = this.transceivers;
      for (let i = 0; i < defaultTransceivers.length; i++) {
        const handler = defaultTransceivers[i];
        if (handler && handler.checkStatus()) {
          handler.send(eventName, data, option);
        } else {
          defaultTransceivers.splice(i, 1);
          i--;
        }
      }
    }
    return this;
  }

  bindTransceiver(transceiver: BaseTransceiver) {
    let flag = true;
    walkArray(this.transceivers, (target) => {
      if (target === transceiver) {
        flag = false;
        return true;
      }
    });
    if (flag) {
      this.transceivers.push(transceiver);
    }
  }
  unBindTransceiver(transceiver: BaseTransceiver) {
    walkArray(this.transceivers, (target, index) => {
      if (target === transceiver) {
        this.transceivers.splice(index, 1);
        return true;
      }
    });
  }
  clearTransceiver() {
    this.transceivers = [];
  }
  onMessage(data: Signal) {
    super.emit(data.name, data.data, data.option);
  }
  addEmitter(emiter: EventBus) {
    let flag = true;
    walkArray(this.emitters, (target, index) => {
      if (target === emiter) {
        flag = false;
        return true;
      }
    });
    if (flag) {
      this.emitters.push(emiter);
    }
  }
  removeEmitter(emiter: EventBus) {
    walkArray(this.emitters, (target, index) => {
      if (target === emiter) {
        this.emitters.splice(index, 1);
        return true;
      }
    });
  }
}
