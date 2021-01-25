import { action, observable } from "mobx";

export class NotificationDto {
  constructor(public readonly text: string) {}
}

export class NotificationService {
  public static readonly NOTIFICATION_LIFETIME = 3000;

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
  public enqueueNotification(notif: NotificationDto) {
    this.notificationQueue.push(notif);
  }
}
