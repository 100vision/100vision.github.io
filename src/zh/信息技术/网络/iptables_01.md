---
# 这是文章的标题
title: iptables浅显理解: (一) ：表和链
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


:::tip 开始学习
- 为什么学iptables。个人觉得，iptables的学习挺重要的，应用也很广，例如k8s和vpn底层都使用了iptables做网络基础。

- 怎么学: 重点和难点个人觉得就是表和链的使用。什么时候用什么表，用什么链。
:::

## iptables的常用表


> 表是iptables规则的集合，表中包含了若干个链.

- filter表 (iptables默认表，用来过滤网络包)
- nat表 （该表用于处理网络地址转换和端口转发等操作）
- mangle表(较少用，允许管理员修改数据包的TTL等)

## 链

以下都是个人粗解。

- INPUT (用在filter表，用来防火墙过滤进入主机防火墙的包)
- OUTPUT  （用在filter表和NAT表，用来控制离开主机的数据包）
- PREROUTING 
- POSTROUTING
- FORWARD 


### PREROUTING 链
多用在nat表，PREROUTING链用于处理数据包到达本地主机，一般是目的地址转换DNAT和目的端口转发，不会路由选择（需要Forward链），实现服务器映射和对外发布

举例：
```bash
iptables -t nat -A PREROUTING -d 203.0.113.10 -j DNAT --to-destination 192.168.1.2

```

目的端口转发：

```bash
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.0.100:80

```

### POSTROUTING 链

用在nat表，用来做离开主机后的数据包的网络地址转换和端口转发，常和SNAT搭配使用。POSTROUTING链是在数据包离开本地路由器之前进行修改的最后一个机会。因此，使用POSTROUTING链进行SNAT会使源IP地址在发往目的地之前发生变化。这通常是一种将内部站点连接到互联网的常见方法。

举例：

``` bash
iptables -t nat -A POSTROUTING -o eth0 -j SNAT --to-source <router_public_ip>
```

::: tip 关于MASQUERADE
地址伪装，在iptables中有着和SNAT相近的效果，但也有一些区别：
SNAT，DNAT，MASQUERADE都是NAT，`MASQUERADE是SNAT的一个特例`。SNAT是指在数据包从网卡发送出去的时候，把数据包中的源地址部分替换为指定的IP，这样，接收方就认为数据包的来源是被替换的那个IP的主机。MASQUERADE是用发送数据的网卡上的IP来替换源IP，因此，**对于那些IP不固定的场合，比如拨号网络或者通过dhcp分配IP的情况下，就得用MASQUERADE**
:::

### FORWARD 链
FORWARD链用于处理网络上**流经本机**的数据包，所以适用于将其他网络中的流量转发到其他网络或本地主机上。

一般做法是允许所有数据包流经本机转发：
```bash
iptables -A FORWARD -j ACCEPT
```

## 链表执行顺序

### iptables网关接收过程

1. PREROUTING
2. <路由选择>，如果时数据包目的地址时本机时，进入INPUT链；如果是他机时，进入FORWARD链；
- 2.1 INPUT链
- 2.2 FORWARD链


### 发送过程

1. 路由选择。目的地址时本机的，进入OUTPUT链；如果时他机，进入FORWARD链；
2. 
- 目的地址时本机的走OUTPUT链；
- 目的地址非本机的走FORWARD链
3. POSTROUTING