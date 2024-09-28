declare namespace GtPush {
  /**
   * 设置调试模式
   * @param debugMode 打开或关闭调试模式
   */
  function setDebugMode(debugMode: boolean): void;
  /**
   * 初始化GtPush
   */
  function init(obj: {
    /**
     * 个推官网生成的appid
     */
    appid: string;
    onError?: (res: { error: any }) => void;
    /**
     * 个推终端ID回调，标识当前终端和应用
     */
    onClientId?: (res: { cid: string }) => void;
    /**
     * 个推终端ID在线状态回调
     */
    onlineState?: (res: { online: boolean; reason?: string }) => void;
    /**
     * 推送消息回调
     */
    onPushMsg?: (res: { message: string }) => void;
  }): void;
  /**
   * 配置socketServer信息
   * @param obj sockeetServer配置，包括url、key、keyId
   */
  function setSocketServer(obj: { url: string; keyId: string; key: string }): void;
  /**
   * 设置是否允许socket连接
   * @param enable 是否允许socket连接
   */
  function enableSocket(enable: boolean): void;
  /**
   * 获取sdk版本信息
   * @returns sdk版本信息
   */
  function getVersion(): string;
}
export = GtPush;
