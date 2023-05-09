---
# 这是文章的标题
title: 组网：方案介绍和选择
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 24
# 设置作者
# 设置写作时间
date: 2023-05-09
# 一个页面可以有多个分类
category:
  - networking
  - vpn
# 一个页面可以有多个标签
tag:
  - networking
  - vpn
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
---






## 组网

>家庭和办公室，总部和分支机构使用VPN组网，实现NAT后面的设备组网。有一些开源解决方案，适合家庭办公，小型办公室廉价组网。相比打洞、NAT穿透技术只能少数端口服务，组网优势更大，支持更多服务和协议。

### 组网方案选项

当下流行的有这么几种

- **WireGuard** 
- **TailScale (Headscale)**
- **Zerotier**

### WireGuard

详见 [WireGuard组网](https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BD%91%E7%BB%9C/wireguard.html)

### Tailscale

>Tailscale是Tailscale公司在WireGuard基础上出来的产品，相比WireGuard纯内核实现，Tailscale更多是在用户层上实现。免费版本支持25个设备。


还未部署测试

### Zerotier

还未了解
