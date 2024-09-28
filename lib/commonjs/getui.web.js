"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Getui = void 0;
var _gtpushMin = _interopRequireDefault(require("./gtpush-min.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const internalState = {
  clientId: null,
  isOnine: true
};
const clientIdListeners = new Set();
const onlineStateListeners = new Set();
const pushMessageListeners = new Set();
const notificationListeners = new Set();
function addListener(listeners, callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
const onClientIdCall = res => {
  internalState.clientId = res.cid;
  clientIdListeners.forEach(item => {
    item({
      type: 'clientId',
      cid: res.cid
    });
  });
};
const onOnlineState = res => {
  internalState.isOnine = res.online;
  onlineStateListeners.forEach(item => {
    item({
      type: 'onlineState',
      onlineState: res.online
    });
  });
};
const onPushMessageCall = res => {
  let message = res.message;
  try {
    message = JSON.parse(res.message);
  } catch (e) {
    console.error('解析Getui消息出错', e);
  }
  pushMessageListeners.forEach(item => {
    item({
      type: 'payload',
      payload: message
    });
  });
};
const onError = res => {
  console.error('getui 报错', res);
};
const Getui = {
  bindAlias(alias) {
    //
    console.warn('Getui Web 不支持的方法 unbindAlias');
  },
  destroy() {
    //
    _gtpushMin.default.enableSocket(false);
  },
  getClientId() {
    return Promise.resolve(internalState.clientId);
  },
  getVersion() {
    return Promise.resolve(_gtpushMin.default.getVersion());
  },
  initPush(appId) {
    _gtpushMin.default.init({
      appid: appId,
      onClientId: onClientIdCall,
      onlineState: onOnlineState,
      onPushMsg: onPushMessageCall,
      onError: onError
    });
  },
  isPushTurnedOn() {
    return Promise.resolve(internalState.isOnine);
  },
  onClientId(callback) {
    return addListener(clientIdListeners, callback);
  },
  onNotificationEvent(callback) {
    return addListener(notificationListeners, callback);
  },
  onOnlineStatus(callback) {
    return addListener(onlineStateListeners, callback);
  },
  onPushMessage(callback) {
    return addListener(pushMessageListeners, callback);
  },
  onServerPid(callback) {
    //
    console.warn('Getui Web 不支持的方法 onServerPid');
    return () => {
      //
    };
  },
  resume() {
    //
    _gtpushMin.default.enableSocket(true);
  },
  setSocketTimeout(times) {
    ////
    console.warn('Getui Web 不支持的方法 setSocketTimeout');
  },
  setTag(tag) {
    //
    console.warn('Getui Web 不支持的方法 setTag');
  },
  stop() {
    //
    _gtpushMin.default.enableSocket(false);
  },
  turnOffPush() {
    //
    _gtpushMin.default.enableSocket(false);
  },
  turnOnPush() {
    //
    _gtpushMin.default.enableSocket(true);
  },
  unbindAlias(alias) {
    //
    console.warn('Getui Web 不支持的方法 unbindAlias');
  }
};
exports.Getui = Getui;
//# sourceMappingURL=getui.web.js.map