---
# 这是文章的标题
title: Docker：SpringBoot项目分层打包，实现更快构建Docker镜像
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 47
# 设置作者
# 设置写作时间
date: 2023-07-14
# 一个页面可以有多个分类
category:
  - DevOps
  - 工具
  - springboot
  - Docker
# 一个页面可以有多个标签
tag:
  - DevOps
  - Docker
  - 工具
  - Java

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

从V站学习到的一个知识，更快打包SpringBoot项目，分层构建Docker。

##  传统打包SpringBoot项目

SpringBoot默认使用了`org.springframework.boot:spring-boot-maven-plugin` 打包项目，把项目打包成jar包，每次打包的时候会把所有内容，比如依赖库、业务代码等打包，然后在项目中使用Dockerfile构建docker，推送到镜像库。

### 不足

有时稍微改动一点业务代码，整个项目资源都要全部重新打包构建，比较耗时。

## 新方法

自Springboot `2.3.0` 起，引入打包分层技术。只需要把项目变化的打包和构建，加快构建速度。


### 使用新方法

- 修改项目Pom，升级项目到`2.3.0`
```
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.0.RELEASE</version>
        <relativePath/>
    </parent>
```

- 修改项目pom文件，开启分层。
```
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <layers>
                        <enabled>true</enabled>
                    </layers>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

- 编写Docker文件。范例

``` Dockerfile
FROM openjdk:8-jre as builder

WORKDIR application

ADD ./target/*.jar ./app.jar

RUN java -Djarmode=layertools -jar app.jar extract

FROM openjdk:8-jre


WORKDIR application

COPY --from=builder application/dependencies/ ./

COPY --from=builder application/spring-boot-loader/ ./

COPY --from=builder application/snapshot-dependencies/ ./

COPY --from=builder application/application/ ./

EXPOSE 8080

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
```

- 修改业务代码，然后构建Docker

```
docker build . --cache-from my-registry.docker.com:5000/my-image:2.0.0

```


## 参考

[V2EX : docker image 分层的问题](https://www.v2ex.com/t/956719)

[CSDN:SpringBoot2.3.0 + Docker实现分层打包](https://blog.csdn.net/ttzommed/article/details/106759670)
