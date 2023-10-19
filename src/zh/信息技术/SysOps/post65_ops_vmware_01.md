---
# 这是文章的标题
title: 服务器虚拟化系列：VMWare:虚拟机磁盘文件
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 65
# 设置作者
# 设置写作时间
date: 2023-10-16
# 一个页面可以有多个分类
category:
  - 虚拟化
  - VMWare

# 一个页面可以有多个标签
tag:

  - VMware
  - 快照
  - 虚拟化
  - Virtualization
  - Snapshot
  - ESXi

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---



## 前言

了解VMWare的虚拟机磁盘文件结构。

## 正文

- *.VMDK
- *-flat.vmdk
- *.ctk

![磁盘文件结构 - ESX Shell](../../PostImages/post64_vmware_disk_files.png)

![磁盘文件结构 - Datastore Browser](../../PostImages/post64_vmware_disk_files_hidden_in_DS_Browser.png)

### [vmname].VMDK文件

VMDK文件是虚拟机磁盘描述符配置文件，不是实际数据存储磁盘文件。它记录的是磁盘大小、磁盘类型等元数据，是一个文本文件。

:::note
该文件通过Vsphere Web控制台下的DataStore Browser可以看到，而且看起来文件大小等同于虚拟机磁盘分配大小，但它不是实际的存储数据存储的虚拟机磁盘文件，而是下面的flat.vmdk文件。
:::

### [vmname]-flat.vmdk files

>[vmname]-flat.vmdk file - This is the actual raw disk file that is created for each virtual hard drive. Almost all of a .vmdk file's content is the virtual machine's data, with a small portion allotted to virtual machine overhead. This file will be roughly the same size as your virtual hard drive.

:::note
该文件通过Vsphere Web控制台下的DataStore Browser是看不到的，需要到ESX shell下才能看到。
:::


### 其他

待补充

## 参考

[IBM Source](https://www.ibm.com/support/pages/detailed-description-all-files-make-virtual-machine)

[VMDK file types](http://vmfsrecover.com/articles/vmfs-disk-types)