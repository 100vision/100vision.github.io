---
# 这是文章的标题
title: Linux：环境变量和Sudo
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 100
# 设置作者
# 设置写作时间
date: 2024-11-11
# 一个页面可以有多个分类
category:
  - Linux
# 一个页面可以有多个标签
tag:
  - Linux
  - Shell
  - 脚本编程

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

## 前言

了解Shell的环境变量。

### 1. 创建变量

- 使用`env`创建临时变量

```shell
env var1=vaule1 var2=value2 
```

- 使用 `export`创建临时变量

```shell
export var1=value1
```

- 查看环境变量
```
printenv: printenv MY_VAR
env: env | grep MY_VAR
echo: echo $MY_VAR
```

**env 和 export的区别**

export: 用于将变量导出为环境变量，使得变量在当前 shell 及其子 shell 中可用。
env: 用于显示当前 shell 的环境变量，或者在修改后的环境中运行另一个程序。
- 用途不同: export 用于导出变量和函数，env 用于显示环境变量或运行程序。
- 功能不同: export 主要用于变量共享，env 主要用于环境变量管理和程序运行。
- 使用场景不同: export 用于跨 shell 会话的变量共享，env 用于查看或修改环境变量。
通过合理使用 export 和 env 命令，你可以实现更灵活的脚本编写和环境管理。

### 2. 永久变量

- 创建永久变量

以`Bash`举例。可以通过编辑 ~/.bashrc 或 ~/.bash_profile 文件来创建永久环境变量。添加
```
export var1=value1
```

### 2. 父Shell和子Shell之间变量使用


**重要说明**

- 子Shell会继承父Shell所有变量；
- 在子Shell中对变量修改不会影响父Shell变量 （但可以实现）


**创建子Shell**

- 方法1: 在当前bash下执行`bash`就创建了一个子shell。例：
```shell
$ bash
```

- 方法2: 在当前bash下执行一个shell脚本，该脚本就会创建一个子shell运行该脚本，例：

```shell
$ demo.sh
```

- 方法3: 在当前shell下使用`()` 括号.  例：
```shell
(export var1=valued;env)
```
- 方法4: 在当前Shell下使用`$( )`。可以把子shell的执行结果返回给父shell。例：

```shell
$(export var1=valued;env)
```




### 3. 父shell获取子shell的变量传递

> 来自DeepSeek：子 shell 无法直接修改父 shell 的环境变量。环境变量在子 shell 中的修改仅限于子 shell 本身，不会影响父 shell。然而，你可以通过一些间接的方法将子 shell 中的变量值传递回父 shell。以下是几种常见的方法："

- 使用`source` 或 `.` 在当前shell运行脚本，改变脚本的默认行为。而不是在子shell执行；这样脚本修改了变量会反应到当前shell。

示例：

创建一个demo.sh
```shell
#!/bin/bash
var1="hello"
```
然后，在当前shell 使用source 执行该脚本，则当前shell的var1变量会被修改。

```shell
source  demo.sh
```

- 使用 `read` 和 `echo`

```shell
read MY_VAR <<< $(MY_VAR=world; echo $MY_VAR)
```



### 4. sudo和环境变量


- sudo执行命令时，使用目标用户的环境变量

使用`sudo -i`  将会使用和加载目标用户的环境变量 ,例：

```shell
sudo -i "command"
```

- sudo执行命令时，传递当前用户的环境变量（加载到目标用户的shell）

使用`sudo -E`  或 `--preserve-env ` 把当前用户的多个环境变量传给目标用户，然后执行command

```shell
sudo --preserve-env=HOME,PATH /usr/bin/env
sudo -E=HOME,PATH /usr/bin/env
```

## 参考

- DeepSeek Chat
- [Passing Environment Variables to Sudo Command](https://www.petefreitag.com/blog/environment-variables-sudo/)