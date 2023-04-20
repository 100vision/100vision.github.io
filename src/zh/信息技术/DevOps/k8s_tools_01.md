---
# 这是文章的标题
title: 工具：Kubernetes:部署工具之一：Rancher Server
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 17
# 设置作者
# 设置写作时间
date: 2023-04-20
# 一个页面可以有多个分类
category:
  - DevOps
  - 工具
# 一个页面可以有多个标签
tag:
  - DevOps
  - k8s
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
想了解一下k8s快速部署集群的工具都有哪些，哪个更省力省时。
:::

## 介绍

通过网上了解到,Kubernetes集群部署工具有很多，主要有：

- Minikube (只适合个人测试)
- Kubeadmin (Kubernetes官方的command-line工具)
- RKE (Rancher出品的轻量部署工具)
- Rancher Server (Rancher的集群部署/管理)

## 比较和倾向

- 除了MinuKube, 其他3个可以用于生产环境部署Kubernetes；
- Kubeadmin 和RKE好像只能用于本地基础架构下部署Kubernetes，不支持Cloud Infrastructure Provider,例如AWS云等。
- Rancher Server 支持Cloud Provider也支持本地裸金属服务器上部署；且有Web UI

**所以如果自建Kubernetes，个人比较倾向使用`Rancher Server`来部署Kubernetes，比较快速。**



## 使用Rancher Server

### 安装部署Rancher Server

Rancher Server 可以Docker形式部署在Kubernetes之外，也可以二进制部署。

### 使用Rancher Server 创建集群

1. 需要规划好集群。比如选择集群网络插件，集群规模。一般生产环境建议使用3个etcd节点起步（奇数个etcd)。
2. 在每个节点上安装好操作系统；
3. 在每个节点上安装好必备软件环境（Docker等）
::: warning 关于Docker版本
所有节点上的Docker版本保持一致。如果是虚拟机，可以克隆成模板使用.
::: warning 关于Docker版本

4. 在每个节点上配置好防火墙（或是关闭）；
5. 在Rancher Server上创建集群，生成集群配置。
6. 在每个节点上执行Rancher Server上生成的配置命令，注册加入；类似：
```bash
curl -fL https://my-rancher-server/system-agent-install.sh | sudo  sh -s - --server https://my-rancher-server --label 'cattle.io/os=linux' --token 94dmz8db447rhqx2hm82v96vwl8wvdtvcd77mgb2t9mcmcl2n7mcth --ca-checksum 1aabd46120eb41ab0b20a088ccc7b327c79aaf2cc9ed64c2a9ced335c7ec349a --etcd --controlplane --worker
```

::: tip
Rancher Server除了支持裸金属服务器和vSphere虚拟环境上部署，也支持 AWS/Azure/Google云主机节点上创建集群；
:::

## 其他

除了自己部署Kubernetes外，也可以选择成品Kubernetes，。像AWS,阿里云都有自己的Kubernetes产品，不需要用户自己部署，升级和部署都很省时省力。
