---
# 这是文章的标题
title: Oracle：使用RMAN恢复数据库（一）：单机到单机
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 37
# 设置作者
# 设置写作时间
date: 2023-06-17
# 一个页面可以有多个分类
category:
  - 数据库
  - 数据恢复
# 一个页面可以有多个标签
tag:
  - Oracle
  - 数据库
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


:::warning Caveat 
 Notes to myself only . Use this instrucution at your own risk in production.
:::warning

## Sincerio

- Oracle Single instance (Source) to Single instance(target)
- Netbackup Data Backup Environment

### Environment
- mynbumaster.example.com (Netbackup master)
- target-db.example.com  (Database server to receive the backup for full restore)
- source-db.example.com (Database server where the backup was taken)



## Recovery Procedure

### Check System Enviroment Variables

> target database SID must be same as source database.  If not modify the one on the target.

```
[oracle@targetServer ~]$ cat ~/.bash_profile | tr -s '\n'
# .bash_profile
# Get the aliases and functions
if [ -f ~/.bashrc ]; then
        . ~/.bashrc
fi
 
# User specific environment and startup programs
PATH=$PATH:$HOME/bin
export PATH
export TMP=/tmp
export TMPDIR=$TMP
export ORACLE_SID=orcl
export ORACLE_UNQNAME=orcl
export ORACLE_BASE=/data/u01/app/oracle
export ORACLE_HOME=$ORACLE_BASE/product/11.2.0/dbhome_1/
export TNS_ADMIN=$ORACLE_HOME/network/admin
export PATH=/usr/sbin:$PATH
export PATH=$ORACLE_HOME/bin:$PATH
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib

```

### Create new init spfile 

example spfile:
```
[oracle@xmdevoaapp02 ~]$ cat /u01/oradata/init_orcl.ora
orcl.__db_cache_size=3271557120
orcl.__java_pool_size=33554432
orcl.__large_pool_size=234881024
orcl.__oracle_base='/data/u01/app/oracle'#ORACLE_BASE set from environment
orcl.__pga_aggregate_target=2332033024
orcl.__sga_target=4345298944
orcl.__shared_io_pool_size=0
orcl.__shared_pool_size=754974720
orcl.__streams_pool_size=0
*._allow_level_without_connect_by=TRUE
*.audit_file_dest='/data/u01/app/oracle/admin/orcl/adump'
*.audit_trail='db'
*.compatible='11.2.0.4.0'
*.control_file_record_keep_time=31
*.control_files='/u01/oradata/control01.ctl','/data/u01/app/oracle/fast_recovery_area/orcl/control02.ctl'
*.db_block_size=8192
*.db_domain=''
*.db_name='orcl'
*.db_recovery_file_dest='/u01/oradata/fast_recovery_area'
*.db_recovery_file_dest_size=21474836480
*.diagnostic_dest='/data/u01/app/oracle'
*.dispatchers='(PROTOCOL=TCP) (SERVICE=orcl)'
*.memory_target=6677331968
*.open_cursors=1000
*.processes=500
*.remote_login_passwordfile='EXCLUSIVE'
*.session_cached_cursors=300
*.sessions=555
*.undo_tablespace='UNDOTBS1'
```


### Start the instance with the spfile
```
SQL> startup nomount pfile='/u01/oradata/init_orcl.ora';
```

### Build the spfile 

```
SQL> create spfile from pfile='/u01/oradata/init_orcl.ora';
file created.
```
### Start the instance with a `nomount` option
```
SQL> shutdown immediate;
SQL> startup nomount;
```
### Restore the control file

> restore the control file from backup server,in this case, Netbackup `mynbumaster` is the NBU master and the backup was taken on the source database which is `source-db.example.com` in this casae.

> the control file also act as  RMAN backup catalog where contains backup info we need in the subsequent steps

- Pick up the controle file and note down the file name in backup images

```
RMAN>
run
{
ALLOCATE CHANNEL CH00 TYPE 'SBT_TAPE';
SEND 'NB_ORA_SERV=mynbumaster,NB_ORA_CLIENT=source-db.example.com';
restore controlfile from 'cntrl_17662_1_1139688297';
release CHANNEL CH00;
}

```

### start the datbase instance and mount the database but keep it unopen

```
SQL> alter database mount
```

to keep the files consistent (files include datafiles,control files , online logs), the database recovery is required before openning the database)


