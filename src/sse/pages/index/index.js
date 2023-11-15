const app = getApp();

Page({
  data: {},
  onLoad() {
    console.log(
      "代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档："
    );
    console.log("https://developers.weixin.qq.com/miniprogram/dev/devtools/minicode.html");
  },
  tap() {
    // 发送 SSE 请求
    let RequestTask = wx.request({
      url: "http://localhost:3000/stream",
      method: "GET",
      dataType: "arraybuffer",
      enableChunked: true,
      header: {
        "Content-Type": "text/event-stream"
      },
      success: function (res) {
        // 监听 onMessage 事件处理 SSE 数据
        console.log(`success`, res);
        RequestTask.offChunkReceived();
        RequestTask = null;
      }
    });
    RequestTask.onChunkReceived(function (event) {
      // 处理接收到的消息
      const uint8Array = new Uint8Array(event.data);
      let message = String.fromCharCode.apply(null, uint8Array);
      console.log(`message`, message);
      let idx = message.indexOf("data:");
      if (idx > -1) {
        let j = message.substring(idx + 5);
        let obj = JSON.parse(j);
        console.log(`json`, j);
        console.log(`obj`, obj);
      }
      if (~message.indexOf("[DONE]")) {
        // 判断是否是最后一条消息
        console.log("done");
        // 关闭 SSE 连接
        RequestTask.offChunkReceived();
      }
    });
  }
});
