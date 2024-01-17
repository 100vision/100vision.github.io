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

- 授权一个高级用户，例如system可以查询v$session
- 授权这个高级用户可以执行`alter system`特权；
- 这个高级用户身份下创建一个Package或procedure,核心语句是授权package的body中包含`alter system kill session`
- 授权1个普通用户可以执行该package或procedure。

以上看出，普通用户在没有`alter system`权限情况下，可以通过一个高权限的专用package/procedure杀掉会话。

### 实现步骤

- System用户创建Package。

```sql

-- 创建包
CREATE OR REPLACE PACKAGE kill_session AS
PROCEDURE kill(pn_sid IN NUMBER,pn_serial IN NUMBER); -- 参数为会话的SID,和会话序列号
END;
/

-- 编译包体
ALTER PACKAGE kill_session COMPILE BODY;
/

-- 创建存储过程
CREATE OR REPLACE PROCEDURE kill(
    pn_sid NUMBER,
    pn_serial NUMBER
) AS
    lv_user VARCHAR2(30);
BEGIN
    SELECT username INTO lv_user FROM SYS.V_$SESSION
    WHERE sid = pn_sid AND serial# = pn_serial;
-- 安全起见，限制普通用户只能杀掉指定用户的会话，不能杀掉其他用户（例如dba的会话
    IF lv_user IS NOT NULL AND lv_user IN ('svc_dbuser01', 'svc_dbuser02') THEN
        EXECUTE IMMEDIATE 'ALTER SYSTEM KILL SESSION ''' || pn_sid || ',' || pn_serial || '''';
    ELSE
        RAISE_APPLICATION_ERROR(-20000, 'Attempt to kill protected system session has been blocked.');
    END IF;
END;


-- 创建一个同义词给普通用户
Create synonym <username>.kill_session for system.kill_session;

```

- 授权package的owner,即system用户以下权限

```
SQL> grant select on v$session to system;
SQL> grant alter system to system;
```
- 授权普通用户可以执行package

```
SQL> grant execute on kill_session to <the_user>;

```
### 使用

- 查询死锁会话

```
select username, lockwait, status, machine, program
from v$session
where sid in (select session_id from v$locked_object);
```

```
SELECT l.SESSION_ID, l.OS_USER_NAME, s.USERNAME, s.serial#,l.OBJECT_ID, l.ORACLE_USERNAME
FROM v$locked_object l,
     v$session s
WHERE l.SESSION_ID = s.SID;
```

- 杀会话

```
-- 普通用户在PL/SQL里杀掉会话227，序号311
BEGIN
  KILL_SESSION.KILL(222,311);
END;
```

```
普通用户在sqlplus杀掉会话
SQL> exec kill_session.kill(222,311)
```

## 参考

Granting ALTER SYSTEM KILL SESSION to users

http://dba-oracle.com/t_granting_alter_system_kill_session.htm