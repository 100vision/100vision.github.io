import{_ as i,W as t,X as s,Z as e,$ as a,a0 as r,Y as l,G as d}from"./framework-b5535326.js";const o={},c=l(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>Learn how to troubleshoot the common network communication issue between Netbackup systems.</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="enable-debug-logs-on-master-server-client-media-servers" tabindex="-1"><a class="header-anchor" href="#enable-debug-logs-on-master-server-client-media-servers" aria-hidden="true">#</a> Enable debug logs on master server,client,media servers.</h3><ul><li>for linux, <code>/usr/openv/netbackup/logs/mklogdir</code></li></ul><h3 id="understanding-firewall-port-requirements-between-netbackup-hosts" tabindex="-1"><a class="header-anchor" href="#understanding-firewall-port-requirements-between-netbackup-hosts" aria-hidden="true">#</a> Understanding Firewall port requirements between NetBackup hosts</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Master Server (veritas_pbx: Port 1556&gt; &lt; -- &gt; client(s),media server(s)
Master Server (vnetd_network_service: Port 13724&gt; &lt; -- &gt; client(s),media server(s)
Media server:10102:	Deduplication Manager (spad) &lt;----&gt; Master Server, Client(s)
MSDP server:10082: Deduplication Engine (spoold)  &lt;----&gt; Master Server, Client(s)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="troubleshooting-on-netbackup-master-server-side" tabindex="-1"><a class="header-anchor" href="#troubleshooting-on-netbackup-master-server-side" aria-hidden="true">#</a> Troubleshooting on Netbackup master server side</h3><ul><li>Verify that PBX and vnetd processes are functional</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># ps -ef | egrep &#39;pbx_exchange|vnetd|bpcd&#39; | grep -v grep
root 306 1 0 Jul 18 ? 13:52 /opt/VRTSpbx/bin/pbx_exchange
root 10274 1 0 Sep 13 ? 0:11 /usr/openv/netbackup/bin/vnetd -standalone
root 10277 1 0 Sep 13 ? 0:45 /usr/openv/netbackup/bin/bpcd -standalone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>(optional) check more processes <code>/usr/openv/netbackup/bin/bpps -x</code></p></li><li><p>Check the port requied for server-client communications</p></li></ul><p>expected to see something smilar to below output</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># netstat -a | egrep &#39;1556|PBX|13724|vnetd|13782|bpcd&#39; | grep LISTEN
*.1556 *.* 0 0 49152 0 LISTEN
*.13724 *.* 0 0 49152 0 LISTEN
*.13782 *.* 0 0 49152 0 LISTE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Test the client connectivity to see if netbackup client daemon(bpcd) is reachable</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@nbu_master_server]# /usr/openv/netbackup/bin/admincmd/bptestbpcd -verbose -debug -client &lt;nbu_client&gt;_or_&lt;media_server_name&gt;

11:55:07.028 [1333] &lt;2&gt; bptestbpcd: VERBOSE = 0
11:55:07.038 [1333] &lt;2&gt; vnet_pbxConnect_ex: pbxConnectExEx Succeeded
11:55:07.188 [1333] &lt;2&gt; logconnections: PROXY CONNECT FROM 192.168.6.41.54720 TO 172.20.0.81.1556 fd = 3
11:55:07.189 [1333] &lt;2&gt; logconnections: BPCD CONNECT FROM 127.0.0.1.36246 TO 127.0.0.1.55596 fd = 3
11:55:07.189 [1333] &lt;2&gt; vnet_connect_to_vnetd_bpcd: js_bpcd_info: 0x14b5650
11:55:07.191 [1333] &lt;2&gt; vnet_pbxConnect_ex: pbxConnectExEx Succeeded
11:55:07.238 [1333] &lt;8&gt; do_pbx_service: [vnet_connect.c:3510] via PBX VNETD CONNECT FROM 192.168.6.41.48990 TO 172.20.0.81.1556 fd = 4
11:55:07.490 [1333] &lt;2&gt; bpcr_get_version_rqst: bpcd version: 08200000
1 1 1
127.0.0.1:36246 -&gt; 127.0.0.1:55596 PROXY 192.168.6.41:54720 -&gt; 172.20.0.81:1556
127.0.0.1:36246 -&gt; 127.0.0.1:55600 PROXY 192.168.6.41:48990 -&gt; 172.20.0.81:1556
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Review the Netbackup Request Daemon log</li></ul><p>Successful Client connection will be logged in <code>logs/bprd/xxxx.log</code></p><ul><li>Review PBX log for more details</li></ul><p>for linux, look up in <code>/opt/VRTSpbx/log/</code></p><ul><li>Review <code>vnetd</code> log for more details</li></ul><blockquote><p>vnetd is the NetBackup network communications service (daemon) used to create firewall-friendly socket connections. It allows all socket communication to take place while it connects to a single port.</p></blockquote><h3 id="troubleshooting-on-netbackup-client-side" tabindex="-1"><a class="header-anchor" href="#troubleshooting-on-netbackup-client-side" aria-hidden="true">#</a> Troubleshooting on NetBackup client side</h3><ul><li>Test if the master ports(pbx:1566,vnetd:13724) are reachable</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>telnet clientname <span class="token number">1556</span>
telnet clientname <span class="token number">13724</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Test name resolution with <code>bpclntcmd -pn</code></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; /usr/openv/netbackup/bin/bpclntcmd -pn
expecting response from server master_server_01
client_01.example.com *NULL* 192.168.0.30 3815 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Review the <code>bpcd</code> log (netbackup client daemon)</li></ul><p>failed conn will be logged in <code>&lt;netbackup_client_install_dir&gt;/bpcd/xxx.log</code></p><ul><li>Review <code>vnetd</code> log</li></ul><p>log located in <code>&lt;nbu_clnt_dir&gt;/logs/vnetd</code></p><h2 id="troubleshooting-connectivity-for-storage-servers-related-issues" tabindex="-1"><a class="header-anchor" href="#troubleshooting-connectivity-for-storage-servers-related-issues" aria-hidden="true">#</a> Troubleshooting Connectivity for Storage Servers related issues</h2><ul><li>Test Storage server states on master server side.</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@nbu_master_server ~]# /usr/openv/netbackup/bin/admincmd/nbdevquery -liststs  -U
Storage Server      : nbu_master_server.example.com
Storage Server Type : BasicDisk
Storage Type        : Formatted Disk, Direct Attached
State               : UP
...

Storage Server      : nbu_st01.example.com
Storage Server Type : DataDomain
Storage Type        : Formatted Disk, Network Attached
State               : UP

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>`,34),u={href:"https://www.veritas.com/support/en_US/doc/15179611-127304775-0/v127651251-127304775",target:"_blank",rel:"noopener noreferrer"};function v(b,p){const n=d("ExternalLinkIcon");return t(),s("div",null,[c,e("p",null,[e("a",u,[a("Netbackup Troubleshooting Guide"),r(n)])])])}const g=i(o,[["render",v],["__file","post80_backup_nbu_04.html.vue"]]);export{g as default};
