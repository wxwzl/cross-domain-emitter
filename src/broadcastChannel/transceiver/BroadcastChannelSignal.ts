import { SignalOption } from "../../core";

export default class BroadcastChannelSignal {
  uuid: string;
  name: string;
  data: unknown;
  option?: SignalOption;
  timestamp: number;

  constructor(uuid: string, name: string, data?: unknown, option?: SignalOption) {
    this.uuid = uuid;
    this.name = name;
    this.data = data;
    this.option = option;
    this.timestamp = Date.now();
  }

  serialize(): string {
    return JSON.stringify({
      uuid: this.uuid,
      name: this.name,
      data: this.data,
      option: this.option,
      timestamp: this.timestamp,
    });
  }

  static deserialize(name: string, data: string): BroadcastChannelSignal {
    try {
      const parsed = JSON.parse(data);
      const signal = new BroadcastChannelSignal(
        parsed.uuid,
        parsed.name,
        parsed.data,
        parsed.option
      );
      signal.timestamp = parsed.timestamp;
      return signal;
    } catch (error) {
      console.error("Failed to deserialize BroadcastChannelSignal:", error);
      throw new Error("Invalid BroadcastChannelSignal data");
    }
  }
}
