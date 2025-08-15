import {
  SameOriginEventBus,
  SameOriginTransceiver,
  TransceiverType,
  createSameOriginEventBus,
} from "../src/sameOrigin";

describe("SameOriginEventBus", () => {
  let sameOriginEventBus: SameOriginEventBus;

  beforeEach(() => {
    sameOriginEventBus = createSameOriginEventBus();
  });

  afterEach(() => {
    sameOriginEventBus.stop();
  });

  test("should create SameOriginEventBus instance", () => {
    expect(sameOriginEventBus).toBeInstanceOf(SameOriginEventBus);
  });

  test("should send and receive messages locally", (done) => {
    const testData = { message: "Hello from test" };

    sameOriginEventBus.on("test-event", (data) => {
      expect(data).toEqual(testData);
      done();
    });

    sameOriginEventBus.sendToAllTabs("test-event", testData);
  });

  test("should send messages to other tabs only", () => {
    const testData = { message: "Hello to other tabs" };
    const callback = jest.fn();
    sameOriginEventBus.on("test-event", callback);

    // 发送到其他tab（不包括当前tab）
    sameOriginEventBus.sendToOtherTabs("test-event", testData);

    // 由于没有其他tab，消息不会在本地触发
    expect(callback).not.toHaveBeenCalled();
  });

  test("should handle tab connection events", (done) => {
    sameOriginEventBus.onTabConnected((tabId) => {
      expect(typeof tabId).toBe("string");
      expect(tabId).toBeTruthy();
      done();
    });

    // 模拟其他tab连接
    sameOriginEventBus.emit("__tab_connected", { tabId: "test-tab-id" });
  });

  test("should handle tab disconnection events", (done) => {
    sameOriginEventBus.onTabDisconnected((tabId) => {
      expect(typeof tabId).toBe("string");
      expect(tabId).toBeTruthy();
      done();
    });

    // 模拟其他tab断开连接
    sameOriginEventBus.emit("__tab_disconnected", { tabId: "test-tab-id" });
  });

  test("should restart communication", () => {
    sameOriginEventBus.stop();
    expect(sameOriginEventBus.checkStatus()).toBe(false);

    sameOriginEventBus.restart();
    expect(sameOriginEventBus.checkStatus()).toBe(true);
  });

  test("should create with custom options", () => {
    const customEventBus = createSameOriginEventBus({
      channelName: "custom-channel",
      keyPrefix: "custom-",
      preferBroadcastChannel: false,
    });
    expect(customEventBus).toBeInstanceOf(SameOriginEventBus);
    customEventBus.stop();
  });

  test("should create with custom filter", () => {
    const filter = (event: Event | MessageEvent) => {
      if ("data" in event) {
        return event.data?.type === "allowed";
      }
      return true;
    };
    const filteredEventBus = createSameOriginEventBus({ filter });
    expect(filteredEventBus).toBeInstanceOf(SameOriginEventBus);
    filteredEventBus.stop();
  });

  test("should get current transceiver type", () => {
    const transceiverType = sameOriginEventBus.getCurrentTransceiverType();
    expect([TransceiverType.broadcastChannel, TransceiverType.localStorage]).toContain(
      transceiverType
    );
  });

  test("should switch transceiver types", () => {
    if (SameOriginTransceiver.isBroadcastChannelSupported()) {
      // 测试切换到BroadcastChannel
      const switched = sameOriginEventBus.switchToBroadcastChannel();
      if (switched) {
        expect(sameOriginEventBus.getCurrentTransceiverType()).toBe(
          TransceiverType.broadcastChannel
        );
      }
    }

    // 测试切换到localStorage
    const switchedToLocalStorage = sameOriginEventBus.switchToLocalStorage();
    expect(switchedToLocalStorage).toBe(true);
    expect(sameOriginEventBus.getCurrentTransceiverType()).toBe(TransceiverType.localStorage);
  });

  test("should refresh connection", () => {
    const initialStatus = sameOriginEventBus.checkStatus();
    sameOriginEventBus.refreshConnection();
    expect(sameOriginEventBus.checkStatus()).toBe(initialStatus);
  });
});
