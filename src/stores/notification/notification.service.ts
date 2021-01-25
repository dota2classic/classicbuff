import { action, observable } from "mobx";
import { ReactNode } from "react";

export class NotificationDto {
  constructor(public readonly text: ReactNode, public readonly id?: string) {}
}

export class NotificationService {
  public static readonly NOTIFICATION_LIFETIME = 3000;

  @observable
  public permanentQueue: NotificationDto[] = [];

  @observable
  private notificationQueue: NotificationDto[] = [];

  @observable
  public currentPendingNotification?: NotificationDto;

  constructor() {
    setInterval(() => this.processQueue(), NotificationService.NOTIFICATION_LIFETIME);
  }

  @action
  private processQueue() {
    this.currentPendingNotification = this.notificationQueue.shift();
  }

  @action
  public dequeue(id: string) {
    const idx = this.permanentQueue.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.permanentQueue.splice(idx, 1);
    }
  }
  @action
  public enqueueNotification(notif: NotificationDto) {
    if (notif.id !== undefined) {
      this.permanentQueue.push(notif);
    } else {
      this.notificationQueue.push(notif);
      if (this.currentPendingNotification === undefined) this.currentPendingNotification = notif;
    }
  }
}
