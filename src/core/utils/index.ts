import BaseTransceiver, { TransceiverHandler } from "../transceiver/BaseTransceiver";

export function hingeJointTransceiver(
  transceiver: BaseTransceiver,
  transceiverHandler: TransceiverHandler & {
    bindTransceiver: (transceiver: BaseTransceiver) => void;
  }
) {
  transceiver.addHandler(transceiverHandler);
  transceiverHandler.bindTransceiver(transceiver);
}

export function unHingeJointTransceiver(
  transceiver: BaseTransceiver,
  transceiverHandler: TransceiverHandler & {
    unBindTransceiver: (transceiver: BaseTransceiver) => void;
  }
) {
  transceiver.removeHandler(transceiverHandler);
  transceiverHandler.unBindTransceiver(transceiver);
}
