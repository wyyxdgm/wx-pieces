const express = require('express');
const app = express();

app.use(express.json());

// 设置路由处理 SSE 请求
app.get('/stream', (req, res) => {
  // 设置响应头，表明内容类型为 text/event-stream
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 发送初始响应
  // res.write(':ok\n\n');

  let counter = 0;

  // 每隔2秒发送一条消息
  const interval = setInterval(() => {
    if (counter <= 5) {
      res.write(`data: {"tts":"hello"}\n\n`);
      counter++;
    } else {
      res.write(`[DONE]\n\n`);
      clearInterval(interval);
      res.end();
    }
  }, 2000);

  // 处理客户端关闭连接事件
  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});