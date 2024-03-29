---
# 这是文章的标题
title: VMware Horizon：FSLogix配置管理和App Volumes应用交付
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
  - App Volumes

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


# 一、配置管理解决方案 Microsoft FSLogix 


## 1.1 什么是FSLogix

FSLogix是微软免费的Windows用户配置管理解决方案。把用户账户配置从系统里抽象剥离出来，然后使用vhd或vhdx虚拟磁盘文件进行封装，放到一个网络位置，例如SMB共享。用户登录时，系统（具体时FSLogix Agent)会去挂载用户的vhd/vhdx磁盘文件到本地。这样实现了：

- 用户配置文件统一管理

用户配置文件都封装重定向到一个网络位置


- 提供了用户体验

用户配置往往包含一些用户专用应用数据。例如桌面、Chrome收藏夹等。没有配置管理的话，用户配置不会跟着走，如果用户登录多台服务器就会有不同的配置。通过FSLogix可以实现配置跟着走,对用户体验提高很多。

::: tip 相比Windows漫游配置文件
虽然有点类似用户配置文件漫游,但比Windows漫游配置文件更强，详见官方 https://learn.microsoft.com/en-us/fslogix/overview-what-is-fslogix。
:::


## 1.2 FSLogix应用范围

可以应用到：
- Horizon View 虚拟桌面交付VDA的Instant Cloned自动场部署中;
- Microsoft RDSH (Remote Destkop Server Host)中；
- Citrix桌面交付；


## 1.3 部署FSLogix

::: warning 前提要求
1、需要AD域环境。2、Horizon vSphere/view；3. 存储要求: 如果用户较多,要做好存储容量规划，以及使用的是网络存储，最好是有10GB网络和较快的存储，否则用户登录会很慢，因为通过网络挂载VHDX大文件等。
:::




### 1.3.1 部署到Horizon View自动场:虚拟桌面或RDSH服务器

