---
title: 容器管理：Docker：常用命令（2）:容器篇
icon: page
order: 94
date: 2024-05-16
category:
  - devops
  - docker
tags:
  - docker
  - 容器管理
  - 技巧


sticky: false
star: true
footer: 
copyright: 无版权
---




## 前言 

（续）收集一些Docker常用基础命令，这篇主要记录容器(Container)管理。
`镜像像是编程概念中的类，容器则是对象实例`，这样可以帮助理解镜像和容器的关系。

## 正文



### Docker Daemon管理
- 查看dockerd配置信息。`docker info`




### 容器管理类型

- 创建一个docker容器但不启动，`docker create ...`
- 创建一个docker而且启动docker。 `docker run ...`， 等于`docker create + docker start...`
- 停止docker。`docker stop ...`
- 启动一个docker。`docker start ...`
- 检查一个运行中的docker配置元数据。`docker inspect <docker name>`
- 查看docker的输出日志. `docker logs -f <docker name>`
- 在docker内部里运行命令。`docker exec -it <docker name> <shell命令>`




### 清理类

> 镜像如果不清理，有时会非常吃磁盘空间。

- 查看docker对象使用的磁盘空间。`docker system df`
- 删除docker。 `docker rm ...`。技巧:删除所有停止状态的docker:
```
docker rm $(docker ps -a -q)
```
- 删除镜像。清理无用（没有引用的镜像）`docker image prune -a`
- 删除docker build缓存。`docker buildx prune -f`

- 删除所有未使用/未运行的docker对象（危险！！），docker,image等,但不包括volume。`docker system prune -f`，删除未使用的卷还需要 `docker system prune --volumes -a -f`




