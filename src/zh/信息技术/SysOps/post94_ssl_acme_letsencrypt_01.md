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

- Linux平台下，有官方的`acme.sh` [^2] 和`certbot`, 详见:[Certbot Instructions](https://certbot.eff.org/)。

- 更多客户端可以参考：[more client options](https://letsencrypt.org/docs/client-options/)



[^1]: 详细使用案例可以参考 [Install FREE Let’s Encrypt certificate in Exchange Server](https://www.alitajran.com/install-free-lets-encrypt-certificate-in-exchange-server/)



[^2]: 大致步骤：


### ACME Challenge 介绍

> 要先了解一下`ACME Challenge`。Let's Encrypt仅给域名所有者颁发免费证书，因此申请证书前我们需要通过域名所有者身份验证。Let's Encrypt验证方法就是`Challenge`。了解更多 https://letsencrypt.org/docs/challenge-types/

Challenge大概有这两种：
- HTTP-01 challenge
- DNS-01 challenge

**HTTP challenge利弊**

利：配置比较容易，还可以支持自动续订。

弊：需要在防火墙上长期开放 `80` 端口。如果你无法控制防火墙或你的ISP因为安全原因不开放80，就无法使用这个HTTP challenge。

**DNS challenge 利弊**

利：不需要开放80端口。如果DNS服务商支持api访问，可以很方便自动续订证书；还支持通配符证书。

弊：如果DNS服务商不支持API访问，无实现自动续订证书。每次续订证书需要手动，比较麻烦。


**根据自己情况选择**

本例使用 `HTTP Challene`。 如果选择DNS chalenge, 可以先查看一下自己的DNS服务商在受支持列表中：

https://github.com/acmesh-official/acme.sh/wiki/dnsapi


### ACME.sh的使用模式

>ACME.sh支持很多安装和使用模式。根据自己情况选择模式，不同模式则证书申请、安装选项都不同。

- webroot模式
- standalone模式
- nginx模式
- 其他

**根据自己情况选择模式**

https://github.com/acmesh-official/acme.sh/wiki/How-to-issue-a-cert

本例使用了`webroot`模式。

### Acme.sh 和 webroot模式

以域名`proxy.example.cn`举例：

:::note
以下操作建议root权限
:::



- 网络防火墙上开启80端口映射。

端口服务器映射按照你的防火墙配置，步骤略。

:::tip 为什么要在防火墙上开放80端口
Let’s Encrypt解释说：Let’s Encrypt gives a token to your ACME client, and your ACME client puts a file on your web server at http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>. That file contains the token, plus a thumbprint of your account key. Once your ACME client tells Let’s Encrypt that the file is ready, Let’s Encrypt tries retrieving it (potentially multiple times from multiple vantage points). If our validation checks get the right responses from your web server, the validation is considered successful and you can go on to issue your certificate. If the validation checks fail, you’ll have to try again with a new certificate.
:::



:::warning
80端口要保持一直开放。从首次申请到后期每次自动续订。关于保持80端口常开，很多人认为不安全，因此Let's Encrypt写了一篇文章特别解释了为什么防火墙保持80端口不会带来安全风险。https://letsencrypt.org/docs/allow-port-80/  但要注意把http重定向80到443解决网络攻击面。
:::

- 创建主目录
  
```bash
mkdir -p /var/www/html/proxy.example.cn/
```

- 修改现有nginx配置，在现有配置外添加一个的`HTTP challenge` 目录。

主要是`root`指令指定一个webroot站点目录，如下：
  
```
server {

        listen       80;
        server_name proxy.example.cn;
        location ^~ /.well-known/acme-challenge/ {
	        default_type "text/plain";
	        allow all;
	        root /var/www/html/proxy.example.cn/;
  		 }
		location /{
	   		rewrite ^(.*)$  https://$host$1 permanent;
	   	}
}

```

- 开始申请 Request the cert

```shell
acme.sh --issue -d proxy.example.cn -w /var/www/html/proxy.example.cn/
```

如果申请成功，则输出一下类似信息：

```

[Mon Jun  3 16:50:13 CST 2024] Your cert is in: /root/.acme.sh/proxy.example.cn_ecc/proxy.example.cn.cer
[Mon Jun  3 16:50:13 CST 2024] Your cert key is in: /root/.acme.sh/proxy.example.cn_ecc/proxy.example.cn.key
[Mon Jun  3 16:50:13 CST 2024] The intermediate CA cert is in: /root/.acme.sh/proxy.example.cn_ecc/ca.cer
[Mon Jun  3 16:50:13 CST 2024] And the full chain certs is there: /root/.acme.sh/proxy.example.cn_ecc/fullchain.cer

```

- 安装和拷贝证书。必须使用amce的命令。否则不会自动续订。


```sh
acme.sh --install-cert -d proxy.example.cn \
--cert-file      /usr/local/openresty/nginx/cert/certstore/proxy.example.cn.cer  \
--key-file       /usr/local/openresty/nginx/cert/certstore/proxy.example.cn.key  \
--fullchain-file /usr/local/openresty/nginx/cert/certstore/fullchain.cer \
--reloadcmd     "/path_to_nginx/nginx -s reload"

```

安装成功后，输出一下类似信息：
```
[Mon Jun  3 17:13:52 CST 2024] The domain 'proxy.example.cn' seems to have a ECC cert already, lets use ecc cert.
[Mon Jun  3 17:13:52 CST 2024] Installing cert to: /usr/local/openresty/nginx/cert/certstore/proxy.example.cn.cer
[Mon Jun  3 17:13:52 CST 2024] Installing key to: /usr/local/openresty/nginx/cert//certstore/proxy.example.cn.key
[Mon Jun  3 17:13:52 CST 2024] Installing full chain to: /usr/local/openresty/nginx/cert/certstore/fullchain.cer
[Mon Jun  3 17:13:52 CST 2024] Run reload cmd: nginx -s reload
[Mon Jun  3 17:13:52 CST 2024] Reload success
```
- 修改nginx配置，把证书指向到以上证书路径。
```
    ssl_certificate   /usr/local/openresty/nginx/cert/certstore/proxy.example.cn.cer;
    ssl_certificate_key  /usr/local/openresty/nginx/cert/certstore/proxy.example.cn.cer.key;
```
- 然后`nginx -s reload`
- 验证证书是否有效。
- 检查cron。
  这个crob job主要是实现自动续订。auto renewal is scheduled to run by a cron job from the install process
check and confirm that the cron job is already there.

```shell
crontab -l
```




### 配置邮件通知

> 通过邮件跟踪证书是否续订成功

- 配置smtp参数。`vi /root/.bashrc`
```

# Email configuration for acme email notifications
export SMTP_FROM="waf@example.com"
export SMTP_TO="it-sysops@example.com"
export SMTP_HOST="mailserver.example.com"
export SMTP_SECURE="none"
export SMTP_BIN="/usr/bin/python2"
```

- 开启邮件通知
```sh
acme.sh --set-notify --notify-hook smtp --notify-level 2
```

- 检查是否收到测试邮件。

### 关于证书续订

- 如果使用了自动续订是通过cron定时任务完成，如果续订成功，则会手动邮件内容类似：

`Good, the cert is renewed.`


- 默认证书每`60`天续订一次，即剩余`30`天会通过cron进行自动续订。

- 查看和验证当前证书（续订）信息：
```
acme.sh --list
```