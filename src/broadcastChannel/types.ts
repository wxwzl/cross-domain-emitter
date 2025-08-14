import { SignalOption } from "../core";

export interface CreateTabEventBusOption {
  channelName?: string;
  filter?: (event: MessageEvent) => boolean;
}

export interface TabConnectionEvent {
  tabId: string;
  timestamp: number;
}

export interface TabMessageEvent {
  uuid: string;
  type: "message";
  name: string;
  data: unknown;
  option?: SignalOption;
  timestamp: number;
}

export interface TabPortOfferEvent {
  type: "port-offer";
  channelName: string;
  timestamp: number;
}

export interface TabPortResponseEvent {
  type: "port-response";
  port: MessagePort;
  timestamp: number;
}

export type TabEvent = TabMessageEvent | TabPortOfferEvent | TabPortResponseEvent;
