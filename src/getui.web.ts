import GtPush from './gtpush-min.js';
import {
  GetuiClientIdEvent,
  GetuiEventCallback,
  GetuiInterface,
  GetuiNotificationEvent,
  GetuiOlineStateEvent,
  GetuiReceiveMessageDataEvent,
  GetuiServerPidEvent,
  RemovableSubscription,
} from './interface';

const internalState: {
  clientId: string | null;
  isOnine: boolean;
} = {
  clientId: null,
  isOnine: true,
};

const clientIdListeners: Set<GetuiEventCallback<GetuiClientIdEvent>> = new Set();
const onlineStateListeners: Set<GetuiEventCallback<GetuiOlineStateEvent>> = new Set();
const pushMessageListeners: Set<GetuiEventCallback<GetuiReceiveMessageDataEvent>> = new Set();
const notificationListeners: Set<GetuiEventCallback<GetuiNotificationEvent>> = new Set();

function addListener<T, E>(listeners: Set<GetuiEventCallback<E>>, callback: GetuiEventCallback<E>) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

const onClientIdCall = (res: { cid: string }) => {
  internalState.clientId = res.cid;
  clientIdListeners.forEach(item => {
    item({
      type: 'clientId',
      cid: res.cid,
    });
  });
};
const onOnlineState = (res: { online: boolean; reason?: string }) => {
  internalState.isOnine = res.online;
  onlineStateListeners.forEach(item => {
    item({
      type: 'onlineState',
      onlineState: res.online,
    });
  });
};
const onPushMessageCall = (res: { message: string }) => {
  let message = res.message;
  try {
    message = JSON.parse(res.message);
  } catch (e) {
    console.error('解析Getui消息出错', e);
  }
  pushMessageListeners.forEach(item => {
    item({
      type: 'payload',
      payload: message,
    });
  });
};
const onError = (res: { error: any }) => {
  console.error('getui 报错', res);
};
export const Getui: GetuiInterface = {
  bindAlias(alias: string): void {
    //
    console.warn('Getui Web 不支持的方法 unbindAlias');
  },
  destroy(): void {
    //
    GtPush.enableSocket(false);
  },
  getClientId(): Promise<string | null> {
    return Promise.resolve(internalState.clientId);
  },
  getVersion(): Promise<string> {
    return Promise.resolve(GtPush.getVersion());
  },
  initPush(appId: string): void {
    GtPush.init({
      appid: appId,
      onClientId: onClientIdCall,
      onlineState: onOnlineState,
      onPushMsg: onPushMessageCall,
      onError: onError,
    });
  },
  isPushTurnedOn(): Promise<boolean> {
    return Promise.resolve(internalState.isOnine);
  },
  onClientId(callback: GetuiEventCallback<GetuiClientIdEvent>): RemovableSubscription {
    return addListener(clientIdListeners, callback);
  },
  onNotificationEvent(callback: GetuiEventCallback<GetuiNotificationEvent>): RemovableSubscription {
    return addListener(notificationListeners, callback);
  },
  onOnlineStatus(callback: GetuiEventCallback<GetuiOlineStateEvent>): RemovableSubscription {
    return addListener(onlineStateListeners, callback);
  },
  onPushMessage(callback: GetuiEventCallback<GetuiReceiveMessageDataEvent>): RemovableSubscription {
    return addListener(pushMessageListeners, callback);
  },
  onServerPid(callback: GetuiEventCallback<GetuiServerPidEvent>): RemovableSubscription {
    //
    console.warn('Getui Web 不支持的方法 onServerPid');
    return () => {
      //
    };
  },
  resume(): void {
    //
    GtPush.enableSocket(true);
  },
  setSocketTimeout(times: number): void {
    ////
    console.warn('Getui Web 不支持的方法 setSocketTimeout');
  },
  setTag(tag: string[]): void {
    //
    console.warn('Getui Web 不支持的方法 setTag');
  },
  stop(): void {
    //
    GtPush.enableSocket(false);
  },
  turnOffPush(): void {
    //
    GtPush.enableSocket(false);
  },
  turnOnPush(): void {
    //
    GtPush.enableSocket(true);
  },
  unbindAlias(alias: string): void {
    //
    console.warn('Getui Web 不支持的方法 unbindAlias');
  },
};
