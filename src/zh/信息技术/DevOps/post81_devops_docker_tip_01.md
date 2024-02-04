---
title: 容器管理：Docker：如何编写高效的Dockerfile
icon: page
order: 81
date: 2024-02-04
category:
  - devops
  - docker
tags:
  - docker
  - 容器管理
  - 技巧
  - Dockerfile
  - 多阶段构建


sticky: false
star: true
footer: 
copyright: 无版权
---




## 前言 

`Dockerfile`是建立Docker镜像的基础描述文件，了解和学习怎么高效编写Dockerfile。

一个高效的Dockerfile，最终实现的目标是可以构建出更小的镜像，加快构建速度。

## 正文


- 尽量使用国内的基础镜像
- 尽量使用小的、够用基础镜像；
- 尽量排除掉无关的目录文件；
- 减少和控制Docker Layer层数量；
- 把不变层放到前面，可变层放到后面；
- 使用多阶段来分离build和runtime;

### 尽量使用国内的基础镜像

因为网络原因，使用国内基础镜像源毋庸置疑会加快构建速度。

- 例如，使用`From`指令指定使用阿里云或本地先`docker pull`
```
From registry.cn-beijing.aliyuncs.com/yournamespace/openjdk:8-jdk-alpine；
```
### 尽量使用小的，够用基础镜像

>可以考虑使用各种alpine镜像，但要注意一些已知问题

### 尽量排除掉无关的目录文件

- 不要放入无关的文件到构建目录；
- 可以使用 `.dockerignore` 来忽略这些文件

### 减少和控制Docker Layer层数量

- 多条`RUN`指令可以使用`&&`连接起来作为一条指令执行。因为一条指令就是加一层。例如：
```
RUN yum install -y git &&  yum install -y nginx
```
- 如有安装应用，适当清理缓存数据。例如：

```
FROM centos
RUN yum install -y git && \
    yum install -y nginx && \
    yum clean all && rm -rf /var/cache/yum/*
```

### 不变层的指令放到前面，常变层放到后面

>这样做的原因是，不变层可以缓存，下次构建可以复用,节省带宽和时间。


### 使用多阶段来分离build和runtime （重要）

> 使用多阶段得方式，可以大大降低镜像大小。实现应用构建环境和运行环境分离，最终只需要把运行环境的依赖打包到应用镜像中。

> 在Dockerfile中使用多个FROM声明，每个FROM声明可以使用不同的基础镜像

例如：
```
FROM golang:1.17.6 AS BUILDER
ADD . /go/src/github.com/golang/example
RUN go build -o /go/src/github.com/golang/example/hello /go/src/github.com/golang/example/hello/hello.go

FROM golang:1.17.6-alpine
WORKDIR /go/src/github.com/golang/example
COPY --from=BUILDER /go/src/github.com/golang/example/hello /go/src/github.com/golang/example/hello
ENTRYPOINT ["/go/src/github.com/golang/example/hello"]

```

- 两条`FROM`指令，意味两个阶段。
- 第一条`FROM`指令时应用构建阶段，并使用关键字`AS`来命名应用构建阶段 "BUILDER"。
- 第二条`FROM`指令起则是运行Runtime阶段，并使用`COPY --from=BUILDER` 把应用构建结果加入到应用镜像中，不需要的例如SDK则抛弃。


## 参考

- [使用多阶段构建](http://coinxu.github.io/blog/docker/4-3-use-multi-stage-builds.html)

- [编写更高效 Dockerfile - 阿里云 云效工程师指北](https://developer.aliyun.com/article/861395?utm_content=m_1000321658)