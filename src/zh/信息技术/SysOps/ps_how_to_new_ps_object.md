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

### 脚本功能： 使用PSCustomObject构建自定义对象

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
    }
}


# Check types
$result[0].GetType().Name     # PSCustomObject 
$result[0].Name.GetType().Name # String
$result[0].CPU.GetType().Name  # Double 
$result[0].Memory.GetType().Name # Int32 


# 使用筛选
$results | ?{$_.Memory -gt 4000}
```


