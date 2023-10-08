---
# 这是文章的标题
title: Web服务器:Tomcat学习系列：Tomcat默认端口
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 59
# 设置作者
# 设置写作时间
date: 2023-10-08
# 一个页面可以有多个分类
category:
  - DevOps
  - 工具
  - Web
# 一个页面可以有多个标签
tag:
  - DevOps
  - 工具
  - Tomcat
  - java


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

`Tomcat`, 广泛使用Web服务器，java容器。了解它的常用端口。



## 正文

从 tomcat 的配置文件中可以看到默认开了三个端口，分别是：8080（8443）、8009、8005。

### 8080（8443）端口

```xml
<Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443"/>
```

最熟悉的一个， Connector 用于监听浏览器发送的请求. 设置成80 后可以直接使用 http://localhost 访问。

`8080`,http 协议，其中 redirectPort 表示如果发送的是 https 请求，就将请求转发到 8443 端口。

`8443`` 是默认的 https 监听端口。
默认未开启，如果要开启由于 tomcat 不自带证书所以除了取消注释之外，还要自己生成证书并在 中指定，例如：

```xml
<Connector
           protocol="org.apache.coyote.http11.Http11NioProtocol"
           port="8443" maxThreads="200"
           scheme="https" secure="true" SSLEnabled="true"
           keystoreFile="${user.home}/.keystore" keystorePass="changeit"
           clientAuth="false" sslProtocol="TLS"/>

```

### 8005端口

```xml
<Server port="8005" shutdown="SHUTDOWN">
```

tomcat 监听的关闭端口，就是说 这个端口负责监听关闭 Tomcat 的请求
当执行 shutdown.sh 关闭 tomcat 时就是连接 8005 端口执行 “SHUTDOWN” 命令；
由此，我们直接用 telnet 向 8005 端口执行 “SHUTDOWN”（要大写，小写没用）来关闭 tomcat，这也是正统的关闭方式，如果这个端口没被监听，那么 sh 脚本就无效了。

:::warning 注意

这可能是个安全隐患，生产环境最好注释关闭该端口。
:::


### 8009端口

```xml
 <Connector port="8009" protocol="AJP/1.3" redirectPort="8443"/>
```

Nginx、Apache 等反向代理 tomcat 时就可以使用使用 ajp 协议反向代理到该端口。
虽然我们经常都是使用 http 反向代理到 8080 端口，但由于 ajp 建立 tcp 连接后一般长时间保持，从而减少了 http 反复进行 tcp 连接和断开的开销，所以反向代理中 ajp 是比 http 高效的。