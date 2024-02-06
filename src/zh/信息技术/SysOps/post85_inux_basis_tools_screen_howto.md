---
# 这是文章的标题
title: Linux基础：必备工具:如何使用Screen远程管理
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 85
# 设置作者
# 设置写作时间
date: 2024-02-06
# 一个页面可以有多个分类
category:
  - Linux
# 一个页面可以有多个标签
tag:
  - Linux基础
  - 工具
  - 效率工具
  - SSH
  - 远程管理




# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


## 前言

SSH远程会话断开,会话下的正在执行的子进程都会强行退出不再运行，这是因为系统会向它们整个进程组（会话父进程sshd和会话子进程）发送`SIGHUP`信号(Signal Hang UP) ，默认情况下，进程组收到后再回响应（即退出).

要保持SSH会话里的进程继续运行，有多个选项：

- 使用 `nohup`，对系统的`SIGHUP`信号不理会，这样进程仍能执行。
- 使用 `screen`，把进程分离（挂起），仍可以再后台进行。



## 正文


 本文主要介绍 `Screen`,多窗口会话管理。SSH远程会话断开进程仍可运行。
 
 ### 原理
 
 screen通过改变ssh会话的子进程（你的任务进程）的父进程，“网友语：重新找个爹” :-)。具体如下：

 - 当开启一个SSH远程会话时，如果直接在SSH会话里执行启动程序，则程序的父进程是sshd。
 - 当开启一个Screen会话，你的程序运行在Screen会话里，你程序的父进程就不是sshd了（不在sshd进程组里），而是screen。

 这样SSH会话退出造成sshd进程退出，也不影响你的程序继续运行。

:::tip
使用`pstree`可以观察到进程组关系。
:::

 ### 使用举例


- 创建一个Screen会话并命名java。 `screen -S java`

- 在会话下，启动创建一个或多个Screen Windows,并命名为 java_job1, `screen -t "java_job1"`
- 执行想要的任务, `/my-scripts_or_my_commands.py`

- 想暂时退出，挂起会话detach,·`CTRL + a + d`

- 回退到正常Shell了

- 看一下所有Screen会话 `screen -ls`。
- 如果想创建一个Screen会话也可以，重复前面的`screen -S <session_name`；这时断开SSH也可以，Screen会话执行的仍在执行。

- 连上SSH, 恢复到那个挂起（分离）的Screen会话，`screen -r java`


## 参考

来自Google Gemini 
>When you start a child process in a Screen session, the child process is not directly associated with the SSH session. Instead, the child process is associated with the Screen session itself. This means that the child process will continue to run even if the SSH session is exited.

>Here is a simplified overview of how child processes survive the exited SSH session:

>1. When you start a Screen session, Screen creates a new session leader process. This process is responsible for managing the Screen session and all of the child processes that are started within the session.
>2. When you start a child process in a Screen window, the child process is forked from the session leader process. This means that the child process inherits the session leader's process ID (PID) and session ID (SID).
>3. When you exit the SSH session, the SSH client process is terminated. However, the Screen session leader process and all of the child processes that are running within the session are not affected. This is because these processes are not directly associated with the SSH session.
>4. You can continue to interact with the Screen session and the child processes by reattaching to the Screen session. To do this, you can use the `screen -r` command.

>Here are some additional details about how child processes survive the exited SSH session:
>* The child processes are not affected by the termination of the SSH session because they are not running under the SSH session's process group.
>* The child processes are able to continue running because they are attached to the Screen session leader process, which is not terminated when the SSH session is exited.
>* You can use the `screen -ls` command to list all active Screen sessions. This can be useful for identifying the Screen session that you want to reattach to.

>By understanding how child processes survive the exited SSH session, you can use Screen to run long-running processes and tasks without having to worry about them being terminated if the SSH session is interrupted.