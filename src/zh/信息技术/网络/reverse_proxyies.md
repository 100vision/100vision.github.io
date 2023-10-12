---
# 这是文章的标题
title: Networking:内网穿透
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 2
# 设置作者
# 设置写作时间
date: 2023-02-13
# 一个页面可以有多个分类
category:
  - networking
# 一个页面可以有多个标签
tag:
  - networking
  - vpn
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




## 什么是内网穿透

> 内网穿透，指的是将内网端口暴露到公网。由于防火墙的限制，或者普遍的 NAT 宽带接入方式，大多用户没有属于自己的公网 IP，因此其它用户无法访问其设备上对外开放的服务（例如 Web 服务器，或者比较常见的案例是 Minecraft 服务器）。过去有许多常见的内网穿透解决方案（例如花生壳、Ngrok、frp 及一系列衍生自 frp 的服务等），而 Cloudflare Tunnel 的免费开放，又为我们提供了一种看起来不错的新选择。内网穿透，指的是将内网端口暴露到公网。


## 方法和工具

主要有这么几种。

- CloudFlare Tunnel
- FRP
- Zerotier


## Cloudflare Tunnel

::: tip 先决条件
需要把DNS域名托管在CloudFalre
:::

:::tip Updates

(2023/10/12) Cloudflare Tunnel默认使用QUIC协议，在墙内经常连不上Cloudflare边缘服务器网络。可以尝试改成http2或是ipv6。具体参考：
https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/local-management/arguments/

- 以下是使用http2
/usr/bin/cloudflared --protocol http2 --no-autoupdate tunnel run --token ***

- 以下是使用ipv6
docker run -d --network host --name=cloudflared --restart unless-stopped cloudflare/cloudflared:latest tunnel --edge-ip-version=6 --protocol=auto --region=us --no-autoupdate run --token ********************
:::

**大致步骤**

- 申请免费的CloudFlare账户
- 内网服务器要安装cloudflared软件
- 创建CloudFlare Tunnel。

创建Tunnel有2种方式：

- remotely-managed tunnel。可以Cloudflare Tunnel新建向导生成的配置命令则是remoted-managed
- local-managed tunnel. 需要在本地安装cloudflare tunnel代理，登录然后新建tunnel.






## frp

>frp 是一个开源项目，专注于内网穿透的高性能的反向代理应用，支持 TCP、UDP、HTTP、HTTPS 等多种协议。可以将内网服务以安全、便捷的方式通过具有公网 IP 节点的中转暴露到公网。

::: tip 前提条件
需要一台ECS云主机，有公网IP
:::



**Github项目**

https://github.com/fatedier/frp/blob/dev/README_zh.md




**文档位置**

https://gofrp.org/docs/

