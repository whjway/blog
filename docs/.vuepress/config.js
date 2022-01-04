// const { description } = require('../../package')

module.exports = {
    title: '前端知识手册',
    description: '前端知识手册 whjway',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        lastUpdated: 'Last Updated', // string | boolean
        smoothScroll: true,
        nav: [
            // { text: '主页', link: '/' },
            // { text: 'Guide', link: '/guide/' },
            // { text: '资料', link: '/learn/' },
            { text: 'Github', link: 'https://github.com/whjway' }
        ],
        sidebar: [
            {
                title: '快接入口',
                collapsable: false,
                children: [
                    '/quick/site'
                ]
            },
            {
                title: '前端',
                collapsable: true,
                children: [
                    '/viewport',
                    '/wechat'
                ]
            },
            {
                title: '全栈',
                collapsable: true,
                children: [
                    '/installation'
                ]
            },
            {
                title: '工具',
                collapsable: true,
                children: [
                    '/markdown',
                    '/git'
                ]
            },
        ]
    },
    plugins: [
        '@vuepress/back-to-top',// 回到顶部
        '@vuepress/active-header-links', // 侧边栏跟随页面滚动
        '@vuepress/nprogress', // 进度条
    ]
}
