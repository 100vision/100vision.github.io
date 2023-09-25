---
# 这是文章的标题
title: 工具介绍系列：Rest Api调试工具
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 59
# 设置作者
# 设置写作时间
date: 2023-09-25
# 一个页面可以有多个分类
category:
  - DevOps
  - 工具
  - Web
# 一个页面可以有多个标签
tag:
  - DevOps
  - 工具
  - RestApi

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 无版权
---



## 前言

继之前介绍的cURL，详见本博 [熟悉使用curl调试api](https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/DevOps/how_to_use_curl.html)，再简单记录几个支持图形界面的Rest Api调试工具，方便需要时，知道上哪下载、使用。



## 正文

因为这些工具使用经验不多，所以接下来只是记录这些工具。

- Postman
- Kong Insomnia




### Postman

大名鼎鼎的Postman, 越做越越强大，但也越来越臃肿。

- 桌面版： https://www.postman.com/downloads/ 
- Web版：https://www.postman.com/downloads/

> 强制登录才能使用，让人讨厌的一点。

> 特色：可以生成cURL命令参数，方便在Shell使用

### Insomnia

Api网关商业公司`Kong` 旗下的一款调试工具。

https://github.com/Kong/insomnia


### 对比

`Postman`功能更强大，但它的桌面版更臃肿，界面使用起来有时很卡。并强制登录才能使用。

`Insomnia` 功能特色少一些，但更轻量。不需要登录也可以使用。


