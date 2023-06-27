---
# 这是文章的标题
title: Windows：效率工具：使用Node.js Express快速部署一个简单Web服务器
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 44
# 设置作者
# 设置写作时间
date: 2023-06-27
# 一个页面可以有多个分类
category:
  - Windows
  - Web服务
  - 效率工具
  - Node.js
# 一个页面可以有多个标签
tag:
  - Nodejs
  - 效率工具




# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


## 前言 

有时需要快速起一个简单的Web服务器，提供文件下载服务，就像在之前文章：[脚本编程：Powershell：使用WinSCP Assembly实现文件上传](https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BC%96%E7%A8%8B/post42_ps_file_uploading_sftp.html) 使用场景。



## 步骤

> Windows环境，部署一个简单的文件下载站点。例如由3个文件

- 下载安装Node.js。http://www.nodejs.com.cn/ 
- 创建一个站点文件夹，例如`D:\SimpleSiteDefault`
- 创建要给下载目录,例如 ``D:\SimpleSiteDefault\downloads`
- 把下载文件放到`D:\SimpleSiteDefault\downloads`下。

- 切换到command prompt,并初始化目录。执行:
```
D:\SimpleSiteDefault> npm init
```
- 安装express模块，执行：
```
D:\SimpleSiteDefault> npm i express
```
- 创建一个`server.js`文件。文件内容：

```javascript
const express = require('express');
const path = require('path');

const app = express();

// Define the folder path where your file is located
const folderPath = path.join(__dirname, 'download');


// on the request to root (localhost:3000/)
app.get('/download/1', function(req, res) {
  // Use the path module to join the folder path and the file name
  res.download(path.join(folderPath, 'WinSCPnet.dll'), function(err) {
    if (err) {
      console.log(err);
    }
  });
});


// on the request to root (localhost:3000/)
app.get('/download/2', function(req, res) {
  // Use the path module to join the folder path and the file name
  res.download(path.join(folderPath, 'WinSCP.exe'), function(err) {
    if (err) {
      console.log(err);
    }
  });
});

// on the request to root (localhost:3000/)
app.get('/download/3', function(req, res) {
  // Use the path module to join the folder path and the file name
  res.download(path.join(folderPath, 'orcl.ppk'), function(err) {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000.');
});

```

- 启动Web服务器。执行：
```
D:\SimpleSiteDefault>node server
Server started on port 3000.
```

- 最后，可以尝试使用浏览器访问和文件下载. 文件下载Url分别是

http://<IP地址>:3000/download/1

http://<IP地址>:3000/download/1

http://<IP地址>:3000/download/1

