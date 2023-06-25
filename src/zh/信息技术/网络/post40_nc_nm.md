---
# 这是文章的标题
title: 网络分析：网络抓包工具介绍
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 40
# 设置作者
# 设置写作时间
date: 2023-06-25
# 一个页面可以有多个分类
category:
  - networking
# 一个页面可以有多个标签
tag:
  - networking
  - sniffer
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
---

:::tip 
方便自己快速上手使用，备查
:::

## 工具

工具选项：
- 使用netsh trace命令行 (Windows)
- Network Monitor 3.x  (Windows)
- WireShark （Windows /Linux)
- tcpdump (Linux) 

### 使用Netsh Trace

> Windwos原生自带命令抓包，不需要安装任意软件，局限是只有抓包功能，没有分析功能,如果需要分析，需要导出到其他工具，例如Network monitor 3.x或Wireshak。

> 比较合适不想或不能安装额外软件的环境。

- 使用

1. 启动管理员命令行,启动：
```
C:> netsh trace start persistent=yes capture=yes tracefile=c:\temp\nettrace-boot.etl
```
2. 停止则执行：
```
C:\>netsh trace stop
```

3. 最后把ETL文件和CAB文件拷贝出来，使用其他分析工具分析，例如Network Monitor 3.x
如果是拿到Wireshark下，需要把ETL转换成pcag，转换工具： [ETL2PCAG](https://github.com/microsoft/etl2pcapng)


### 使用Network Monitor 3.x
（无)

### 使用Wireshark
(无)
### 使用Tcpdump

>来源：[米开朗基杨 Tcpdump 示例教程](https://icloudnative.io/posts/tcpdump-examples/)

**基础使用常用参数**

```
$ tcpdump -i eth0 -nn -s0 -v port 80 -w output.pcag -A 
```
- -i : 选择要捕获的接口，通常是以太网卡或无线网卡，也可以是 vlan 或其他特殊接口。如果该系统上只有一个网络接口，则无需指定。

- -nn : 单个 n 表示不解析域名，直接显示 IP；两个 n 表示不解析域名和端口。这样不仅方便查看 IP 和端口号，而且在抓取大量数据时非常高效，因为域名解析会降低抓取速度。

- -s0 : tcpdump 默认只会截取前 96 字节的内容，要想截取所有的报文内容，可以使用 -s number， number 就是你要截取的报文字节数，如果是 0 的话，表示截取报文全部内容。

- -v : 使用 -v，-vv 和 -vvv 来显示更多的详细信息，通常会显示更多与特定协议相关的信息。

- -A 表示使用 ASCII 字符串打印报文的全部数据，这样可以使读取更加简单，方便使用 grep 等工具解析输出内容。

- host 抓特定主机（目的和源）

- port 指定端口

- -w 写入输出到文件

- -l 行缓冲模式。把实时输出通过管道给前天工具，例如grep

**高级使用举例**

- 提取HTTP用户代理

```
$ tcpdump -nn -A -s1500 -l | grep "User-Agent:"
```
- 提取 HTTP POST 请求中的密码

```
$ tcpdump -s 0 -A -n -l | egrep -i "POST /|pwd=|passwd=|password=|Host:"
```

- 提取Cookies
```
$ tcpdump -nn -A -s0 -l | egrep -i 'Set-Cookie|Host:|Cookie:'
```


- 抓取 SMTP/POP3 协议的邮件

```
$ tcpdump -nn -l port 25 | grep -i 'MAIL FROM\|RCPT TO'
```
