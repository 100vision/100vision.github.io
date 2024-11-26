---
# 这是文章的标题
title: 脚本编程：Powershell：变量作用域$global和$script
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 99
# 设置作者
# 设置写作时间
date: 2024-11-04
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

在一次使用过程中，1个变量一直获取不到值，调试了很久，最后搞明白是这个变量在不同作用域重复使用了。于是通过AI理解和学习一遍Powershell变量的作用域，夯实一下基础。



## 正文



在 PowerShell 中，作用域（Scope）决定了变量的可见性和生命周期。PowerShell 中有几种不同的作用域类型：

1. **全局作用域（Global Scope）**：在整个会话中都可见。
2. **脚本作用域（Script Scope）**：仅在定义它们的脚本文件中可见。
3. **本地作用域（Local Scope）**：仅在定义它们的函数或脚本块中可见。
4. **私有作用域（Private Scope）**：仅在定义它们的函数或脚本块中可见，并且不能被外部访问。

### `$global:` 前缀

`$global:` 前缀用于定义和访问全局作用域（Global Scope）的变量。全局作用域的变量在整个 PowerShell 会话中都可见，无论是在脚本文件、函数还是交互式命令行中。

在脚本任何位置可以通过`$global`引用全局变量。

**示例：使用 `$global:` 前缀**

```powershell
# 定义一个全局作用域的变量
$global:globalValue = "Hello, World!"

# 输出全局作用域的变量
Write-Host "全局变量的值: $global:globalValue"

# 定义一个函数，访问全局作用域的变量
function Get-GlobalValue {
    # 访问全局作用域的变量
    Write-Host "函数中访问的全局变量的值: $global:globalValue"
}

# 调用函数
Get-GlobalValue

```

**解释：**

- `$global:globalValue = "Hello, World!"`：定义一个全局作用域的变量 `$globalValue`，并赋值为 `"Hello, World!"`。
- `Write-Host "全局变量的值: $global:globalValue"`：输出全局作用域的变量的值。
- `function Get-GlobalValue`：定义一个名为 `Get-GlobalValue` 的函数。
- `Write-Host "函数中访问的全局变量的值: $global:globalValue"`：在函数中访问全局作用域的变量。
- `Get-GlobalValue`：调用函数。

### `$script:` 前缀

`$script:` 前缀用于定义和访问脚本作用域（Script-Scoped）的变量。脚本作用域的变量仅在定义它们的脚本文件中可见，并且不会在脚本文件之外的范围内可见。

在脚本任何位置可以通过`$script`引用脚本域的变量。

**示例：在函数中使用 `$script:` 前缀**

```powershell
# 定义一个脚本作用域的变量
$script:scriptValue = "Hello, World!"

# 输出脚本作用域的变量
Write-Host "脚本变量的值: $script:scriptValue"

# 定义一个函数，访问脚本作用域的变量
function Get-ScriptValue {
    # 访问脚本作用域的变量
    Write-Host "函数中访问的脚本变量的值: $script:scriptValue"
}

# 调用函数
Get-ScriptValue

```

**解释：**

- `$script:scriptValue = "Hello, World!"`：定义一个脚本作用域的变量 `$scriptValue`，并赋值为 `"Hello, World!"`。
- `Write-Host "脚本变量的值: $script:scriptValue"`：输出脚本作用域的变量的值。
- `function Get-ScriptValue`：定义一个名为 `Get-ScriptValue` 的函数。
- `Write-Host "函数中访问的脚本变量的值: $script:scriptValue"`：在函数中访问脚本作用域的变量。
- `Get-ScriptValue`：调用函数。

### 注意事项

- **全局变量的持久性**：全局变量在整个 PowerShell 会话中都存在，直到会话结束或变量被显式删除。
- **命名冲突**：由于全局变量在整个会话中都可见，可能会与其他脚本或函数中的变量命名冲突，因此在使用全局变量时需要谨慎。
- **脚本变量的作用域**：脚本变量仅在定义它们的脚本文件中可见，不会影响其他脚本文件或交互式命令行。

通过使用 `$global:` 和 `$script:` 前缀，你可以明确指定变量的作用域，并在不同的脚本文件、函数和交互式命令行中共享和访问这些变量。