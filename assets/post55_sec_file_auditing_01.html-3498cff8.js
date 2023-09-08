import{_ as a,W as n,X as l,Z as e,$ as i,a0 as s,Y as d,G as o}from"./framework-b5535326.js";const r="/assets/Post55_sec__adauditPlus_SVM_AD_Obj_Attri_Operatingsystem_before_change-38dd37e9.jpg",u="/assets/Post55_sec__adauditPlus_SVM_AD_Obj_Attri_Operatingsystem_after_change-fbf592b3.jpg",c={},p=d('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>介绍一款Windows安全审计工具<code>ManageEngine ADAudit Plus</code>，</p><blockquote><p>Tracking file and folder modifications with ADAudit Plus</p></blockquote><p>主要支持：</p><ul><li>活动目录审计</li><li>文件系统审计。</li></ul><h2 id="一、活动目录审计" tabindex="-1"><a class="header-anchor" href="#一、活动目录审计" aria-hidden="true">#</a> 一、活动目录审计</h2><p>审计项目：</p><ul><li>AD用户对象变更，例如：（用户账户/计算机账户创建、删除、登录活动异常分析、账户锁定等）</li><li>AD组对象变更。例如成员变更等；</li><li>组策略对象的变更等</li></ul><h2 id="二、文件系统审计" tabindex="-1"><a class="header-anchor" href="#二、文件系统审计" aria-hidden="true">#</a> 二、文件系统审计</h2><p>审计对象：</p><ul><li>文件和文件夹的变更。例如添加/删除/移动/修改等；</li></ul><p>主要支持CIFS文件服务器：</p><ul><li>Windows文件服务器</li><li>NetApp Ontap (Cluster)/SVM CIFS</li><li>EMC Isilon</li></ul><p>注意到，都是CIFS文件服务器，并不支持NFS系统。</p><h2 id="三、adaudit-plus安装和配置" tabindex="-1"><a class="header-anchor" href="#三、adaudit-plus安装和配置" aria-hidden="true">#</a> 三、ADAudit Plus安装和配置</h2><p>简单不介绍，安装后，几乎是开箱即用。</p><h2 id="四、文件系统审计和联想凌拓nas集成问题" tabindex="-1"><a class="header-anchor" href="#四、文件系统审计和联想凌拓nas集成问题" aria-hidden="true">#</a> 四、文件系统审计和联想凌拓NAS集成问题</h2><blockquote><p>之所以单独讲联想凌拓NAS，是因为凌拓NAS运行的系统其实也是ONTAP，国产版的NetApp, 理论上能被ADAudit支持，也不在ADAudit Plus官方支持列表。但事实证明，如果不做特殊配置，ADAudit Plus确实无法审计联想凌拓NAS。</p></blockquote><p><strong>一般集成步骤</strong></p><p>ADAudit Plus和文件共享系统（CIFS)集成步骤一般是在ADAudit Plus上执行：</p><ul><li>发现CIFS服务器</li><li>添加要共享的文件夹</li><li>开启审计选项（Windows SACL)</li></ul><p><strong>问题描述</strong></p><p>我们在凌拓NAS（型号DH5000M) 上创建SVM，然后把VServer(SVM)加入活动目录后，也能在AD目录看到一个SVM的AD计算机对象。但通过ADAudit配置NetApp服务器向导添加这个CIFS服务器时，发现不了，会看到错误消息：</p><blockquote><p>&quot; No Active Directory Objects available.&quot;</p></blockquote><p>意思是SVM没有在AD中发现，这样向导也就没法继续剩下的集成步骤。</p><p>翻遍ManageEngine ADAudit Plus的官方支持手册和Google也没有解决方案。</p><div class="hint-container tip"><p class="hint-container-title">题外：什么是ONTAP VServer/SVM</p><p>Storage Virtual Machine（SVM，以前称为 Vserver） ONTAP SVM 对于客户端而言都是一个专用CIFS/NFS服务器，简单理解SVM就是运行在ONTAP里面的一台虚拟机，对外提供CIFS/NFS协议。</p></div><p><strong>分析</strong></p><ul><li><p>SVM CIFS计算机对象明明已经在AD里面存在了，为什么ADAudit会发现不到？</p></li><li><p>如果我是开发人员，我会通过计算机账户的某个特定AD属性来发现AD目录中的NetAPP ONTAP。那会是使用哪个属性？</p></li><li><p>按照这个思路，翻看这个SVM AD计算机属性，看到<code>operatingSystem</code> (操作系统)这个AD属性，如下图：</p></li></ul><figure><img src="'+r+'" alt="Before" tabindex="0" loading="lazy"><figcaption>Before</figcaption></figure><ul><li>我猜，ADAudit会查询AD中所有计算机对象，如果遍历对象该字段属性值是否包含&quot;ontap&quot;字符串则是netapp CIFS服务器，否则不是。</li></ul><p><strong>解决方案</strong></p><ul><li>如上图以及思路，可以看到凌拓设备对应的属性值是<code>Lenovo Release 9.11.1P4</code>, 尝试修改成<code>Ontap</code>,如下图：</li></ul><figure><img src="'+u+`" alt="After" tabindex="0" loading="lazy"><figcaption>After</figcaption></figure><ul><li><p>等待几分钟，然后通过ADAudit配置NetApp服务器向导，可以发现到了! 😃</p></li><li><p>能够发现后，按照向导完成剩下的配置步骤。</p></li></ul><h2 id="扩展-如何配置netapp-ontap文件审计" tabindex="-1"><a class="header-anchor" href="#扩展-如何配置netapp-ontap文件审计" aria-hidden="true">#</a> 扩展：如何配置NetApp ONTAP文件审计</h2><ul><li>创建1个文件审计策略</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cluster1::&gt; vserver audit create -vserver vs1 -destination /audit_log -events file-ops,cifs-logon-logoff,file-share,audit-policy-change,user-account,security-group,authorization-policy-change,cap-staging -rotate-schedule-month all -rotate-schedule-dayofweek all -rotate-schedule-hour 12 -rotate-schedule-minute 30 -rotate-limit 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>启动审计</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vserver audit enable -vserver vserver_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看审计策略</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MyFileCluster::&gt; vserver audit show -vserver svm_cifs

                           Vserver: svm_cifs
                    Auditing State: true
              Log Destination Path: /vol_sys_auditing
     Categories of Events to Audit: file-ops, audit-policy-change
                        Log Format: evtx
               Log File Size Limit: 200MB
      Log Rotation Schedule: Month: -
Log Rotation Schedule: Day of Week: -
        Log Rotation Schedule: Day: -
       Log Rotation Schedule: Hour: -
     Log Rotation Schedule: Minute: -
                Rotation Schedules: -
          Log Files Rotation Limit: 5
            Log Retention Duration: 0s
      Strict Guarantee of Auditing: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,42),v={href:"https://docs.netapp.com/us-en/ontap/nas-audit/create-auditing-config-task.html",target:"_blank",rel:"noopener noreferrer"};function g(h,A){const t=o("ExternalLinkIcon");return n(),l("div",null,[p,e("p",null,[i("具体参考："),e("a",v,[i("https://docs.netapp.com/us-en/ontap/nas-audit/create-auditing-config-task.html"),s(t)])])])}const _=a(c,[["render",g],["__file","post55_sec_file_auditing_01.html.vue"]]);export{_ as default};