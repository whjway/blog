---
title: vue3 项目总结
---

> vue3 + pinia + vue-router + vue-cli5 + typescript

### 开发手册

1. 使用`unplugin-vue-components`及`unplugin-auto-import`,可以不局部引用vant/vue/vue-router/vuex等模块
2. `webpack`配置，全局引入`scss`变量和混合
3. `axios`引入
    - 通用`request`配置
    - 添加`config`控制变量的`ts`兼容

### 问题汇总

1. 全局引入`css`，避免每个组件引入`scss`变量 `sass-loader 版本10+`
2. 生产环境移除log `terser-webpack-plugin 版本4+`
3. 按需引入[vant3](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart)
4. `components.d.ts`使用按需加载[unplugin-vue-components](https://www.npmjs.com/package/unplugin-vue-components)
   时自动生成，添加到`tsconfig`及`git`忽略
5. `setup`获取全局变量`$toast`,使用时每次都需引入（与封装再引用无异，未使用）

    ```javascript
        const instance = getCurrentInstance();
        //@ts-ignore
        console.log(instance.proxy.$toast("123"));
    ```

6. 组件`props` 如果是对象最好给默认参数，只给`required`会死循环报错
7. 添加`router`默认路由配置
8. 页面通用布局，兼容`ios`底部,兼容上拉加载，`scroll`方法要使用在`.page`上，且高度大于屏幕高度
9. 页面切换动画（效果不理想，未使用）
10. `keep-alive`，生命周期更换
11. 全局初始化`Toast`配置，停留时间等
12. [shallowRef使用误区](https://www.cnblogs.com/s-w-f/p/16589138.html)
13. `setup`使用`name`最后方案[define-options](https://github.com/sxzz/unplugin-vue-macros/tree/main/packages/define-options)；官方提供两种方式[setup name](https://github.com/vuejs/rfcs/discussions/430#discussioncomment-2333745)
  
    - 直接使用文件命名
    - [两个script](https://staging-cn.vuejs.org/api/sfc-script-setup.html#usage-alongside-normal-script)

14. `vue3`在`chrome`警告[Added non-passive event listener to a scroll-blocking 'touchstart' event](https://segmentfault.com/a/1190000010173792)，暂未处理
15. `ts`使用 ,遍历自己取值(`Recordable`)
16. [JSDoc](https://www.shouce.ren/api/view/a/13261)

### todo

- [x] vuex替换成pinia，参考pinia分支
- [x] `setup`语法糖使用，参数setup分支
  - [x]  [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) `API`自动导入，`vue`/`vue-router`/`@/store`(`unplugin-vue-components`已自动导入`vant`)
  - [x] eslint校验 兼容`defineExpose`等(升级cli5后已兼容)
  - [x] 其他引入 顶级变量定义未使用报错(升级cli5后已兼容)

- [x] 升级vue-cli5,ts版本也升级(~4.5.5)
  - [x] `defineProps`在setup语法糖里是否正常显示(升级cli5后已兼容)
  - [ ] `webstorm` `projectErrors`报错`TS1232: An import declaration can only be used at the top level of a namespace or module.` setup语法糖中import引用(升级cli5后,依然报错,待升级webstorm,**升级2022.2.1后依然报错提示**)
  - [x] Fn放到types文件夹里时，编辑器不报错，代码打包报错
  - [x] `prettier` 检测到 `define-options`格式异常(升级cli5后已兼容)
  - [x] debounced.ts中[setTimeout](https://blog.csdn.net/weixin_42369598/article/details/125000346)报错(升级cli5后已兼容)
  - [x] webpack4 vs webpack5 迁移
    - [x] `overlay`移到`client`内
    - [x] `disableHostCheck`改成`allowedHosts`
    - [x] `client`内`progress`编译进度
  - [x] webpack5 优化  
    - [x] 开启1500毫秒聚合编译，防止编辑器格式化代码导致重复构建
    - [x] `cache`开启二次启动缓存优化
    - [x] `SpeedMeasurePlugin`webpack打包分析

### pinia 替换 vuex4.x

> `vuex` vs `pinia` Compared to Vuex, Pinia provides a simpler API with less ceremony, offers Composition-API-style
   APIs, and most importantly, has solid type inference support when used with TypeScript.

`vuex4.x` 劣势

- `ts`支持不好,要写一堆接口,有些是`vuex`自带的方法
- 模块化后`state`不能合并，提示异常
- 使用不方便 `injection` `key`（可封装）

`pinia` 比较

- `mutations`移除
- 更好的`ts`支持
- 使用方便，不用注入`key`
- 扁平化模块
- 无需命名空间

替换问题

- 组合式API中使用pinia，注册pinia在初始化之后，导致组合式API中getters拿不到初始值报错
- 自动引入API
- vue tools使用
- `$reset`使用时只恢复没有`muations`前的数据，如果初始化从`localstorage`获取赋值了，是清空不了的

### vue vs typescript

- Vue2.x 最令人诟病的一点就是对 Typescript 的羸弱支持，其根源也在于 vue2.x 的 api 大量使用了 this，造成其类型难以推断，Vue2.5
   通过 ThisType 对 vue 的 typescript 支持进行了一波增强，但还是有不足之处，
- Vue3 的一个大的卖点也是改进了增强了对
   Typescript 的支持。
  - [组合式API与ts使用](<https://cn.vuejs.org/guide/typescript/composition-api.html>)

### 编辑器对比

#### VS code

- `typescript` 支持度比较好，比如`.vue``template`内的检测
- 社区活跃，支持各种插件
- 轻便，不占内存
- markdown支持lint校验，统一样式
  
#### webstorm

- 集成度比较高，开箱即用
- `git`模块yyds，支持分支对比等实用功能
- `webstorm compile`编译js，可以手动控制需要编译查看的文件
- `SFC`内`template`的`ts`兼容不好，比如：`vant`组件内的`v-model`及数据引用校验
