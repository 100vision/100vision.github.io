---
# 这是文章的标题
title: SSL：Let's Encrypt免费证书 和ACME客户端介绍
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 94
# 设置作者
# 设置写作时间
date: 2024-06-03
# 一个页面可以有多个分类
category:
  - SSL
  - Web安全
  - ExchangeServer
  - Windows
  - Linux
  

# 一个页面可以有多个标签
tag:
  - LetsEncrypt
  - 免费证书
  - ACME




  



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

## 前言

从前使用的免费SSL证书，开始从1年免费变成了3个月，不再降了。开始考虑使用`Let's Encrypt`免费证书，结合它的客户端实现自动续订。

## 正文

### Let's Encrypt介绍

>  Let's Encrypt 是免费、开放和自动化的证书颁发机构。由非盈利组织互联网安全研究小组（ISRG）运营。这里访问 [Let's Encrypt官网](https://letsencrypt.org/zh-cn/about/).


**是否安全**

- 很多大厂，例如`Cloudflare`都在使用。个人网站使用Let's Encrypt免费证书还是挺安全的。
- 小企业不想使用昂贵的商业收费的ssl证书也可以考虑。

### ACME

`ACME` 是 `let's Encrypt`证书管理实现协议。实现ACME协议的客户端可以实现证书申请、续订等。


### ACME客户端

实现ACME协议的客户端，有官方版本，也有第三方。

- Windows平台的有 `win-acme`, 官网 [win-acme](https://www.win-acme.com),可以支持IIS, Exchange服务器证书。详细请参考: [Example #1: Microsoft Exchange](https://www.win-acme.com/manual/advanced-use/examples/exchange) [^1], [Example 2#: IIS](https://www.shiyanit.com/news-technical/136.html)



```
wacs.exe --source manual 
--host mail.example.com,webmail.example.com,autodiscover.example.com 
--certificatestore My 
--acl-fullcontrol "network service,administrators" --installation iis,script 
--installationsiteid 1 
--script "./Scripts/ImportExchange.v2.ps1" --scriptparameters "'{CertThumbprint}' 'IIS,SMTP,IMAP' 1 '{CacheFile}' '{CachePassword}' '{CertFriendlyName}'"
```

- Windows平台的还有Powershell客户端实现，详见 [ACMESharp](https://github.com/ebekker/ACMESharp)。不仅是Powershell实现，也是C#实现库。

- Linux平台下，有官方的`certbot`, 详见:[Certbot Instructions](https://certbot.eff.org/)。

- 更多客户端可以参考：[more client options](https://letsencrypt.org/docs/client-options/)



[^1]: 详细使用案例可以参考 [Install FREE Let’s Encrypt certificate in Exchange Server](https://www.alitajran.com/install-free-lets-encrypt-certificate-in-exchange-server/)