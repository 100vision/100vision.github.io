import{_ as e,W as n,X as i,Y as s}from"./framework-b5535326.js";const t={},a=s(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>Netbackup有很多进程，服务器上有很多，客户端也有很多。</p><p>本文主要列出客户端的进程，了解客户端进程都是做什么的，以及找到它们的对应日志，供以后问题排查使用。</p><p>服务器也有很多进程，下次再记录。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><blockquote><p>netbackup客户端进程描述，来自netbackup客户端logs文件夹下的<code>readme</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
 Here are descriptions of NetBackup processes:

	bprd       
		-NetBackup Request Manager service
		-can be terminated and initiated from the Activity Monitor
		-responds to client and administrative requests
			-restores
			-backups
			-archives
			-&quot;list files backed-up or archived&quot;
			-manual/immediate backups
			-reread configuration database
	bpdm       
		-disk manager
		-used on storage units of type Disk
		-started by bpbrm on backups and restores
		-during backups and restores, one of these is started (on
		 the server with the storage unit) for each client backup
		 or restore
	bptm
		-removable media (tape) manager
		-used on storage units of type Logical Tape
		-started by bpbrm on backups and restores
		-during backups and restores, one of these is started (on
		 the server with the storage unit) for each client backup
		 or restore
		-also responsible for managing the media database 
		-used to display info in the Reports GUI when you select Media
		 List
	bpbrm
		-backup/restore manager
		-started by nbjm on backups/archives
		-started by bprd on restores
		-during backups and restores, one of these is started (on
		 the server with the storage unit) for each client backup
		 or restore
		-responsible for managing both the client and the media manager
		 processes.  uses error status from both to determine ultimate
		 status of backup or restore.
	bpbrmds
		-backup/restore manager for Disk Staging duplications
		-started by nbjm when handling a Disk Staging schedule 
		-responsible for starting, and managing, a bpduplicate process.
	bpdbm
		-NetBackup Database Manager service
		-manages policy, config/behavior, storage unit, and error DB&#39;s
		-runs as a Windows NT service
	bpjobd
		-NetBackup Job Manager service
		-manages backup and restore jobs for activity monitor GUIs
		-initiated by bpdbm
	bpinetd
		-NetBackup Legacy Client service
		-runs as a Windows NT service
	bpsynth
		-NetBackup synthetic backup manager
		-started by nbjm on synthetic backups
		-runs on master server and manages the creation of a 
		 synthetic image.
	bpcoord
		-NetBackup synthetic backup read coordinator
		-started by bpsynth for synthetic backups
		-runs on master server and coordinates reading required
		 blocks from existing images.
	bpcompatd
		-compatibility daemon
		-allows NetBackup 6.0 commands to connect to pre-6.0 daemons
   bpjava-msvc
      -NetBackup-Java application server authentication service program
      -started by the NetBackup client service 
      -authenticates the user that started the NetBackup-Java GUI application
      -bpjava programs do not get installed on Windows 95/98 hosts
   bpjava-susvc
      -NetBackup-Java application server user service program on NetBackup 
         servers
      -started by bpjava-msvc upon successful login via the NetBackup-Java
         GUI applications login dialog window
      -services all requests from the NetBackup-Java GUI applications
         for administration and end-user operations on the host on which the
         NetBackup-Java application server is running
      -additional bpjava-susvc processes get started to respond to requests
         from the NetBackup-Java GUI applications
   bpjava-usvc
      -NetBackup-Java application server user service program on NetBackup 
         clients
      -started by bpjava-msvc upon successful login via the NetBackup-Java
         GUI applications login dialog window
      -services all requests from the NetBackup-Java GUI applications
         for administration and end-user operations on the host on which the
         NetBackup-Java application server is running
      -additional bpjava-usvc processes get started to respond to requests
         from the NetBackup-Java GUI applications
	bpcd
		-NetBackup Client service
		-used to provide miscellaneous services
	bpdbjobs
		-NetBackup jobs database manager program
		-started by bprd
	bparchive
		-command-line program on clients to initiate archives
		-communicates with bprd on server
	bpbackup   
		-command-line program on clients to initiate backups
		-communicates with bprd on server
	bpbkar32
		-program used on Windows clients to generate backup images
		-not used directly by client users
	bplist     
		-command-line program on clients to initiate file lists
		-communicates with bprd on server
	bprestore  
		-command-line program on clients to initiate restores
		-communicates with bprd on server
	bphdb
		-program used to start obackup to do Oracle database backups
	bpdb2
		-log for the DB2 Extension clients
	dbclient
		-log for the DB Extension clients
	bpdbsbdb2
		-command-line program used to initiate template based
		 user-directed DB2 backup and recovery
		-enables generation of a shell script from a template for DB2
	bpdbsbora
		-command-line program used to initiate template based
		 user-directed backup and recovery
		-enables generation of a shell script from a template
	tar32
		-program used on Windows clients to restore backup images
	bpnbat
		-command-line program to manage NetBackup Access Control
		authentication
	nblaunch
		-Windows GUI for NetBackup administration of a server
	nbcfg
		-Windows GUI to configure NetBackup
	nbmon
		-Windows GUI to monitor NetBackup jobs, services and processes
	nbReport
		-Windows GUI to generate reports on NetBackup status
	nbwin
		-Windows GUI for backups, archives, and restores
	nbclass
		-Windows GUI to manage NetBackup policies
	nbstunit
		-Windows GUI to manage NetBackup storage units
	bpfilter
		-client program used to filter backup images between the media
		 server and bpbkar or tar on the client
	bpkeyutil
		-command-line program to manage Encryption key files
	vnetd
		-NetBackup Legacy Network service
		-used to create &quot;firewall friendly&quot; socket connections
		 and provide other miscellaneous services
	nbstop
		-command-line program used to shut down the NetBackup services on the client where it was run.
	mssql_backup_failures
		-log for MSSQL backup operation failures
	nbrepo
		-command-line program used to manage the NetBackup deployment package repository.
	nbinstallagent
		-command-line program used during execution of VxUpdate deployment policies.


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),d=[a];function r(l,c){return n(),i("div",null,d)}const o=e(t,[["render",r],["__file","post77_backup_nbu_03.html.vue"]]);export{o as default};
