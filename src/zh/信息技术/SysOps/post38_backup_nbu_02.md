---
# 这是文章的标题
title: 数据保护：Netbackup：解决 CA Host-ID获取证书失败：Error 8504
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 39
# 设置作者
# 设置写作时间
date: 2023-06-19
# 一个页面可以有多个分类
category:
  - 数据保护
  - 问题解决

# 一个页面可以有多个标签
tag:
  - 数据备份
  - Netbackup
  - 原创
  



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

## 问题描述

- 在admin console GUI里，当前配置Storage服务求或操作AIR或添加信任Master服务器，当Netbackup备份域内或跨域之间获取Master证书失败；
- 在shell下，使用`nbcertcmd -getCertificate`获取master服务器失败。提示错误`8504`,因为CA证书不信任。

## 问题分析

媒体服务器（Storage Server)不信任Master服务器CA证书。

## 解决办法

> 手动部署证书。通过nbcertcmd离线申请证书, 然后发到目标域的Master上颁发。

### 步骤

- 在Master准备一个证书token或是使用已有的token。

- 在media 上创建证书申请，执行：
```
/usr/openv/netbackup/bin/admincmd/nbcertcmd -createCertRequest -RequestFile mymediaserver.csr -server <target_master_server>
```

- 在目标域的master上签发证书，执行：
```
Nbcertcmd -signCertificate -RequestFile mymediaserver.csr -CertificateFile mycert.crt -token <目标域Master发放的token ID>
```
- 在media上部署证书，执行：
```
Nbcertcmd -deployCertificate  -CertificateFile mycert.crt
```
