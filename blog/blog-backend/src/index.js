require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const moongoose = require('mongoose');
const api = require('./api');
const session = require('koa-session');

const {
    PORT: port = 4000,
    MONGO_URI: mongoURI,
    COOKIE_SIGN_KEY : signKey
} = process.env;

const app = new Koa();
const router = new Router();


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

//  세션키
const sessionConfig = {
    maxAge: 86400000,
    //  signed:true
}

app.use(session(sessionConfig, app));
app.keys = [signKey];

//  router적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('listening to port', port);
});