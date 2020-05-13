# 手淘布局方案

[flexible(2015 v0.3.2)](https://github.com/amfe/article/issues/17)

[**2.2.1版本暂未比较**](https://github.com/amfe/lib-flexible/tree/2.0)

## 目标

> 制作一个适配各终端的H5页面

## 原理

- 动态改写`<meta>`标签
- 给`<html>`元素添加data-dpr属性，并且动态改写data-dpr的值
- 给`<html>`元素添加font-size属性，并且动态改写font-size的值

## 问题
### 1 不能与响应式布局兼容
响应式布局两个条件
1. 视口宽度与device-width相同`<meta name="viewport" content="width=device-width, initial-scale=1">`
2. 媒体查询
```javascript
@media (max-width: @screen-xs-max) { ... }
@media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) { ... }
@media (min-width: @screen-md-min) and (max-width: @screen-md-max) { ... }
@media (min-width: @screen-lg-min) { ... }
```
而flexible `<meta name="viewport" content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no">`

### 2 安卓适配dpr默认为1

1. 安卓设备下，1px的边框问题依然存在
2. 根据dpr 雪碧图背景图片适配

> 造成这个差异的原因也很简单，就是rem的副作用，腾讯的页面里所有position,size都是不带小数的数值，而且2x跟1x之间是整数的翻倍，而不是3x跟2x之间的1.5倍，lib-flexible会导致大部分的设备下position和size都是小数数值，所以很难保证背景图片缩放后还能通过position显示到正确的位置

> 从网页优化的角度来说，减少请求数，减少请求数据大小是两个基本的思路，雪碧图就是一个减少请求数但是不能减少请求数据量的方法。lib-flexible不能使用兼容3x屏的雪碧图的情况看起来是它一个大的缺陷，但实际上也并非如此：雪碧图如果用不了，就采用别的思路来优化，我能想到的更好的就是图片的延迟加载和懒加载，在app页面里控制好默认只加载首屏的图片，并且采用延迟和懒加载的方式，避免阻塞页面的加载，也能有极好的用户体验，打开手机淘宝的页面给人的感觉就是如此，而且你去看看手机淘宝的应用会发现它根本就没有用雪碧图，但是速度还是很快

### 3 当页面中引入第三方组件库或富文本

### 4 js操作dom

## Flexible源码
```javascript
;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }


    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));
```


## 参考文档

1. [基于淘宝弹性布局方案lib-flexible的问题研究](https://www.qieseo.com/359871.html)