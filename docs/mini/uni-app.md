---
title: uni-app 小程序
---

[uni-app](https://uniapp.dcloud.io/ "uni-app")

## 使用 vue3 默认模板

[安装地址](https://uniapp.dcloud.io/quickstart-cli.html)

```javascript
npx degit dcloudio/uni-preset-vue#vite my-vue3-project
```

## 问题

### 1. [全局配置文件](https://uniapp.dcloud.io/collocation/pages.html)

### 2. vite 支持 scss

```javascript
npm i sass -D
```

### 3. 引用 vant 组件库

[示例](https://ext.dcloud.net.cn/search?q=vant)  
  引入全局样式

```css
<!-- APP.vue -->
<style lang="scss">
  /*每个页面公共css */
  @import 'common/style.scss';
  @import '@/wxcomponents/vant/common/index.wxss';
</style>
```

### 4. vue3 全局挂载

#### 全局属性

```javascript
app.config.globalProperties.foo = "bar";

this.foo;
```

#### 全局方法 toast

1.van-toast(使用起来略繁琐)

```javascript
    // 1. globalStyle中引入
    "usingComponents": {
    "van-toast": "/wxcomponents/vant/toast/index",
    }
    // 2. 全局挂载 main.js
    import Toast from './wxcomponents/vant/toast/toast'
    app.config.globalProperties.$toast = Toast;
    // 3. 使用页面
    <van-toast id="van-toast" />
    this.$toast.success('成功文案')
```

2.使用封装 toast

```javascript
function toast(content, duration = 2000) {
  return new Promise((resolve) => {
    uni.showToast({
      title: String(content),
      mask: false,
      icon: "none",
      duration: duration,
    });
    setTimeout(resolve, duration);
  });
}
```

### 5. 自定义组件

#### 1. 开发流程跟 vue 一致，注意动态获取本地图片的路径问题，使用相对路径不能用@

```javascript
 computed: {
    iconSrc() {
      return `../static/image/icon-${this.icon}.png`;
    },
  },
```

#### 2. 自定义组件内使用 vant 组件

在`globalStyle`内引入组件

### 6. 轮播图使用 uni 组件（小程序自有组件）

轮播图自动滚动圆角不可用

### 7. API

#### 1.跳转

跳转 tab
跳转二级
跳转 H5

#### 2. uni 生命周期 vue 生命周期 小程序生命周期

#### 3. store 数据存储

全局数据存储

### 8. 性能优化 组件按需注入

```javascript
  // manifest.js
  /* 小程序特有相关 */
    "mp-weixin" : {
        "appid" : "",
        "setting" : {
            "urlCheck" : false
        },
        "usingComponents" : true,
        "lazyCodeLoading": "requiredComponents"
   },
```

### 底部安全区兼容

页面及 fixed
<https://developer.mozilla.org/zh-CN/docs/Web/CSS/env>

滚动到某处
监听页面滚动

## TODO

1. 全局配置文件与微信比较
2. vite 深入了解
