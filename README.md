# koa2-proxy-plus

A koa2 proxy middleware, you can modify the middleware of query and body

Powered by the popular Nodejitsu [`http-proxy`](https://github.com/nodejitsu/node-http-proxy). [![GitHub stars](https://img.shields.io/github/stars/nodejitsu/node-http-proxy.svg?style=social&label=Star)](https://github.com/nodejitsu/node-http-proxy)

## Install

```
npm i koa2-proxy-plus -S
```

## Usage

This is a very simple usage. If you are familiar with the use of http-proxy-middleware and path-to-regexp.

### Example

```javascript
const Koa = require('koa');
const proxy = require('koa2-proxy-middleware');
 
const app = new Koa();
 
const options = {
    targets: {
        '/user/patch': {
            target: 'http://localhost:3000',
            // use query attribute, you can modify the query
            query: {
                timeline: Date.now(),
            },

            // use body attribute, you can modify the body
            body: {
                from: 'proxy-server',
            },
            changeOrigin: true,
        },

        '/user/:id': {
            target: 'http://localhost:3001',
            changeOrigin: true,
        },

        // (.*) means anything
        '/api/(.*)': {
            target: 'http://localhost:3002',
            changeOrigin: true,
            pathRewrite: {
                '/passager/xx': '/mPassenger/ee', // rewrite path
            }
        },
    }
}
 
app.use(proxy(options));

```

### options

```javascript
{
  targets: {
    [key]: [option],
  },
}
```

option other parameter details:

https://github.com/chimurai/http-proxy-middleware

## Features

The content-type supported by the body attribute is: 

- application/x-www-form-urlencoded
- application/json, (only for object type data)
- multipart/form-data

## Test

Learn more by viewing test cases

```
npm run test
```

## License

MIT License

Copyright (c) 2021 sungg12138
