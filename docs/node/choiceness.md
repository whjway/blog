---
title: Node
---

- [Node 官网](https://nodejs.org/ 'Node 官网')
- [Node 中文网](http://nodejs.cn/ 'Node 中文网')

## [Nodejs 服务端框架调研](https://juejin.cn/post/7156484446374330405)

[Express.js](https://github.com/expressjs/express) 是 Node.JS 诞生之初，是一款基于Node.js以及Chrome V8引擎，快速、极简的JS服务端开发框架。  
[Koa.js](https://github.com/koajs/koa) 是一款微型Web框架，写一个hello world很简单，但web应用离不开session，视图模板，路由，文件上传，日志管理。这些 Koa 都不提供，需要自行去官方的 Middleware 寻找。然而，100个人可能找出100种搭配。  
[Egg.js](https://www.eggjs.org/zh-CN) 是基于Koa.js，解决了上述问题，将社区最佳实践整合进了Koa.js，另取名叫Egg.js，并且将多进程启动，开发时的热更新等问题一并解决了。这对开发者很友好，开箱即用，开箱即是最(较)佳配置。Egg.js发展期间，ECMAScript又推出了 async await，相比yield的语法async写起来更直。后面Koa.js也同步进行了跟进。  
[Midway](https://www.midwayjs.org/docs/quickstart) 是阿里团队，基于渐进式理念研发的 Node.js 框架，结合了 OOP和函数式两种编程范式。以 egg 是作为底层框架，加上了良好的TypeScript的定义支持等众多新特性,推出了Midway，有兴趣的小伙伴可以去官方文档学习一下  
[Nest.js](https://github.com/nestjs/nest) 基于Express.js的全功能框架 Nest.js，他是在Express.js上封装的，充分利用了TypeScript的特性；Nest.js的优点是社区活跃，涨势喜人，截止目前在 GitHub 拥有 43.7k Star 是近期比较热门的企业级框架。

页面级渲染:  
Vue的[Nuxt.js](https://github.com/nuxt/nuxt.js)  
React的[Next.js](https://github.com/vercel/next.js)

## [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)

- [pm2 使用](https://www.midwayjs.org/docs/extensions/pm2)
