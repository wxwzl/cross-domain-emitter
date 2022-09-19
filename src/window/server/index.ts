import { WindowTransceiver } from "../transceiver/WindowTransceiver";
import { nanoid } from "nanoid";
import WindowEventBus from "../WindowEventBus";
export interface AddIframeTransceiverOption {
  iframe: HTMLIFrameElement;
  host: string;
  allowHost?: Array<string>;
  url: string;
  uuidKey?: string;
  uuidValue?: string;
}
export class WindowServer extends WindowEventBus {
  addIframeTransceiver(option: AddIframeTransceiverOption) {
    const uuidValue = option.uuidValue ? option.uuidValue : nanoid();
    const uuidKey = option.uuidKey ? option.uuidKey : this.uuidKey;
    const url = this.addUUIDtoUrl(option.url, uuidKey, uuidValue);
    option.iframe.src = url;
    const transceiver = this.addWindowTransceiver({
      win: option.iframe.contentWindow as Window,
      ...option,
    });
    transceiver.setUUID(uuidValue);
    transceiver.setUUIDKey(uuidKey);
    return transceiver;
  }

  changeIframeTransceiver(transceiver: WindowTransceiver, option: AddIframeTransceiverOption) {
    const uuidValue = option.uuidValue ? option.uuidValue : transceiver.getUUID();
    const uuidKey = option.uuidKey ? option.uuidKey : transceiver.getUUIDKey();
    const url = this.addUUIDtoUrl(option.url, uuidKey, uuidValue);
    option.iframe.src = url;
    transceiver.changeOption({
      win: option.iframe.contentWindow as Window,
      host: option.host,
      allowHost: option.allowHost,
    });
    return transceiver;
  }

  removeIframeTransceiver(iframe: HTMLIFrameElement) {
    if (iframe.contentWindow) {
      this.removeWindowTransceiverByWindow(iframe.contentWindow);
    }
  }
  addUUIDtoUrl(url: string, uuidKey: string, uuidValue: string) {
    if (url.indexOf("?") < 0) {
      url = url + "?";
    }
    const uuidParmas = uuidKey + "=" + uuidValue;
    if (/\?$/.test(url)) {
      url = url + uuidParmas;
    } else {
      url = url + "&" + uuidParmas;
    }
    return url;
  }
}
