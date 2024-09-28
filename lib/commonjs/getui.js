"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Getui = void 0;
var _interface = require("./interface");
var _reactNative = require("react-native");
const GetuiModule = _reactNative.NativeModules.GetuiModule;
const wrapSubscription = sub => {
  return () => {
    sub.remove();
  };
};
const Getui = {
  ...GetuiModule,
  initPush(appId) {
    return GetuiModule.initPush();
  },
  onClientId(callback) {
    return wrapSubscription(_reactNative.NativeAppEventEmitter.addListener(_interface.EVENT_CLIENT_ID, callback));
  },
  onServerPid(callback) {
    return wrapSubscription(_reactNative.NativeAppEventEmitter.addListener(_interface.EVENT_SERVER_PID, callback));
  },
  onOnlineStatus(callback) {
    return wrapSubscription(_reactNative.NativeAppEventEmitter.addListener(_interface.EVENT_ONLINE_STATE, callback));
  },
  onNotificationEvent(callback) {
    return wrapSubscription(_reactNative.NativeAppEventEmitter.addListener(_interface.EVENT_RECEIVE_REMOTE_NOTIFICATION, callback));
  },
  onPushMessage(callback) {
    return wrapSubscription(_reactNative.NativeAppEventEmitter.addListener(_interface.EVENT_RECEIVE_MESSAGE_DATA, callback));
  }
};
exports.Getui = Getui;
//# sourceMappingURL=getui.js.map