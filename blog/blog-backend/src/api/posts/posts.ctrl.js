const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = (ctx, next) => {
    const { id } = ctx.params;

    if(!ObjectId.isValid(id)){
        ctx.status = 400;
        return null;
    }
    return next();
}

const Post = require('models/post');
const Joi = require('Joi');

//  POST /api/posts
//  { title, body, tags }
exports.write = async (ctx) => {
    
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body : Joi.string().required(),
        tags: Joi.array().items(Joi.string().required())
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;

    const post = new Post({
        title, body, tags
    });

    try {
        await post.save();
        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

//  GET /api/posts
exports.list = async (ctx) => {
    // page가 주어지지 않았다면 1로 간주
    // query는 문자열 형태로 받아 오므로 숫자로 변환
    const page = parseInt(ctx.query.page || 1, 10);
    const { tag } = ctx.query;
  
    const query = tag ? {
      tags: tag // tags 배열에 tag를 가진 포스트 찾기
    } : {};
  
    // 잘못된 페이지가 주어졌다면 에러
    if (page < 1) {
      ctx.status = 400;
      return;
    }
  
    try {
      const posts = await Post.find(query)
        .sort({ _id: -1 })
        .limit(10)
        .skip((page - 1) * 10)
        .lean()
        .exec();
      const postCount = await Post.countDocuments(query).exec();
      const limitBodyLength = post => ({
        ...post,
        body: post.body.length < 350 ? post.body : `${post.body.slice(0, 350)}...`
      });
      ctx.body = posts.map(limitBodyLength);
      // 마지막 페이지 알려 주기
      // ctx.set은 response header를 설정해줍니다.
      ctx.set('Last-Page', Math.ceil(postCount / 10));
    } catch (e) {
      ctx.throw(500, e);
    }
  };

//  GET /api/posts/:id
exports.read = async (ctx) => {
    const { id } = ctx.params;
    try{
        const post = await Post.findById(id).exec();
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

//  DELETE /api/posts/:id
exports.remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndDelete(id).exec();
        ctx.status = 204;
    } catch(e) {
        ctx.throw(e, 500);
    }
};


//  PATCH /api/posts/:id
//  { title, body, tags }
exports.update = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true
            //업데이트된 객체를 반환하기 위함임
        }).exec();
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

exports.checkLogin = (ctx,next) => {
    if(!ctx.session.logged){
        ctx.status = 404;
        return null;
    }else{
        return next();
    }
};