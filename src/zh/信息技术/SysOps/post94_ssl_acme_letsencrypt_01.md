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


### ACME.sh and Nginx Reverse Proxy 

以`proxy.example.cn`举例：

:::note
以下操作需要root权限
:::


- 创建主目录
  
```bash
mkdir -p /var/www/html/proxy.example.cn/
```

- 修改现有nginx配置，主要是开启http 80以支持acme.sh的`http validation`

主要是`root`指令指定一个站点目录，如下：
  
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


- 网络防火墙上开启80端口映射。

http validation需要验证你是域名所有者，这个验证过程是通过发送http challenge进来，否则无法申请到证书。步骤略

:::warning
申请成功后，可以关闭，不再需要保持开启。
:::



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

- 最后，在网络防火墙上关闭80端口映射。


### 配置邮件通知

> 通过邮件通知跟踪证书是否续订成功

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
