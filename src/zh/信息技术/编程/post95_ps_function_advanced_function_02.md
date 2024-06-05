---
# 这是文章的标题
title: 脚本编程：Powershell：Powershell Function参数使用技巧（1）
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 95
# 设置作者
# 设置写作时间
date: 2024-06-05
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

几个常用Powershell Function参数使用技巧

## 正文

> 来自DeepSeek Chat

在 PowerShell 中，你可以通过多种方式来判断是否带上了指定的参数。以下是一些常见的方法：

### 判断和检查参数是带值

如果你在脚本或函数中使用 `Param` 关键字定义了参数，你可以通过检查参数的值来判断是否带上了该参数。例如：

```powershell
function Test-Parameter {
    Param (
        [Parameter(Mandatory=$true)]
        [string]$Name
    )

    if ($Name) {
        Write-Output "Parameter 'Name' is provided with value: $Name"
    } else {
        Write-Output "Parameter 'Name' is not provided."
    }
}

# 调用函数
Test-Parameter -Name "John"
```

在这个例子中，`$Name` 参数是强制性的，函数会检查 `$Name` 变量是否存在值来判断参数是否被提供。

### 判断和检查参数是否被使用

>这样定义的Function更具有灵活性，根据参数是否存在来运行，比较常用。

如果你使用了 `CmdletBinding` 和 `Parameter` 属性来定义参数，你可以使用 `$PSBoundParameters` 自动变量来检查是否提供了特定的参数。例如：

```powershell
function Test-Parameter {
    [CmdletBinding()]
    Param (
        [Parameter(Mandatory=$false)]
        [string]$Name
    )

    if ($PSBoundParameters.ContainsKey('Name')) {
        Write-Output "Parameter 'Name' is provided with value: $Name"
    } else {
        Write-Output "Parameter 'Name' is not provided."
    }
}

# 调用函数
Test-Parameter -Name "John"
```

:::tip 重点
在这个例子中，`$PSBoundParameters` 是一个哈希表，包含了所有被提供的参数及其值。你可以使用 `ContainsKey` 方法来检查特定的参数是否存在。
:::

### 使用 `ArgumentCompleter` 属性

如果你希望为参数提供自动完成功能，你可以使用 `ArgumentCompleter` 属性。这不会直接帮助你判断参数是否被提供，但它可以帮助用户更容易地输入参数。例如：

```powershell
function Test-Parameter {
    [CmdletBinding()]
    Param (
        [Parameter(Mandatory=$true)]
        [string]$Name
    )

    # 参数自动完成逻辑
    [ArgumentCompleter({
        param($commandName, $parameterName, $wordToComplete, $commandAst, $fakeBoundParameters)
        # 返回可能的完成值
        $possibleValues = 'John', 'Jane', 'Doe'
        $possibleValues | Where-Object { $_ -like "$wordToComplete*" }
    })]
    [ValidateSet('John', 'Jane', 'Doe')]
    [string]$Name

    if ($Name) {
        Write-Output "Parameter 'Name' is provided with value: $Name"
    } else {
        Write-Output "Parameter 'Name' is not provided."
    }
}

# 调用函数
Test-Parameter -Name "John"
```

在这个例子中，`ArgumentCompleter` 属性定义了参数的自动完成逻辑。

