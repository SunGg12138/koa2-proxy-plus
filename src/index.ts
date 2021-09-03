import k2c from 'koa2-connect';
import httpProxy from 'http-proxy-middleware';
import pathToRegexp from 'path-to-regexp';
import proxyBuffer from 'http-proxy-buffer';

export = function (options: ProxyOptions): Function {
    return async function (ctx: KoaContext, next: () => Promise<any>): Promise<void> {
        const { path } = ctx;
        const { targets = {} } = options;

        for (const route of Object.keys(targets)) {
            if (pathToRegexp(route).test(path)) {
                const target = await proxyBuffer(ctx.req, targets[route]);
                await k2c(httpProxy(target))(ctx, next);
                break;
            }
        }
        await next();
    };
};
