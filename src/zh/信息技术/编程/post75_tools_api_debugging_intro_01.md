---
# 这是文章的标题
title: 工具介绍系列:Api调试:RunApi和ShowDoc Api文档管理（团队开发）
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 75
# 设置作者
# 设置写作时间
date: 2023-12-04
# 一个页面可以有多个分类
category:
  - Web
  - 原创
  - 效率工具
  - 开发调试
# 一个页面可以有多个标签
tag:
  - Api调试
  - 接口
  - RestApi
  - 团队开发
  - 文档管理
  - 开发框架


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

说到api调试，第一选择就是`Postman` ，但不知道什么开始，开始需要登录网络后才可以使用。功能也强大了，但也更臃肿了。

之前也介绍过`Insommia` [文章见这里](../DevOps/post59_devops_tools_03_rest_api.md)，但好像不太好用了。

现在一些api工具，不仅可以做到更小巧，也能做到边调试边生成Api文档，还支持本地部署。

本文介绍的一款是`Showdoc`。



## 正文



### ShowDoc



> ShowDoc is a tool greatly applicable for an IT team to share documents online一个非常适合IT团队的在线API文档、技术文档工具


项目地址：https://github.com/star7th/showdoc


### ShowDoc组成


- Showdoc（服务端）
- RunApi (Showdoc客户端）

### showDoc服务器部署

```
# 原版官方镜像安装命令(中国大陆用户不建议直接使用原版镜像，可以用后面的加速镜像)
# 如果你打算安装ARM版本的docker镜像，请将 latest 标签改为 arm-latest
docker pull star7th/showdoc:latest 

# 中国大陆镜像安装命令（安装后记得执行docker tag命令以进行重命名）
docker pull registry.cn-shenzhen.aliyuncs.com/star7th/showdoc
docker tag registry.cn-shenzhen.aliyuncs.com/star7th/showdoc:latest star7th/showdoc:latest 

##后续命令无论使用官方镜像还是加速镜像都需要执行

#新建存放showdoc数据的目录
mkdir -p /showdoc_data/html
chmod  -R 777 /showdoc_data
# 如果你是想把数据挂载到其他目录，比如说/data1，那么，可以在/data1目录下新建一个showdoc_data/目录，
# 然后在根目录的新建一个软链接/showdoc_data到/data1/showdoc_data
# 这样既能保持跟官方教程推荐的路径一致，又能达到自定义存储的目的.

#启动showdoc容器
docker run -d --name showdoc --user=root --privileged=true -p 4999:80 \
-v /showdoc_data/html:/var/www/html/ star7th/showdoc
```

### Showdoc客户端runApi

>https://www.showdoc.com.cn/runapi/30291


### 其他Api调试工具

- 类似showdoc的`RunnerGO`
- IDE里面的插件http Restclient