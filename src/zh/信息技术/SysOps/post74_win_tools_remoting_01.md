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

DroidVNC-NG 是VNC Server方式。

特点：

- 点对点直接连接，VNC客户端（控制端）直接远程到VNC服务器（被控端，Android平板）。
- 被控端（Android）**不需要root**，安装的时候给权限即可；提示要什么权限给什么。
- 控制端可以是任意一款VNC Viewer，推荐使用TightVNC View 2.83；
- 仅支持内部局域网发起远程，不支持移动网络；


### RustDesk

工作方式类似向日葵，支持从任何位置远程。

特点:

- 非点对点直接连接，需要一台所谓的ID服务器（必须），中继服务器（可选）；
- 被控端(Android）**不需要Root**;安装的时候给权限即可；提示要什么权限给什么。
- ID服务器支持Docker部署，主机部署；
- 客户端必须时RustDesk客户端，支持安卓/PC/Mac等；
- 支持从任何位置发起远程，移动网络等；





### 选择

最后选择了DroidVNC-NG, 因为在试用过程中，同在内网环境下，RustDesk连接时好时坏。

:::note 系统环境
Android需要7.0以上,DroidVNC-NG推荐安装最新版本2.15
:::
    
## 其他

有机会再试试自建RustDesk到云主机，开源免费平替向日葵。
