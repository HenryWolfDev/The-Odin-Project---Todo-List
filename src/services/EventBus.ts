import type { EventMap } from '../types/_eventMap';
const subscribers: Partial<{ [K in keyof EventMap]: Array<(data: EventMap[K]) => void> }> = {};

/**
 * Subscribes a callback to a specific event.
 * @param event - The event to listen to (e.g. 'task-toggled')
 * @param callback - The function to call when the event is published
 */
export function subscribe<K extends keyof EventMap>(event: K, callback: (data: EventMap[K]) => void): void {
  if (!subscribers[event]) {
    subscribers[event] = [];
  }
  subscribers[event]!.push(callback);
}

/**
 * Check if there are subscribers for this event and calls each callback and pass data.
 * @param event - The event (e.g. 'task-toggled')
 * @param data - specific data from EventMap
 */
export function publish<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
  if (subscribers[event]) {
    subscribers[event]!.forEach(callback => {
      callback(data);
    });
  }
}

/**
 * Finds callback in a specific event and removes it
 * @param event - The event where the callback is (e.g. 'task-toggled')
 * @param callback - The function to remove
 */
export function unsubscribe<K extends keyof EventMap>(event: K, callback: (data: EventMap[K]) => void): void {
  if (subscribers[event]) {
    subscribers[event] = subscribers[event]!.filter(callbacks => callbacks !== callback) as any;
  }
}
