import { WindowTransceiver } from "../transceiver/WindowTransceiver";
import { nanoid } from "nanoid";
import WindowEventBus from "../WindowEventBus";
export interface AddIframeTransceiverOption {
  iframe: HTMLIFrameElement;
  host: string;
  allowHost?: Array<string>;
  url: string;
}
export class WindowServer extends WindowEventBus {
  addIframeTransceiver(option: AddIframeTransceiverOption) {
    const uuid = nanoid();
    const url = this.addUUIDtoUrl(option.url, uuid);
    option.iframe.src = url;
    const transceiver = this.addWindowTransceiver({
      win: option.iframe.contentWindow as Window,
      ...option,
    });
    transceiver.setUUID(uuid);
    return transceiver;
  }

  changeIframeTransceiver(transceiver: WindowTransceiver, option: AddIframeTransceiverOption) {
    const url = this.addUUIDtoUrl(option.url, transceiver.getUUID());
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
  addUUIDtoUrl(url: string, uuid: string) {
    if (url.indexOf("?") < 0) {
      url = url + "?";
    }
    const uuidParmas = this.uuidKey + "=" + uuid;
    if (/\?$/.test(url)) {
      url = url + uuidParmas;
    } else {
      url = url + "&" + uuidParmas;
    }
    return url;
  }
}
