import { CustomEventParams } from '../hooks/hooks.type';

interface CustomEventsMap {
  replaceState: CustomEvent<CustomEventParams>;
  popState: CustomEvent<CustomEventParams>;
}

export interface Window {
  addEventListener<K extends keyof CustomEventsMap>(
    type: K,
    listenr: (this: Window, event: CustomEventsMap[K]) => void
  ): void;
  removeEventListener<K extends keyof CustomEventsMap>(
    type: K,
    listenr: (this: Window, event: CustomEventsMap[K]) => void
  ): void;
  dispatchEvent<K extends keyof CustomEventsMap>(event: CustomEventsMap[K]): void;
}
