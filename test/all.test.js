const fs = require('fs');
const Koa = require('koa');
const supertest = require('supertest');
const proxy = require('../');
const { expect } = require('chai');
const bodyParser = require('koa-body');

describe('koa2-proxy-plus test', function () {
    it('modify query, add params', function (done) {
        const port = 58880;

        // start test service
        const app_server = new Koa();
        app_server.use(async function (ctx) {
            expect(ctx.path).to.equal('/modify-query/query');
            expect(ctx.request.query).to.be.an('object');
            expect(ctx.request.query.test).to.equal('modify query');
            expect(ctx.request.query.modify).to.equal('query');
            
            ctx.body = { code: 0 };
        });
        app_server.listen(port);

        const options = {
            targets: {
                '/query': {
                    target: `http://127.0.0.1:${port}/modify-query`,
                    query: {
                        modify: 'query'
                    }
                }
            }
        };
        const app_proxy = new Koa();
        app_proxy.use(proxy(options));
        supertest(app_proxy.callback())
        .get('/query')
        .query({
            test: 'modify query'
        })
        .end(function (err, res) {
            expect(res.body.code).to.equal(0);
            done();
        });
    });

    it('modify query, new params', function (done) {
        const port = 58881;

        // start test service
        const app_server = new Koa();
        app_server.use(async function (ctx) {
            expect(ctx.path).to.equal('/modify-query/query');
            expect(ctx.request.query).to.be.an('object');
            expect(ctx.request.query.test).to.equal(undefined);
            expect(ctx.request.query.modify).to.equal('query');
            
            ctx.body = { code: 0 };
        });
        app_server.listen(port);

        const options = {
            targets: {
                '/query': {
                    target: `http://127.0.0.1:${port}/modify-query`,
                    query: {
                        modify: 'query'
                    }
                }
            }
        };
        const app_proxy = new Koa();
        app_proxy.use(proxy(options));
        supertest(app_proxy.callback())
        .get('/query')
        .end(function (err, res) {
            expect(res.body.code).to.equal(0);
            done();
        });
    });

    it('modify form body, add params', function (done) {
        const port = 58882;

        // start test service
        const app_server = new Koa();
        app_server.use(bodyParser());
        app_server.use(async function (ctx) {
            expect(ctx.path).to.equal('/modify-form/form');
            expect(ctx.request.body).to.be.an('object');
            expect(ctx.request.body.test).to.equal('modify form body');
            expect(ctx.request.body.modify).to.equal('form-body');
            
            ctx.body = { code: 0 };
        });
        app_server.listen(port);

        const options = {
            targets: {
                '/form': {
                    target: `http://127.0.0.1:${port}/modify-form`,
                    body: {
                        modify: 'form-body'
                    }
                }
            }
        };
        const app_proxy = new Koa();
        app_proxy.use(proxy(options));
        supertest(app_proxy.callback())
        .post('/form')
        .send({
            test: 'modify form body'
        })
        .set('content-type', 'application/x-www-form-urlencoded')
        .end(function (err, res) {
            expect(res.body.code).to.equal(0);
            done();
        });
    });

    it('modify form body, new params', function (done) {
        const port = 58883;

        // start test service
        const app_server = new Koa();
        app_server.use(bodyParser());
        app_server.use(async function (ctx) {
            expect(ctx.path).to.equal('/modify-form/form');
            expect(ctx.request.body).to.be.an('object');
            expect(ctx.request.body.test).to.equal(undefined);
            expect(ctx.request.body.modify).to.equal('form-body');
            
            ctx.body = { code: 0 };
        });
        app_server.listen(port);

        const options = {
            targets: {
                '/form': {
                    target: `http://127.0.0.1:${port}/modify-form`,
                    body: {
                        modify: 'form-body'
                    }
                }
            }
        };
        const app_proxy = new Koa();
        app_proxy.use(proxy(options));
        supertest(app_proxy.callback())
        .post('/form')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end(function (err, res) {
            expect(res.body.code).to.equal(0);
            done();
        });
    });

    it('modify json body, add params', function (done) {
        const port = 58884;

        // start test service
        const app_server = new Koa();
        app_server.use(bodyParser());
        app_server.use(async function (ctx) {
            expect(ctx.path).to.equal('/modify-json/json');
            expect(ctx.request.body).to.be.an('object');
            expect(ctx.request.body.test).to.equal('modify json body');
            expect(ctx.request.body.modify).to.equal('json-body');
            
            ctx.body = { code: 0 };
        });
        app_server.listen(port);

        const options = {
            targets: {
                '/json': {
                    target: `http://127.0.0.1:${port}/modify-json`,
                    body: {
                        modify: 'json-body'
                    }
                }
            }
        };
        const app_proxy = new Koa();
        app_proxy.use(proxy(options));
        supertest(app_proxy.callback())
        .post('/json')
        .send({
            test: 'modify json body'
        })
        .set('content-type', 'application/json')
        .end(function (err, res) {
            expect(res.body.code).to.equal(0);
            done();
        });
    });

    it('modify json body, new params', function (done) {
        const port = 58885;

        // start test service
        const app_server = new Koa();
        app_server.use(bodyParser());
        app_server.use(async function (ctx) {
            expect(ctx.path).to.equal('/modify-json/json');
            expect(ctx.request.body).to.be.an('object');
            expect(ctx.request.body.test).to.equal(undefined);
            expect(ctx.request.body.modify).to.equal('json-body');
            
            ctx.body = { code: 0 };
        });
        app_server.listen(port);

        const options = {
            targets: {
                '/json': {
                    target: `http://127.0.0.1:${port}/modify-json`,
                    body: {
                        modify: 'json-body'
                    }
                }
            }
        };
        const app_proxy = new Koa();
        app_proxy.use(proxy(options));
        supertest(app_proxy.callback())
        .post('/json')
        .set('content-type', 'application/json')
        .end(function (err, res) {
            expect(res.body.code).to.equal(0);
            done();
        });
    });

    it('modify multipart body, add params', function (done) {
        const port = 58886;

        // start test service
        const app_server = new Koa();
        app_server.use(bodyParser({ multipart: true }));
        app_server.use(async function (ctx) {
            expect(ctx.path).to.equal('/modify-multipart/multipart');
            expect(ctx.request.body).to.be.an('object');
            expect(ctx.request.body.test).to.equal('modify multipart body');
            expect(ctx.request.body.modify).to.equal('multipart-body');
            
            ctx.body = { code: 0 };
        });
        app_server.listen(port);

        const options = {
            targets: {
                '/multipart': {
                    target: `http://127.0.0.1:${port}/modify-multipart`,
                    body: {
                        modify: 'multipart-body',
                    },
                }
            }
        };
        const app_proxy = new Koa();
        app_proxy.use(proxy(options));
        supertest(app_proxy.callback())
        .post('/multipart')
        .set('content-type', 'multipart/form-data')
        .field('test', 'modify multipart body')
        .attach({
            file: fs.createReadStream(__filename)
        })
        .expect(200)
        .end(function (err, res) {
            expect(res.body.code).to.equal(0);
            done();
        });
    });
    
    it('modify multipart body, new params', function (done) {
        const port = 58887;

        // start test service
        const app_server = new Koa();
        app_server.use(bodyParser({ multipart: true }));
        app_server.use(async function (ctx) {
            expect(ctx.path).to.equal('/modify-multipart/multipart');
            expect(ctx.request.body).to.be.an('object');
            expect(ctx.request.body.test).to.equal(undefined);
            expect(ctx.request.body.modify).to.equal('multipart-body');
            
            ctx.body = { code: 0 };
        });
        app_server.listen(port);

        const options = {
            targets: {
                '/multipart': {
                    target: `http://127.0.0.1:${port}/modify-multipart`,
                    body: {
                        modify: 'multipart-body',
                    },
                }
            }
        };
        const app_proxy = new Koa();
        app_proxy.use(proxy(options));
        supertest(app_proxy.callback())
        .post('/multipart')
        .set('content-type', 'multipart/form-data')
        .expect(200)
        .end(function (err, res) {
            expect(res.body.code).to.equal(0);
            done();
        });
    });
});
