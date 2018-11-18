const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
const router = new Router();

//  라우터 설정
router.use('/api', api.routes());

//  라우터를 적용하기 전에 body parser적용을함
app.use(bodyparser());

//  router적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening to port 4000');
});