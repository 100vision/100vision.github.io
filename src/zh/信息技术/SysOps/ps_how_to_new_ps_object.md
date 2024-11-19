---
# 这是文章的标题
title: Powershell：基础:自定义对象1：使用PSCustomObject
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 30
# 设置作者
# 设置写作时间
date: 2023-05-24
# 一个页面可以有多个分类
category:
  - Windows
  - Powershell
# 一个页面可以有多个标签
tag:
  - Powershell
  - 脚本编程


# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

## 方法1: 使用PSCustomObject构建自定义对象

::: tip 前提条件
Powershell 3.0 以上版本
:::


### 2、脚本内容


```Powershell
# Get process info 
$processes = Get-Process | Select Name, CPU, MemorySize

# Construct custom objects 

#创建一个空集合
$result = @()
foreach ($p in $processes) {
  #使用Hash构建对象，属性值使用前面的Select查询结果填充，并添加对象到集合中；
    $result += [PSCustomObject] @{
        Name    = $p.Name
        CPU     = [float] $p.CPU     
        Memory  = [int] $p.MemorySize
        DateOfData = [datetime] (Get-Date -Format "yyyy-MM-dd")
    }
}


# Check types
$result[0].GetType().Name     # PSCustomObject 
$result[0].Name.GetType().Name # String
$result[0].CPU.GetType().Name  # Double 
$result[0].Memory.GetType().Name # Int32 
$result[0].DateOfData.GetType().Name # Datetime


# 使用筛选
$results | ?{$_.Memory -gt 4000}
```


### 使用Add-Member方法明确指定自定义对象的属性类型

> 有时候要显式指定属性类型。例如在 PowerShell 中，当你将一个数组赋值给自定义对象的属性时，该属性的类型会被自动推断为 System.Object[]，即一个对象数组。这是因为在 PowerShell 中，数组的类型是 System.Object[]，除非你显式指定数组的元素类型。

例如：

```powershell
# 导入 Active Directory 模块
Import-Module ActiveDirectory

# 获取 Active Directory 中的计算机对象
$computers = Get-ADComputer -Filter * -Properties Name, OperatingSystem, LastLogonDate

# 创建一个自定义对象
$customObject = [PSCustomObject]@{}

# 使用 Add-Member 添加类型明确的 Computers 属性
Add-Member -InputObject $customObject -MemberType NoteProperty -Name "Computers" -Value $computers -TypeName "Microsoft.ActiveDirectory.Management.ADComputer[]"

# 输出自定义对象
$customObject
```

## 方法2: 使用哈希表创建自定义对象

```powershell
# 创建一个哈希表并指定属性类型
$hashTable = @{
    Name  = [string]"John Doe"
    Age   = [int]30
    Email = [string]"john.doe@example.com"
}

# 将哈希表转换为自定义对象
$customObject = [PSCustomObject]$hashTable

# 输出对象
$customObject

```