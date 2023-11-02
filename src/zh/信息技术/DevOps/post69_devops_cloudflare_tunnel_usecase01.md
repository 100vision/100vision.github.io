---
# 这是文章的标题
title: 基础架构:Clouldflare：使用Cloudflared Tunnel分布式部署就近回源
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 70
# 设置作者
# 设置写作时间
date: 2023-11-02
# 一个页面可以有多个分类
category:
  - 原创
  - 基础架构
  - Cloudflare
# 一个页面可以有多个标签
tag:
  - Cloudflare
  - 分布式文件系统
  - 回源
  - 全球部署
  - Cloudflare Tunnel
  - devops



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

就上次使用介绍使用 [标题：Cloudflare Tunnel 实现穿透Microsoft Remote Desktop](../网络/post64_net_cloudflare_rdp_01.md)，又从[Nova Kwok's Awesome Blog：分布式部署 Cloudflared 让访客就近回源，进一步提升访问速度](https://nova.moe/cloudflared-distributed/) 了解到Cloudflare Tunnel可以做站点就近回源。

站点就近回源是很多CDN厂商的商用主打产品技术，加速网站静态资源，让访问用户就近下载，Cloudflare这边却是可以免费使用！ 

> P.S. Cloudflare真是大善人，它的其他产品Cloudflare Worker，还有Cloudflare R2对象存储都是很慷慨让用户撸。



## 正文

通过Cloudflare Tunnel就近回源实现很简单，就是各地多台主机只要使用同一个Cloudflare Tunnel和Token即可。详细步骤可以参考以上博客链接文章。


### 就近回源实现场景

- 场景1：不用地区的用户访问同一个域名，但访客访问不同内容。

例如www.example.com可以看到不同的内容；因为各主机后面是不同的服务实例，例如中国用户就近访问的中国服务实例，则看到是中文内容；美国用户就近访问的是美国服务实例，可以是英文内容；



- 场景2：不用地区的用户访问同一个域名，访客访问相同内容，但内容下载源不同，加快访问速度提高用户体验。

例如中国用户就近访问的中国服务实例，则从中国服务器下载；例如美国用户就近访问的美国服务实例，则从美国服务器下载；




## 参考

[Nova Kwok's Awesome Blog：分布式部署 Cloudflared 让访客就近回源，进一步提升访问速度](https://nova.moe/cloudflared-distributed/)