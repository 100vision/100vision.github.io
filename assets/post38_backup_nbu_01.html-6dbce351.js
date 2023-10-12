import{_ as r,W as o,X as n,Z as e,$ as i,a0 as t,Y as l,G as s}from"./framework-b5535326.js";const c="/assets/post38_nbu_air_add_trusted_master-1f29bfe6.jpg",d="/assets/post38_nbu_air_cofigure_storage_server_repl_conf_step1-f8e334d4.jpg",p="/assets/post38_nbu_air_cofigure_storage_server_repl_conf_step2-0d1f9cc9.jpg",u="/assets/post38_nbu_air_cofigure_backup_policy-b0b1ff4f.jpg",h={},b=l('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>这几天因为要做NBU还原数据库，但备份在另一个Netbackup服务器（即其他备份域），依稀记得使用AIR可以跨域取备份，但不知道怎么具体操作，于是又把Netbackup学习了一遍，主要是备份复制方面。最后明白其实不使用AIR也可以取备份，后面再说。</p><h2 id="netbackup复制-replication-介绍" tabindex="-1"><a class="header-anchor" href="#netbackup复制-replication-介绍" aria-hidden="true">#</a> Netbackup复制 (Replication)介绍</h2><ul><li>用于实现不同备份域之间备份数据复制，实现多站点多个备份副本，保证备份高可用性；</li><li>备份副本可以在本地恢复，也可以在远程域恢复。</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果是相同备份域，要使用Duplicate功能</p></div><h3 id="automatic-image-replication-air-自动复制" tabindex="-1"><a class="header-anchor" href="#automatic-image-replication-air-自动复制" aria-hidden="true">#</a> Automatic Image Replication (AIR) 自动复制</h3><blockquote><p>AIR功能（Automatic Image Replicate）用于实现不同备份域之间的备份数据自动复制。接合SLP (Storage Lifecycle Policy) 实现备份镜像（备份片）自动复制。</p></blockquote><h3 id="手动复制" tabindex="-1"><a class="header-anchor" href="#手动复制" aria-hidden="true">#</a> 手动复制</h3><p>有自动复制，也就有手动复制。手动复制是使用<code>bpreplicate</code>命令来手动发起实现跨域手动复制备份片。</p><h3 id="air-vs-手动复制" tabindex="-1"><a class="header-anchor" href="#air-vs-手动复制" aria-hidden="true">#</a> AIR VS 手动复制</h3><ul><li><p>AIR是自动复制，，可以和备份策略一起计划安排;</p></li><li><p>手动复制。可以复制已有备份image，管理员可以手动发起。</p></li></ul><p><strong>相同</strong></p><p>个人理解，</p><ul><li>AIR就是使用<code>bpreplicate</code>相同的API来复制，作为SLP的动作一部分，可以和备份策略一起计划调度。</li><li>它们都/只可以复制经过SLP备份的数据。非SLP备份的数据不能复制到其他域。</li></ul><p><strong>不同</strong></p><p>主要是使用场景不同：</p><ul><li>AIR不会复制已经复制的备份数据手动复制，需要和备份策略调度使用；</li><li><code>bpreplicate</code>不需要调度，可以在源域和目标域来回复制，任意时间复制。</li></ul><h2 id="一-air复制" tabindex="-1"><a class="header-anchor" href="#一-air复制" aria-hidden="true">#</a> 一. AIR复制</h2><h3 id="air配置要求" tabindex="-1"><a class="header-anchor" href="#air配置要求" aria-hidden="true">#</a> AIR配置要求</h3><ul><li>Netbackup 7.5以上版本</li><li>要求Storage Server存储类型是PureDisk (MSDP重删池，高级选项需要license)</li><li>只支持PureDisk到PureDisk复制，不支持磁带或是Advanced Disk</li><li>另外NBU服务器之间不能又NAT （未证实）</li></ul><h3 id="实现目的" tabindex="-1"><a class="header-anchor" href="#实现目的" aria-hidden="true">#</a> 实现目的</h3><p>在源域实现数据备份，并同时复制一份备份数据到目标域。在目标域可以实现数据还原。</p><h3 id="air配置步骤" tabindex="-1"><a class="header-anchor" href="#air配置步骤" aria-hidden="true">#</a> AIR配置步骤</h3><ul><li>在源域创建Disk Storage Server，类型<code>Media Server Deduplication Pool</code>,步骤略</li><li>在目标域创建Disk Storage Server，类型<code>Media Server Deduplication Pool</code>,步骤略</li><li>在源域和目标域Master添相互添加对方域为<code>Trusted Master</code>，如下图： 如果有证书警告，选择“接受”。 <img src="'+c+'" alt="添加Trusted Master" loading="lazy"></li><li>在源域的Storage Server上添加目标域Storage Server作为复制对象；</li><li><ul><li>选择目标域的master服务器，选择目标域的Storage server</li></ul></li><li><ul><li>输入对方存储服务器root命令密码 <img src="'+d+'" alt="选择源域的Storage Server" loading="lazy"></li></ul></li></ul><figure><img src="'+p+'" alt="添加目标域的Storage Server" tabindex="0" loading="lazy"><figcaption>添加目标域的Storage Server</figcaption></figure>',25),m={class:"hint-container tip"},_=e("p",{class:"hint-container-title"},"可能异常",-1),g={href:"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/post38_backup_nbu_02.html",target:"_blank",rel:"noopener noreferrer"},v=l('<ul><li><p>在源域上创建SLP策略。</p></li><li><ul><li>新建策略。策略名例如 <code>slp_repl_01</code>。记下，等下会用到。</li></ul></li><li><ul><li>指定数据分类&quot;Data Classification&quot;为<strong>None</strong>。选择其他一般会出错</li></ul></li><li><ul><li>添加策略步骤1，选择&quot;backup&quot;动作，存储选择msdp disk pool</li></ul></li><li><ul><li>添加策略步骤2，选择&quot;replicate&quot;, 选择目标storage的msdp puredisk.</li></ul></li><li><p>在源域上创建备份策略。策略内容：</p></li><li><ul><li>指定策略存储,Policy Storage为前面创建SLP策略。如下图：</li></ul></li></ul><figure><img src="'+u+`" alt="创建backup policy" tabindex="0" loading="lazy"><figcaption>创建backup policy</figcaption></figure><div class="hint-container tip"><p class="hint-container-title">步骤提示</p><p>如果Policy Storage下拉列表中没有出现之前步骤创建的SLP策略，一般是Data Classification不匹配，重新选择。</p></div><ul><li><p>在目标域上创建SLP策略。策略内容:</p></li><li><ul><li>策略名必须和源域创建的SLP一模一样。否则不工作；</li></ul></li><li><ul><li>添加一条import动作。</li></ul></li><li><p>步骤至此完。</p></li></ul><h3 id="其他air事项" tabindex="-1"><a class="header-anchor" href="#其他air事项" aria-hidden="true">#</a> 其他AIR事项</h3><p><strong>AIR复制计划</strong></p><p>不可以计划，一般是备份动作发生后的20分钟后；</p><p><strong>如何查看任务状态</strong></p><ul><li>可以通过观察job任务详情。在源域的可以看到replicate job在跑，在目标域可以看到<code>import</code> job在跑。</li></ul><p><strong>如何管理AIR job</strong></p><ul><li>在源域查看未完成的</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/usr/openv/netbackup/bin/admincmd/nbstlutil list -copy_type replica -U -copy_incomplete
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>在源域查看所有已完成的复制</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># nbstlutil repllist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>在源域上取消一个air job</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/usr/openv/netbackup/bin/admincmd/nbstlutil cancel -backupid &lt;xxx_1686896917&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>在目标域上查看import job</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/usr/openv/netbackup/bin/admincmd/nbstluti pendimplist -U
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="二、-手动复制" tabindex="-1"><a class="header-anchor" href="#二、-手动复制" aria-hidden="true">#</a> 二、 手动复制</h2><h3 id="手动复制的使用场景" tabindex="-1"><a class="header-anchor" href="#手动复制的使用场景" aria-hidden="true">#</a> 手动复制的使用场景</h3><p>手动复制可以实现：</p><ul><li>管理员手动发起复制，在备份域之间手动复制SLP备份数据。</li></ul><p>例如，某公司有这样一个备份环境：</p><ul><li>备份策略：为保证备份可用性，规定备份需要有多个副本；</li><li>备份架构是：一个是生产环境备份master用来存放备份主副本, 一个是DR Netbackup用来存放备份第二个副本。</li><li>保留策略：生产备份服务器备份副本保留1周，源程DR站点的Netbackup保留备份1个月。</li><li>备份计划：生产备份副本定期使用SLP和<code>AIR</code>复制一份到DR；这样2个站点都有备份副本；</li></ul><p>这样， 一般情况下没有使用手动复制，但如果哪天生产副本过期不可用了，DR副本还在保留期，这时就可以使用<code>bpreplicate</code>从DR复制回来到生产域来恢复。</p><h3 id="如何使用nbreplicate手动复制" tabindex="-1"><a class="header-anchor" href="#如何使用nbreplicate手动复制" aria-hidden="true">#</a> 如何使用nbreplicate手动复制</h3><ul><li>在目标域创建SLP并由import策略动作；</li><li>源域Master上执行</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>nbreplicate -backupid XXX_235729 -slp_name &lt;slp_name&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="三、关于复制未通过slp备份的数据到远程域" tabindex="-1"><a class="header-anchor" href="#三、关于复制未通过slp备份的数据到远程域" aria-hidden="true">#</a> 三、关于复制未通过SLP备份的数据到远程域</h2><h3 id="可选方法1" tabindex="-1"><a class="header-anchor" href="#可选方法1" aria-hidden="true">#</a> 可选方法1</h3>`,30),f=e("li",null,"在源域，通过admin console把备份副本duplicate到一个可移动磁盘或介质；",-1),k=e("li",null,"把介质拿到或传输到远程站点；",-1),x=e("li",null,"把介质挂载到远程站点的媒体服务器media server上；",-1),S=e("code",null,"initiate import",-1),A={href:"https://www.veritas.com/support/en_US/article.100017201",target:"_blank",rel:"noopener noreferrer"},P=e("h2",{id:"参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),i(" 参考")],-1),R={href:"https://annurkarthik.wordpress.com/2016/03/09/command-to-start-manual-replication-of-images-to-remote-netbackup-domain/",target:"_blank",rel:"noopener noreferrer"},N={href:"https://vox.veritas.com/t5/NetBackup/how-to-replicate-backup-image-from-one-NBU-domain-to-the-other/td-p/894871",target:"_blank",rel:"noopener noreferrer"};function I(D,L){const a=s("ExternalLinkIcon");return o(),n("div",null,[b,e("div",m,[_,e("p",null,[i("在添加目标storage server可能会出现证书不信任异常，例如hand shaking，可以参照文章 "),e("a",g,[i('"Netbackup: 如何解决Netbackup CA证书异常问题"'),t(a)]),i("，然后再继续。")])]),v,e("ul",null,[f,k,x,e("li",null,[i("在远程域里的catalog中导入(import)这些备份副本，通过"),S,i("； 详细步骤参考："),e("a",A,[i("How to import NetBackup backup images via the NetBackup Administration Console GUI"),t(a)])])]),P,e("p",null,[e("a",R,[i("https://annurkarthik.wordpress.com/2016/03/09/command-to-start-manual-replication-of-images-to-remote-netbackup-domain/"),t(a)])]),e("p",null,[e("a",N,[i("https://vox.veritas.com/t5/NetBackup/how-to-replicate-backup-image-from-one-NBU-domain-to-the-other/td-p/894871"),t(a)])])])}const B=r(h,[["render",I],["__file","post38_backup_nbu_01.html.vue"]]);export{B as default};