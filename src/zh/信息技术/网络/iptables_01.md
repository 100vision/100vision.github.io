---
# 这是文章的标题
title: iptables表和链的浅显理解
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 18
# 设置作者
# 设置写作时间
date: 2023-04-20
# 一个页面可以有多个分类
category:
  - networking
# 一个页面可以有多个标签
tag:
  - networking
  - 防火墙
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 无版权
---




## iptables的常用表


> 表是iptables规则的集合，表中包含了若干个链.

- Filter表 (iptables默认表，用来过滤网络包)
- NAT表 （用来做NAT等）

## 链

以下都是个人粗解。

- INPUT (用在filter表，用来防火墙过滤进入主机防火墙的包)
- OUTPUT  （用在filter表和NAT表，用来控制离开主机的数据包）
- PREROUTING 
- POSTROUTING
- FORWARD 


### PREROUTING
多用在nat表，PREROUTING链用于处理数据包到达本地主机，一般是目的地址转换DNAT和目的端口转发，不会路由选择（需要Forward链），实现服务器映射和对外发布

举例：
```bash
iptables -t nat -A PREROUTING -d 203.0.113.10 -j DNAT --to-destination 192.168.1.2

```

目的端口转发：

```bash
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.0.100:80

```

### POSTROUTING

用在nat表，用来做离开主机后的数据包的网络地址转换和端口转发，常和SNAT搭配使用。POSTROUTING链是在数据包离开本地路由器之前进行修改的最后一个机会。因此，使用POSTROUTING链进行SNAT会使源IP地址在发往目的地之前发生变化。这通常是一种将内部站点连接到互联网的常见方法。

举例：

``` bash
iptables -t nat -A POSTROUTING -o eth0 -j SNAT --to-source <router_public_ip>
```




### FORWARD链
FORWARD链用于处理网络上**流经本机**的数据包，所以适用于将其他网络中的流量转发到其他网络或本地主机上。

一般做法是允许所有数据包流经本机转发：
```bash
iptables -A FORWARD -j ACCEPT
```