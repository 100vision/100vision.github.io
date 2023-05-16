---
# 这是文章的标题
title: SCCM：问题排查2：有用的SCCM管理命令行
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 29
# 设置作者
# 设置写作时间
date: 2023-05-15
# 一个页面可以有多个分类
category:
  - Windows
  - SCCM
# 一个页面可以有多个标签
tag:
  - SCCM
  - 疑难排查
  - Troubeshooting



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


## 1、清理客户端策略缓存。

>清理客户端策略，让策略重新下载。

```powershell
Invoke-WmiMethod -ComputerName <remote_computer> -Namespace root\ccm -Class sms_client -Name ResetPolicy -ArgumentList @(1)
```
然后检查`policyAgent.log`日志


## 2、远程触发客户端动作

>实现/远程手动远程触发SCCM客户端行为，不必等待策略执行间隔，例如：


### 命令行
| Client Agent Trigger Schedule ID | Client Action Name                           |
| ------------------------------- | -------------------------------------------- |
| "{00000000-0000-0000-0000-000000000021}" | Machine policy retrieval & Evaluation Cycle |
| {00000000-0000-0000-0000-000000000022} | Machine policy evaluation cycle              |
| {00000000-0000-0000-0000-000000000003} | Discovery Data Collection Cycle              |
| {00000000-0000-0000-0000-000000000002} | Software inventory cycle                     |
| {00000000-0000-0000-0000-000000000001} | Hardware inventory cycle                     |
| {00000000-0000-0000-0000-000000000113} | Software updates scan cycle                  |
| {00000000-0000-0000-0000-000000000114} | Software updates deployment evaluation cycle |
| {00000000-0000-0000-0000-000000000031} | Software metering usage report cycle          |
| {00000000-0000-0000-0000-000000000121} | Application deployment evaluation cycle       |
| {00000000-0000-0000-0000-000000000026} | User policy retrieval                         |
| {00000000-0000-0000-0000-000000000027} | User policy evaluation cycle                  |
| {00000000-0000-0000-0000-000000000032} | Windows installer source list update cycle    |
| {00000000-0000-0000-0000-000000000010} | File collection                               |

### 举例：启动触发

```powershell
WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule "{00000000-0000-0000-0000-000000000002}" /NOINTERACTIVE 
```

## 3. 快速启动客户端基线评估

```powershell

 $Baselines = Get-WmiObject -ComputerName $ComputerName -Namespace root\ccm\dcm -Class SMS_DesiredConfiguration
}
 Else
{
 $Baselines = Get-WmiObject -ComputerName $ComputerName -Namespace root\ccm\dcm -Class SMS_DesiredConfiguration | Where-Object {$_.DisplayName -like $BLName}
}
 
$Baselines | % {
 
 ([wmiclass]"\\$ComputerName\root\ccm\dcm:SMS_DesiredConfiguration").TriggerEvaluation($_.Name, $_.Version) 

```

## 参考

https://www.manishbangia.com/initiate-sccm-client-actions-cmd-line/
