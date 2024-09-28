export interface GetuiInterface {
  /**
   * 初始化推送
   */
  initPush(appId?: string): void;

  /**
   * Android 不存在 destroy方法，仅停止推送服务。
   */
  destroy(): void;

  /**
   * 停止SDK服务. 仅 Native 有效
   */
  stop(): void;

  /**
   * 恢复SDK运行，重新接收推送。仅 Native 有效
   */
  resume(): void;

  /**
   * 打开SDK的推送
   */
  turnOnPush(): void;

  /**
   * 关闭SDK的推送
   */
  turnOffPush(): void;

  /**
   * 获取SDK的Cid
   */
  getClientId(): Promise<string | null>;

  /**
   * 获取SDK运行状态
   */
  isPushTurnedOn(): Promise<boolean>;

  /**
   * 版本号
   */
  getVersion(): Promise<string>;

  /**
   * 绑定别名。 仅仅 Native 有效
   */
  bindAlias(alias: string): void;

  /**
   * 取消绑定别名功能。仅仅 Native 有效
   * @param alias
   */
  unbindAlias(alias: string): void;

  /**
   * 设置别名。仅仅 Native 有效
   * @param tag
   */
  setTag(tag: string[]): void;

  /**
   * 设置Socket超时时间。仅仅 Native 有效
   * @param times 超时时间
   */
  setSocketTimeout(times: number): void;

  /**
   * 监听clientId变化
   * @param callback
   */
  onClientId(callback: GetuiEventCallback<GetuiClientIdEvent>): RemovableSubscription;

  /**
   * 监听服务端pid
   * @param callback
   */
  onServerPid(callback: GetuiEventCallback<GetuiServerPidEvent>): RemovableSubscription;

  /**
   * 监听服务端状态变化
   * @param callback
   */
  onOnlineStatus(callback: GetuiEventCallback<GetuiOlineStateEvent>): RemovableSubscription;

  /**
   * 收到推送消息
   * @param callback
   */
  onPushMessage(callback: GetuiEventCallback<GetuiReceiveMessageDataEvent>): RemovableSubscription;

  /**
   * 点击了推送消息
   * @param callback
   */
  onNotificationEvent(callback: GetuiEventCallback<GetuiNotificationEvent>): RemovableSubscription;
}

export type RemovableSubscription = () => void;

export type GetuiEventCallback<Event> = (event: Event) => void;

export const EVENT_RECEIVE_REMOTE_NOTIFICATION = 'getui_receiveRemoteNotification';
export const EVENT_RECEIVE_MESSAGE_DATA = 'getui_receiveMessageData';
export const EVENT_ONLINE_STATE = 'getui_onlineState';
export const EVENT_CLIENT_ID = 'getui_clientId';
export const EVENT_SERVER_PID = 'getui_serverPid';

export interface GetuiBaseEvent {
  type: GetuiEventPayloadType;
}

export interface GetuiNotificationEvent extends GetuiBaseEvent {
  type: 'notificationArrived' | 'notificationClicked';
  taskId: string;
  messageId: string;
  title: string;
  content: string;
}

export interface GetuiReceiveMessageDataEvent extends GetuiBaseEvent {
  type: 'payload';
  payload: string;
}

export interface GetuiOlineStateEvent extends GetuiBaseEvent {
  type: 'onlineState';
  onlineState: boolean;
}

export interface GetuiClientIdEvent extends GetuiBaseEvent {
  type: 'clientId';
  cid: string;
}
export interface GetuiServerPidEvent extends GetuiBaseEvent {
  type: 'serverPid';
  pid: string;
}

export type GetuiEventPayloadType =
  | 'clientId'
  | 'serverPid'
  | 'onlineState'
  | 'payload'
  | 'cmd'
  | 'notificationArrived'
  | 'notificationClicked';
