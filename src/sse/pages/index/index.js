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
    let RequestTask = wx.request({
      url: 'http://10.10.51.4:3001/stream',
      url: 'http://47.123.4.238:3001/stream',
      // url: 'http://47.123.4.238:9090/stream',
      // url: 'http://test3001.local.easyar/stream',
      // url: "http://10.10.51.4:3001/stream",
      method: "GET",
      dataType: "arraybuffer",
      enableChunked: true,
      header: {},
      success: function (res) {
        // 监听 onMessage 事件处理 SSE 数据
        console.log(`success`, res);
        RequestTask.offChunkReceived();
        RequestTask = null;
      },
    });
    RequestTask.onChunkReceived(function (event) {
      // 处理接收到的消息
      const uint8Array = new Uint8Array(event.data);
      let message = String.fromCharCode.apply(null, uint8Array);
      console.log(`message`, message);
      while (message) {
        let idx = message.indexOf("data:");
        let eidx = message.indexOf("\n\n");
        debugger;
        if (idx > -1 && eidx > -1) {
          let j = message.substring(idx + 5, eidx);
          message = message.substring(eidx + 2);
          let obj = JSON.parse(j);
          console.log(`json`, j);
          console.log(`obj`, obj);
        }
        if (message.indexOf("[DONE]") == 0) {
          // 判断是否是最后一条消息
          console.log("done");
          // 关闭 SSE 连接
          RequestTask.offChunkReceived();
          break;
        }
      }
    });
  },
  tapGpt() {
    // 发送 SSE 请求
    let RequestTask = wx.request({
      // url: "http://localhost:9090/zy/chat/openId",
      url: "https://chat.sightp.com/zy/chat/openId",
      // url: 'http://10.10.10.227:9090/zy/chat/openId',
      // url: 'http://10.10.10.227:9090/zy/chat/openId',
      method: "POST",
      dataType: "arraybuffer",
      enableChunked: true,
      data: {
        text: "您好，您能用1000个以上的文字，介绍一下附近好玩的地方吗",
        useMouthShape: false,
        stream: true,
        sessionId: null,
      },
      header: {
        Authorization:
          "MjBlYjBkNzhjNjgyMTMwMWI5MWRlZGU3YzAxMWQ0NjhmM2FmZTE2OWM0MDEzYmRjNGNmMTU1NzY1MWIyODg3M3siYXBwS2V5IjoiMTlmOWVkMGE0YWViNGZiMmEyZjNmMmY0NzE3ZTM4OTkiLCJleHBpcmVzIjoxNzMwNTM0NjU5NDk0fQ==",
      },
      success: function (res) {
        // 监听 onMessage 事件处理 SSE 数据
        console.log(`success`, res);
        RequestTask.offChunkReceived();
        RequestTask = null;
      },
    });
    RequestTask.onChunkReceived(function (event) {
      // 处理接收到的消息
      const uint8Array = new Uint8Array(event.data);
      // let message = String.fromCharCode.apply(null, uint8Array);
      let message = decodeURIComponent(
        escape(String.fromCharCode.apply(null, uint8Array))
      );
      console.log("message", message);
      while (message) {
        console.log("line-----", message);
        let idx = message.indexOf("data:");
        let eidx = message.indexOf("\n\n");
        if (idx > -1 && eidx > -1) {
          let j = message.substring(idx + 5, eidx);
          message = message.substring(eidx + 2);
          console.log("parse----", message);
          let obj = JSON.parse(j);
          // console.log(`json`, j);
          console.log(`obj`, obj);
        }
        if (message.indexOf("[DONE]") == 0) {
          // 判断是否是最后一条消息
          console.log("done");
          // 关闭 SSE 连接
          RequestTask.offChunkReceived();
          break;
        }
      }
    });
  },
});
