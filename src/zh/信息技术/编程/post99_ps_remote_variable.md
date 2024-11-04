---
# 这是文章的标题
title: 脚本编程：Powershell：Invoke-command使用本地变量
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 99
# 设置作者
# 设置写作时间
date: 2024-06-27
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

`Invoke-command`可以实现在远程系统上执行Powershell代码块。方式是`invoke-command -ScriptBlock { <code>}`。很多时候需要把本地变量传递到远程代码块 `-ScriptBlock`。

如果直接传递本地变量，会获取不到值。需要使用特殊方式。

## 正文

###  PowerShell 3.0以下版本

> 可以使用`-ArgumentList`关键字。

- 代码示例

```powershell
$ps = "*PowerShell*"
Invoke-Command -ComputerName S1 -ScriptBlock {
  param($log)
  Get-WinEvent -LogName $log
} -ArgumentList $ps
```

**解释**

- 把本地变量通过`ArgumentList`传递。
- 通过`param`接收。如果是多个变量，要注意确保传递的参数顺序与远程脚本块中 param 关键字定义的参数顺序一致

###  PowerShell 3.0以上版本

- 使用`$Using` 修饰符传递普通变量

```powershell
$ps = "*PowerShell*"
Invoke-Command -ComputerName S1 -ScriptBlock {
  Get-WinEvent -LogName $Using:ps
}
```

- 使用`@Using` 修饰符传递hash参数（多个变量）


```powershell
$Splat = @{ Name = "Win*"; Include = "WinRM" }
Invoke-Command -Session $s -ScriptBlock { Get-Service @Using:Splat }
```

## 参考

- [微软官方 about_Remote_Variables](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_remote_variables?view=powershell-5.1)