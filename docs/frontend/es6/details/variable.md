---
title: let & const
---

## ES6声明变量的六种方式

ES5：`var`命令和`function`命令。  
ES6：`let`命令、`const`命令、`import`命令、`class`命令

## let命令

`let`作用是用来声明变量，用法类似`var`。

-   `let`声明的变量，只有在`let`命令所在的代码块内有效，代码块外使用报错。[使用场景1](#使用场景)
-   不存在变量提升
-   暂时性死区，在代码块内，使用`let`命令声明变量之前，该变量都是不可用的，都属于变量`tmp`的“死区”（代码块内不声明，可向上查找），**顶部优先定义变量**
    -   导致`typeof`不再是一个百分之百安全的操作
        ```javascript
        typeof x; // ReferenceError
        let x;
        ```
    -   函数默认参数异常
        ```javascript
        function bar(x = y, y = 2) {
            return [x, y];
        }

        bar(); // 报错
        
        function bar(x = 2, y = x) {
            return [x, y];
        }
        bar(); // [2, 2]
        
        ```
    -   声明时赋值自己
        ```javascript
        // 不报错
        var x = x;
        
        // 报错
        let x = x;
        // ReferenceError: x is not defined
        ```
    
-   不允许在相同作用域内，重复声明同一个变量
-   块级作用域必须有大括号，`if (true) let x = 1;`报错，这种写法没有大括号，所以不存在块级作用域，而let只能出现在当前作用域的顶层，所以报错，
```javascript
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
```
## const

> `const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

-   `const`声明只读常量。一但声明，常量的值就不能改变[使用场景2](#使用场景)
```javascript
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```
-   必须立即初始化
```javascript
const foo;
// SyntaxError: Missing initializer in const declaration
```
-   其他特性同`let`

## 顶层对象的属性

顶层对象，在浏览器环境里指的是`window`对象，在`node`指的是`global`对象，ES5中顶层对象的属性与全局变量是等价的     

顶层对象的属性与全局变量挂钩，带来的问题：
-   没法在编译时就好处变量未声明的错误，只有运行时才知道
-   全局污染
-   顶层对象的属性是到处可以读写的，这非常不利于模块化编程
-   `window`对象有实体意义，指的是浏览器的窗口对象，顶层对象是一个没有实体意义的对象

ES6为了改变上述
-   为了兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性
-   `let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```javascript
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

## globalThis 对象
JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。

```javascript
if (typeof globalThis.setTimeout !== 'function') {
  //  此环境中没有 setTimeout 方法！
}
```
## 使用场景
1. `let`场景: `for`循环的计数器，特别之处是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
2.  真想冻结对象，应该使用`Object.freeze({})`

## 示例
<p class="codepen" data-height="600" data-theme-id="dark" data-default-tab="js" data-slug-hash="XWZLdZx" data-user="Jun_9527" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Jun_9527/pen/XWZLdZx">
  let&amp;const</a> by Jun_9527 (<a href="https://codepen.io/Jun_9527">@Jun_9527</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


