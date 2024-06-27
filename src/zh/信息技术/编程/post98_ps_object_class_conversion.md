---
# 这是文章的标题
title: 脚本编程：Powershell：Powershell 数据类型比较判断和转换
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 98
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

数据类型之间的判断和转换

## 正文

###  is 关键字

> 可以使用`-is`关键字来比较和判断数据类型。

- 例1。简单判断是否是整数型

```powershell
1 -is [int]
True
"1" -is [int]
False
```

- 例2，使用在`if`条件
```powershell
$var = "abc"

if ($var -is [int] ) {
        $true
} else {
   $false
}
```

### as 关键字

> 可以使用`-as`关键字来比较和判断数据类型。

- 例1, 简单转换。
```powershell
$var1 = "5"

# 字符串转换为整数
$var2 = $var1 -as [int]

#打印转换前的数据类型
$var1.GetType()

 $var2.GetType()
```

- 例2，转换用户输入

```powershell
$input = read-host "please enter a number"

$number = $input -as [int]

if ($number -is [int]) {
    write-host "vaild input";
    #do something
}else{
      write-host "invaild input. You must enter a numberic value"
}

```