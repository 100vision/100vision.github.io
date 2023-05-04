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

# Microsoft FSLogix 

::: tip 前提条件
待添加
:::

## 1、什么是FSLogix

FSLogix是微软免费的Windows用户配置管理解决方案。把用户账户配置从系统里抽象剥离出来，然后使用vhd或vhdx虚拟磁盘文件进行封装，放到一个网络位置，例如SMB共享。用户登录时，系统（具体时FSLogix Agent)会去挂载用户的vhd/vhdx磁盘文件到本地。这样实现了：

- 用户配置文件统一管理

用户配置文件都封装重定向到一个网络位置


- 提供了用户体验

用户配置往往包含一些用户专用应用数据。例如桌面、Chrome收藏夹等。没有配置管理的话，用户配置不会跟着走，如果用户登录多台服务器就会有不同的配置。通过FSLogix可以实现配置跟着走,对用户体验提高很多。

::: tip 相比Windows漫游配置文件
虽然有点类似用户配置文件漫游,但比Windows漫游配置文件更强，详见官方 https://learn.microsoft.com/en-us/fslogix/overview-what-is-fslogix。
:::


## 2. FSLogix应用范围

可以应用到：
- Horizon View 虚拟桌面交付VDA的Instant Cloned自动场部署中;
- Microsoft RDSH (Remote Destkop Server Host)中；
- Citrix桌面交付；


## 3. 如何部署

::: warning 环境要求
1、需要AD域环境。2、存储要求。如果用户较多使用的是网络存储，最好是有10GB网络和较快的存储，否则用户登录会很慢，通过网络挂载VHDX等。
:::




### 3.1 部署到Horizon View自动场:虚拟桌面或RDSH服务器

1. 准备一个网络共享。并设置FSLogix Container的共享和权限。用来放置用户配置VHD/VHDX；权限设置参考：[Configure Windows ACL](https://learn.microsoft.com/en-us/fslogix/how-to-configure-storage-permissions#configure-windows-acls)

1. 准备自动场的模板虚拟机（安装系统，安装VMWare Tools, 配置DHCP等）
2. 在虚拟桌面模板中安装Horizon Agent (安装组件需要选择"Horizon Instant Clone")，这时不需要注册到Horizon连接服务器；
3. 在虚拟桌面模板镜像中(Horizon Agent) 安装FSLogix Agent代理（目前是v2.9） 
4. 创建快照；
5. 准备和配置FSLogix组策略。把FSLogix Bundle安装zip包的组策略文件`fslogx.adml`和`fslogix.admx`放到域控的`SYSVOL/PolicyDefinitions`对应文件夹中。
6. 创建1条组策略并链接到Horizon VDA桌面，编辑配置FSLogix组策略。管理模板找到fslogix文件夹，主要配置项有：
  - 启用fslogix
  - 指定配置文件类型为 **VHDX**
  - 配置VHD文件夹位置：指定步骤1准备好的网络共享；
  - 启用【删除本地配置文件如果成功】；
  - 指定配置文件大小的上限，默认是30GB；
7. 创建Horizon Instant Cloned自动场；
8. 如果最好部署成功，用户登录后，会在网络共享中创建一个VHDX磁盘文件；



### 3.2 部署到Horizon View的手动场：RDSH服务器

步骤大致同上。不同的、需要注意的是准备RDSH主机模板:
- 准备RDSH主机模板时，安装FSLogix Agent；
- 准备RDSH主机模板时，**不安装**Horizon Agent；
- 需要手动克隆RDSH主机，并使用SysPrep封装每一台RDSH或使用vSphere定制操作系统；
- 配置主机名/静态IP地址；
- 需要手动安装Horizon Agent，不选择Horizon Instant Clone和Composer。这时，需要输入Horizon连接服务器注册；
- 创建Horizon手动场并添加所有RDSH主机；


### 3.3 部署到Citrix

未做（还有环境测试）


# 应用交付 Horizon App Volumes
