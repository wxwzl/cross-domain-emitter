import { Signal, SignalOption } from "../../core/transceiver/BaseTransceiver";

export default class WindowSignal implements Signal {
  name = "";
  data: any = null;
  option!: SignalOption;
  constructor(eventName: string, data: any, option?: SignalOption) {
    this.name = eventName;
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
      return new WindowSignal(data.name, data.data, data.option);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  static copyFrom(data: { name: string; data?: any; option?: SignalOption }) {
    return new WindowSignal(data.name, data.data, data.option);
  }
}
