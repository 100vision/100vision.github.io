import{_ as t,W as r,X as l,Z as e,$ as a,a0 as n,Y as s,G as d}from"./framework-b5535326.js";const o={},c=s('<div class="hint-container warning"><p class="hint-container-title">Caveat</p><p>Notes to myself only . Use this instrucution at your own risk in production.</p></div><h2 id="scenario" tabindex="-1"><a class="header-anchor" href="#scenario" aria-hidden="true">#</a> Scenario</h2><ul><li>Oracle Single instance (Source) to Single instance(target)</li><li>Netbackup Data Backup Environment</li></ul><h3 id="environment" tabindex="-1"><a class="header-anchor" href="#environment" aria-hidden="true">#</a> Environment</h3>',4),u={href:"http://mynbumaster.example.com",target:"_blank",rel:"noopener noreferrer"},v={href:"http://target-db.example.com",target:"_blank",rel:"noopener noreferrer"},b={href:"http://source-db.example.com",target:"_blank",rel:"noopener noreferrer"},m=s(`<h2 id="recovery-procedure" tabindex="-1"><a class="header-anchor" href="#recovery-procedure" aria-hidden="true">#</a> Recovery Procedure</h2><h3 id="check-system-enviroment-variables" tabindex="-1"><a class="header-anchor" href="#check-system-enviroment-variables" aria-hidden="true">#</a> Check System Enviroment Variables</h3><blockquote><p>target database SID must be same as source database. If not modify the one on the target.</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[oracle@targetServer ~]$ cat ~/.bash_profile | tr -s &#39;\\n&#39;
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="create-new-init-spfile" tabindex="-1"><a class="header-anchor" href="#create-new-init-spfile" aria-hidden="true">#</a> Create new init spfile</h3><p>example spfile:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[oracle@xmdevoaapp02 ~]$ cat /u01/oradata/init_orcl.ora
orcl.__db_cache_size=3271557120
orcl.__java_pool_size=33554432
orcl.__large_pool_size=234881024
orcl.__oracle_base=&#39;/data/u01/app/oracle&#39;#ORACLE_BASE set from environment
orcl.__pga_aggregate_target=2332033024
orcl.__sga_target=4345298944
orcl.__shared_io_pool_size=0
orcl.__shared_pool_size=754974720
orcl.__streams_pool_size=0
*._allow_level_without_connect_by=TRUE
*.audit_file_dest=&#39;/data/u01/app/oracle/admin/orcl/adump&#39;
*.audit_trail=&#39;db&#39;
*.compatible=&#39;11.2.0.4.0&#39;
*.control_file_record_keep_time=31
*.control_files=&#39;/u01/oradata/control01.ctl&#39;,&#39;/data/u01/app/oracle/fast_recovery_area/orcl/control02.ctl&#39;
*.db_block_size=8192
*.db_domain=&#39;&#39;
*.db_name=&#39;orcl&#39;
*.db_recovery_file_dest=&#39;/u01/oradata/fast_recovery_area&#39;
*.db_recovery_file_dest_size=21474836480
*.diagnostic_dest=&#39;/data/u01/app/oracle&#39;
*.dispatchers=&#39;(PROTOCOL=TCP) (SERVICE=orcl)&#39;
*.memory_target=6677331968
*.open_cursors=1000
*.processes=500
*.remote_login_passwordfile=&#39;EXCLUSIVE&#39;
*.session_cached_cursors=300
*.sessions=555
*.undo_tablespace=&#39;UNDOTBS1&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="start-the-instance-with-the-spfile" tabindex="-1"><a class="header-anchor" href="#start-the-instance-with-the-spfile" aria-hidden="true">#</a> Start the instance with the spfile</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SQL&gt; startup nomount pfile=&#39;/u01/oradata/init_orcl.ora&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="build-the-spfile" tabindex="-1"><a class="header-anchor" href="#build-the-spfile" aria-hidden="true">#</a> Build the spfile</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SQL&gt; create spfile from pfile=&#39;/u01/oradata/init_orcl.ora&#39;;
file created.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="start-the-instance-with-a-nomount-option" tabindex="-1"><a class="header-anchor" href="#start-the-instance-with-a-nomount-option" aria-hidden="true">#</a> Start the instance with a <code>nomount</code> option</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SQL&gt; shutdown immediate;
SQL&gt; startup nomount;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="restore-the-control-file" tabindex="-1"><a class="header-anchor" href="#restore-the-control-file" aria-hidden="true">#</a> Restore the control file</h3><blockquote><p>restore the control file from backup server,in this case, Netbackup <code>mynbumaster</code> is the NBU master and the backup was taken on the source database which is <code>source-db.example.com</code> in this casae.</p></blockquote><blockquote><p>the control file also act as RMAN backup catalog where contains backup info we need in the subsequent steps</p></blockquote><ul><li>Pick up the controle file and note down the file name in backup images</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>RMAN&gt;
run
{
ALLOCATE CHANNEL CH00 TYPE &#39;SBT_TAPE&#39;;
SEND &#39;NB_ORA_SERV=mynbumaster,NB_ORA_CLIENT=source-db.example.com&#39;;
restore controlfile from &#39;cntrl_17662_1_1139688297&#39;;
release CHANNEL CH00;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="start-the-datbase-instance-and-mount-the-database-but-keep-it-unopen" tabindex="-1"><a class="header-anchor" href="#start-the-datbase-instance-and-mount-the-database-but-keep-it-unopen" aria-hidden="true">#</a> start the datbase instance and mount the database but keep it unopen</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SQL&gt; alter database mount
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>to keep the files consistent (files include datafiles,control files , online logs), the database recovery is required before openning the database)</p><h3 id="restore-the-datafiles" tabindex="-1"><a class="header-anchor" href="#restore-the-datafiles" aria-hidden="true">#</a> Restore the datafiles</h3><blockquote><p>rman target / cmdfile &quot;rman_restore_dbfiles&quot;</p></blockquote><p><code>rman_restore_dbfiles</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>run {
allocate channel ch00 type &#39;sbt_tape&#39;;
allocate channel ch01 type &#39;sbt_tape&#39;;
allocate channel ch02 type &#39;sbt_tape&#39;;
SEND &#39;NB_ORA_SERV=nbumaster,NB_ORA_CLIENT=source-db.example.com&#39;;
set newname for datafile 1 to &#39;/u01/oradata/system.259.965837843&#39;;
set newname for datafile 2 to &#39;/u01/oradata/sysaux.260.965837853&#39;;
set newname for datafile 5 to &#39;/u01/oradata/users.264.965837853&#39;;
set newname for datafile 6 to &#39;/u01/oradata/ecology01.dbf&#39;;
set newname for datafile 7 to &#39;/u01/oradata/ecology02.dbf&#39;;

SET NEWNAME FOR TEMPFILE 1 to &#39;/u01/oradata/temp.262.965837849&#39;;
SET NEWNAME FOR TEMPFILE 2 to &#39;/u01/oradata/t_ecology01.dbf&#39;;
restore database;
switch datafile all;
switch tempfile all;
release channel ch00;
release channel ch01;
release channel ch02;

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="recover-the-database" tabindex="-1"><a class="header-anchor" href="#recover-the-database" aria-hidden="true">#</a> Recover the database</h2><blockquote><p>Recovery is the last step to be done. The recovery will requires archive log in order to be able to open the database. My understanding of the primary operation is to apply the archive log to the database</p></blockquote><ul><li>method 1: restore from tape backup or backcup server</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>run {
allocate channel ch00 type &#39;sbt_tape&#39;;
allocate channel ch01 type &#39;sbt_tape&#39;;
SEND &#39;NB_ORA_SERV=mynbumaster,NB_ORA_CLIENT=source-db.example.com&#39;;
RESTORE ARCHIVELOG SEQUENCE BETWEEN 24324 AND 24338;
release channel ch00;
release channel ch01;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Once this step. Try to open it:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>recover database open resetlogs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>if you&#39;re lucky enough you should be able to open the database. if you failed . don&#39;t panic you&#39;re not alone .Acutally in many cases, the recovery at this point complaints file inconsistency. the error looks similar to this :</p><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1><p>RMAN-06556: datafile 1 must be restored from backup older than SCN 52427660576</p><p>meaning data file 1 restored from backup is newer than the others or database it should be. SCN is the database flag number. It must be the same and one accross the data files.</p><ul><li>option1: restore the data file 1 to old version</li><li>option2: apply the archive log to database</li></ul><p>** how to check SCN**</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SYS@ora11g&gt; col name format a60

SYS@ora11g&gt; select checkpoint_change# from v$database;

CHECKPOINT_CHANGE#


           2220979

SYS@ora11g&gt; SELECT a.FILE#,a.NAME,a.RECOVER,a.CHECKPOINT_CHANGE#,status  FROM v$datafile_header a;

    FILE# NAME                                                        REC CHECKPOINT_CHANGE# STATUS


         1/u01/app/oracle/oradata/ora11g/system01.dbf                  NO             2220979ONLINE

         2/u01/app/oracle/oradata/ora11g/sysaux01.dbf                  NO             2220979ONLINE

         3/u01/app/oracle/oradata/ora11g/undotbs01.dbf                 NO             2220979ONLINE

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="solution" tabindex="-1"><a class="header-anchor" href="#solution" aria-hidden="true">#</a> solution####</h3><p>the solution is to do more restores until that no compliants</p><ul><li><p>Method 1: continue running rman restore to restore any archive logs from backup as needed</p></li><li><p>Method 2: if the backup of needed archive log no longer available (if deleted), try to get the archved logs either from the source database (very useful when you get a corrupted the backup or missing)</p></li></ul><p>physical file copying and paste of the archive logs file to the target database</p><p>use RMAN catalog to register the archive logs so that RMAN recover will be able to locate thes archves during the recover process</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>catalog archivelog &#39;/u01/oradata/fast_recovery_area/ORCL/archivelog/2023_06_17/o1_mf_1_24339_l8t2v396_.arc&#39;;
catalog archivelog &#39;/u01/oradata/fast_recovery_area/ORCL/archivelog/2023_06_17/o1_mf_1_24340_l8t30xd4_.arc&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>when archive los get ready . re-try the recover operation by executing the recover. if the inconsistency persists, repeat the restore of archvie log until it succeeds</p><p><strong>Finally</strong>,</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SQL&gt; recover database open resetlogs

database is altered
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Congratulations!</p><h2 id="side-note" tabindex="-1"><a class="header-anchor" href="#side-note" aria-hidden="true">#</a> Side note</h2><p>why backup size sometimes is larger than actual database size. To verify;</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SQL&gt; select sum(bytes)/1024/1024/1024  from dba_segments;

SUM(BYTES)/1024/1024/1024

86.4510498

SQL&gt; select sum(bytes)/1024/1024/1024  from dba_data_files;

SUM(BYTES)/1024/1024/1024

295.922852             </code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,51);function h(p,_){const i=d("ExternalLinkIcon");return r(),l("div",null,[c,e("ul",null,[e("li",null,[e("a",u,[a("mynbumaster.example.com"),n(i)]),a(" (Netbackup master)")]),e("li",null,[e("a",v,[a("target-db.example.com"),n(i)]),a(" (Database server to receive the backup for full restore)")]),e("li",null,[e("a",b,[a("source-db.example.com"),n(i)]),a(" (Database server where the backup was taken)")])]),m])}const f=t(o,[["render",h],["__file","post37_db_orcl_01.html.vue"]]);export{f as default};
