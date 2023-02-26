/**
 * @jest-environment jsdom
 */
import { WindowClient, createVirtualService, Store, SignalOption } from "../dist/index";
jest.setTimeout(500000);
jest.mock("nanoid", () => ({
  nanoid: () => {
    return new Date().getTime();
  },
}));

test("store", () => {
  const CallFunction = jest.fn();
  let time = 0;
  const aHandler = function () {
    time++;
    CallFunction();
  };
  const store = new Store();
  store.on("a", aHandler);
  const a1 = { a: 1 };
  store.set("a", a1);
  expect(CallFunction).toHaveBeenCalled();
  let a = store.get("a");
  expect(a).toStrictEqual(a1);
  const a2 = { a: 2 };
  store.set("a", a2);
  a = store.get("a");
  expect(a).toStrictEqual(a2);
  store.off("a", aHandler);
  const a3 = { a: 3 };
  store.set("a", a3);
  a = store.get("a");
  expect(a).toStrictEqual(a3);
  expect(time).toStrictEqual(2);
});

test("createVirtualService", () => {
  const server = new WindowClient("__u_u_i_d");
  const data = createVirtualService(server, "data");
  data.set((data: unknown, option: SignalOption, resolve: (value: unknown) => void) => {
    return resolve(1);
  });
  let target;
  data.get().then((res: unknown) => {
    target = res;
    expect(target).toStrictEqual(1);
  });
  const CallFunction = jest.fn();
  data.on((data: { newVal: unknown; oldVal?: unknown }) => {
    expect(data.newVal).toStrictEqual(2);
    expect(data.oldVal).toStrictEqual(1);
    CallFunction();
  });
  data.set(() => {
    return 2;
  });
});
