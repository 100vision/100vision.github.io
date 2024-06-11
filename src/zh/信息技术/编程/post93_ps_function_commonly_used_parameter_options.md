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

### 补充

::: tip （2024/06/11 补充)
`CmdletBinding` 是 PowerShell 中的一个特性，用于标记自定义函数具有类似于内置 cmdlet 的行为。当你在 PowerShell 函数定义中添加 `[CmdletBinding()]` 特性时，你为函数赋予了一些特定的功能和规则，这些功能通常与 PowerShell 的命令行接口相一致。以下是一些 `CmdletBinding` 特性的关键特性：

1. **参数设置器 (Parameter Sets)**：你可以定义多个参数集，允许用户以不同方式调用函数，同时确保参数的互斥性和必需性。

2. **开关参数 (Switch Parameters)**：允许你创建不需要值的布尔参数。

3. **常见参数 (Common Parameters)**：启用一些常见的 PowerShell 参数，如 `-Verbose`, `-Debug`, `-ErrorAction`, `-WarningAction`, `-WhatIf` 和 `-Confirm` 等，这些参数提供了诊断和控制执行流程的选项。

4. **绑定行为 (Binding Behavior)**：例如，`-Confirm` 和 `-WhatIf` 参数会影响函数的执行，使得在执行前可以确认或预览操作。

5. **错误处理 (Error Handling)**：可以指定如何处理错误，比如使用 `-ErrorAction` 参数来控制遇到错误时的行为。

6. **命令生命周期回调方法 (Command Lifecycle Callback Methods)**：如 `BeginProcessing`, `ProcessRecord`, 和 `EndProcessing` 方法，这些方法在函数执行的不同阶段被调用，让你可以控制函数的执行流程。

例如，一个简单的带有 `CmdletBinding` 的 PowerShell 函数定义如下：

```powershell
function MyFunction {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [string]$Name
    )
    Write-Output "Hello, $Name!"
}
```

在这个例子中，`CmdletBinding` 特性使函数具备了 PowerShell cmdlet 的基本行为，`Mandatory=$true` 表示 `Name` 参数是必需的。
:::

