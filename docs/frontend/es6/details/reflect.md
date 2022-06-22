---
title: Reflect
---

## Reflect

`Reflect`对象和`Proxy`对象一样，都是ES6为了操作对象而提供的新API

## 设计目的

1.  从`Reflect`对象上可以拿到语言内部的方法。将`Object`对象的一些明显属于语言内部的方法（例如`Object.defineProperty`),放到`Reflect`对象上。现阶段，两个同时部署，未来新特性只部署`Reflect`对象上。
2.  修改某些方法的返回结果，让其变的更合理，例如：`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。
3.  让`Object`操作都变成函数行为。例如`in delete`命令式 
4.  `Reflect`对象的方法与`Proxy`对象的方法一一对应。让`Proxy`对象方便调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础
5.  增强易读性，例如 `Reflect.apply(func, thisArg, args)`方法等同于`Function.prototype.apply.call(func, thisArg, args)`和 `func.apply(thisArg, args)`，用于绑定`this`对象后执行给定函数。

### 方法

1.  `Reflect.get(target, propKey, receiver)`:查找并返回属性`
    -   不存在的属性，返回`undefined`
    -   如果`propKey`属性部署了读取函数（`getter`）,`receiver`传入则读取函数的`this`指向`receiver`否则指向`target`
    -   第一个参数不是对象，会报错
2.  `Reflect.set(target, propKey, value, receiver)`:设置属性
    -   `Proxy`和`Reflect`联合使用，前者拦截赋值，后者完成赋值的默认行为，而且传入了`receiver`,那么`Reflect.set`会触发`Proxy.defineProperty`拦截
    -   如果`propKey`属性部署了赋值函数（`setter`）,`receiver`传入则读取函数的`this`指向`receiver`否则指向`target`
    -   第一个参数不是对象，会报错

3.  `Reflect.apply(func, ctx, args)`: 用于绑定`this`对象后执行给定函数
    -   `args`没有入参也要传`[]`
    -   直接调用Reflect.apply方法,也会被拦截`Reflect.apply(fnProxy, null, [9, 10]) // 38`
    
4.  `Reflect.construct(target, args)`: 等同`new proxy(...args)`，提供了一种不使用`new`来构造函数的方法
    -   第一个参数不是函数，会报错
    
5.  `Reflect.has(target, propKey)`:判断属性，对应`propKey in proxy`
    -   第一个参数不是对象，会报错
    
6.  `Reflect.deleteProperty(target, propKey)`:删除属性，对应`delete proxy[propKey]`
    -   第一个参数不是对象，会报错
    
### 实例：使用Proxy实现观察者模式
> 观察者模式（observer mode）指的是函数自动观察数据对象，一但数据对象有变化，函数就会自动执行

### 示例
<p class="codepen" data-height="600" data-theme-id="dark" data-default-tab="js" data-slug-hash="rNJEagp" data-user="Jun_9527" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Jun_9527/pen/rNJEagp">
  Reflect</a> by Jun_9527 (<a href="https://codepen.io/Jun_9527">@Jun_9527</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
