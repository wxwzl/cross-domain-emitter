import { hingeJointTransceiver, unHingeJointTransceiver } from "src/core/utils";
import { walkArray } from "src/utils/commonUtil";
import EventBus from "../../core/EventBus";
import Store from "../../core/store";
import BaseTransceiver, { TransceiverHandler } from "../../core/transceiver/BaseTransceiver";
import createWindowTransceiver, {
  createWindowTransceiverOption,
  WindowTransceiver,
} from "../transceiver/WindowTransceiver";

export default class WindowEventBus extends EventBus {
  protected uuidKey = "";
  store = new Store();
  windowTransceivers = new WeakMap<Window, WindowTransceiver>();
  constructor(uuidKey: string) {
    super();
    this.uuidKey = uuidKey;
  }
  addWindowTransceiver(option: createWindowTransceiverOption) {
    let transceiver = this.windowTransceivers.get(option.win);
    if (transceiver) {
      transceiver.changeOption(option);
    } else {
      transceiver = createWindowTransceiver(option);
      this.windowTransceivers.set(option.win, transceiver);
      hingeJointTransceiver(transceiver, this);
      hingeJointTransceiver(transceiver, this.store);
    }
    return transceiver;
  }

  removeWindowTransceiver(transceiver: WindowTransceiver) {
    transceiver.stop();
    this.windowTransceivers.delete(transceiver.context);
    unHingeJointTransceiver(transceiver, this);
    unHingeJointTransceiver(transceiver, this.store);
  }

  removeWindowTransceiverByWindow(win: Window) {
    const transceiver = this.windowTransceivers.get(win);
    if (transceiver) {
      this.removeWindowTransceiver(transceiver);
    }
  }
  findWindowTransceiverByWindowIds(ids: Array<string>) {
    const targets: Array<BaseTransceiver> = [];
    walkArray(ids, (id) => {
      const target = this.transceivers.find((transceiver) => {
        if ((transceiver as WindowTransceiver).id === id) {
          return true;
        }
      });
      if (target) {
        targets.push(target);
      }
    });
    return targets;
  }
}
