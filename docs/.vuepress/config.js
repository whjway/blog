// const { description } = require('../../package')

module.exports = {
    title: 'whjway',
    description: 'Blog',
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            // { text: 'Guide', link: '/guide/' },
            { text: '资料', link: '/learn/' },
            { text: 'Github', link: 'https://github.com/whjway' }
        ],
        sidebar: {
            '/learn/': [
                '/learn/',
                {
                    title: 'vue相关',
                    collapsable: false,
                    children: [
                        '/learn/installation'
                    ]
                },
                {
                    title: '工具',
                    collapsable: false,
                    children: [
                        '/learn/markdown',
                        '/learn/git'
                    ]
                },
            ]
        }
    }
}
