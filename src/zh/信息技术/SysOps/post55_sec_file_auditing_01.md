---
# 这是文章的标题
title: 工具介绍系列：安全审计 ManageEngine ADAudit Plus
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 55
# 设置作者
# 设置写作时间
date: 2023-09-06
# 一个页面可以有多个分类
category:
  - Windows
  - Security
  - Auditing
# 一个页面可以有多个标签
tag:

  - 文件审计
  - 权限控制
  - 活动目录
  - 问题解决
  - AD审计
  - Netapp
  - Ontap
  - 联想


# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---



## 前言

介绍一款Windows安全审计工具`ManageEngine ADAudit Plus`，

>Tracking file and folder modifications with ADAudit Plus


主要支持：

- 活动目录审计
- 文件系统审计。

## 一、活动目录审计

审计项目：

- AD用户对象变更，例如：（用户账户/计算机账户创建、删除、登录活动异常分析、账户锁定等）
- AD组对象变更。例如成员变更等；
- 组策略对象的变更等



## 二、文件系统审计

审计对象：

- 文件和文件夹的变更。例如添加/删除/移动/修改等；

主要支持CIFS文件服务器：
- Windows文件服务器
- NetApp Ontap (Cluster)/SVM CIFS
- EMC Isilon

注意到，都是CIFS文件服务器，并不支持NFS系统。

## 三、ADAudit Plus安装和配置

简单不介绍，安装后，几乎是开箱即用。

## 四、文件系统审计和联想凌拓NAS集成问题

>本文重点。之所以单独讲联想凌拓NAS，是因为凌拓NAS运行的系统其实也是ONTAP，国产版的NetApp, 理论上能被ADAudit支持，也不在ADAudit Plus官方支持列表。但事实证明，如果不做特殊配置，ADAudit Plus确实无法审计联想凌拓NAS。

**一般集成步骤**

ADAudit Plus和文件共享系统（CIFS)集成步骤一般是在ADAudit Plus上执行：

- 发现CIFS服务器
- 添加要共享的文件夹
- 开启审计选项（Windows SACL)

**联想凌拓问题描述**

我们在凌拓NAS（型号DH5000M) 上创建SVM，然后把VServer(SVM)加入活动目录后，也能在AD目录看到一个SVM的AD计算机对象。但通过ADAudit配置NetApp服务器向导添加这个CIFS服务器时，发现不了，会看到错误消息：

> " No Active Directory Objects available."

意思是SVM没有在AD中发现，这样向导也就没法继续剩下的集成步骤。

翻遍ManageEngine ADAudit Plus的官方支持手册和Google也没有解决方案。

:::tip 题外：什么是ONTAP VServer/SVM

Storage Virtual Machine（SVM，以前称为 Vserver） ONTAP SVM 对于客户端而言都是一个专用CIFS/NFS服务器，简单理解SVM就是运行在ONTAP里面的一台虚拟机，对外提供CIFS/NFS协议。
:::

**分析**

- SVM CIFS计算机对象明明已经在AD里面存在了，为什么ADAudit会发现不到？

- 如果我是开发人员，我会通过计算机账户的某个特定AD属性来发现AD目录中的NetAPP ONTAP。那会是使用哪个属性？

- 按照这个思路，翻看这个SVM AD计算机属性，看到`operatingSystem` (操作系统)这个AD属性，如下图：

![Before](../../PostImages/Post55_sec__adauditPlus_SVM_AD_Obj_Attri_Operatingsystem_before_change.jpg)

- 我猜，ADAudit应该时使用这个属性值，根据该属性值是否包含"ontap"字符串则是判断是否是netapp CIFS服务器。

**解决方案**

- 如上图以及思路，于是尝试修改这个属性值看看是否能解决。可以看到凌拓设备对应的属性值是`Lenovo Release 9.11.1P4`, 通过属性编辑器直接修改为`Ontap`,如下图：

![After](../../PostImages/Post55_sec__adauditPlus_SVM_AD_Obj_Attri_Operatingsystem_after_change.jpg)

- 等待几分钟，然后重新回到ADAudit配置NetApp服务器向导，bingo! 可以发现到了! :-)

- 能够发现后，按照向导完成剩下的配置步骤。



## 扩展：如何配置NetApp ONTAP文件审计

- 创建1个文件审计策略
```
cluster1::> vserver audit create -vserver vs1 -destination /audit_log -events file-ops,cifs-logon-logoff,file-share,audit-policy-change,user-account,security-group,authorization-policy-change,cap-staging -rotate-schedule-month all -rotate-schedule-dayofweek all -rotate-schedule-hour 12 -rotate-schedule-minute 30 -rotate-limit 5
```

- 启动审计
```
vserver audit enable -vserver vserver_name
```

- 查看审计策略

```
MyFileCluster::> vserver audit show -vserver svm_cifs

                           Vserver: svm_cifs
                    Auditing State: true
              Log Destination Path: /vol_sys_auditing
     Categories of Events to Audit: file-ops, audit-policy-change
                        Log Format: evtx
               Log File Size Limit: 200MB
      Log Rotation Schedule: Month: -
Log Rotation Schedule: Day of Week: -
        Log Rotation Schedule: Day: -
       Log Rotation Schedule: Hour: -
     Log Rotation Schedule: Minute: -
                Rotation Schedules: -
          Log Files Rotation Limit: 5
            Log Retention Duration: 0s
      Strict Guarantee of Auditing: true
```


具体参考：https://docs.netapp.com/us-en/ontap/nas-audit/create-auditing-config-task.html
