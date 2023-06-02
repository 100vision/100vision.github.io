---
# 这是文章的标题
title: SCCM：问题排查2：CCM 客户端安装错误：Setup with Failed to download files through BITS. Error 0x80080005
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 34
# 设置作者
# 设置写作时间
date: 2023-06-02
# 一个页面可以有多个分类
category:
  - Windows
  - SCCM
# 一个页面可以有多个标签
tag:
  - SCCM
  - 疑难排查
  - Troubeshooting
  - 0x80080005



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


## 问题描述

CCM客户端安装失败，查看ccmsetup.log:

```
Using DP location http://SERVERNAME.DOMAIN/SMS_DP_SMSPKG$/XYZ00002
Failed to download client files by BITS. Error 0x80080005
Sending state '309'...
Updating MDM_ConfigSetting.ClientDeploymentErrorCode with value 2148007941
Failed to download from DP 'http://SERVERNAME.DOMAIN/SMS_DP_SMSPKG$/XYZ00002', error 0x80080005.
```
- 看起来是BITS （Bit Transfer Service)有问题，手动在启动，失败。
- 查询可能是BITS版本太低，确认版本不低于BITS 2.5：
```Powershell
 get-item "C:\Windows\System32\qmgr.dll" | Select-Object -ExpandProperty VersionInfo
ProductVersion   FileVersion      FileName
--------------   -----------      --------
7.8.15063.0      7.8.15063.0 (... C:\Windows\System32\qmgr.dll
```
- 最后参考[这里](https://sccmnotes.wordpress.com/2021/04/13/ccmsetup-exe-error-failed-to-download-files-through-bits-error-0x80080005/) 清理 `C:\ProgramData\Application Data\Microsoft\Network\Downloader`所有内容。

- 重启客户端服务里的CCM安装服务，再看`ccmsetup.log`，可以看到顺利安装

## 参考

https://sccmnotes.wordpress.com/2021/04/13/ccmsetup-exe-error-failed-to-download-files-through-bits-error-0x80080005/
