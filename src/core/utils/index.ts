import BaseTransceiver, { TransceiverHandler } from "../transceiver/BaseTransceiver";

export function hingeJointTransceiver(
  transceiver: BaseTransceiver,
  transceiverHandler: TransceiverHandler & {
    addTransceiver: (transceiver: BaseTransceiver) => void;
  }
) {
  transceiver.addHandler(transceiverHandler);
  transceiverHandler.addTransceiver(transceiver);
}

export function unHingeJointTransceiver(
  transceiver: BaseTransceiver,
  transceiverHandler: TransceiverHandler & {
    removeTransceiver: (transceiver: BaseTransceiver) => void;
  }
) {
  transceiver.removeHandler(transceiverHandler);
  transceiverHandler.removeTransceiver(transceiver);
}
