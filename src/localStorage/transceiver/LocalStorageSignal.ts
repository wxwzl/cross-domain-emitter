import { Signal, SignalOption } from "../../core/transceiver/BaseTransceiver";
export default class LocalStorageSignal implements Signal {
  uuid = "";
  name = "";
  data: any = null;
  option!: SignalOption;
  constructor(uuid: string, name: string, data?: unknown, option?: SignalOption) {
    this.uuid = uuid;
    this.name = name;
    this.data = data;
    if (option) {
      this.option = option;
    }
  }
  serialize() {
    return JSON.stringify(this);
  }
  static deserialize(name: string, serializeStr: string | null) {
    if (serializeStr) {
      try {
        const data = JSON.parse(serializeStr);
        return new LocalStorageSignal(data.uuid, name, data.data, data.option);
      } catch (error) {
        console.log(error);
        return new LocalStorageSignal("", name, serializeStr);
      }
    } else {
      return new LocalStorageSignal("", name);
    }
  }
  static copyFrom(data: { uuid: string; name: string; data?: unknown; option?: SignalOption }) {
    return new LocalStorageSignal(data.uuid, data.name, data.data, data.option);
  }
}
