module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            {
                text: 'Languages',
                items: [
                    { text: 'Chinese', link: '/language/chinese' },
                    { text: 'Japanese', link: '/language/japanese' }
                ]
            },
            { text: 'External', link: 'https://google.com' }
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': __dirname + '/'
            }
        }
    }
}
