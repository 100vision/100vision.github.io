---
# 这是文章的标题
title: Java：同步异步网络编程IO：BIO,NIO,Epoll，AIO（全文转载）
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 51
# 设置作者
# 设置写作时间
date: 2023-08-16
# 一个页面可以有多个分类
category:
  - DevOps
  - 工具
  - Web
  - Nginx
  - Java
# 一个页面可以有多个标签
tag:
  - DevOps
  - Nginx
  - 工具
  - 性能调优
  - 异步同步
  - 阻塞IO



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

看到比较好的java IO异步编程比喻,全文转载



## 正文

有一个养鸡的农场，里面养着来自各个农户（Thread）的鸡（Socket），每家农户都在农场中建立了自己的鸡舍（SocketChannel）

- `BIO`

Block IO，每个农户盯着自己的鸡舍，一旦有鸡下蛋，就去做捡蛋处理；

- `NIO`

No-Block IO-单Selector，农户们花钱请了一个饲养员（Selector），并告诉饲养员（register）如果哪家的鸡有任何情况（下蛋）均要向这家农户报告（select keys）；

- `NIO` 

No-Block IO-多Selector，当农场中的鸡舍逐渐增多时，一个饲养员巡视（轮询）一次所需时间就会不断地加长，这样农户知道自己家的鸡有下蛋的情况就会发生较大的延迟。怎么解决呢？没错，多请几个饲养员（多Selector），每个饲养员分配管理鸡舍，这样就可以减轻一个饲养员的工作量，同时农户们可以更快的知晓自己家的鸡是否下蛋了；

- `Epoll模式`

如果采用Epoll方式，农场问题应该如何改进呢？其实就是饲养员不需要再巡视鸡舍，而是听到哪间鸡舍的鸡打鸣了（活跃连接），就知道哪家农户的鸡下蛋了；

- `AIO` 

Asynchronous I/O, 鸡下蛋后，以前的NIO方式要求饲养员通知农户去取蛋，AIO模式出现以后，事情变得更加简单了，取蛋工作由饲养员自己负责，然后取完后，直接通知农户来拿即可，而不需要农户自己到鸡舍去取蛋。



## 参考

以上来自： https://plantegg.github.io/2019/07/31/NIO%E5%92%8CEpoll/