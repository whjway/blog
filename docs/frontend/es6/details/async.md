---
title: Async 【ES2017】
---

## Async

`ES2017` 标准引入了 `async` 函数，使得异步操作变得更加方便。

`async` 函数是什么？一句话，它就是 Generator 函数的语法糖。
`async`函数对 `Generator` 函数的改进，体现在以下四点。
1.  内置执行器
2.  更好语义，`async`和`await`对比`*`和`yield`
3.  更广适用性，`yield`后只能是`Thunk`函数或`Promise`对象，`await`后可以是`Promise`对象和原始值（`resolved`转换）
4.  `async`返回值是`Promise`


```javascript
// 多种使用方式
// 箭头函数
const async1 = async () => {}
// 函数表达式
const async2 = async function() {}
// 函数声明
async function async3() {}
// 对象的方法
const obj = {
  async async4() { console.log('async4')}
}
obj.async4()
// class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars')
  }
  
  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}
const storage = new Storage()
storage.getAvatar('jake').then(console.log)
```


## 基本用法
-   `async`函数返回一个`Promise`对象,`async`函数内部`return`语句的返回值，会成为`then`方法回调函数的参数
    ```javascript
    // 正常情况
    async function f() {
    return 'hello world';
    }
    
    f().then(v => console.log(v))
    // "hello world"
    
    // 异常
    async function f() {
    throw new Error('出错了');
    }
    
    f().then(
    v => console.log('resolve', v),
    e => console.log('reject', e)
    )
    //reject Error: 出错了
    ```
-   这个`Promise`对象状态，当`async`函数执行的时候，一旦遇到`await`就会先暂停，等到异步操作完成，再接着执行函数体后面语句（除非遇到return语句或者抛出错误）

-   `await`命令
    -   `await`命令后面是一个 `Promise` 对象，返回该对象的结果。如果不是 `Promise` 对象，就直接返回对应的值。 
        ```javascript
        async function f() {
        // 等同于
        // return 123;
        return await 123;
        }
        
        f().then(v => console.log(v))
        // 123
        ```
    - `await`命令后面`thenable`对象，将其视为`Promise`对象处理
    - `await`命令后面的 `Promise` 对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到。（await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。）
        ```javascript
        async function f() {
        await Promise.reject('出错了');
        }
        
        f()
        .then(v => console.log(v))
        .catch(e => console.log(e))
        // 出错了
        ```
    -   `await`命令`reject`后，第二个`await`语句是不会执行的，因为第一个`await`语句状态变成了`reject`。
        ```javascript
        async function f() {
        await Promise.reject('出错了');
        await Promise.resolve('hello world'); // 不会执行
        }
        
        // 不影响第二个await
        async function f() {
        try {
        await Promise.reject('出错了');
        } catch(e) {
        }
        return await Promise.resolve('hello world');
        }
        
        f()
        .then(v => console.log(v))
        // hello world
        
        // 不影响await 2
        async function f() {
        await Promise.reject('出错了')
        .catch(e => console.log(e));
        return await Promise.resolve('hello world');
        }
        
        f()
        .then(v => console.log(v))
        // 出错了
        // hello world
        ```
### 错误处理
1.  如果`await`后边的一步操作出错，那么等同于`async`函数返回的`Promise`对象被`reject`
2.  内部语句报错，那么等同于`async`函数返回的`Promise`对象被`reject`，后边代码不执行

### 注意点
1.  前面已经说过，`await`命令后面的`Promise`对象，运行结果可能是`rejected`，最好把`await`命令放在`try...catch`代码块中
```javascript
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法

async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {
    console.log(err);
  });
}
```
2.  多个`await`命令后边的异步操作，如果不存在继发关系，最好同时触发
```javascript
// bad
let foo = await getFoo();
let bar = await getBar();

// good
let [foo, bar] = Promise.all([getFoo(),getBar()])

let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```
3.  `await`命令只能用在`async`函数之中，如果用在普通函数，就会报错。
4.  多请求并发，多请求继发
```javascript
// 继发
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
// 或者
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  await docs.reduce(async (_, doc) => {
    await _;
    await db.post(doc);
  }, undefined);
}

// 并发
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}

// 按顺序完成异步操作
//问题是所有远程操作都是继发。只有前一个 URL 返回结果，才会去读取下一个 URL，这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求。
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
// 虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```
5.  `async` 函数可以保留运行堆栈。

### 顶层 await 【ES2022】

## 示例
<p class="codepen" data-height="600" data-theme-id="dark" data-default-tab="js" data-slug-hash="eYMmQWG" data-user="Jun_9527" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Jun_9527/pen/eYMmQWG">
  Untitled</a> by Jun_9527 (<a href="https://codepen.io/Jun_9527">@Jun_9527</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


