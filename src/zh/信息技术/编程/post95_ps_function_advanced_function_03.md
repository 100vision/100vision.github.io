---
# 这是文章的标题
title: 脚本编程：Powershell：Powershell Function参数使用技巧（2):在远程计算上运行本地Function
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 96
# 设置作者
# 设置写作时间
date: 2024-06-07
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

Powrshell自带的很多Function都支持远程执行，例如`Restart-Computer` 支持参数`Computer`指定远程计算机或是本地系统实现远程重启计算机。

我们自定义的Function要实现在远程计算机上执行，则可以借用`Invoke-Command`来实现。

## 正文

- 1、使用`Invoke-Command`来执行本地Function。 举例：

```Powershell
#自定义函数
Function MyFunction {

    [CmdletBinding()]
    Param (
        [Parameter(Position = 1)] #显式指定参数位置，第2个参数。如果不显式指定，默认按定义顺序排序
        [String] $Message,
        [Parameter(Position = 0)] #显式指定参数位置，第1个参数
        [Int]$Count
    )


    "Say $Message for $Count times." | Out-File C:\AdminPack\PSRemoteExec.log

}

#在远程计算机上执行本地Function "MyFunction", 使用ArugementList指定参数值列表
Invoke-Command -ComputerName "Remote_Computer_Name" -ScriptBlock ${Function:MyFunction} -ArgumentList 5,"Hello"

```

## 扩展

- 也可以使用`Invoke-Command`来实现Function的内部远程执行能力。 举例：

```powershell

#自定义函数
Function MyFunction {

    [CmdletBinding()]
    Param (

        [Parameter(Position = 1)] #显式指定参数位置，第2个参数。如果不显式指定，默认按定义顺序排序
        [String] $Message,

        [Parameter(Position = 0)] #显式指定参数位置，第1个参数
        [Int]$Count,

        [Parameter(Position = 2)] #显式指定参数位置，第3个参数
        [String]$ComputerName=$env:COMPUTERNAME

    )


    #在远程计算机上执行Get-Process
    Invoke-Command -ComputerName $ComputerName -ScriptBlock { Get-Process -Name explorer} 

}

#使用

MyFunction -ComputerName "Remote_Computer_Name"

```

## 参考

[Run Local Functions Remotely in PowerShell](https://duffney.io/run-local-functions-remotely-in-powershell/)