### Restore the datafiles

> rman target / cmdfile "rman_restore_dbfiles"

`rman_restore_dbfiles`
```
run {
allocate channel ch00 type 'sbt_tape';
allocate channel ch01 type 'sbt_tape';
allocate channel ch02 type 'sbt_tape';
SEND 'NB_ORA_SERV=nbumaster,NB_ORA_CLIENT=source-db.example.com';
set newname for datafile 1 to '/u01/oradata/system.259.965837843';
set newname for datafile 2 to '/u01/oradata/sysaux.260.965837853';
set newname for datafile 5 to '/u01/oradata/users.264.965837853';
set newname for datafile 6 to '/u01/oradata/ecology01.dbf';
set newname for datafile 7 to '/u01/oradata/ecology02.dbf';

SET NEWNAME FOR TEMPFILE 1 to '/u01/oradata/temp.262.965837849';
SET NEWNAME FOR TEMPFILE 2 to '/u01/oradata/t_ecology01.dbf';
restore database;
switch datafile all;
switch tempfile all;
release channel ch00;
release channel ch01;
release channel ch02;

}
```

## Recover the database 

> Recovery is the last step to be done. The recovery will requires archive log in order to be able to open the database. My understanding of the primary operation is to apply the archive log to the database


- method 1: restore from tape backup or backcup server

```
run {
allocate channel ch00 type 'sbt_tape';
allocate channel ch01 type 'sbt_tape';
SEND 'NB_ORA_SERV=mynbumaster,NB_ORA_CLIENT=source-db.example.com';
RESTORE ARCHIVELOG SEQUENCE BETWEEN 24324 AND 24338;
release channel ch00;
release channel ch01;
}

```
Once this step. Try to open it:

```
recover database open resetlogs
```

 if you're lucky enough you should be able to open the database. if you failed . don't panic you're not alone .Acutally in many cases, the recovery at this point complaints file inconsistency. the error looks similar to this :
# 
RMAN-06556: datafile 1 must be restored from backup older than SCN 52427660576

meaning data file 1 restored from backup is newer than the others or database it should be. SCN is the database flag number. It must be the same and one accross the data files.

- option1: restore the data file 1 to old version
- option2: apply the archive log to database



** how to check SCN**
```
SYS@ora11g> col name format a60

SYS@ora11g> select checkpoint_change# from v$database;

CHECKPOINT_CHANGE#


           2220979

SYS@ora11g> SELECT a.FILE#,a.NAME,a.RECOVER,a.CHECKPOINT_CHANGE#,status  FROM v$datafile_header a;

    FILE# NAME                                                        REC CHECKPOINT_CHANGE# STATUS


         1/u01/app/oracle/oradata/ora11g/system01.dbf                  NO             2220979ONLINE

         2/u01/app/oracle/oradata/ora11g/sysaux01.dbf                  NO             2220979ONLINE

         3/u01/app/oracle/oradata/ora11g/undotbs01.dbf                 NO             2220979ONLINE

```

### solution####
the solution is to do more restores until that no compliants

- Method 1: continue running rman restore to restore any archive logs from backup as needed

- Method 2: if the backup of needed archive log no longer available (if deleted), try to get the archved logs either from the source database (very useful when you get a corrupted the backup or missing)

 physical file copying and paste of the archive logs file to the target database

 use RMAN catalog to register the archive logs so that RMAN recover will be able to locate thes archves during the recover process
```
catalog archivelog '/u01/oradata/fast_recovery_area/ORCL/archivelog/2023_06_17/o1_mf_1_24339_l8t2v396_.arc';
catalog archivelog '/u01/oradata/fast_recovery_area/ORCL/archivelog/2023_06_17/o1_mf_1_24340_l8t30xd4_.arc';
```

 when archive los get ready . re-try the recover operation by executing the recover. if the inconsistency persists, repeat the restore of archvie log until it succeeds


**Finally**, 
```
SQL> recover database open resetlogs

database is altered
```
Congratulations!








## Side note

 why backup size sometimes is larger than actual database size. To verify;

```
SQL> select sum(bytes)/1024/1024/1024  from dba_segments;

SUM(BYTES)/1024/1024/1024

86.4510498

SQL> select sum(bytes)/1024/1024/1024  from dba_data_files;

SUM(BYTES)/1024/1024/1024

295.922852             