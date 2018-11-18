require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const moongoose = require('mongoose');
const api = require('./api');

const app = new Koa();
const router = new Router();

const {
    PORT: port = 4000,
    MONGO_URI: mongoURI
} = process.env;

moongoose.Promise = global.Promise; // node의 promise를 사용하도록 설정함
moongoose.connect(mongoURI).then(() => {
    console.log('connect to mongodb');
}).catch((e) => {
    console.error(e);
});

//  라우터 설정
router.use('/api', api.routes());

//  라우터를 적용하기 전에 body parser적용을함
app.use(bodyparser());

//  router적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('listening to port', port);
});