# 博客搭建

基于vuepress在github上搭建博客

## 准备工作

- [vuepress](https://vuepress.vuejs.org/zh/guide/)
- [github账号](https://github.com/)

### vuepress

根据需求按文档安装，可独立使用，可集成到现有项目

### github

1.创建仓库，仓库名必须是你的GitHub名，仓库名必须以.github.io结尾
![avatar](imgs/github.png)

2.根据 [vuepress部署](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages) 配置好发布脚本

## 问题

### 默认主题Home页不生效
   默认的主题提供了一个首页（Homepage）的布局 (用于 这个网站的主页)。想要使用它，需要在你的根级 README.md 的 YAML front matter 指定 home: true ***上边不要加内容***
   ```
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

