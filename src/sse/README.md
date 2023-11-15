# 微信小程序 SSE 样例

```js
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
```
