module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'Learn', link: '/learn/' },
            {
                text: 'Languages',
                items: [
                    { text: 'Chinese', link: '/language/chinese' },
                    { text: 'Japanese', link: '/language/japanese' }
                ]
            },
            { text: 'External', link: 'https://google.com' }
        ],
        sidebar: {
            '/guide/': [
                '/guide/',
                '/guide/installation',
                {
                    title: 'Basics',
                    collapsable: false,
                    children: [
                        '/guide/prototyping',
                        '/guide/creating-a-project',
                        '/guide/plugins-and-presets',
                        '/guide/cli-service'
                    ]
                },
                {
                    title: 'Group 2',
                    children: [
                        '/guide/test'
                    ]
                }
            ]
        }
    }
}
