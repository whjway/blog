// const { description } = require('../../package')

module.exports = {
    title: 'whjway',
    description: 'Blog',
    themeConfig: {
        lastUpdated: 'Last Updated', // string | boolean
        smoothScroll: true,
        nav: [
            // { text: '主页', link: '/' },
            // { text: 'Guide', link: '/guide/' },
            // { text: '资料', link: '/learn/' },
            { text: 'Github', link: 'https://github.com/whjway' }
        ],
        sidebar: {
            '/': [
                {
                    title: '前端',
                    collapsable: false,
                    children: [
                        '/viewport'
                    ]
                },
                {
                    title: '全栈',
                    collapsable: false,
                    children: [
                        '/installation'
                    ]
                },
                {
                    title: '工具',
                    collapsable: false,
                    children: [
                        '/markdown',
                        '/git'
                    ]
                },
            ]
        }
    },
    plugins: [
        '@vuepress/back-to-top',// 回到顶部
        '@vuepress/active-header-links', // 侧边栏跟随页面滚动
        '@vuepress/nprogress', // 进度条
    ]
}
