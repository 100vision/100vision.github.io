---
# 这是文章的标题
title: Api网关：Nginx：Proxy模块：使用Proxy_Redirect重定向Location
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 49
# 设置作者
# 设置写作时间
date: 2023-07-30
# 一个页面可以有多个分类
category:
  - DevOps
  - 工具
  - Web
  - 解决问题
  - api网关
# 一个页面可以有多个标签
tag:
  - DevOps
  - Nginx
  - 工具
  - http404
  - 解决方案


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

介绍使用Nginx功能强大的反向代理功能中的Proxy模块阶段的`proxy_redirect`，实现改写上游upstream的http header的location字段，返回给用户浏览器（或前端）。





## 使用场景

改写上游upstream的http header的location字段。这样确保用户浏览器（或前端）每次会发起改写后的request url，正确的URL。 这样在API网关Nginx上解决前、后端url不一致导致的`http 404`的问题。

## 使用举例

> 例如：上游后端有个用户身份验证接口服务url `/auth`, 反向代理url或前端请求url是`/user/auth`。

- 首先，反向代理配置使用了`proxy_pass`指定反向代理到一个上游后端服务.

``` 
location ^~ /user {
  proxy_pass proxy_pass http://svc_auth
}
```

- 然后，使用`rewrite` 指令改写浏览器请求url `/user/auth` 为 `/auth`。这样实现了`在转发给后端前改写`， 因为上游后端无法识别`/user/auth`（因为没有），否则会404。

``` 
location ^~ /user {
  rewrite ^/user(/.*)$ $1 break; 
}
```

- 最后，把上游后端的返回url(location) 从`/auth`改写到`/user/auth`。`在转发给用户浏览器前`改写, 这样确保后续每次前端(或浏览器)发起的都是`/user/auth`，而不是后端默认返回的`/auth`。

```
location ^~ /user {
   proxy_redirect ~^(https?:\/\/[^\\\/:]+)(:(\d+))?(.*) $1$2/user$4; 
}
```

### 完整配置

```
upstream svc_auth {
   server 192.168.0.101:443
}

location  ^~ /user {

        rewrite ^/user(/.*)$ $1 break;   
        proxy_pass https://svc_auth;
        proxy_redirect ~^(https?:\/\/[^\\\/:]+)(:(\d+))?(.*) $1$2/user$4;  

    }
```