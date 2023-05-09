---
# 这是文章的标题
title: iptables浅显理解 (二) ：常用命令
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 23
# 设置作者
# 设置写作时间
date: 2023-05-09
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




## iptables的常用命令

### 1. 查看当前规则。

```shell
iptables -L -t <表名> -v --line-numbers
```
- 表名有: nat,filter,mangle

**举例:查看nat表中的规则**
```shell
iptables -L -t nat -v --line-numbers
```

输出类似：
```plain

Chain POSTROUTING (policy ACCEPT 285 packets, 37567 bytes)
num   pkts bytes target     prot opt in     out     source               destination
1        0     0 MASQUERADE  all  --  any    !docker0  172.17.0.0/16        anywhere
2        0     0 MASQUERADE  all  --  any    !br-2810b48c01b9  172.18.0.0/16        anywhere
3        0     0 MASQUERADE  tcp  --  any    any     172.18.0.4           172.18.0.4           tcp dpt:http
4        0     0 MASQUERADE  tcp  --  any    any     172.18.0.5           172.18.0.5           tcp dpt:mysql
5        4   240 MASQUERADE  all  --  any    eth0    192.0.2.0/24         anywhere
```

### 2. 添加iptables规则


2.1 指定链和表添加规则
``` shell
iptables -t <表名> -A <链名> -d <目标网络/主机> -s <源> -j <动作> -i <网络接口名>
```
**举例：添加POSTROUTING链的1条规则实现源地址转换**：
```
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -i eth0 -j MASQUERADE
```


### 3. 删除iptables规则

:::tip 定位规则编号
iptables -L --line-nubmers
:::

3.1 指定链，规则号删除
``` shell
iptables -D <链名> <n>
```
**举例：删除POSTROUTING链的1号规则**：
```
iptables -D POSTROUTING 1
```


### 4. 保存规则

默认iptables规则保存在内存里，系统重启后消失。所以要记得保存到文件。

- 如果使用了iptables.service来管理，CentOS下执行`/sbin/iptables-save`来保存到`/etc/sysconfig/iptables`，系统重启后会从该文件加载规则配置。
```shell
iptables-save 
```

- 如果没有使用iptable.service来管理规则配置(使用命令/sbin/iptables等)，管理员需要手动调用`/sbin/iptables-save`保存到文件，然后再使用` /sbin/iptables-restore`手动加载。

``` shell
/sbin/iptables-save > /etc/sysconfig/iptables
/sbin/iptables-restore  < /etc/sysconfig/iptables
```

## （未完待续）