import Koa from 'koa';
import path from 'path';
//静态资源中间件
import resource from 'koa-static';
const Koa_Logger = require("koa-logger");
//etag
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';

const app = new Koa();
const host = 'localhost';
const port = 4396;

//------------------强缓存---------------------//
app.use(async (ctx, next) => {
  // 设置响应头Cache-Control 设置资源有效期为300秒
  ctx.set({
    'Cache-Control': 'max-age=100'
  });
  await next();
});
//------------------协商缓存---------------------//
// app.use(conditional());
// app.use(etag());
//---------------------------------------//
app.use(Koa_Logger());
app.use(resource(path.join(__dirname, './static')));

app.listen(port, () => {
  console.log(`server is listen in ${host}:${port}`);
});