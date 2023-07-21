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

- 问题好像比较严重，感觉有点无助，感觉要把问题的DC废了重建才能解决。


## 解决办法：

> Google了很久，终于找到了类似问题的解决办法，不用废掉问题DC。

> 具体原理是，通过修改注册表，把所有DC上的DFS恢复到DC提升前的状态，使得它会从PDC Emulator角色的DC那里重新复制SYSVOL，最终完成修复SYSVOL复制组。具体解决办法见参考链接。



### 步骤


- 备份AD （PDC的系统状态）
- 停掉所有DC上的DFS服务（重要）
- 登录到PDC， 打开ADSI工具，连接到默认上下文。
- 在ADSI中修改AD数据库（清理过时数据

- 主要是检查 OU=Domain Controllers 下的 CN=DFSR-LocalSettings，删除该文件夹下所有内容和子文件夹。
- 回到 CN=Systems > CN=DFSR-GlobalSettings，继续检查和删除其下的所有内容和子文件夹，确保没有其他活动的复制组。

- 在所有DC上执行一次手动复制,确保以上修改复制到所有DC。

```
repadmin /syncall /AdeP
```

- 修改PDC上的注册表。注册表内容如下：

:::warn 注册表修改注意事项
需要根据实际情况替换SYSVOL文件夹位置。在这个例子中，因为我有把SYSVOL复制协议从Frs-r升级到DFS-R，对应的SYSVOL文件夹名是`SYSVOL_DFSR`,不再是`SYSVOL`
:::

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\DFSR\Parameters\SysVols\Promoting SysVols]
"Sysvol Information is Committed"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\DFSR\Parameters\SysVols\Promoting SysVols\example.com]
"Is Primary"=dword:00000001
"Command"="DcPromo"
"Parent Computer"=""
"Replicated Folder Name"="example.com"
"Replicated Folder Root"="C:\\Windows\\SYSVOL_DFSR\\domain"
"Replicated Folder Root Set"="C:\\Windows\\SYSVOL_DFSR\\sysvol\\example.com"
"Replicated Folder Stage"="C:\\Windows\\SYSVOL_DFSR\\staging areas\\example.com"
"Replication Group Name"="example.com"
"Replication Group Type"="Domain"

```

- 启动PDC上DFS服务，并等待3分钟左右。
- 如果一切顺利，以上注册表内容在PDC上会发生变化（消失）。确认代之，将看到的是：
`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\DFSR\Parameters\SysVols\Seeding Sysvols`
- 回到ADSI, 将能看到 `CN=System > CN=DFSR-GlobalSettings > CN=Domain System Volume > CN=Topology > CN=<your primary dc>`
- 再在所有DC上执行一遍手动复制.
- 在剩下所有DC上依次执行

- a. 添加以下注册表内容：


```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\DFSR\Parameters\SysVols\Promoting SysVols]
"Sysvol Information is Committed"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\DFSR\Parameters\SysVols\Promoting SysVols\example.com]
"Is Primary"=dword:00000000
"Command"="DcPromo"
"Parent Computer"="primary-dc.example.com"
"Replicated Folder Name"="example.com"
"Replicated Folder Root"="C:\\Windows\\SYSVOL_DFSR\\domain"
"Replicated Folder Root Set"="C:\\Windows\\SYSVOL_DFSR\\sysvol\\example.com"
"Replicated Folder Stage"="C:\\Windows\\SYSVOL_DFSR\\staging areas\\example.com"
"Replication Group Name"="example.com"
"Replication Group Type"="Domain"

```

- b. 启动DFS服务
- c. 执行repadmin复制
- d . 检查ADSI

- 最后，检查DFS命名空间是否出现了SYSVOL复制组。至此问题解决！



## 参考

https://community.spiceworks.com/how_to/160786-how-to-re-build-sysvol-dfsr-replication-group-without-demoting-promoting-dc


https://serverfault.com/questions/745599/deleted-domain-system-volume-how-do-i-recreate-it-i-have-no-backups


