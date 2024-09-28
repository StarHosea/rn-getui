
个推 ReacNative 库，支持 Android，IOS，Web，支持 Expo

## 安装
```
npm install @starhosea/rn-getui
```

## 使用
```
import { Getui } from '@starhosea/rn-getui';
// 初始化, 填写个推申请的 appId
Getui.initPush("my-appid");

Getui.onPushMessage((message)=>{
    console.log('push message', message.payload);
});
// 
Getui.onNotificationEvent((evt)=>{
    console.log('notification event', evt);
});

// clientId 变化回调
Getui.onClientId(({ cid })=>{

});
// 在线状态变化回调
Getui.onOnlineStatus(( { onlineState} )=>{

});
// pid 变化回调
Getiu.onServerPid(( { pid } )=>{})


Getui.bindAlias("");
Getui.unbindAlias("");
Getui.turnOnPush();
Getui.turnOffPush();
Getui.setTag(["my-tag"]);
Getui.stop();
Getui.resume();

const clientId = Getui.getClientId();
const version = Getui.getVersion();
const isPushTuredOn = Getui.isPushTurnedOn();

```


