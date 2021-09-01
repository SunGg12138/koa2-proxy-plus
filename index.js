const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const pathToRegexp = require('path-to-regexp');
const modify = require('./modify');

module.exports = (options) => {
    return async function (ctx, next) {
        const { path } = ctx;
        const { targets = {} } = options;

        for (const route of Object.keys(targets)) {
            if (pathToRegexp(route).test(path)) {
                const target = await modify(ctx.req, targets[route]);
                await k2c(httpProxy(target))(ctx, next);
                break;
            }
        }
        await next();
    };
};
