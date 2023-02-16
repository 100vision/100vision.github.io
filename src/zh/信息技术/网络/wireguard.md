---
# 这是文章的标题
title: WireGuard组网
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
# 设置写作时间
date: 2023-02-10
# 一个页面可以有多个分类
category:
  - networking
# 一个页面可以有多个标签
tag:
  - networking
  - vpn
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息





## 什么是WireGuard

IPSEC VPN vs WireGuard VPN。


## WireGuard的优势

更快又不失安全,轻松实现组网

## 部署

:::note 前提条件
需要1台云主机(有公网IP地址）作为WireGuard的Hub服务器实现联网
:::

### 拓扑

home(eth0,wg0) <--> ECS(eth0,wg0) <---> Office(wg0,eth0)


### 部署注意事项

- 配置文件中的allowed IPs 是指允许路由的目标子网。添加后自动添加相应路由项的路由表


### 常用命令

- 启动和停止wg tun网卡wg0
```shell
wg-quick down wg0
wg-quick up wg0
```


