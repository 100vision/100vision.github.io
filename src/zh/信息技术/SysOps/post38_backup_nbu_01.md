---
# 这是文章的标题
title: 数据保护：Netbackup：使用Automatic Image Replication (AIR)
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 34
# 设置作者
# 设置写作时间
date: 2023-06-19
# 一个页面可以有多个分类
category:
  - 数据保护

# 一个页面可以有多个标签
tag:
  - 数据备份
  - 操作指南
  - Netbackup
  



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

## 前言

这几天因为要做NBU还原数据库，但备份在另一个Netbackup服务器（即其他备份域），依稀记得使用AIR可以跨域取备份，但不知道怎么具体操作，于是又把Netbackup学习了一遍，主要是备份复制方面。最后明白其实不使用AIR也可以取备份，后面再说。

## Netbackup复制 (Replication)介绍

用于实现不同备份域之间备份数据复制；如果是相同备份域，要使用Duplicate

### Automatic Image Replication (AIR) 自动复制

》AIR功能（Automatic Image Replicate）用于实现不同备份域之间的备份数据自动复制。接合SLP (Storage Lifecycle Policy) 实现备份镜像（备份片）自动复制。

### 手动复制
有自动复制，也就有手动复制。手动复制是使用`bpreplicate`命令来实现跨域手动复制已有的备份片。具体使用举例见文尾。


### AIR VS 手动复制

- AIR是自动复制，作为SLP的动作一部分，可以计划安排，好像不能复制已有备份镜像image;

- 手动复制。可以复制已有备份image。

## 一. AIR复制

### AIR配置要求

- Netbackup 7.5以上版本
- 要求Storage Server存储类型是PureDisk (MSDP重删池，高级选项需要license)
- 只支持PureDisk到PureDisk复制，不支持磁带或是Advanced Disk
- 另外NBU服务器之间不能又NAT （未证实）

### 实现目的

在源域实现数据备份，并同时复制一份备份数据到目标域。在目标域可以实现数据还原。

### AIR配置步骤

- 在源域创建Disk Storage Server，类型`Media Server Deduplication Pool`,步骤略
- 在目标域创建Disk Storage Server，类型`Media Server Deduplication Pool`,步骤略
- 在源域和目标域Master添相互添加对方域为`Trusted Master`，如下图：
如果有证书警告，选择“接受”。
![添加Trusted Master](../../PostImages/post38_nbu_air_add_trusted_master.jpg)
- 在源域的Storage Server上添加目标域Storage Server作为复制对象；
- -  选择目标域的master服务器，选择目标域的Storage server
- -  输入对方存储服务器root命令密码
![选择源域的Storage Server](../../PostImages/post38_nbu_air_cofigure_storage_server_repl_conf_step1.jpg)

![添加目标域的Storage Server](../../PostImages/post38_nbu_air_cofigure_storage_server_repl_conf_step2.jpg)

::tip 关于可能出现的异常
在添加目标storage server可能会出现证书不信任异常，例如hand shaking，可以参照文章 ["Netbackup: 如何解决Netbackup CA证书异常问题"](http://www.163.com)，然后再继续。
:::

- 在源域上创建SLP策略。
- - 新建策略。策略名例如 `slp_repl_01`。记下，等下会用到。
- - 指定数据分类"Data Classification"为**None**。选择其他一般会出错
- - 添加策略步骤1，选择"backup"动作，存储选择msdp disk pool
- - 添加策略步骤2，选择"replicate", 选择目标storage的msdp puredisk.

- 在源域上创建备份策略。策略内容：
- - 指定策略存储,Policy Storage为前面创建SLP策略。如下图：

![创建backup policy](../../PostImages/post38_nbu_air_cofigure_backup_policy.jpg)

:::tip 步骤提示
如果Policy Storage下拉列表中没有出现之前步骤创建的SLP策略，一般是Data Classification不匹配，重新选择。
:::

- 在目标域上创建SLP策略。策略内容:
- - 策略名必须和源域创建的SLP一模一样。否则不工作；
- - 添加一条import动作。

- 步骤至此完。

### 其他AIR事项

**AIR复制计划**

不可以计划，一般是备份动作发生后的20分钟后；

**如何查看任务状态**


- 可以通过观察job任务详情。在源域的可以看到replicate job在跑，在目标域可以看到`import` job在跑。

**如何管理AIR job**

- 在源域查看未完成的
```
/usr/openv/netbackup/bin/admincmd/nbstlutil list -copy_type replica -U -copy_incomplete
```

- 在源域查看所有已完成的复制
```
# nbstlutil repllist
```
- 在源域上取消一个air job 

```
/usr/openv/netbackup/bin/admincmd/nbstlutil cancel -backupid <xxx_1686896917>
```

- 在目标域上查看import job

```
/usr/openv/netbackup/bin/admincmd/nbstluti pendimplist -U
```

## 二、 手动复制

手动复制可以实现：

- 手动触发AIR复制，更快进行复制。前提需要已有SLP。
- 手动复制好像可以复制未经SLP备份的的数据，但没有测试。


### 手动复制通过SLP备份的数据到远程域

使用`nbreplicate`可以手动复制SLP备份过的数据到远程域。使用场景有：
- 当目标域之前从源域复制过来的备份副本没有了，需要再从源域拿一份过来；
- 当需要比计划实际更早进行复制；


### 手动复制未通过SLP备份的数据到远程域

:::tip
能否实现未测试
:::

- 配置AIR
- 在目标域上创建SLP import
- 然后在源域master上执行以下：

```
nbreplicate -backupid XXX_155500 -cn 2 
```

- 检查目标域的catalog和import job队列

**参考**
https://annurkarthik.wordpress.com/2016/03/09/command-to-start-manual-replication-of-images-to-remote-netbackup-domain/

https://vox.veritas.com/t5/NetBackup/how-to-replicate-backup-image-from-one-NBU-domain-to-the-other/td-p/894871

