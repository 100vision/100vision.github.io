---
title: 容器管理：Docker：常用命令（1）
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

收集一些Docker常用基础命令。

## 正文




### 镜像管理

- 查看镜像。`docker image ls`
- 拉镜像。`docker pull`

- 推送（上传）镜像。`docker push`

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
~                                                                                                                                                                                             ~                                                         
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


- 查看docker对象使用的磁盘空间。`docker system df`
- 删除docker。 `docker rm ...`。技巧:删除所有停止状态的docker:
```
docker rm $(docker ps -a -q)
```
- 删除镜像。清理无用（没有引用的镜像）`docker image prune -a`
- 删除docker build缓存。`docker buildx prune -f`

- 删除所有未使用/未运行的docker对象（危险！！），docker,image等,但不包括volume。`docker system prune -f`，删除未使用的卷还需要 `docker system prune --volumes -a -f`

