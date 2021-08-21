import BaseTransceiver, {
    Signal,
    SignalOption,
  } from "../transceiver/BaseTransceiver";
  import { isArray, walkArray } from "../../utils/commonUtil";
  import EventEmitter from "@wxwzl/eventemitter";
  
  export default class EventBus extends EventEmitter {
    transceivers: Array<BaseTransceiver> = [];
    emitters: Array<EventBus> = [];
    emit(
      eventName: string,
      data?: unknown,
      option?: SignalOption,
      transceivers?: BaseTransceiver | Array<BaseTransceiver>
    ) {
      if (!option || option.local !== false) {
        super.emit(eventName, data, option);
      }
  
      if (transceivers) {
        if (isArray(transceivers)) {
          walkArray<BaseTransceiver>(
            transceivers as Array<BaseTransceiver>,
            (handler) => {
              if (handler && handler.checkStatus()) {
                handler.send(eventName, data, option);
              }
            }
          );
        } else {
          if ((transceivers as BaseTransceiver).checkStatus()) {
            (transceivers as BaseTransceiver).send(eventName, data, option);
          }
        }
        return this;
      }
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
      this.emitters.push(emiter);
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
  