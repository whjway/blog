---
title: 变量的解构赋值
---

ES6允许按照一定的模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（destructuring）

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

## 数组

### 基本使用
```javascript
let [a, b, c] = [1, 2, 3];
```
1. 从数组中提取值，按照对应位置，对变量赋值。
    -   匹配模式：只要等号两边的模式相同，左边的变量就会被赋予对应的值。  
     ```javascript
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    foo // 1
    bar // 2
    baz // 3
    
    let [ , , third] = ["foo", "bar", "baz"];
    third // "baz"
    
    let [x, , y] = [1, 2, 3];
    x // 1
    y // 3
    
    let [head, ...tail] = [1, 2, 3, 4];
    head // 1
    tail // [2, 3, 4]
    
    let [x, y, ...z] = ['a'];
    x // "a"
    y // undefined
    z // []
    ```
    -   不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功
    ```javascript
    let [x, y] = [1, 2, 3];
    x // 1
    y // 2
    
    let [a, [b], d] = [1, [2, 3], 4];
    a // 1
    b // 2
    d // 4
    ```
2. 解构失败，返回`undefined`
```javascript
let [foo] = [];
let [bar, foo] = [1];
```
3. 如果等号右边不是数组（严格地说是不可遍历的解构，Iterator 接口），报错
```javascript
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
// 正常
let [x, y, z] = new Set(['a', 'b', 'c']);

function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
```
4.  未声明直接赋值语句则变量挂载到`window`
### 默认值
```javascript
let [x, y = 'b'] = ['a']; // x='a', y='b'
```
1.  使用严格相等运算符（`===`）等于 `undefined`，判断一个位置是否有值
```javascript
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```
2.  如果默认值是一个表达式，那么这个表达式是惰性求值的，只有用到才执行
3.  默认值可以引用解构赋值的其他变量，但该变量必须已经声明
```javascript
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x, y = x] = [];     // 不报错 x=undefined; y=undefined 
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

## 对象
对象解构与数组解构有个重要不同，数组的元素是按次序排列的，变量的取值由它的位置决定     
对象的属性没有次序，变量必须与属性同名，才能取到值（可设别名）

### 基本使用
```javascript
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
```
1.  变量对应对象同名属性，与次序无关
```javascript
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```
2.  解构失败，返回`undefined`，嵌套结构中报错
3.  变量名与属性名不一致
```javascript
// 变量名不同 foo 是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined 。

// 简写形式而已
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
```
4.  嵌套结构，理清**模式和变量**[查看示例](#示例)
5.  对象的解构赋值可以取到继承的属性

### 默认值
用法与数组一致
```javascript
let {x = 3} = {};

const {x = 3} = {x: undefined};
x // 3

const {x = 3} = {x: null};
x // null
```
### 注意点
1.  已声明的变量用于结构赋值
    -   因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
    -   将整个解构赋值语句，放在一个圆括号里面，就可以正确执行
    -   大括号可能与前面内容解析为函数执行，最好前面加上`;`
```javascript
// 1 已声明的变量用于结构
// 错误的写法1
let x;
{x} = {x: 1}; // SyntaxError: syntax error

// 错误的写法2
let x
let a = '1'
({x} = {x: 1}); // TypeError: "1" is not a function

// 正确的写法
let x;
let a = '1';
({x} = {x: 1});
```
2.  左边模式中不放置任何变量名，合法，但无意义
```javascript
({} = [true, false]);
({} = 'abc');
({} = []);
```
3.  由于数组本质是特殊的对象，因此可以对其进行对象属性的解构。
```javascript
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

## 字符串
字符串被转换成了一个类似数组的对象

```javascript
const [a,b,c] = 'abc'
console.log(a,b,c) // a b c

const {0:a,1:b,2:c,length: len} = 'abc'
console.log(a,b,c,len) // a b c 3

```

## 数值和布尔值
只要等号右边的值不是对象或数组，就先将其转为对象
```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

## 函数参数
1.  下面代码中add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量`x`和`y`。对于函数内部的代码来说，他们能感受到的参数就是`x`和`y`
```javascript
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```
2.  函数参数默认值
```javascript
// 为变量x和y指定默认值
function move({x = 0,y = 0} = {}) {
  console.log([x, y])
  return [x, y]
}

move({x: 3, y: 4})
move({x: 3})
move({})
move()


// 函数move1的参数指定默认值
function move1({ x, y } = { x: 0, y: 0 }) {
  console.log([x, y]);
  return [x, y];
}

move1({ x: 3, y: 4 });
move1({ x: 3 });
move1({});
move1();
```
3.  `undefined`就会触发函数参数的默认值。
```javascript
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

## 圆括号问题

解构赋值虽然很方便，但是解析起来并不容易，对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或者解析不到）等号才知道 
由此带来的问题是，如果模式中出现圆括号怎么处理。ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。      
但是这条规则实际上不是那么容易辨别，处理起来相当麻烦。因此建议只要有可能，就**不要在模式中放置圆括号**

### 不能使用圆括号情况
1.  变量声明语句
```javascript
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
```
2.  函数参数
```javascript
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```
3.  赋值语句的模式
```javascript
let a;
let c;
// 正常
({p: a} = {p:'p'})
[a] = [5]

// 异常
(({p: a}) = {p:'p'});
([a]) = [5]
[({ p: a }), { x: c }] = [{}, {}];
```

### 可以使用圆括号情况
赋值语句的非模式部分 **对象解构的赋值语句 加大括号和分号**
```javascript
[(c)] = [1];
({b:d} = {b: 'b'});
[(parseInt.prop)] = [3];
```
## 应用场景

## 示例
<p class="codepen" data-height="600" data-theme-id="dark" data-default-tab="js" data-slug-hash="eYVwLON" data-user="Jun_9527" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Jun_9527/pen/eYVwLON">
  变量的解构赋值</a> by Jun_9527 (<a href="https://codepen.io/Jun_9527">@Jun_9527</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


