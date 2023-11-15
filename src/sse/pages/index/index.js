const app = getApp();

Page({
  data: {},
  onLoad() {
    console.log(
      "代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档："
    );
    console.log(
      "https://developers.weixin.qq.com/miniprogram/dev/devtools/minicode.html"
    );
  },
  tap() {
    // 发送 SSE 请求
    wx.request({
      url: "http://localhost:3000/stream",
      method: "GET",
      header: {
        "Content-Type": "text/event-stream",
      },
      success: function (res) {
        // 监听 onMessage 事件处理 SSE 数据
        res.onMessage(function (event) {
          const message = event.data;
          // 处理接收到的消息
          console.log(message);

          // 判断是否是最后一条消息
          if (message === "[end]") {
            // 关闭 SSE 连接
            res.close();
          }
        });
      },
    });
  },
});
