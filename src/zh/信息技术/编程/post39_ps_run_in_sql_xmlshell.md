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


To execute a PowerShell script block using SQL Server's `xmlcmdshell` stored procedure, you can follow these steps:

1. Enable the `xp_cmdshell` feature in SQL Server, if it's not already enabled. Execute the following SQL command:
```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'xp_cmdshell', 1;
RECONFIGURE;
```

2. Create a table to store the PowerShell script:
```sql
CREATE TABLE dbo.PowerShellScripts (ScriptID INT IDENTITY(1,1) PRIMARY KEY, Script NVARCHAR(MAX));
```

3. Insert the PowerShell script into the table:
```sql
INSERT INTO dbo.PowerShellScripts (Script)
VALUES (N'
# PowerShell script code goes here
$variable = "Hello, PowerShell!"
Write-Output $variable
');
```
Replace the script content in the `VALUES` clause with your actual PowerShell script.

4. Execute the PowerShell script block using the `xmlcmdshell` stored procedure:
```sql
DECLARE @cmd NVARCHAR(MAX);
SET @cmd = N'
<root>
    <command>
        <script>
            <![CDATA[' +
            (SELECT Script FROM dbo.PowerShellScripts WHERE ScriptID = 1) +
            N']]>
        </script>
    </command>
</root>
';

EXEC sp_xml_preparedocument @idoc OUTPUT, @cmd;

EXEC xmlcmdshell 'powershell.exe', @cmd;

EXEC sp_xml_removedocument @idoc;
```
In the above example, the script with `ScriptID = 1` is retrieved from the table `PowerShellScripts` and executed using the `xmlcmdshell` stored procedure. Adjust the `ScriptID` parameter as needed.

Note: Executing PowerShell scripts from SQL Server can pose security risks if not handled carefully. Make sure to validate and sanitize any input to prevent potential SQL injection or script execution vulnerabilities.