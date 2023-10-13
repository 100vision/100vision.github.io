---
# 这是文章的标题
title: Networking:内网穿透:Cloudflare Tunnel 实现穿透Microsoft Remote Desktop
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 64
# 设置作者
# 设置写作时间
date: 2023-10-12
# 一个页面可以有多个分类
category:
  - networking
  - Windows
# 一个页面可以有多个标签
tag:
  - networking
  - vpn
  - Cloudflare
  - rdp



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 无版权
---




## 前言

前面 [这里](https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BD%91%E7%BB%9C/reverse_proxyies.html) 有了解了几种内网穿透（俗称“打洞”）的方式，使用体验下来，感觉Cloudflare Tunnel最好用，一是部署起来很简单，二是使用体验有很好，速度快。

使用Cloudflare Tunnel穿透普通的Web服务比较简单，一些特殊的应用需要特别设置，比如Microsoft Remote Desktop,因此在这里记录一下。



## 正文

使用Cloudflare Tunnel可以穿透Windows远程桌面，实现RDP到家里的Windows机器。




### 穿透Microsoft Remote Desktop

- 参照 [官方教程：Set up a tunnel through the dashboard](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)部署好一个Tunnel到内网一台机器上；
- 添加一个`public hostname`,例如 rdp.example.com。我们将使用这个主机名rdp远程到家里Windows.
- 选择`RDP`协议，并指定内网的目标Windows主机，例如：rdp://192.168.8.8。这样Cloudflared将会把流量转发到192.168.8.8；
- 在远程主机上（rdp发起方）也安装Cloudflared [这里下载](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/)

:::note
如果有多个rdp客户端，也可以把cloudflared部署一台公共机器上，这个cloudflared仅仅只要保持运行即可，不需要配置
:::

- 在rdp客户端（发起方）执行以下命令启动cloudflared.
```
cloudflared access rdp --hostname rdp.example.com --url rdp://localhost:33890
```
rdp.example.com #是目标rdp服务器主机（可能是你家的windows）

localhost  #cloudflared运行所在的机器

:::note
以上命令要长期保持运行，不能关闭，否则RDP连接将会中断。为了不中断，如果是Windows平台，可以使用`winsw`等工具做成服务或是让它开机启动。参考：https://github.com/winsw/winsw
:::

- 开始发起RDP远程桌面。

启动 `Microsoft Remote Desktop`,远程主机填入 `localhost:33890`



## 参考
https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/rdp/