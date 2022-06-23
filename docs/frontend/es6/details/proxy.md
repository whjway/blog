---
title: Proxy
---

## Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面上做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。 

可以理解成在目标对象之前架设一层“`拦截`”，外界对该对象进行访问时，都必须先通过这层拦截，因此提供一种机制，可以对外界的访问进行过滤和改写。  

Proxy可以译为“代理器”  

### 声明
```javascript
const proxy = new Proxy(target, handler);
```
- target: 拦截对象
- handler: 参数也是对象，定制拦截行为
 
### 方法

> 对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。

1.  `get(target, propKey, receiver)`:拦截对象属性的读取，例如`proxy.foo`和`proxy['foo']`
    -   拦截对象不存在的属性，返回`undefined`
    -   可继承
    -   receiver指向原始的读操作所在的那个对象  
    -   如果一个属性不可配置（`configurable`)且不可写（`writable`），则不能修改改属性，否则报错
    -   应用场景：函数名链式使用、生成各种DOM
2.  `set(target, propKey, value, receiver)`:拦截对象属性的设置,例如`proxy.foo = 1`和`proxy['foo'] = 1`,返回一个布尔值
    -   receiver指向原始的读操作所在的那个对象
    -   如果拦截对象的某个属性不可写（`writable`）,那么`set`方法不起作用
    -   严格模式下不返还`true`就会报错
    -   应用场景：验证设置的数据、数据绑定、内部属性不被外部使用（_）

3.  `apply(target, ctx, args)`: 拦截proxy实例作为函数调用的操作，例如`proxy(...args)`、`proxy.call(object, ...args)`和`proxy.apply(...)`操作   
    -   call&apply使用时要兼容get
    -   直接调用Reflect.apply方法,也会被拦截`Reflect.apply(fnProxy, null, [9, 10]) // 38`
    
4.  `construct(target, args, newTarget)`: 拦截proxy实例作为构造函数调用的操作，例如`new proxy(...args)`
    -   目标对象必须是函数，否则报错
    -   返回的必须是一个对象，否则报错
    -   `this`指向`handler`,而不是实例对象
    
5.  `has(target, propKey)`:拦截`hasProperty`操作，例如`propKey in proxy`和`Reflect.has(fnProxy, 'count')`，返回一个布尔值
    -   如果原对象不可配置或者禁止拓展，会报错 `Object.preventExtensions(hasObj)`
    -   `for...in`不生效
    -   应用场景：隐藏某些属性不被`in`运算法发现，例如`_prop`
    
6.  `deleteProperty(target, propKey)`:拦截`delete proxy[propKey]`操作，返回一个布尔值
    -   抛出异常或者返回`false`,当前属性不删除
    -   如果原对象不可配置，会报错
    -   应用场景：隐藏某些属性不被delete运算法发现，例如_prop
    
### 示例
<p class="codepen" data-height="600" data-theme-id="dark" data-default-tab="js" data-slug-hash="QWQgbMg" data-user="Jun_9527" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Jun_9527/pen/QWQgbMg">
  15 Proxy</a> by Jun_9527 (<a href="https://codepen.io/Jun_9527">@Jun_9527</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### this问题
虽然Proxy可以代理目标对象的访问，但它不是目标对象的透明代理，即不作任何拦截的情况下，也无法保证与目标对象的行为一致

主要原因是，Proxy代理情况下:

-   目标对象内部的`this`关键字会指向Proxy实例
-   有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。例如`const target = new Date()`
-   拦截函数内部this指向handler
