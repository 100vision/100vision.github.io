---
# This is the title of the article
title: frp内网穿透
# This is the icon of the page
icon: page
# This control sidebar order
order: 1
# Set author
author: tlin82
# Set writing time
date: 2023-02-10
# A page can have multiple categories
category:
  - networking
# A page can have multiple tags
tag:
  - networking
  - ddns
# this page is sticky in article list
sticky: false
# this page will appear in starred articles
star: true
# You can customize footer content
footer: 
# You can customize copyright content
copyright: No Copyright
---



## 什么是内网穿透

简单地说，frp就是一个反向代理软件，它体积轻量但功能很强大，可以使处于内网或防火墙后的设备对外界提供服务，它支持HTTP、TCP、UDP等众多协议

### 使用

> bind_port”表示用于客户端和服务端连接的端口，这个端口号我们之后在配置客户端的时候要用到。
“dashboard_port”是服务端仪表板的端口，若使用7500端口，在配置完成服务启动后可以通过浏览器访问 x.x.x.x:7500 （其中x.x.x.x为VPS的IP）查看frp服务运行信息。
“token”是用于客户端和服务端连接的口令，请自行设置并记录，稍后会用到。
“dashboard_user”和“dashboard_pwd”表示打开仪表板页面登录的用户名和密码，自行设置即可。
“vhost_http_port”和“vhost_https_port”用于反向代理HTTP主机时使用，本文不涉及HTTP协议，因而照抄或者删除这两条均可。
