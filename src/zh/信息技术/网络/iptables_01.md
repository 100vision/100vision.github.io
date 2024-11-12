---
# 这是文章的标题
title: iptables学习(一) ：表和链
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

# iptables防火墙: 表和链的使用

Created by: tx lin
Created time: November 12, 2024 11:25 AM
Tags: iptables, 防火墙

## 总览

**4表5链**

表： 觉得网络包的处理方式。例如是NAT、过滤、还是修改网络包；

**链：** 决定处理哪些网络包和处理动作。例如网络包目的地是防火墙，还是其他主机。

## 一、表

---

### 表

表有4种：

- Filter。 是所有过滤类型的集合（iptable的默认表）
- NAT  是所有NAT类的集合
- Mangle  是所有修改包的集合。根据规则修改数据包的 IP 头部的一些字段，如 TTL 值、TOS 值等。这样可以影响数据包在网络中的转发方式和处理方式。mangle 表的一个常见应用场景是实现策略路由，即根据不同的数据包选择不同的路由表进行转发。例如，如果我们想要让不同端口的数据包走不同的网关出去，我们可以使用 mangle 表来给数据包打上标记，然后根据标记来指定路由表
- RAW

### **表的处理优先级**

表处理的优先级是：

RAW>Mangle>NAT>Filter

## 二、链

---

决定处理哪些网络包和处理动作

链有：

Prerouting、Postrouting、Input、Output、Forward

### PreRouting 和 PostRouting

主要用在NAT表，负责网络包地址转换的`SNAT`源地址转换和`DNAT`目标地址转换

- PreRouting处理到达防火墙的网络包；
- PostRouting处理离开的网络包。

::: tip 关于MASQUERADE
地址伪装，在iptables中有着和SNAT相近的效果，但也有一些区别：
SNAT，DNAT，MASQUERADE都是NAT，`MASQUERADE是SNAT的一个特例`。SNAT是指在数据包从网卡发送出去的时候，把数据包中的源地址部分替换为指定的IP，这样，接收方就认为数据包的来源是被替换的那个IP的主机。MASQUERADE是用发送数据的网卡上的IP来替换源IP，因此，**对于那些IP不固定的场合，比如拨号网络或者通过dhcp分配IP的情况下，就得用MASQUERADE**
:::

### Input链

主要是在Filter表。过滤目的地址是防火墙本机的网络包；

### Output链

- 可用在Filter表。过滤源地址是防火墙本身的网络包；
- 可用在Prerouting和Postrouting, 地址转换源地址是防火墙本身的网络包；
- 可用在Mangle表，修改源地址是防火墙本身的网络包

### Forward链

- 可用在Filter表。则过滤流经防火墙的网络包，例如DNAT流量。即源地址是其他主机，目标地址是其他主机；

### 链的选择和使用

在进行包过滤和拦截时要选择正确的链，否则不生效。

**到达**

到达关键点在于网络包的目的地址。

- 如果网络包的目的地址是防火墙本机网络接口，在选择`Input`。
- 如果网络包的目的地址是其他主机，则选择`Forward`；
- 如果网络包到达之前要修改目标地址，则加走 `PreRouting`

**离开**

离开选择链的关键点在于网络包的源地址

- 如果网络包的源地址是防火墙网络接口，则选择`Output`；
- 如果网络包的源地址是其他主机，则选择`Forward`；
- 如果网络包离开后，要更改源地址，则可再使用 `PostRouting`

## 三、使用举例

---

也是我一直的疑惑

**问：我的DNAT是通过iptables实现的，映射到192.168.10.1 这台web服务器的80端口。这时我想要阻止外部公共IP地址 2.2.2.2 访问这台web服务器需要在哪台主机上设置阻止规则。**

答：DNAT主机（iptables) 执行了DNAT规则，将外部流量转发到 `192.168.10.1` 的80端口。这就在DNAT主机上需要使用`forward链` 在`FILTER表` 过滤阻止流量转发；规则如下：

```
# 在执行DNAT规则的主机上执行以下命令
iptables -I FORWARD -s 2.2.2.2 -d 192.168.10.1 -p tcp --dport 80 -j DROP
```

**问：可以在192.168.10.1这台web服务器设置这个阻止规则吗？**

答：如果在192.168.10.1 上使用iptables的INPUT上添加规则，阻止外部2.2.2.2访问，

```
# 在Web服务器上执行以下命令
iptables -I INPUT -s 2.2.2.2 -p tcp --dport 80 -j DROP
```

`会不奏效`。因为：

- 如果流量是通过DNAT规则从外部网络转发到Web服务器的，那么这些流量在到达Web服务器时，源IP地址将是执行DNAT规则的主机的IP地址，而不是外部客户端的IP地址。
- 因此，使用 `INPUT` 链阻止特定IP地址可能不会生效，因为流量在到达Web服务器时，源IP地址已经被转换。

## 4、扩展：Mangle表和策略路由

---

mangle 表是 iptables 中用于修改数据包的标记的表，它可以在数据包经过路由表之前，根据规则修改数据包的 IP 头部的一些字段，如 TTL 值、TOS 值等。这样可以影响数据包在网络中的转发方式和处理方式。mangle 表包含五个链：PREROUTING、POSTROUTING、INPUT、OUTPUT 和 FORWARD。

mangle 表的优先级仅次于 raw 表，它会在 nat 表和 filter 表之前执行。

mangle 表的一个常见应用场景是实现策略路由，即根据不同的数据包选择不同的路由表进行转发。例如，如果我们想要让不同端口的数据包走不同的网关出去，我们可以使用 mangle 表来给数据包打上标记，然后根据标记来指定路由表。具体的步骤如下：

- 首先，我们需要定义两个路由表，比如 10 和 20，并且分别添加默认路由到不同的网关。假设我们有两个网卡 eth1 和 eth2，分别连接到网关 202.106.x.x 和 211.108.x.x，我们可以使用 ip 命令来添加路由表：

```bash
ip route add default via 202.106.x.x dev eth1 table 10
ip route add default via 211.108.x.x dev eth2 table 20

```

- 然后，我们需要使用 mangle 表来给不同端口的数据包打上标记，比如我们想要让 80 和 443 端口的数据包走 eth1 网卡，而 20 和 21 端口的数据包走 eth2 网卡，我们可以使用 iptables 命令来设置 mangle 表：

```bash
iptables -t mangle -A PREROUTING -i eth0 -p tcp --dport 80:443 -j MARK --set-mark 1
iptables -t mangle -A PREROUTING -i eth0 -p tcp --dport 20:21 -j MARK --set-mark 2

```

- 最后，我们需要使用 ip 命令来添加规则，让打上标记的数据包按照对应的路由表进行转发：

```bash
ip rule add from all fwmark 1 table 10
ip rule add from all fwmark 2 table 20

```

## 5、参考

- [Iptables Mangle表和策略路由](https://www.cnblogs.com/wanghongwei-dev/p/17635179.html)
- iptables Tutorial  [https://homes.di.unimi.it/sisop/qemu/iptables-tutorial.pdf](https://homes.di.unimi.it/sisop/qemu/iptables-tutorial.pdf)



