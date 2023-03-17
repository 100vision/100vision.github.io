---
# 这是文章的标题
title: 工具：rsync注意事项
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 11
# 设置作者
# 设置写作时间
date: 2023-03-17
# 一个页面可以有多个分类
category:
  - Linux
# 一个页面可以有多个标签
tag:
  - Linux
  - 工具


# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


## Rsync的字符编码问题

```shell
[root@myserver ~]# rsync -avz --iconv=gbk,utf8 /weaver/ /mnt/lenovo-nas/
```
需要指定字符集`--iconv=gbk,utf8`,否则同步一些中文文件名会报`invalid argument`

