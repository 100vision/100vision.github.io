---
# 这是文章的标题
title: curl调试api时常用的Http Content Type
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 5
# 设置作者
# 设置写作时间
date: 2023-02-22
# 一个页面可以有多个分类
category:
  - Web编程
# 一个页面可以有多个标签
tag:
  - Web编程
  - http基础
  - curl
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 无版权
---




## 了解Http Content Type的起因

curl，一个很好的api调试工具。好几次想在Linxu Shell使用curl调试上游api接口，但我用起来不是很利索，原因之一是对**Content Type** 记不住有哪几种，以及它们之间的区别。



## 什么是Content Type 

>一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因。Content-Type 标头告诉客户端实际返回的内容的内容类型。


## curl常用的Content Type ###

使用curl做api接口测试时，常会用的Content Type:
- application/json
- application/x-www-form-urlencoded

这两个常用来做POST提交。它们的区别是：
- applicaton/json 提交的是json格式的数据，数据放在**http body***里面。
- application/x-www-form-urlencoded 提交的是类似key1=val1&key2=val2键值对，数据也是放在**http body**里面

::: tip 总结
它们的区别是提交的数据结构体不同，但都是在http body里面
:::

::: warning 注意区分
Http GET方法有时也用于提交，也使用到了Parameters参数，也是以键值对形式，但提交的参数是在**http header**里，不是**http body**
:::


## curl POST数据到api接口

### 1、提交json

::: note 注意
提交json, 需要在header中显式指定Content-Type为applicaiton/json，因为curl默认是application/x-www-form-urlencoded
:::
- 在命令行上提交json结构数据。

```shell
curl -H 'content-type: application/json' -X POST -d '{"accountType":"4","channel":"1"}' http://192.168.129.xx/my-api
```
- 直接提交本地json文件

```shell
curl -X POST -H 'content-type: application/json'  -d @/apps/test.json http://192.168.129.xx/my-api
```

### 2. 提交application/x-www-form-urlencoded
application/x-www-form-urlencoded是默认数据格式，即表单KV
，例：
```shell
curl -d key1=value1&key2=value2 http://example.com
```

## 扩展
[更多Content-Type](https://www.runoob.com/http/http-content-type.html)