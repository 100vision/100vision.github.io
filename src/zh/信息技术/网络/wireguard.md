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
---






## 什么是WireGuard

是一个易于配置、快速且安全的开源 VPN，它利用了最新的加密技术。

## WireGuard的优势

相比IPSec VPN，WireGuard更快又不失安全,适合小公司或家庭等廉价实现方案。

## 部署

:::tip 前提条件
需要至少一个公网IP地址。另外，如果只有一个节点具备公网 IP ，则所有组网流量都需要通过这个公网 IP 的节点进行中转1台云主机(有公网IP地址）作为WireGuard的Hub服务器实现联网
:::

### 拓扑

- 拓扑选项1：中心化。

云主机作为WireGuard Gateway，其他站点（子网）都在NAT后面，没有公网IP地址
home(eth0,wg0) <--> ECS(eth0,wg0) <---> Office(wg0,eth0)


### 部署注意事项

- 配置文件中的allowed IPs 是指允许路由的目标子网。添加后自动添加相应路由项的路由表.

- 如果hub服务器是部署在云主机，注意云主机上需要放行WG的默认UDP端口==51820==


### 常用命令

- 启动和停止wg tun网卡wg0
```shell
wg-quick down wg0
wg-quick up wg0
```


- 启动和停止wg 的systemd服务
```shell
sudo systemctl stop wg-quick@wg0.service
sudo systemctl start wg-quick@wg0.service
```

### 示例配置

- 1、中心WireGuard服务器配置

```shell
cat /etc/wireguard/wg0.conf

[Interface]
Address = 192.0.2.254/32
SaveConfig = false
DNS = 223.5.5.5
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
ListenPort = 51820
PrivateKey = <private-key-Hub-server>

[Peer]
PublicKey = <public-key-A>
AllowedIPs = 192.0.2.1/32,192.168.6.0/24,192.168.0.0/24,192.168.11.0/24
```


- 2. WireGuard客户端配置示例

```shell
[Interface]
PrivateKey = <private-key-A>
Address = 192.0.2.1 #隧道IP地址
DNS = 192.168.0.24      #dns可以配置为内网dns服务器
PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

#WireGuard Server/Gateway (tencent ecs with Public IP address)
[Peer]
PublicKey = <Public-key-Hub-server>
AllowedIPs = 192.0.2.0/24,10.0.20.6/22,10.188.0.0/24  
Endpoint = 1.2.3.4:51820   # ECS公网IP地址         
PersistentKeepalive = 10
```


## 进阶：使用Web GUI管理WireGuard配置

 使用一些Web工具方便管理WirGuard的配置和公钥，自动生成配置。
具体参考[配置参考](https://medium.com/swlh/web-uis-for-wireguard-that-make-configuration-easier-e104710fa7bd)
