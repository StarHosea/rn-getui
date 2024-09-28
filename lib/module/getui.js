import { EVENT_CLIENT_ID, EVENT_ONLINE_STATE, EVENT_RECEIVE_MESSAGE_DATA, EVENT_RECEIVE_REMOTE_NOTIFICATION, EVENT_SERVER_PID } from './interface';
import { NativeModules, NativeAppEventEmitter } from 'react-native';
const GetuiModule = NativeModules.GetuiModule;
const wrapSubscription = sub => {
  return () => {
    sub.remove();
  };
};
export const Getui = {
  ...GetuiModule,
  initPush(appId) {
    return GetuiModule.initPush();
  },
  onClientId(callback) {
    return wrapSubscription(NativeAppEventEmitter.addListener(EVENT_CLIENT_ID, callback));
  },
  onServerPid(callback) {
    return wrapSubscription(NativeAppEventEmitter.addListener(EVENT_SERVER_PID, callback));
  },
  onOnlineStatus(callback) {
    return wrapSubscription(NativeAppEventEmitter.addListener(EVENT_ONLINE_STATE, callback));
  },
  onNotificationEvent(callback) {
    return wrapSubscription(NativeAppEventEmitter.addListener(EVENT_RECEIVE_REMOTE_NOTIFICATION, callback));
  },
  onPushMessage(callback) {
    return wrapSubscription(NativeAppEventEmitter.addListener(EVENT_RECEIVE_MESSAGE_DATA, callback));
  }
};
//# sourceMappingURL=getui.js.map