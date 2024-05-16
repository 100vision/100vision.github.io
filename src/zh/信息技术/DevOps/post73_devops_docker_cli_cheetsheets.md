---
title: 容器管理：Docker：常用命令（1）:镜像篇
icon: page
order: 73
date: 2023-11-10
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

收集一些Docker常用基础命令。主要记录镜像(Image)管理。`镜像像是编程概念中的类，容器则是对象实例`，这样可以帮助理解镜像和容器的关系。

## 正文




### 镜像管理

- 查看本地所有镜像。`docker image ls`

- 使用镜像源的国内镜像。`vi /etc/docker/daemon.json `

```
    {

         "registry-mirrors": [
              "https://hub-mirror.c.163.com","https://xxxxx.mirror.aliyuncs.com", "https://dockerhub.azk8s.cn"
         ],

         "insecure-registries": [
              "local.example.com:6000"
         ]

    }
{
    "storage-driver": "devicemapper"
}
```

- 配置镜像源的代理. `vi /etc/systemd/system/docker.service.d/http-proxy.conf`
```
[Service]
Environment="HTTPS_PROXY=http://192.168.2.153:1080"
Environment="HTTP_PROXY=http://192.168.2.153:1080"
                                                       
```


- 拉(下载）远程镜像。`docker pull <镜像名>`

- 推送（上传）本地镜像到远程registry。`docker push`，一般是：

```bash
#先给本地镜像打上包含远程镜像服务器名的tag
[root@dockerhost01 ~]# docker tag localhost:3000/myImage:latest remote.domain.com/myImage:latest

# 开始推送。如果需要远程库需要认证，先登录docker login
[root@dockerhost01 ~]# docker push remote.domain.com/myImage:latest

```


- 创建（构建）镜像。`docker build -t <image_name> .`,需要编写Dockerfile。Dockerfile示例：
```
# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Make port 8080 available outside the container
EXPOSE 8080

# Define the command to run the application
CMD [ "npm", "start" ]

```
:::tip 编写高效的Dockerfile
可以参考另一篇文章[ “如何编写高效的Dockerfile”](../../信息技术/DevOps/post81_devops_docker_tip_01.md)
:::

### 镜像分析

- 查看镜像配置 `docker inspect <image ID>` ,也可以查看容器配置,把image ID 换成container ID；
- 查看镜像的创建历史信息 `docker history <image ID 或image name>`。可以看到镜像各层的sha256。
使用`--no-trunc`可以看到完整的sha256
```bash
root@runoob:~# docker history runoob/ubuntu:v3
IMAGE             CREATED           CREATED BY                                      SIZE      COMMENT
4e3b13c8a266      3 months ago      /bin/sh -c #(nop) CMD ["/bin/bash"]             0 B                 
<missing>         3 months ago      /bin/sh -c sed -i 's/^#\s*\(deb.*universe\)$/   1.863 kB            
<missing>         3 months ago      /bin/sh -c set -xe   && echo '#!/bin/sh' > /u   701 B               
<missing>         3 months ago      /bin/sh -c #(nop) ADD file:43cb048516c6b80f22   136.3 MB
```
- 也可以使用其他开源工具分析镜像。例如`dive`，项目地址 [wagoodman /
dive
](https://github.com/wagoodman/dive)
