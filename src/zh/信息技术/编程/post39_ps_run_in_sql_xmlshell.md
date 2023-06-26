---
# 这是文章的标题
title: 脚本编程：Powershell：在SQL Server的xp_cmdshell里执行Powershell脚本
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 39
# 设置作者
# 设置写作时间
date: 2023-06-21
# 一个页面可以有多个分类
category:
  - Scripting Language
  - 脚本编程
  - Powershell

# 一个页面可以有多个标签
tag:
  - Powershell
  - SQLServer
  - ChatGPT答案
  



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

:::tip 适用场景
个人感觉适合在SQLServer里执行一些简单的Powershell任务。如果脚本含有一些特殊字符，执行容易出错。不如使用SQL Server Agent功能强大，可以执行更多脚本任务。
:::

To execute a PowerShell script block using SQL Server's `xmlcmdshell` stored procedure, you can follow these steps:

1. Enable the `xp_cmdshell` feature in SQL Server, if it's not already enabled. Execute the following SQL command:
```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'xp_cmdshell', 1;
RECONFIGURE;
```


2. Execute the PowerShell script block using the `xp_cmdshell` stored procedure:
```sql
DECLARE @ps_script NVARCHAR(MAX);

SET @ps_script = '&{$items = get-childitem c:\;$items | ForEach-Object { write-output $_.fullname}}';

DECLARE @cmd NVARCHAR(4000);

SET @cmd = N'powershell.exe -c "' + @ps_script + N'"';

DECLARE @output TABLE (output NVARCHAR(MAX));

INSERT INTO @output
EXEC xp_cmdshell @cmd;

SELECT output FROM @output;
```

:::tip Important Notes
- Enclose the script block in  the & symbol to indicate that it's a command to be executed.

- the comand string for the stored procedure `xp_cmdshell` has to be either  varchar(8000) or nvarchar(4000)
:::
