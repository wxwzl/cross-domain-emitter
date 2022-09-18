import { Signal, SignalOption } from "../../core/transceiver/BaseTransceiver";

export default class WindowSignal implements Signal {
  _uuid = "";
  name = "";
  data: any = null;
  option!: SignalOption;
  constructor(uuid: string, name: string, data: unknown, option?: SignalOption) {
    this._uuid = uuid;
    this.name = name;
    this.data = data;
    if (option) {
      this.option = option;
    }
  }
  serialize() {
    return JSON.stringify(this);
  }
  static deserialize(serializeStr: string) {
    try {
      const data = JSON.parse(serializeStr);
      return new WindowSignal(data._uuid, data.name, data.data, data.option);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  static copyFrom(data: { _uuid: string; name: string; data?: unknown; option?: SignalOption }) {
    return new WindowSignal(data._uuid, data.name, data.data, data.option);
  }
}
