---
title: 工具介绍系列：远程控制：远程控制Android安卓设备
icon: page
order: 74
date: 2023-11-15
category:
  - Linux
  - 工具
  - 工具利器
  - Android
  - 效率工具
tags:
  - 远程控制
  - 安卓
  - vnc
  - Remote
sticky: false
star: true
---



## 前言

工作有一个需求就是用户想从PC端远程到安卓平板。找了一圈，发现两个方案;

- [DroidVNC-NG]([https://github.com/bk138/droidVNC-NG](https://github.com/bk138/droidVNC-NG))
- [RustDesk ]([https://github.com/rustdesk/rustdesk](https://github.com/rustdesk/rustdesk))


## 正文



### DroidVNC-NG

DroidVNC-NG 是VNC方式。VNC客户端（控制端）直接远程到VNC服务器（被控端，Android平板），。特点：

- 设备需要root，安装的时候给权限即可；提示要什么权限给什么。
- 仅支持内部局域网发起远程
- 
### RustDesk

需要有服务器(可以自建）中转，类似向日葵，支持从任何位置远程。

    -RustDesk,，部署一台服务器(Docker，最新版本)，然后在电脑端和平板都安装RustDesk客户端，然后在电脑端发起远程，测试过程时有断开和重连问题；


### 选择

最后选择了DroidVNC-NG, 因为稳定性：
    - DroidVNC-NG，安装最新版本2.15到平板，并简单设定Android权限，然后通过在电脑端的TightVNC Viewer发起远程到平板，连接较稳定不见断开或重连
    - 
## 其他

有机会再试试RustDesk，开源免费平替向日葵。
