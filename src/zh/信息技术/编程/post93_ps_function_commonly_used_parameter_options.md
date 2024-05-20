---
# 这是文章的标题
title: 脚本编程：Powershell：Powershell 常用参数修饰词选项
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 93
# 设置作者
# 设置写作时间
date: 2024-05-20
# 一个页面可以有多个分类
category:
  - Scripting Language
  - 脚本编程
  - Powershell

# 一个页面可以有多个标签
tag:
  - Powershell



  



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

## 前言

几个常用Powershell参数修饰词

## 正文

```powershell
function Write-Log
{
    [CmdletBinding()]
    Param
    (
        [Parameter(Mandatory=$true,
                   ValueFromPipelineByPropertyName=$true)]
        [ValidateNotNullOrEmpty()]
        [Alias("LogContent")]
        [string]$Message,

        [Parameter(Mandatory=$false)]
        [Alias('LogPath')]
        [string]$Path='C:\Logs\PowerShellLog.log',
        
        [Parameter(Mandatory=$false)]
        [ValidateSet("Error","Warn","Info")]
        [string]$Level="Info",
        
        [Parameter(Mandatory=$false)]
        [switch]$NoClobber
    )
```

- `Mandatory=$true | false` 修饰参数，是否强制要求函数带上这个参数
- `ValueFromPipelineByPropertyName=$true | false` ，是否从管道接收属性值，比较常用如果从上一个cmdlet的输出当输入
- `[ValidateNotNullOrEmpty()]`，验证参数值是否null
- `[Alias("LogContent")]`， 参数别名
- `[ValidateSet("Error","Warn","Info")]` 限定参数可选值
- `[switch]$NoClobber`， 定义一个开关布尔值数，使用 `-NoClobber`。带上默认值则`true`,不带则`false`