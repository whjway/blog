---
title: Typescrip 精选文章
---

## 常用网站

- [typtscript 中文网](https://www.tslang.cn/docs/handbook/basic-types.html)
- [typtscript](https://www.typescriptlang.org/tsconfig)

## Vue3 使用总结

1 `ESLint: Type boolean trivially inferred from a boolean literal, remove type annotation.(@typescript-eslint/no-inferrable-types)`

```javascript
// 已经知道你所赋值后这个元素的类型已经被检测出来了
handleRoute(path: string, isTab: boolean = false) {}
```

```javascript
// eslint
"@typescript-eslint/no-inferrable-types": "off"
```

[参考](https://blog.csdn.net/qq_40896095/article/details/119910826)

2 `vue`中使用

```javascript
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {};
  },
});
</script>

```

[vue3 TypeScript 支持](https://v3.cn.vuejs.org/guide/typescript-support.html)

3 `type`和`interface`区别
[参考](https://blog.csdn.net/weixin_43550562/article/details/123546720)

4 `axios`二次封装
[参考](https://www.jianshu.com/p/500a9a3b8a74)

5 `typescript`中的`this`使用
[参考](https://www.jb51.net/article/203728.htm)

6 isAgree is not a valid value for v-model. Expected: v-model

```javascript
<van-checkbox v-model="isAgree" icon-size="14px" checked-color="#6FA5F3">
  您已阅读并同意
  <router-link to="/user-agreement">《用户协议》</router-link>
  <router-link to="/privacy-agreement">《隐私政策》</router-link>
</van-checkbox>
```

7 TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.

```javascript
// TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.
return function (this: any, ...args: any) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const context = this;

  if (timeout) clearTimeout(timeout);
  if (immediate) {
    const callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = undefined;
    }, wait);
    if (callNow) func.apply(context, args);
  } else {
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  }
};
```

8 ESLint:
Don't use `Function` as a type. The `Function` type accepts any function-like value.
It provides no type safety when calling the function, which can be a common source of bugs.
It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.
If you are expecting the function to accept certain arguments, you should explicitly define the function shape.
(@typescript-eslint/ban-types)

```typescript
function debounce(func: Function, wait = 1000, immediate = true): () => void {}
```
