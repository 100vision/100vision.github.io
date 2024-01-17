---
# 这是文章的标题
title: Oracle：使用Package授权普通用户杀掉会话
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 78
# 设置作者
# 设置写作时间
date: 2024-01-17
# 一个页面可以有多个分类
category:
  - 数据库

# 一个页面可以有多个标签
tag:
  - Oracle
  - 数据库
  - PLSQL
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


## 前言

处理死锁问题一般都是杀死会话，一般是DBA角色来执行，或是用户授予了使用`alter system kill session` 

但如果想让普通用户在不拥有DBA角色，或不能拥有alter system的情况下杀死会话，可以考虑

以下方法授权给普通用户。

## 正文

### 实现方式

- 授权这个普通用户可以查询v$session
- 指定1个普通用户创建一个Package,改package的body中包含`alter system kill session`
- 授权这个普通用户可以执行该package
- 授权这个普通用户可以执行`alter system`

- Oracle Single instance (Source) to Single instance(target)
- Netbackup Data Backup Environment

### 实现步骤

- 普通用户创建Package。

```sql

-- 创建包
CREATE OR REPLACE PACKAGE kill_sessions AS
PROCEDURE kill(p_sid IN NUMBER); -- 参数为会话的SID
END;
/

-- 编译包体
ALTER PACKAGE kill_sessions COMPILE BODY;
/

-- 创建存储过程
CREATE OR REPLACE PACKAGE BODY kill_sessions IS
PROCEDURE kill(p_sid IN NUMBER) IS
v_serial# NUMBER := -1;
BEGIN
SELECT serial# INTO v_serial# FROM sys.v$session WHERE sid = p_sid;

    IF v_serial# > 0 THEN
        EXECUTE IMMEDIATE 'ALTER SYSTEM KILL SESSION ''' || p_sid || ', ' || v_serial# || '''';
        DBMS_OUTPUT.put_line('Session killed successfully!');
    ELSE
        DBMS_OUTPUT.put_line('Invalid session ID or the session is not active.');
    END IF;
END;
END;

```

- 授权普通用户以下权限
```
SQL> grant select on v$session to <the_user>;
SQL> grant execute on kill_sessions to <the_user>;
SQL> grant alter system to <the_user>;
```

### 使用

- 查询死锁会话

```
select username, lockwait, status, machine, program
from v$session
where sid in (select session_id from v$locked_object);
```

```
SELECT l.SESSION_ID, l.OS_USER_NAME, s.USERNAME, l.OBJECT_ID, l.ORACLE_USERNAME
FROM v$locked_object l,
     v$session s
WHERE l.SESSION_ID = s.SID;
```

- 杀会话

```
-- 杀掉会话227
BEGIN
  KILL_SESSIONS.KILL(227);
END;


## 参考

Granting ALTER SYSTEM KILL SESSION to users
http://dba-oracle.com/t_granting_alter_system_kill_session.htm