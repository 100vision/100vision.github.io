---
# 这是文章的标题
title: VMware Horizon：FSLogix和App Volumes
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 19
# 设置作者
# 设置写作时间
date: 2023-05-04
# 一个页面可以有多个分类
category:
  - Windows
  - 桌面虚拟化
  - 应用交付
# 一个页面可以有多个标签
tag:
  - 应用交付
  - Horizon
  - FSLogix
  - 用户配置管理
  - Profile Container
  - VMware

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

## Microsoft FSLogix 

::: tip 前提条件
待添加
:::

### 1、什么是FSLogix

FSLogix是微软免费的Windows用户配置管理解决方案。把用户账户配置从系统里抽象剥离出来，然后使用vhd或vhdx虚拟磁盘文件进行封装，放到一个网络位置，例如SMB共享。用户登录时，系统（具体时FSLogix Agent)会去挂载用户的vhd/vhdx磁盘文件到本地。这样实现了：

- 用户配置文件统一管理

用户配置文件都封装重定向到一个网络位置


- 提供了用户体验

用户配置往往包含一些用户专用应用数据。例如桌面、Chrome收藏夹等。没有配置管理的话，用户配置不会跟着走，如果用户登录多台服务器就会有不同的配置。通过FSLogix可以实现配置跟着走,对用户体验提高很多。

::: tip 相比Windows漫游配置文件
虽然有点类似用户配置文件漫游,但比Windows漫游配置文件更强，详见官方 https://learn.microsoft.com/en-us/fslogix/overview-what-is-fslogix。
:::


### 2. FSLogix应用范围

可以应用到：
- Horizon View 虚拟桌面交付VDA的Instant Cloned自动场部署中;
- Microsoft RDSH (Remote Destkop Server Host)中；
- Citrix桌面交付；


### 3. 如何部署

::: warning 环境要求
需要AD域环境。
:::



#### 3.1 部署到Horizon View虚拟桌面交付环境

1. 准备自动场的模板虚拟机（安装系统，安装VMWare Tools, 配置DHCP等）
2. 在虚拟桌面模板中安装Horizon Agent (安装组件需要选择"Horizon Instant Clone")，这时不需要注册到Horizon连接服务器；
3. 在虚拟桌面模板镜像中安装FSLogix Agent代理（目前是v2.9） 
4. 创建快照；
5. 准备FSLogix Container的共享和权限。用来放置用户配置VHD/VHDX；权限设置参考：


