---
# 这是文章的标题
title: 脚本编程：Powershell：创建一个简单的HTTP REST Api服务
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 82
# 设置作者
# 设置写作时间
date: 2024-02-04
# 一个页面可以有多个分类
category:
  - Scripting Language
  - 脚本编程
  - Powershell

# 一个页面可以有多个标签
tag:
  - Powershell
  - Web编程
  - api


  



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

## 前言

Powershell作为一个脚本语言，也是可以像服务端编程语言，例如Java/C#一样启动一个Web服务器，提供简单的REST Api服务。

这样，结合丰富Powershell Cmdlets就可以对外提供丰富的数据。

## 正文

- 示例代码1: HTTP REST Api

:::note 注意
需要管理员启动该脚本
:::

```powershell
# Source code https://hkeylocalmachine.com/?p=518
# Create a listener on port 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://+:8010/') 
$listener.Start()
'Listening ...'

# Run until you send a GET request to /end
while ($true) {
    $context = $listener.GetContext() 

    # Capture the details about the request
    $request = $context.Request

    # Setup a place to deliver a response
    $response = $context.Response
   
    # Break from loop if GET request sent to /end
    if ($request.Url -match '/end$') { 
        break 
    } else {

        # Split request URL to get command and options
        $requestvars = ([String]$request.Url).split("/");        

        # If a request is sent to http:// :8000/wmi
        if ($requestvars[3] -eq "wmi") {
           
            # Get the class name and server name from the URL and run get-WMIObject
            $result = get-WMIObject $requestvars[4] -computer $requestvars[5];

            # Convert the returned data to JSON and set the HTTP content type to JSON
            $message = $result | ConvertTo-Json; 
            $response.ContentType = 'application/json';

       } else {

            # If no matching subdirectory/route is found generate a 404 message
            $message = "This is not the page you're looking for.";
            $response.ContentType = 'text/html' ;
       }

       # Convert the data to UTF8 bytes
       [byte[]]$buffer = [System.Text.Encoding]::UTF8.GetBytes($message)
       
       # Set length of response
       $response.ContentLength64 = $buffer.length
       
       # Write response out and close
       $output = $response.OutputStream
       $output.Write($buffer, 0, $buffer.length)
       $output.Close()
   }    
}
 
#Terminate the listener
$listener.Stop()
$listener.Dispose()


```
- 示例2：提供文件下载

```powershell
# 创建一个http监听器listner，和其他语言大同小异
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://+:8010/') 

# 启动一个监听器
$listener.Start()
'Listening ...'

# 该HTTP服务一直运行，除非向它发送一个"http://xxx/end"请求。Run until you send a GET request to /end
while ($true) {
    $context = $listener.GetContext() 

    # Capture the details about the request 获取一个会话的HTTP Request对象
    $request = $context.Request

    # Setup a place to deliver a response 获取一个会话的HTTP Response对象
    $response = $context.Response
   
    # Break from loop if GET request sent to /end
    if ($request.Url -match '/end$') { 
        break 
    } else {

        # Split request URL to get command and options
        $requestvars = ([String]$request.Url).split("/");        

        # If a request is sent to http:// :8010/downloads 
        if ($requestvars[3] -eq "downloads") {
           
            #文件转换成字节（读一个文件到内存）
            $inputBytes = [IO.File]::ReadAllBytes("C:\AdminPack\a\DB_Backup_Download.ps1")
            # 指定文件下载的内容类型
            $response.ContentType = 'application/octet-stream';



       } else {

            # If no matching subdirectory/route is found generate a 404 message
            $message = "This is not the page you're looking for.";

            #字符串转换成字节
            $inputBytes = [System.Text.Encoding]::UTF8.GetBytes($message)
            $response.ContentType = 'text/html' ;
       }

       
       # Set length of response
       $response.ContentLength64 = $inputBytes.length

       # 获取HTTP Response输出流
       $output = $response.OutputStream

       #通过Response输出流对象输出，返回给浏览器
       $output.Write($inputBytes, 0, $inputBytes.length)
       $output.Close()
   }    
}
 
#停止关闭和销毁监听器对象
$listener.Stop()
$listener.Dispose()


```
## 参考

https://hkeylocalmachine.com/?p=518



