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

- sysvol共享文件夹在每个域控制器都不同步，复制失败；
- `repladmin /replsummary` 看不到任何错误；
- `dcdiag`也没有报任何错误；看起来正常；
- DFS管理查看没有看到Domain SysVol Volumes复制组；
- DFS日志没有看到event id `2012`（DFS数据库脏关闭的信息）；
- 使用WMIC查看数据库健康，输出`没有可用实例`
- 其他复制正常

## 背景

- DC域控都是从Windows Server 2008升级到Windows Server 2016
- Sysvol复制协议从FRS升级到了DFSr

## 问题影响

- 主要是影响组策略无法下发因为sysvol文件不同步；

## 解决办法：

（以后填坑）

## 参考

https://community.spiceworks.com/how_to/160786-how-to-re-build-sysvol-dfsr-replication-group-without-demoting-promoting-dc


https://serverfault.com/questions/745599/deleted-domain-system-volume-how-do-i-recreate-it-i-have-no-backups


