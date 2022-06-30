---
title: Promise
---

## Promise

`Promise`是异步编程的一种解决方案，比传统的"毁掉地狱"更优雅更合理。
`Promise`从语法上说，是包含异步操作结果的对象

### 解决问题
-   消灭嵌套调用
-   合并多个任务的错误处理

### `Promise`对象特点
-   状态不受外界影响
    -   pending:进行中
    -   fulfilled:已成功
    -   rejected:已失败
    
-   一但状态改变，就不会再变，任何时候都可以得到这个结果
    -   `Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`，只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）
    -   如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（`Event`）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
 ```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```   
### 缺点
-   无法取消，一旦新建它就会立即执行，无法中途取消。
-   如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
-   当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 基本使用
`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 `JavaScript` 引擎提供，不用自己部署

```javascript
const promise = new Promise(function(resolve,reject) {
  /*异步操作结果*/
  const result = true 
  if(result) {
    return resolve(1)
  } else {
    return reject()
  }
})
promise.then((value) => console.log(value), (err) => {})
```
注意：
-   `Promise`新建后立即执行
-   `Promise`执行时，调用`resolve`或`reject`以后，仍会向下执行，最好加上`return`
-   一个异步操作的结果是返回另一个异步操作，这时`p1`的状态就会传递给`p2`
```javascript
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```
-   应用场景，定时器封装，下载图片封装

## Promise.prototype.then()

-   `Promise`实例具有`then`方法，也就是说，`then`方法是定义在原型对象`Promise.prototype`上的。
-   可链式调用，`then`方法返回一个**新的`Promise`实例**。
-   链式调用中返回异步`Promise`，前一个回调函数，有可能返回的还是一个`Promise`对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。

```javascript
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);

```

## Promise.prototype.catch()

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误的回调函数

-   `resolve`后再抛出错误，无效
，不会被捕获,`setTimeout` 外部抛错
-   `Promise` 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止(只捕获一次)
-   `Promise` 内部的错误不会影响到 `Promise` 外部的代码，通俗的说法就是“`Promise` 会吃掉错误”。
-   一般使用`catch`,不使用`then`第二个参数
```javascript
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```
-   `catch()`方法之中，还能再抛出错误，生成一个新`Promise`

## Promise.prototype.finally()【ES2018】

`finally()`方法用于，指定不管`Promise`对象最后状态如何，都会执行的操作。回调函数不接受任何参数。

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```
finally方法总是会返回原来的值。
```javascript
// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})
// resolve 的值是 2
Promise.resolve(2).finally(() => {})
// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})
// reject 的值是 3
Promise.reject(3).finally(() => {})
```

## Promise.all()

```javascript
const p = Promise.all([p1, p2, p3]);
```
-   只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，p的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
-   入参是数组或者Iterator接口，如果不是先调用`Promise.resolve()`将参数转换为Promise实例
-   作为参数的Promise实例，自己定义了`catch`方法，那么它一旦`rejected`,并不会触发`Promise.all().catch()`


## Promise.race()
```javascript
const p = Promise.race([p1, p2, p3]);
```
-   只要`p1 p2 p3`中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的实例的返回值，就传递给`p`的回调函数
-   入参及`catch`同 `Promise.all()`

## Promise.allSettled() 【ES2020】

我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作
`Promise.all()`方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。

-   该方法返回的新的 Promise 实例,回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象
-   成员对象的`status`属性的值只可能是字符串`fulfilled`或字符串`rejected`
-   如果是成功（`fulfilled`），对象会有`value`属性，如果是失败（`rejected`），会有`reason`属性，对应两种状态时前面异步操作的返回值。
```javascript
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

console.log(allSettledPromise)
allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

## Promise.any() 【ES2021】

-   只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。
-   `Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是`Promise.any()`不会因为某个 `Promise` 变成`rejected`状态而结束，必须等到所有参数 `Promise` 变成`rejected`状态才会结束。
-  ` Promise.any()`抛出的错误是一个 `AggregateError` 实例（详见《对象的扩展》一章），这个 `AggregateError` 实例对象的`errors`属性是一个数组，包含了所有成员的错误。

```javascript
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});

Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results instanceof AggregateError); // true
  console.log(results.errors); // [-1, Infinity]
});
```

## Promise.resolve()

将现有对象转为 Promise 对象
```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

### 四种入参
1.  `Promsie`实例。不做任何修改、原封不动地返回这个实例。
2.  `thenable`对象。将这个对象转为 `Promise` 对象，然后就立即执行`thenable`对象的`then()`方法。
    ```javascript
    let thenable = {
    then: function(resolve, reject) {
    resolve(42);
    }
    };
    
    let p1 = Promise.resolve(thenable);
    p1.then(function (value) {
    console.log(value);  // 42
    });
    ```
3.  参数不是具有`then()`方法的对象，或根本就不是对。`Promise.resolve()`方法返回一个新的 `Promise` 对象，状态为`resolved`。象
    ```javascript
    // 下面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve()方法的参数，会同时传给回调函数。
    const p = Promise.resolve('Hello');
    
    p.then(function (s) {
    console.log(s)
    });
    // Hello
    ```
4.  不带有任何参数，直接返回一个`resolved`状态的 `Promise` 对象。
    ```javascript
    setTimeout(function () {
      console.log('three');
    }, 0);
    
    Promise.resolve().then(function () {
      console.log('two');
    });
    
    console.log('one');
    
    // one
    // two
    // three
    ```
    

## Promise.reject()
```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```
-   `Promise.reject(reason)`方法也会返回一个新的 `Promise` 实例，该实例的状态为`rejected`。
-   回调函数会立即执行
    ```javascript
    Promise.reject('出错了')
    .catch(e => {
    console.log(e === '出错了')
    })
    // true
    ```

## Promise.try() 【提案】
不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。

```javascript
// 兼容实现 1
const f = () => {
  console.log("now");
  return "f";
};
(async () => f())().then(console.log).catch(console.log);
console.log("next");

// 兼容实现 2
const f1 = () => {
  console.log("now");
  return 'f1';
};
(() => new Promise((resolve) => resolve(f1())))()
  .then(console.log)
  .catch(console.log);
console.log("next");
```

## 示例
<p class="codepen" data-height="600" data-theme-id="dark" data-default-tab="js" data-slug-hash="ZExEGVy" data-user="Jun_9527" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Jun_9527/pen/ZExEGVy">
  Promise</a> by Jun_9527 (<a href="https://codepen.io/Jun_9527">@Jun_9527</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


