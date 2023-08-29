---
# 这是文章的标题
title: Exchange Server系列：RBAC 介绍Exchange Server管理角色
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 53
# 设置作者
# 设置写作时间
date: 2023-08-29
# 一个页面可以有多个分类
category:
  - Windows
  - Exchange Server
  - Messaging
# 一个页面可以有多个标签
tag:
  - Linux
  - 反垃圾邮件
  - 邮件系统
  - ExchangeServer
  - 权限控制
  - RBAC

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---



## 前言

基于角色`Role Based Access Control` 介绍Exchange Server的管理权限，满足ISO 270001 `A9.2.3 特殊权限管理`或是其他安全体系的类似要求，做到不同岗位不同权限。

## Exchange Server权限管理介绍

### 管理权限组成

分层管理和权限模型是：

- 管理角色组 (Role Group)
- 角色  (Role)
- 管理权限条目 (Role Entry)


### 管理角色组 (Role Group)

管理角色组,是由一组角色组成，即一对多关系，一个角色组可以拥有多个角色。Exchange常用有这么2个：

- Organization Mangement （Exchange组织管理员，权限很高)
- Recipient Management (Exchange用户邮箱管理员)

更多的可以在Active Directory的ADUC的`Microsoft Exchange Security Groups`看到.
![Role Groups](../../PostImages/post53_ex_role_rbac.jpg)

- 可以通过看到角色组对应了哪些角色
```
PS C:\> Get-RoleGroup "recipient management" | select -expand roles
Distribution Groups
Migration
Mail Recipients
Team Mailboxes
Move Mailboxes
Mail Recipient Creation
Recipient Policies
Message Tracking
```



### 角色 （Role)

Role默认有很多：

```
PS C:\> get-managementrole | select name| sort -Property name

Name
----
Active Directory Permissions
Address Lists
ApplicationImpersonation
ArchiveApplication
Audit Logs
Cmdlet Extension Agents
...
Role Management
...
User Options
UserApplication
View-Only Audit Logs
View-Only Configuration
View-Only Recipients
WorkloadManagement
```

Role是一组Role Entry的合集。

- 查看指定Role都有哪些Role Entry (即有权执行的Exchange cmdlets)。例如查看角色`Mail Recipients`对应的entry:
```
PS C:\> Get-ManagementRole  "mail recipients" | select -expand RoleEntries |select-string "new-mailbox"

(Microsoft.Exchange.Management.PowerShell.E2010) New-Mailbox -EnableRoomMailboxAccount
(Microsoft.Exchange.Management.PowerShell.E2010) New-MailboxRepairRequest -Archive -Confirm -CorruptionType -Database -Debug -DetectOnly -DomainController -ErrorAction -ErrorVariable -Force
 -Mailbox -OutBuffer -OutVariable -StoreMailbox -Verbose -WarningAction -WarningVariable -WhatIf

```


### Role Entry

`Role Entry`  是role的子集，由`Exchange cmdlet`和`Exchange cmdParameter`组成，, 例如`Exchange cmdlet`常用的`New-mailbox`、`Set-mailbox`，如以下：

```
PS C:\> Get-ManagementRole  "mail recipients" | select -expand RoleEntries |select-string "new-mailbox"

(Microsoft.Exchange.Management.PowerShell.E2010) New-Mailbox -EnableRoomMailboxAccount
(Microsoft.Exchange.Management.PowerShell.E2010) New-MailboxRepairRequest -Archive -Confirm -CorruptionType -Database -Debug -DetectOnly -DomainController -ErrorAction -ErrorVariable -Force
 -Mailbox -OutBuffer -OutVariable -StoreMailbox -Verbose -WarningAction -WarningVariable -WhatIf

```

可以看到Exchange就是通过控制使用cmdlet来管理权限，哪些角色可以执行哪些cmdlet。

:::tip
另外，可以通过cmdlet来倒查哪些角色拥有的权限。例如，想查询哪些角色有新建邮箱的权限。
:::

```
PS C:\> Get-ManagementRole  -cmdlet "new-mailbox"

Name                        RoleType
----                        --------
Mail Recipient Creation     MailRecipientCreation
Mail Enabled Public Folders MailEnabledPublicFolders
Public Folders              PublicFolders
Retention Management        RetentionManagement
Mail Recipients             MailRecipients
```


## 管理权限

- 方法1：使用默认角色组和自定义角色组授权。
- 方法2：使用自定义角色授权；


以上管理授权颗粒由粗到细。

### 使用角色组

一般情况下，使用角色组授权就可以满足基于RBAC的管理需求。常用的是：

- `Organization Management` 成员是Exchange管理员，管理组织所有设置/策略；
- `Recipient Management`的成员是桌面运维支持人员，可以创建邮箱和设置邮箱选项等；

如果不能满足，则自定义角色组。例如，如果新建一个自定义管理角色组只允许创建邮箱，不允许管理通讯组。则可以新建一个角色组，可以考虑只给予`Mail Recipient Creation`角色，不给予`Distribution Groups`角色。


1、登录EAC,点击【新建】或是通过【复制】，然后编辑复制出然后编辑角色；
2、 选择已有的角色添加给新建的角色；
3、 添加成员；


### 使用自定义角色

:::note
必须通过Exchange Management Shell，Exchange Admin Console不支持。
:::

举例说明：

**需求**

需要一个邮箱管理员角色，改角色可以新建邮箱但不可以设置用户邮箱的【邮件转发】、【邮箱委托】。如下图：

![邮件转发](../../PostImages/post53_ex_custom_role_deny_email_fwd.jpg)

![邮件转发](../../PostImages/post53_ex_custom_role_deny_delegation.jpg)

**需求分析**

需要了解到`邮件转发`、`邮箱委托`对应的cmdlet和cmdParameter. 了解到：
- 邮件转发对应的cmdlet是`Set-Mailbox` ,对应的parameters有 cmdParameters `ForwardingAddress`,`ForwardingSmtpAddress`,`DeliverToMailboxAndForwardPS` 

- 邮箱委托对应的cmdlet是`Add-mailboxPermission`


**开始**


```
## 先新建一个自定义角色 My Mailbox Admins。这角色必须以已有角色为模板，本例中使用Mail Recipients为模板。
PS C:\> New-ManagementRole -Parent "Mail Recipients" -Name "My Mailbox Admins" 

## 编辑自定义角色。通过编辑Role Entry，编辑cmdlet或cmdParameter来达到编辑目的. 

# 例1：删掉set-mailbox 这个cmdlet的部分cmdParameters来降低权限，在本例中移除几个相关cmdParameters来删除邮件转发设置权限。
PS C:\> Set-ManagementRoleEntry "My Mailbox Admins\Set-mailbox"  -RemoveParameter -Parameters GrantSendOnBehalfTo,ForwardingAddress,ForwardingSmtpAddress,DeliverToMailboxAndForwardPS 

#例2：删除改角色授权邮箱权限给其他用户。通过删除整个Add-mailboxPermission cmdlet.
PS C:\> Remove-ManagementRoleEntry "Solex Mailbox Admins\Add-MailboxPermission" 
```

**效果**

- 改角色的成员登录EAC后，邮件流 - 邮件转发复选框是灰色的，不可以勾选。
- 邮箱委托添加成员后不可保存设置。

**总结**

通过以上，可以比较精细控制Exchange管理权限。过程比较花时间的就是找出需要控制的cmdlet和parameters，只能多查询得到。

