---
# 这是文章的标题
title: 活动目录：DFSR SysVol (Domain Sysvol Volumes)丢失问题
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 33
# 设置作者
# 设置写作时间
date: 2023-05-31
# 一个页面可以有多个分类
category:
  - Windows
  - 活动目录
# 一个页面可以有多个标签
tag:
  - AD
  - 疑难排查
  - Troubeshooting
  - 组策略
  - sysvol
  - DfSR



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


## 症状

- 最初是发现组策略不同步到所有域控。进而发现sysvol文件夹在域控之间不同步。
- 又在域控的DFS管理中发现DFSR SysVol (Domain Sysvol Volumes）复制组消失！


## 背景

- DC域控都是从Windows Server 2008升级到Windows Server 2016.
- 2个站点多域控制器；
- Sysvol复制协议几个月前从FRS升级到了DFSr

## 问题影响

- 主要是影响组策略无法下发因为sysvol文件不同步；

## 排错步骤


- 在所有域控上，使用`dcdiag /test:sysvolcheck /e` 检查SysVol也没有报任何错误；看起来正常；

- 在所有域控上，使用`repadmin /syncall /AedP`立刻同步一次，没有变化; `repladmin /replsummary` 也没看到任何错误；

- 考虑到SysVol是使用DFS协议同步，检查事件查看器里的DFS日志，没有发现类似event id `2212`（指示DFS数据库脏关闭的信息）；
:::tip
DFS数据库不正常关闭可能导致DFS停止复制。一般事件日志可以看懂2212或2213等event ID。
:::

- 使用WMIC检查数据库健康，输出`没有可用实例` 或 `no available instance(s).`
:::tip
可以使用 `Wmic /namespace:\\root\microsoftdfs path dfsrreplicatedfolderinfo get replicationgroupname,replicatedfoldername,state` 检查数据库状态。如果看到数据库状态异常，DFS停止复制，可以使用 `wmic /namespace:\\root\microsoftdfs path dfsrVolumeConfig where volumeGuid=<GUID> call ResumeReplication` 恢复复制。
:::

- 问题好像比较严重，感觉有点无助。


## 解决办法：

（以后填坑）

## 参考

https://community.spiceworks.com/how_to/160786-how-to-re-build-sysvol-dfsr-replication-group-without-demoting-promoting-dc


https://serverfault.com/questions/745599/deleted-domain-system-volume-how-do-i-recreate-it-i-have-no-backups


