const { description } = require('../../package')

module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'whjway',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,
    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['link', {
            rel: 'icon',
            href: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/7a6ec1c9-2680-4817-8748-eeab10cb1469.png'
        }],
        ['meta', { name: 'referrer', content: 'no-referrer' }],
        ['meta', { name: 'theme-color', content: '#272727' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    ],

    postcss: {
    },

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: []
}