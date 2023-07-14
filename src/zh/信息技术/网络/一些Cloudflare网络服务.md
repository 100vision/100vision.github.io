---
# 这是文章的标题
title: 使用一些Cloudflare网络服务
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 14
# 设置作者
# 设置写作时间
date: 2023-04-4
# 一个页面可以有多个分类
category:
  - 网络
  - IT
# 一个页面可以有多个标签
tag:
  - 网络
  - Cloudflare

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 无版权
---




## Cloudflare Network Services

- My Cloudflare Email Alias
- My Cloudflare DNS Domain Naming Service
- My Cloudflare Worker
- My Cloudflare Tunnel

### Domain Naming service

`solex-inc.com` 的DNS解析托管在 Cloudflare.com。域名主要主机列表有：
- help.solex-inc.com  Cloudflare Worker 代理主机。代理OpenAI API，这样可以实现直连。
- manager.solex-inc.com CentOS Cockpit Web控制台，j4125小主机docker托管。
- blog.solex-inc.com 本博客使用的域名，使用Github托管内容.
- vault.solex-com.com Bitwarden密码管理服务。j4125小主机docker托管。



### Cloudflare Email Routing

>Easily create addresses and route emails for free
Create custom email addresses for your domain. Add an optional catch-all for any address that has not been configured. Route emails to your preferred inbox. All without ever exposing your primary email address.

邮件别名`hayashidesu@solex-inc.com` 或 `365@solex-inc.com`到我的Gmail个人邮。这样，发送到`hayashidesu@solex-inc.com`的邮件，在Gmail里就能看到。好处有：

- 防止暴露主邮箱；
- 防止有些免费网络服务不接受免费邮箱注册，例如Gmail。


### Cloudflare Worker

通过Cloudflare worker（Server-Less) 来实现一个OpenAI API的代理。

这样国内可以通过`help.solex-inc.com`来访问openAI，而不是直接访问`chat.openai.com`。

**前提是**，客户端可以支持添加和指定API host.


### Cloudflare Tunnel

用来做家庭内网服务穿透。这样，在外网也能访问家里的一些服务。


## 感谢

感谢Cloudflare提供的这些免费良心服务。