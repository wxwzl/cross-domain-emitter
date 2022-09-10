import { getQueryByUrl } from "../../utils/commonUtil";
import WindowEventBus from "../WindowEventBus";

export default class WindowClient extends WindowEventBus {
  createIframeTransceiver(host: string) {
    const uuid = this.getUUID(window.location.href);
    const transceiver = this.addWindowTransceiver({
      win: window.parent as Window,
      host: host,
    });
    transceiver.setUUID(uuid);
    return transceiver;
  }

  getUUID(url: string) {
    const query = getQueryByUrl(url);
    return query[this.uuidKey];
  }
}
