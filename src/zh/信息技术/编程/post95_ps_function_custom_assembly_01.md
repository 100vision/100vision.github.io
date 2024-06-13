---
# 这是文章的标题
title: 脚本编程：Powershell：Powershell Function高阶使用:动态使用.Net Framwork类库（1）
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 97
# 设置作者
# 设置写作时间
date: 2024-06-13
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

我们知道Powershell可以调用.Net Framework的静态类，也就可以大大提高了脚本功能。熟悉C#的同学

可以在Powershell里面直接编写C#代码，然后在代码里面直接使用。

## 正文

>来自阿里千问

### 直接定义

`Add-Type`是PowerShell的一个命令，用于在PowerShell会话中动态地添加.NET Framework类。它可以用来引入自定义的.NET类型或者加载未在当前环境中注册的.NET DLL。`Add-Type`可以让你在PowerShell中使用C#、VB.NET或其他.NET语言编写的类和方法，从而扩展PowerShell的功能。

- 定义了一个简单的C#类并在PowerShell中使用：

```powershell
Add-Type -TypeDefinition @"
    using System;
    public class HelloWorld {
        public static string SayHello() {
            return "Hello, World!";
        }
    }
"@

[HelloWorld]::SayHello()
```

在这个例子中，`Add-Type`命令定义了一个名为`HelloWorld`的C#类，该类包含一个静态方法`SayHello`。然后，我们通过`[HelloWorld]::SayHello()`调用了这个方法，输出"Hello, World!"。

`Add-Type`的一些常用参数包括：

- `-TypeDefinition`: 用于提供类的C#或VB.NET代码。
- `-Language`: 指定代码的语言，如CSharp、VisualBasic等。
- `-OutputType`: 指定输出类型，如Class、Struct等。
- `-OutputAssembly`: 指定输出的DLL文件名，用于保存定义的类型。
- `-ReferencedAssemblies`: 引用的.NET框架的其他dll文件。

请注意，使用`Add-Type`创建的类型只存在于当前PowerShell会话中。当你关闭会话后，这些类型将消失。如果你想持久化这些类型，你需要将它们保存到一个DLL文件中，然后在后续的会话中通过`-Path`参数加载这个DLL。

### 编译封装

要将使用`Add-Type`创建的类型保存到一个DLL文件中，你可以使用`-OutputAssembly`参数指定输出的DLL文件名。以下是一个示例，它创建一个类并将其保存到DLL文件：

```powershell
Add-Type -TypeDefinition @"
    using System;
    public class MyClass {
        public string MyMethod() {
            return "Hello, Persistent Type!";
        }
    }
"@ -OutputAssembly "MyCustomTypes.dll" -OutputType ConsoleApplication
```

在这个例子中，`MyCustomTypes.dll`是输出的DLL文件名，`ConsoleApplication`表示输出类型为控制台应用程序。这样，`MyClass`就会被编译并保存到这个DLL文件中。

要加载这个DLL文件并在以后的PowerShell会话中使用，你可以使用`Add-Type`的`-Path`参数：

```powershell
Add-Type -Path "MyCustomTypes.dll"
[MyClass]::new().MyMethod()
```

这将加载DLL文件，并允许你像之前一样使用`MyClass`。请注意，加载的DLL文件必须与PowerShell会话的.NET Framework版本兼容。如果你的PowerShell运行在.NET Core上，那么你需要确保DLL是针对.NET Core编译的。