1. 准备一个网络共享。并设置FSLogix Container的共享和权限。用来放置用户配置VHD/VHDX；权限设置参考：[Configure Windows ACL](https://learn.microsoft.com/en-us/fslogix/how-to-configure-storage-permissions#configure-windows-acls)

图：文件夹NTFS ACL

![文件夹ACL List](../../PostImages/post19_horizon_fslogix_share_acls.jpg)

图：文件夹Share Permission

![文件夹共享权限](../../PostImages/post19_horizon_fslogix_share_perm.jpg)

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

 图：GPO

 ![FSLogix相关策略项](../../PostImages/post19_horizon_fslogix_gpo.jpg)

7. 创建Horizon Instant Cloned自动场；
8. 验证。如果用户能够顺利登录，并观察到网络共享中创建一个VHDX磁盘文件；如下图：
![FSLogix Profile Disk](../../PostImages/post19_horizon_profile_disks.jpg)



### 1.3.2 部署到Horizon View的手动场：RDSH服务器

步骤大致同上。不同的、需要注意的是准备RDSH主机模板:
- 准备RDSH主机模板时，安装FSLogix Agent；
- 准备RDSH主机模板时，**不安装**Horizon Agent；
- 需要手动克隆RDSH主机，并使用SysPrep封装每一台RDSH或使用vSphere定制操作系统；
- 配置主机名/静态IP地址；
- 需要手动安装Horizon Agent，不选择Horizon Instant Clone和Composer。这时，需要输入Horizon连接服务器注册；
- 创建Horizon手动场并添加所有RDSH主机；


### 1.3.3 部署到Citrix

(待补充)

## 1.4 额外

### 1.4.1：FSLogix配置磁盘压缩

因为VHDX虚拟磁盘文件使用的是厚置备清零，一旦文件增长了会在高水位不会Shrink（缩减）和自动回收空间，为解决该问题，可以试试使用这个脚本 [invoke-FSlShrinkDisk](https://github.com/FSLogix/Invoke-FslShrinkDisk) 

### 1.4.2 FSLogix用户排除

FSLogix默认对所有登录用户生效。一般需要把管理员或是本地用户排除，不接受FSLogix管理。这样好处是，当FSLogix出现问题时，且组策略启动了“阻止使用临时配置登录”等策略项，会造成任何用户无法登录，也没法使用本地配置登录。设置排除用户，可以手动通过把需要排除的用户加入到一个 `FSLogix Profile Exclude List`本地组来实现，有可以使用组策略的受限制组实现。组策略实现步骤：

- 编辑之前创建、已有的FSLogix组策略，定位到`计算机配置/Windows配置/安全设置/受限制的组`;
- 添加一个组`FSLogix Profile Exclude List`,添加本地管理员或是其他域用户；
- 刷新所有FSLogix Agent机器的组策略；

这样，被排除的用户将继续是继续使用本地配置，不会使用FSLogix配置；

## 1.5 FSLogix的进阶使用

### 1.5.1 什么是FSLogix App Masking

>一言蔽之，Application Masking 可以用来隐藏应用。解决一些问题和需求：
- 对某些用户隐藏应用；
- 解决应用之间的冲突/兼容问题；


### 1.5.2 使用FSLogix App Masking

>FSLogix Application Masking uses rules that are defined in the FSLogix Application Masking Rules Editor。
详细请参考[这里](https://learn.microsoft.com/en-us/fslogix/tutorial-application-rule-sets)


## 1.6 诊断和日志

主要是查看代理日志，文件位置 Open the latest log file from `C:\ProgramData\FSLogix\Logs\Profile\Profile_%date%.log`. 更多官方：
[这里](https://learn.microsoft.com/en-us/fslogix/troubleshooting-events-logs-diagnostics)

# 二、应用交付解决方案 Horizon App Volumes

## 2.1 什么是App Volumes

> App Volumes是VMware的应用交付商业解决方案。把应用程序抽象出来封装成为一个VMware Disk(*.VMDK)文件**按需**挂载到用户的虚拟桌面，可以大大降低应用程序部署时间。

好处大大有：

- 因为解耦了应用和系统，提高了部署灵活性。
- 得益于解耦，软件发布和维护也很方便。应用安装或升级一次，然后可以部署到多个服务器，不需要在每台服务器上安装；相比镜像更新软件，也更便利轻量；
- 可以动态按需部署到不同目标用户和组（AD组）；

**支持的部署场景**

- Horizon VDI虚拟桌面环境；
- Citrix VDI 虚拟桌面环境；



**原理**

- 通过App Volumes Manager发起一个App Volumes Capture请求，然后捕捉Packaging VM上的应用程序安装过程。
- 然后把捕捉的、生成一个应用程序包并把应用程序封装成一个VMDK文件；
- 通过App Volumes Manager发布一个应用分配，让App Volumes Agent挂载（附加）应用VMDK到虚拟桌面本地；

**App Volumes角色和组件**

角色有：
- App Volumes Manager （管理控制台，发动应用捕捉和分配应用）
- App Volumes Agent （代理。挂载应用）
- Packaging VM (模板虚拟机，用来捕获应用程序安装)

## 2.2 部署App Volumes

::: warning 前提要求
1、需要AD域环境。2、VMware vSphere；3. 存储要求: 如果使用的是网络存储，最好是有10GB网络和较快（有闪存）的存储，否则应用挂载慢等。
:::




### 2.2.1 部署到Horizon VDI虚拟桌面环境

**【准备环境】**

1. 准备一台服务器并安装App Volumes Manager服务器。本例中使用的是Horizon 7.13.2 ，App Volumes 2.18。
2. 配置App Volumes Manager。登录控制台，需要：

- 1个vSphere管理员密码；
- 1个AD域服务账户（只读权限即可）
- 指定应用程序包VMDK存储位置Datastore

**【准备Packaging VM】**


1. 需要准备1台VMware虚拟机作为应用程序封装的模板计算机(aka. `Packaging VM`)。操作系统和环境配置最好和后面应用要挂载到的模板虚拟桌面一致。
2. 在以上Packaging VM上安装App Volumes Agent，安装过程中指定App Volumes Manager服务器地址完成注册；
3. 立刻给Packaging VM创建一个快照；

**【创建应用包AppStack/Package】**

1. 登录App Volumes Manager创建一个AppStack（应用包），并指定Packaging VM这个Agent，远程发送【置备provision】来捕捉应用安装；此时包初始状态是`Unprovisioned`。
2. 在Packaging VM上应当可以看到一个录制消息框。按照消息框的提示：开始安装应用程序，安装完毕后，才可以点击【OK】完成捕捉；
3. （可选）如果将来应用需要部署到RDSH服务器，则在Packaging VM上，开始之前需要进入**Install**模式。命令行下
`change user /install`，应用安装完后，进入执行模式，需要 `change user /execute`
4. 安装过程如果要求重启系统，重启系统；然后再进入桌面；
5. 安装过程全部完成后，点击【OK】完成捕捉；
6. 回到App Volumes Manager查看AppStack包是否存在，包最终状态是`Enabled`；
7. AppStack包准备完毕。就可以分配给其他agent和用户计算机了。
8. 把Packaing VM的快照回滚到之前未安装任何应用之前。这是为了下一个应用捕捉准备一个干净环境，！！！重要
9. 重复以上步骤，可创建另一个应用程序包；

图1：创建好的应用包

![Package ready to assign](../../PostImages/post19_horizon_avm_package.jpg)

图2：App Volumens代理列表


![App Volume代理](../../PostImages/post19_horizon_avm_agents.jpg)

**【准备Horizon虚拟桌面自动场】**

1. 准备虚拟桌面Golden镜像。操作系统与Packaing VM一致（主要是安装`App Volumes Agent` 和Horizon Agent;
2. 创建一个快照作为Instant Cloned场基础快照使用;
3. 创建一个自动场；


**【指派应用程序包】**

1. 登录App Volumes Manager，在包详细信息里，可以把包指派给：
- AD用户
- AD组
- AD的OU单元（虚拟桌面或RDSH所在的OU单元）； --- 推荐

2. 验证。方法：
- 管理员查看App Volumes Manager中的Assignments标签页列表；
- 用户登录查看应用是否挂载。方法：可以查看安装目录或桌面；

**【额外：发布AppStack/Package到Horizon】**

::: tip 使用场景
可以把AppStack/Package发布到Horizon作为Published Application。Horizon 8以上支持直接把App Volumes Manager注册到Horizon控制台里，然后直接发布。但我使用的Horizon 7好像不行；
:::

Horizon 7需要这样：

1. 按照以上把AppStack/Package指派给RDSH服务器所在的OU；
2. 创建RDSH Farm场；
3. 发布Published Apps。选择“已安装程序列表”选择要发布的AppStack，如果没有找到（一般找不到，因为应用是用户登录时才挂载），就选择“手动选择”，并手动指定应用主程序文件位置；

### 2.2.2 部署到Citrix虚拟桌面环境

(待补充)

## 2.3 诊断和日志

 查看App Volumes Agent日志，位置 `C:\Program Files (x86)\CloudVolumes\Agent\Logs`
 
# 三、 FSLogix和App Volumes一起使用

实验证明，可以一起使用；



# 四、参考资料

### FSLogix

[Integrating FSLogix Profile Containers with VMware Horizon](https://techzone.vmware.com/resource/integrating-fslogix-profile-containers-vmware-horizon)

### App Volumes
[Provisioning an App Volumes AppStack on a RDSH or Citrix XenApp server (2105428)](https://kb.vmware.com/s/article/2105428)

### Master/Golden RDSH Image Provision

[Carl Stalhood:VMware Horizon 7.13.3 – Master RDS Host](https://www.carlstalhood.com/vmware-horizon-7-master-rds-host/)


