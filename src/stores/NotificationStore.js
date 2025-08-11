class NotificationStore {
  constructor() {
    this.observers = new Set();
    this.notifications = [];
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notify(notification) {
    this.notifications.push(notification);
    this.observers.forEach((observer) => observer(notification));
  }

  getNotifications() {
    return this.notifications;
  }

  clearNotifications() {
    this.notifications = [];
  }
}

export const notificationStore = new NotificationStore();
