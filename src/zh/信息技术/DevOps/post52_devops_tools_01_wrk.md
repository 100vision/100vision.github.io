---
# 这是文章的标题
title: 工具介绍：Http Web压测工具之 wrk
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 52
# 设置作者
# 设置写作时间
date: 2023-08-16
# 一个页面可以有多个分类
category:
  - DevOps
  - 工具
  - Web
# 一个页面可以有多个标签
tag:
  - DevOps
  - 工具
  - 性能调优
  - 压力测试




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

了解一下一款站点压测工具wrk, 备查。以后再了解一下Jmeter等更复杂的压测工具。
以下大部分内容来自 https://www.cnblogs.com/xinzhao/p/6233009.html 



## 正文

### 介绍

wrk可以简单测试网站和接口压力测试，了解压力测试下的性能表现。性能表现主要是看的能处理的web请求数。

>wrk is a modern HTTP benchmarking tool capable of generating significant load when run on a single multi-core CPU. It combines a multithreaded design with scalable event notification systems such as epoll and kqueue.

:::note
wrk支持大多数类UNIX系统，不支持windows。
:::


### 安装

安装wrk非常简单，只要从github上下载wrk源码，在项目路径下执行make命令即可。

```shell
git clone https://github.com/wg/wrk
make

```

### 开始使用


使用方法: wrk <选项> <被测HTTP服务的URL>                            
  Options:                                            
    -c, --connections <N>  跟服务器建立并保持的TCP连接数量  
    -d, --duration    <T>  压测时间           
    -t, --threads     <N>  使用多少个线程进行压测   
                                                      
    -s, --script      <S>  指定Lua脚本路径       
    -H, --header      <H>  为每一个HTTP请求添加HTTP头      
        --latency          在压测结束后，打印延迟统计信息   
        --timeout     <T>  超时时间     
    -v, --version          打印正在使用的wrk的详细版本信息
                                                      
  <N>代表数字参数，支持国际单位 (1k, 1M, 1G)
  <T>代表时间参数，支持时间单位 (2s, 2m, 2h)


### 范例

wrk -t8 -c200 -d30s --latency  "http://www.bing.com"

输出：
Running 30s test @ http://www.bing.com
  8 threads and 200 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    46.67ms  215.38ms   1.67s    95.59%
    Req/Sec     7.91k     1.15k   10.26k    70.77%
  Latency Distribution
     50%    2.93ms
     75%    3.78ms
     90%    4.73ms
     99%    1.35s 
  1790465 requests in 30.01s, 684.08MB read
Requests/sec:  59658.29
Transfer/sec:     22.79MB



### 高级使用：使用Lua脚本个性化wrk压测

详见  https://www.cnblogs.com/xinzhao/p/6233009.html