---
# 这是文章的标题
title: 反垃圾邮件系列：Amavisd处理垃圾邮件几个Levels
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 11
# 设置作者
# 设置写作时间
date: 2023-03-14
# 一个页面可以有多个分类
category:
  - Linux
# 一个页面可以有多个标签
tag:
  - Linux
  - 反垃圾邮件
  - 邮件系统

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

:::note 
备忘。否则，时间久了，都忘得光光，又要花一番时间搜索。
:::

## 什么是Amavisd

>Amavis界面充当电子邮件服务器和外部内容过滤工具（如ClamAV和SpamAssassin）之间的代理。当电子邮件消息被电子邮件服务器接收时，它会传递给Amavis进行内容过滤。然后，Amavis使用病毒扫描程序和垃圾邮件过滤器的组合来分析消息的内容，并确定其是否恶意或垃圾邮件。


## Amavisd的几个动作levels



配置文件/etc/amavisd/amavisd.conf

`$sa_tag_level_deflt  = -9999;`  

说明：入站邮件的反垃圾检查起点分数 （设置一个负数，即意味着开启所有所有入站邮件检查）

`$sa_tag2_level_deflt = 6.0;`  

说明： 入站邮件的主题标记“Suspicious SPAM”的起点分数

`$sa_kill_level_deflt = 25; `

  说明：入站邮件的进入隔离邮箱的起点分数

`$sa_quarantine_cutoff_level = 40;`           

说明：入站邮件被直接丢弃的起点分数（即进入Quarantine的最大容忍分数）


