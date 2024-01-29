---
# 这是文章的标题
title: 数据保护：Netbackup：Netbackup网络通讯问题排错
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 80
# 设置作者
# 设置写作时间
date: 2024-01-29
# 一个页面可以有多个分类
category:
  - 数据保护
  - 问题解决

# 一个页面可以有多个标签
tag:
  - 数据备份
  - Netbackup
  - 日志
  - 原创
  



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

## 前言

Learn how to troubleshoot the common network communication issue between Netbackup systems.





## 正文


### Enable debug logs on master server,client,media servers.

- for linux, `/usr/openv/netbackup/logs/mklogdir`


### Understanding Firewall port requirements between NetBackup hosts


```
Master Server (veritas_pbx: Port 1556> < -- > client(s),media server(s)
Master Server (vnetd_network_service: Port 13724> < -- > client(s),media server(s)
Media server:10102:	Deduplication Manager (spad) <----> Master Server, Client(s)
MSDP server:10082: Deduplication Engine (spoold)  <----> Master Server, Client(s)
```	


### Troubleshooting on Netbackup master server side 

- Verify that PBX and vnetd processes are functional 

```
# ps -ef | egrep 'pbx_exchange|vnetd|bpcd' | grep -v grep
root 306 1 0 Jul 18 ? 13:52 /opt/VRTSpbx/bin/pbx_exchange
root 10274 1 0 Sep 13 ? 0:11 /usr/openv/netbackup/bin/vnetd -standalone
root 10277 1 0 Sep 13 ? 0:45 /usr/openv/netbackup/bin/bpcd -standalone
```

- (optional) check more processes `/usr/openv/netbackup/bin/bpps -x` 


- Check the port requied for server-client communications

expected to see something smilar to below output

```
# netstat -a | egrep '1556|PBX|13724|vnetd|13782|bpcd' | grep LISTEN
*.1556 *.* 0 0 49152 0 LISTEN
*.13724 *.* 0 0 49152 0 LISTEN
*.13782 *.* 0 0 49152 0 LISTE
```

- Test the client connectivity to see if netbackup client daemon(bpcd) is reachable

```
[root@nbu_master_server]# /usr/openv/netbackup/bin/admincmd/bptestbpcd -verbose -debug -client <nbu_client>_or_<media_server_name>

11:55:07.028 [1333] <2> bptestbpcd: VERBOSE = 0
11:55:07.038 [1333] <2> vnet_pbxConnect_ex: pbxConnectExEx Succeeded
11:55:07.188 [1333] <2> logconnections: PROXY CONNECT FROM 192.168.6.41.54720 TO 172.20.0.81.1556 fd = 3
11:55:07.189 [1333] <2> logconnections: BPCD CONNECT FROM 127.0.0.1.36246 TO 127.0.0.1.55596 fd = 3
11:55:07.189 [1333] <2> vnet_connect_to_vnetd_bpcd: js_bpcd_info: 0x14b5650
11:55:07.191 [1333] <2> vnet_pbxConnect_ex: pbxConnectExEx Succeeded
11:55:07.238 [1333] <8> do_pbx_service: [vnet_connect.c:3510] via PBX VNETD CONNECT FROM 192.168.6.41.48990 TO 172.20.0.81.1556 fd = 4
11:55:07.490 [1333] <2> bpcr_get_version_rqst: bpcd version: 08200000
1 1 1
127.0.0.1:36246 -> 127.0.0.1:55596 PROXY 192.168.6.41:54720 -> 172.20.0.81:1556
127.0.0.1:36246 -> 127.0.0.1:55600 PROXY 192.168.6.41:48990 -> 172.20.0.81:1556
```
- Review the Netbackup Request Daemon log

Successful Client connection will be logged in `logs/bprd/xxxx.log`



- Review PBX log for more details


for linux, look up in `/opt/VRTSpbx/log/`


- Review `vnetd` log for more details

> vnetd is the NetBackup network communications service (daemon) used to create firewall-friendly socket connections. It allows all socket communication to take place while it connects to a single port.



### Troubleshooting on NetBackup client side



- Test if the master ports(pbx:1566,vnetd:13724) are reachable 

```bash
telnet clientname 1556
telnet clientname 13724
```

- Test name resolution with `bpclntcmd -pn`

```
> /usr/openv/netbackup/bin/bpclntcmd -pn
expecting response from server master_server_01
client_01.example.com *NULL* 192.168.0.30 3815 
``` 

- Review the `bpcd` log (netbackup client daemon)

failed conn will be logged in `<netbackup_client_install_dir>/bpcd/xxx.log`



- Review `vnetd` log 

log located in `<nbu_clnt_dir>/logs/vnetd`


## Troubleshooting Connectivity for Storage Servers related issues

- Test Storage server states on master server side.

```
[root@nbu_master_server ~]# /usr/openv/netbackup/bin/admincmd/nbdevquery -liststs  -U
Storage Server      : nbu_master_server.example.com
Storage Server Type : BasicDisk
Storage Type        : Formatted Disk, Direct Attached
State               : UP
...

Storage Server      : nbu_st01.example.com
Storage Server Type : DataDomain
Storage Type        : Formatted Disk, Network Attached
State               : UP

```

## Reference
[Netbackup Troubleshooting Guide](https://www.veritas.com/support/en_US/doc/15179611-127304775-0/v127651251-127304775)