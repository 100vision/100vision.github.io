---
# 这是文章的标题
title: 基础服务：DNS:解决DNS污染问题
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 46
# 设置作者
# 设置写作时间
date: 2023-07-14
# 一个页面可以有多个分类
category:
  - networking
  - DNS
# 一个页面可以有多个标签
tag:
  - networking
  - dns
  - dnsmasq
  - doh
  - solution
  - dns污染

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

国内环境下，除了不能直连海外服务器问题外，还有DNS污染问题让人恼火，因此需要了解一下怎么解决。



## 什么是DNS污染

> 又称DNS“投毒”,执行DNS劫持攻击导致下游DNS服务器缓存了错误记录的现象。详见[wiki](https://zh.wikipedia.org/zh-cn/%E5%9F%9F%E5%90%8D%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%BC%93%E5%AD%98%E6%B1%A1%E6%9F%93)



## 正文

> 通过使用dnsmasq和DOH服务器解决DNS污染问题。

### 实现原理：

- 主要使用加密的DNS查询。普通DNS流量因为都是明文，没有加密才会被导致篡改，给DNS流量加密，套一层解决。加密方法主要有这么几种。

 `DOH (DNS Over HTTPS)`， `DOT (DNS Over TLS)`,`DNS Encrypt`

 - 配合使用DNS缓存服务器。加密的DNS查询消耗大，增加DNS查询的延迟，因此需要使用缓存服务器加快查询。

### 具体实现

- 在本地部署一台DNS缓存服务器，然后配置它的上游DNS服务器通讯加密。实现方法可以是DOH或是DNS Encrypt。
- 本地其他主机的DNS服务器指向到本地DNSMasq缓存服务器。



## 方案选项1：配置本地DNS缓存服务器 + DOH

### 步骤1：选择DOH服务器作为上游DNS服务器

当前使用比较多的是DOH，比较著名的支持DOH的公网DNS服务器有：

- Cloudflare的`1.1.1.1`
- Google的 `8.8.8.8`

> 更多可以查询这里 https://github.com/dnscrypt/dnscrypt-resolvers 

### 步骤2：部署本地DNS缓存服务器

本地DNS缓存服务器，它扮演DOH客户端，负责转发本地的DNS查询给外部的DOH服务器，需要本地部署。 可以使用支持DOH的客户端软件部署本地DNS缓存服务器。比较著名支持DOH的DNS客户端软件有：

- `dnsmasq`,确保您的 Dnsmasq 版本是 2.83 或以上
- `dnscrypt-proxy`

**配置参考**

```
# /etc/dnsmasq.conf
server=https://dns.example.com/dns-query
server=https://dns2.example.com/dns-query
```
-  [dnsmasq + Cloudflare DoH 自建 DNS](https://page.codespaper.com/2019/dnsmasq-cloudflare-doh/)
- [Connect to 1.1.1.1 using DoH client](shttps://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/dns-over-https-client/)


### 步骤3：使用本地缓存服务器dnsmasq

- 如果是dnsmasq和本机一台主机使用，可以修改`/etc/resolv.conf`。删除所有`nameserver`，添加一行`nameserver 127.0.0.1` 即可。
- 如果是供内网所有主机使用，修改内网主机的DNS服务器指向到dnsmasq。



## 方案选项2：使用DNS Encrypt

可以参考 https://github.com/DNSCrypt/dnscrypt-proxy 
