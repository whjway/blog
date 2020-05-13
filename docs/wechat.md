# 公众号开发

## [微信公众平台测试账号申请](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)
### 踩坑
1. 接口配置信息和JS接口安全域名 跟后端商定好!!!
2. 扫测试号二维码
3. 体验接口权限表, 开启对应服务!!!!!

## [微信JS-SDK](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
> 微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。  
> 通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验。  
> 此文档面向网页开发者介绍微信JS-SDK如何使用及相关注意事项。
 ### 踩坑
 1. 先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”
 2. Vue spa (history模式) 切换页面也需要重新config
 3. IOS下分享校验的地址 是第一次打开页面的地址
 ```javascript
    if (!window.pageUrl) {
        window.pageUrl = location.href.split("#")[0];
    }
    // IOS下分享校验的地址 是第一次打开页面的地址
    const validUrl = isIOS ? window.pageUrl : location.href.split("#")[0];
```
 4. [附录5-常见错误及解决方法](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#66) 
    - 按照参考文档排查问题, 有签名算法校验页面,排查步骤
    - invalid signature签名错误  大概率是url问题
    - permission denied该公众号没有权限使用这个JSAPI 要么config没配置对应权限,要么config失败 二次分享等都不能正常使用

 5. 微信内支付
 ```javascript
    // 下单后接口返回对应参数 paySign不建议暴露
    const {
        pack,appId,timeStamp,nonceStr, signType, paySign
    } = this.orderInfo.payData.jsApiPayData;
    this.weChatPayParams = {
        appId,
        timeStamp,
        nonceStr,
        signType,
        paySign,
        package: pack
    };
    // 公众号支付
    WeixinJSBridge.invoke(
        "getBrandWCPayRequest", this.weChatPayParams,
        (res)=>{
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                // 支付成功
                this.callBackSuccessJump();

            } else {
                // 支付失败
                Toast.fail("支付失败");
            }
        });
```
## [微信支付](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_1)
> H5支付是指商户在微信客户端外的移动端网页展示商品或服务，用户在前述页面确认使用微信支付时，商户发起本服务呼起微信客户端进行支付。主要用于触屏版的手机浏览器请求微信支付的场景。可以方便的从外部浏览器唤起微信支付。
 ### 踩坑
 1. 浏览器内支付重定向,设计好交互流程.
 2. 客户端内,建议使用APP支付,如果使用H5支付需要考虑是否支持唤醒微信,交互流程
    - 最后有单独结果页,支付重定向后跳到结果页轮询查支付结果
 
## [支付宝支付](https://opendocs.alipay.com/open/203/105285)
> 支付宝支付 真不错!!!!

### 踩坑

1. 添加支付成功后的回调, 入参增加return_url
2. 使用方法, 支付宝返回form表单    
```javascript
      this.aliPayForm = data.body;
      this.$nextTick(() => {
        document.forms[0].submit();
      });
```


