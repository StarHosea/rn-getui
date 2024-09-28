import {
  EVENT_CLIENT_ID,
  EVENT_ONLINE_STATE,
  EVENT_RECEIVE_MESSAGE_DATA,
  EVENT_RECEIVE_REMOTE_NOTIFICATION,
  EVENT_SERVER_PID,
  GetuiInterface,
  GetuiClientIdEvent,
  GetuiEventCallback,
  GetuiNotificationEvent,
  GetuiOlineStateEvent,
  GetuiReceiveMessageDataEvent,
  GetuiServerPidEvent,
  RemovableSubscription,
} from './interface';
import { NativeModules, NativeAppEventEmitter, EmitterSubscription } from 'react-native';
const GetuiModule = NativeModules.GetuiModule;

const wrapSubscription = (sub: EmitterSubscription) => {
  return () => {
    sub.remove();
  };
};
export const Getui: GetuiInterface = {
  ...GetuiModule,
  initPush(appId?: string) {
    return GetuiModule.initPush();
  },
  onClientId(callback: GetuiEventCallback<GetuiClientIdEvent>): RemovableSubscription {
    return wrapSubscription(NativeAppEventEmitter.addListener(EVENT_CLIENT_ID, callback));
  },
  onServerPid(callback: GetuiEventCallback<GetuiServerPidEvent>): RemovableSubscription {
    return wrapSubscription(NativeAppEventEmitter.addListener(EVENT_SERVER_PID, callback));
  },
  onOnlineStatus(callback: GetuiEventCallback<GetuiOlineStateEvent>): RemovableSubscription {
    return wrapSubscription(NativeAppEventEmitter.addListener(EVENT_ONLINE_STATE, callback));
  },
  onNotificationEvent(callback: GetuiEventCallback<GetuiNotificationEvent>): RemovableSubscription {
    return wrapSubscription(
      NativeAppEventEmitter.addListener(EVENT_RECEIVE_REMOTE_NOTIFICATION, callback),
    );
  },
  onPushMessage(callback: GetuiEventCallback<GetuiReceiveMessageDataEvent>): RemovableSubscription {
    return wrapSubscription(
      NativeAppEventEmitter.addListener(EVENT_RECEIVE_MESSAGE_DATA, callback),
    );
  },
};
