---
# 这是文章的标题
title: 熟悉使用curl调试api
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 6
# 设置作者
# 设置写作时间
date: 2023-02-22
# 一个页面可以有多个分类
category:
  - Web编程
  - DevOps
# 一个页面可以有多个标签
tag:
  - Web编程
  - http基础
  - curl
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 无版权
---




## 前言

`cURL`，一个很强大的http api调试命令行工具，可以在Shell上直接使用 有必要掌握基础使用方法。





## 安装

```shell
https://curl.haxx.se/download.html
```

## 常见使用

- 发起GET 请求
```shell
curl -i http://localhost:8080/api
```
- 携带cookies发起请求
```shell
curl -b 'a=1;b=2' http://localhost:8080/api
```

- 保存cookies到文件并使用

```shell
curl -c /tmp/mycookies http://localhost:8080/api
curl -b @/tmp/mycookies http://localhost:8080/api
```

- 携带header发起请求，可以多个-H参数
```shell
curl -H 'Content-Type:application/json' 
-H 'CustomHeader=hello' http://localhost:8080/api
```

- 发起POST(携带json)
```shell
curl -XPOST -H 'Content-Type:application/json' -d '{"id:1","name:lin"} http://localhost:8080/api
```

- 发起POST(携带json文件)
```shell
- 发起POST(携带json)
```shell
curl -X POST -H "Content-Type: application/json" -d @/tmp/cats.json http://localhost:8080/api
```
```

- 发起POST (携带KV, application/x-www-form-urlencoded)
```shell
curl -d 'k1=value1&k2=value2' http://localhost:8080/api
```

- 携带User-Agent
```shell
curl -A 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0' http://localhost:8080/api
```



## 扩展

- 可以使用POSTMAN帮忙生成curl参数，如图：
