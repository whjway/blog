# Markdown
**Markdown是一种轻量级的「标记语言」**  

![markdown](https://www.mdeditor.com/images/logos/markdown.png "markdown")  

Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面，Markdown文件的后缀名便是“.md”

## 标题
最多六级标题
```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```
## 段落
段落本身没有特殊格式，直接编写文字就好。
## 换行
1. 段落的换行是使用两个以上空格加上回车。
    ```markdown
    第一行↓↓
    第二行
    ```
2. 在段落后面使用一个空行来表示重新开始一个段落。
   ```markdown
    第一行
   
    第二行
    ```
## 分隔线
可以在一行，添加三个`* - _`来建立一个分隔线，行内不允许有其他东西，可以再上述三个符号之间加入空格。  
示例：
***
```markdown
***
* * *
*    *     *
---
- - -
___
_ _ _
```
## 字体
示例：*斜体文本*
_斜体文本_
**粗体文本**
__粗体文本__
***粗斜体文本***
___粗斜体文本___

```markdown
*斜体文本*
_斜体文本_
**粗体文本**
__粗体文本__
***粗斜体文本***
___粗斜体文本___
```
## 删除线
如果段落上需要加删除线，文字两端各加两个`~~`   
示例：~~删除线文本~~
```markdown
~~删除线文本~~
```
## 下划线
可以使用html的`<u>`标签  
示例：<u>下换线文本</u>
```markdown
<u>下换线文本</u>
```
## 上标、下标
示例：x<sub>2</sub> 、 y<sup>z</sup>
```markdown
x<sub>2</sub>
y<sup>z</sup>
```
## 注脚（不可使用)
~~注脚是对文本的补充说明~~   
~~示例：需要补充书面的文本[^1]~~   
~~[^1]:这里是注脚的内容！！！~~
## 引用 Blockquotes
> 至理名言  

> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，[普通链接](https://github.com/whjway)。
```markdown
> 至理名言
> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，[普通链接](https://github.com/whjway)。
```
## 图片 Images
示例：  
![markdown](https://www.mdeditor.com/images/logos/markdown.png "markdown")
```markdown
![markdown](https://www.mdeditor.com/images/logos/markdown.png "markdown")
```
## 锚点、链接 Links
[普通链接](https://github.com/whjway)  
[普通链接带标题](https://github.com/whjway "普通链接带标题")  
直接链接：<https://github.com/whjway>  
[锚点链接][anchor-id]  

[anchor-id]: https://github.com/whjway
```markdown
[普通链接](https://github.com/whjway)  
[普通链接带标题](https://github.com/whjway "普通链接带标题")  
直接链接：<https://github.com/whjway>  
[锚点链接][anchor-id]  
// 空一行
[anchor-id]: https://github.com/whjway
```
## 多语言代码 Codes
### 行内代码 Inline code
执行命令：`npm install`
```markdown
执行命令：`npm install`
```
### 代码块 Block code
1. 缩进四个空格或制表符（tab键）
```markdown
    <?php
        echo "Hello world!";
    ?> 
```

    <?php
        echo "Hello world!";
    ?> 

2. 可以用` ``` `指定一段代码，并指定类型（可不指定）
```markdown
$(document).ready(function () {
    alert('markdown');
});
``` 
```javascript
$(document).ready(function () {
    alert('markdown');
});
``` 
## 列表 Lists
### 有序列表 Ordered lists
1. 第一行
2. 第二行
```markdown
1. 第一行
2. 第二行
```
### 无序列表 Unordered lists
可使用`* + -`作为列表标记
- 列表一
- 列表二
    - 列表一
    - 列表二
```markdown
- 列表一
- 列表二
    - 列表一
    - 列表二
```
### GFM task list ()
- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2
```markdown
- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2
```
## FAQ
### 引用本地图片
Markdown文件与imgs同一层级
```markdown
![avatar](imgs/github.png)
```


## 参考文献
1. [RUNOOB.COM](https://www.runoob.com/markdown/md-title.html)
2. [mdeditor](https://www.mdeditor.com/)

