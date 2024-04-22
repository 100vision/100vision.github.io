---
# 这是文章的标题
title: 脚本编程：Powershell：Powershell Advanced Function 踩坑记
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 84
# 设置作者
# 设置写作时间
date: 2024-04-10
# 一个页面可以有多个分类
category:
  - Scripting Language
  - 脚本编程
  - Powershell

# 一个页面可以有多个标签
tag:
  - Powershell
  - 踩坑记



  



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

## 前言

最近使用Powershell踩了一个坑，后来回想起来，这个坑上回不也踩过吗？也是来回摸索很长时间。记性不如烂笔头，记录一下。

## 正文

> 我的一个函数使用一个参数从管道接收一个对象集合或是数组（又多个对象），结果每次只处理一个输入对象，真奇怪啊.调试了半天，百思不得其解。

关键字`管道接收`、`对象集合`。

示例代码：
```powershell
Function Get-MyUserNameById {

param(
        [Parameter(ValueFromPipeline=$true)]      
        [string[]]$EmployeeId
        )


$EmployeeId | ForEach-Object { Write-Host "User name is : $_"}

}

"E01","E02","A08" | Get-MyUserNameById

```

以上是一个很简单的函数。定义了一个输入参数`EmployeeId`，该参数使用`[Parameter(ValueFromPipeline=$true)] ` 属性允许从管道接收输入值（字符串集合）， 然后使用`ForEach-Ojbect` 遍历打印输出3个字符串。 可是它没按预期打印出3个字符串，而是只打印出一个：

```powershell
User name for Id A08 is : User-A08
```

为什么呢？ `直接上答案`

```
"如果函数参数设置为接受管道输入且未定义process块，则记录逐条处理将失败。"
```
意思是说，

- 凡来自管道的对象集合，一定要在`process`代码块里来实现遍历，否则只会处理一条。这就解释了以上奇怪现象，即使使用了ForEach也只打印一条；

- 了解到，`process`代码块内置一个专门枚举器`enumerator` 来专门处理管道输入的自动输入对象，即`$_`。这样，`process`里面处理管道输入，可以不使用`foreach`。

- 通过其他传参（非管道），我们的函数可以不需要`process`，使用普通的遍历循环也可以处理；

- 如何希望函数既能处理管道输入，也能处理普通传参，可以在`process`代码块使用foreach来覆盖process的枚举行为。像這樣：

```powershell
Function Get-MyUserNameById {

    param(  
            [string[]]$EmployeeId
            )

    Process {
    
        foreach ($id in $EmployeeId) {
            write-host $id
        }
      
      }

    
}

#函數可以這樣 （普通傳參數）：

$IDs = "E01","E02","A08"
Get-MyUserNameById -EmployeeId $IDs

#也可以這樣：從管道接收

"E01","E02","A08" |Get-MyUserNameById
```
最後，這個函數則提供更多靈活性。

## 參考

- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced_methods?view=powershell-7.4


 这篇文章深入探讨了PowerShell中的Begin、Process和End块，这些块是PowerShell高级函数内置的控制流，有助于开发者维护代码工作流程。文章通过比喻和示例，解释了每个块的具体目的和常见用例。

1. **Begin块**：用于设置函数，包括指定变量和数组，这些变量和数组将在函数中使用。Begin块是可选的，如果只使用Process或End块，则不需要它。Begin块中的所有内容只会在函数调用时运行一次，类似于日常工作中的准备阶段。

2. **Process块**：这是PowerShell高级函数中完成工作的地方。它处理参数和通过管道输入到函数中的数据。Process块可以单独使用，不需要Begin或End块。如果函数接受单个参数值，则Process块将只处理该单个值。如果函数接受管道输入，则Process块将处理每个传入的值。文章通过示例展示了如何处理单个值和通过管道传递的数组。

3. **End块**：用于执行必要的清理工作。如果在Begin或Process块中创建了对象、变量、文件等，则应在End块中清理这些资源。End块也是可选的，如果只使用Process或Begin块，则不需要它。与Process块不同，无论通过管道传递了多少个数组元素，End块中的代码都只会执行一次。

文章通过比喻和例子强调了每个块的作用，如将一天的开始比作Begin块的初始化，将处理日常任务比作Process块的工作，将结束一天的工作并回家比作End块的清理。文章还提到了PowerShell函数应该做好一件事，并强调了将函数分解为Begin、Process和End块的重要性，以实现清晰的逻辑分离和更好的维护性。




- https://4sysops.com/archives/understanding-powershell-begin-process-and-end-blocks/
  
- https://jeffbrown.tech/powershell-begin-process-end/