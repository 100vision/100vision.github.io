---
# 这是文章的标题
title: Docker：关于谨慎使用Alpine基础镜像
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 16
# 设置作者
# 设置写作时间
date: 2023-04-13
# 一个页面可以有多个分类
category:
  - DevOps
  - 工具
# 一个页面可以有多个标签
tag:
  - DevOps
  - Docker
  - 工具

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 无版权
---

:::note
了解到`Alpine`基础镜像的一些弊端，方便以后避坑。
:::

## Alpine介绍

> Alpine 操作系统是一个面向安全的轻型 Linux 发行版。它不同于通常 Linux 发行版，Alpine 采用了 musl libc 和 busybox 以减小系统的体积和运行时资源消耗，但功能上比 busybox 又完善的多，因此得到开源社区越来越多的青睐。在保持瘦身的同时，Alpine 还提供了自己的包管理工具 apk

### 特点

- 体积小。只有几MB。
- 使用了musl C类动态库。没有使用 glibc 这样比较重的动态库，而是使用 busybox + musl libc，也使得它所以体积小。

### 存在的坑



- DNS 转发失败
- 底层依赖缺失很多
- 构建 Python docker 容器速度慢

:::warning 
生产环境，应该尽力避免使用Alpine作为基础镜像
:::

### 推荐基础镜像

`Debian或Ubuntu` , 这些镜像也不是很大，才几十MB

## 参考

https://juejin.cn/post/7120557446682116132 

https://cloud.tencent.com/developer/article/2168079