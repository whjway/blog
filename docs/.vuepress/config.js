// const { description } = require('../../package')

module.exports = {
    title: '前端知识手册',
    description: '前端知识手册 whjway',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ['meta', { name: 'theme-color', content: 'red' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['script', {},
            `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?504b4691c0952ac562a0f3c8877cfe6d";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
            `],
    ],
    theme: 'reco',
    themeConfig: {
        // valineConfig: {
        //     appId: 'jvc9s4BkJYQNOcpsbVTPMePe-gzGzoHsz',
        //     appKey: 'Js91M9DfM9vPwVaUj7xdkbxh',
        //     recordIP: true,
        //     showComment: false
        // },
        // vssueConfig: {
        //     platform: 'github',
        //     owner: 'OWNER_OF_REPO',
        //     repo: 'NAME_OF_REPO',
        //     clientId: 'YOUR_CLIENT_ID',
        //     clientSecret: 'YOUR_CLIENT_SECRET',
        // },
        subSidebar: 'auto',
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
                title: '快捷入口',
                collapsable: false,
                children: [
                    '/quick/site'
                ]
            },
            {
                title: '前端',
                collapsable: false,
                children: [
                    '/frontend/knowledge-system',
                    '/frontend/choiceness',
                    '/frontend/performance',
                    '/viewport',
                    '/wechat'
                ]
            },
            {
                title: 'Vue',
                collapsable: true,
                children: [
                    '/vue/vuepress'
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
        // '@vuepress/back-to-top',// 回到顶部
        // '@vuepress/active-header-links', // 侧边栏跟随页面滚动
        // '@vuepress/nprogress', // 进度条
    ],

}
