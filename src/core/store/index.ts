import EventBus from "../EventBus";
export default class Store extends EventBus {
  store: Record<string, unknown> = {};
  set(key: string, value: unknown) {
    let oldVal = this.store[key];
    this.store[key] = value;
    this.emit(key, { newVal: value, oldVal });
  }
  get(key: string) {
    return this.store[key];
  }
}
