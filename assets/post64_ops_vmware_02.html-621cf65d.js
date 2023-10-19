import{_ as t,W as o,X as p,Z as s,$ as a,a0 as e,Y as i,G as l}from"./framework-b5535326.js";const c="/assets/post65_vmware_snaphsot_crash-consistent-13573f8a.png",r={},d=s("h2",{id:"前言",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),a(" 前言")],-1),u={href:"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/post65_ops_vmware_01.html",target:"_blank",rel:"noopener noreferrer"},k=i('<blockquote><p>系统管理员非常喜欢使用快照，给虚拟机做变更前，习惯先创建一个快照，出了问题回滚到快照前就好了，很方便。 但有时不合理的使用，例如用来取代做数据备份，其实是不可取的。</p></blockquote><h2 id="虚拟机快照介绍" tabindex="-1"><a class="header-anchor" href="#虚拟机快照介绍" aria-hidden="true">#</a> 虚拟机快照介绍</h2><p>虚拟机快照，<code>Snapshot</code>。用来存储虚拟机某个时间点的状态、数据，注意时某个时间点的数据和状态，并不是整个虚拟机磁盘的克隆，快照存储的是磁盘的增量内容。</p><h2 id="虚拟机快照工作机制" tabindex="-1"><a class="header-anchor" href="#虚拟机快照工作机制" aria-hidden="true">#</a> 虚拟机快照工作机制</h2><h3 id="创建快照" tabindex="-1"><a class="header-anchor" href="#创建快照" aria-hidden="true">#</a> 创建快照</h3><blockquote><p>对一个虚机做快照，相当于将虚机当前的磁盘(即base vmdk，一般是-flat.vmdk)设为只读模式，然后创建 delta vmdk 文件，它将会接受新的数据写操作。</p></blockquote><p>一个delta.vmdk文件代表一个快照(<code>delta</code>代表数字序列号)，如果有多个快照就有多个delta.vmdk文件。</p><p>最新的快照delta磁盘文件，位于最上方，是唯一的写入层，之前的快照磁盘变为只读</p><ul><li><strong>写损失</strong>：</li></ul><blockquote><p>写的时候，遵循 <code>Copy-on-write</code> 机制，按照数据分块，当需要修改某一块中的数据时，先将它从父vmdk 中拷贝到 delta vmdk，然后再对它修改。</p></blockquote><ul><li><strong>读损失</strong></li></ul><blockquote><p>当读取某一块数据时，ESXi 需要判断从哪里去读： 对于没有修改的数据块，从父 vmdk 读； 对已经修改了的数据块，从 delta vmdk 读。</p></blockquote><p>可见，客户端的一次读操作，可能需要从不同的 vmdk 上读取数据。</p><blockquote><p>delta vmdk 的大小不会超过 base vmdk 的大小，因为极限情况是所有的数据都被拷贝到delta vmdk 并且都没修改了。，。vSphere 限定一个虚机最多有 32 个快照，但是建议最多只有 2-3 个，而且快照的保留时间不超过一天。</p></blockquote><div class="hint-container note"><p class="hint-container-title">注</p><p>因为快照会带来读和写损失，因此一个虚机不能有太多的快照,否则会带来虚拟机性能下降。</p></div><h3 id="删除快照" tabindex="-1"><a class="header-anchor" href="#删除快照" aria-hidden="true">#</a> 删除快照</h3><p>删除快照，并不会删除当前的数据。它是怎么做到的呢。其实，快速删除做了以下：</p><ul><li><p>快照删除时，先触发快照向下磁盘文件（或父快照）合并数据(Consolidate)。被删除的快照上的数据会合并到它的父快照（或基础磁盘）</p></li><li><p>然后，删除快照磁盘文件。</p></li></ul><p><strong>数据合并 Consolidation</strong></p><ul><li>直接基于基础磁盘(Base VMDK)的快速上的数据，直接向Base VMDK合并，写入base vmdk文件；</li><li>基于有父快照的快照会向父快照的delta磁盘文件何婷，数据吸入到父快照delta vmdk文件；</li><li>如果时删除所有快照，所有快照会直接向base vmdk合并，不在一层一层合并；</li></ul><div class="hint-container warning"><p class="hint-container-title">注意</p><p>删除快照意味着快照之后的改变会被合并到快照之前的数据，因此虚拟机无法回退到创建快照时的状态！</p></div><div class="hint-container note"><p class="hint-container-title">注</p><p>删除快照因为会带来数据合并，造成磁盘大量IO写，因此虚拟机的性能受到影响！</p></div><h3 id="恢复快照" tabindex="-1"><a class="header-anchor" href="#恢复快照" aria-hidden="true">#</a> 恢复快照</h3><p>恢复快照，就是把虚拟机的base vmdk指向到目标快照的vmdk。其结果时从目标快照创建后的一切改动都将丢失。</p><h2 id="扩展-快照类型" tabindex="-1"><a class="header-anchor" href="#扩展-快照类型" aria-hidden="true">#</a> 扩展：快照类型</h2><p>创建快照时，其实有3种快照：</p><ul><li><p>崩溃一致快照（Crash-Consistent Snapshot)</p></li><li><p>应用一致性快照 （Application-Consistent Snapshot)</p></li><li><p>文件系统一致快照 （File System Consistent Snapshot)</p></li></ul><h3 id="崩溃一致快照" tabindex="-1"><a class="header-anchor" href="#崩溃一致快照" aria-hidden="true">#</a> 崩溃一致快照</h3><p>应用程序还在运行，IO还在进行的创建的快照。相当于虚拟机突然断电了磁盘的状态。</p><p><strong>一、特点</strong></p><p>优点：速度快。 缺点：恢复快照可能会丢失数据。创建快照时，因为文件系统/应用程序如果有数据还在内存中或缓存里没有来得及写入磁盘（即还有脏数据），快照指令也不会向应用发送flush立即写入磁盘。</p><div class="hint-container tip"><p class="hint-container-title">怎么克服缺点</p><p>为保证一致性，只有停止IO。例如先正常停止应用程序运行或关闭虚拟机电源，再进行快照创建。</p></div><p><strong>三、应用场景</strong></p><p>该类型的快照多用于非关键业务应用，能自动修复机制的文件系统。比较好的文件系统有一致性检查功能，及时文件系统不一致，也可以通过日志自我修复。</p><p><strong>四、创建方法</strong></p><p>通过vSphere Web控制台创建快照时，默认如果没有勾选【静默客户端文件系统】或是虚拟机没有安装VMware Tools，则创建的是该类型快照。</p><figure><img src="'+c+`" alt="Crash-Consistent" tabindex="0" loading="lazy"><figcaption>Crash-Consistent</figcaption></figure><h3 id="应用一致性快照" tabindex="-1"><a class="header-anchor" href="#应用一致性快照" aria-hidden="true">#</a> 应用一致性快照</h3><blockquote><p>又称<code>文件系统静默快照</code> (File System Quiseced Snapshot)，就是可以保证客户端操作系统的应用一致性的快照。做快照之前，虚拟机里的应用程序被暂时冻结（Quiseced)，注意：冻结不得超过60秒。内存中的脏数据都被刷进磁盘；在快照做完之后，应用被解冻。此时的快照是应用程序一致的。</p></blockquote><p><strong>一、特点</strong></p><p>优点：可以保证应用数据的一致性，属于Application-Aware。 缺点：因为需要冻结应用，可能会造成应用不可用。</p><div class="hint-container tip"><p class="hint-container-title">怎么克服缺点</p><p>创建快照时，会影响应用的可用性，可以通过计划快照创建到非业务繁忙时间段。</p></div><p><strong>二、前提条件</strong></p><p>虚拟机上安装对应的VMWare Tools</p><p><strong>三、应用场景</strong></p><p>该类型的快照多用于数据库应用的数据备份。快照创建一般由备份软件发起的。</p><p><strong>四、创建方法</strong></p><p>它的工作过程大致如下：</p><p><strong>Windows</strong></p><p>Windows平台上，VMware Tools需要使用到<code>Microsoft VSS Provider</code>,VSS是一个接口，实际还需要<code>VSS Writers</code>来实现冻结静默操作，详细如下：</p><ul><li><p>备份程序发出 quiesced snapshot 创建请求给 <code>vCenter</code>，vCenter 给虚机所在的 ESXi 的 <code>hostd</code> 服务发出指令</p></li><li><p>ESXi 上的 <code>Hostd</code> 将请求传给客户机内的 <code>VMware Tools</code></p></li><li><p>VMware tools 以 <code>VSS Requester</code> 的身份通知 VSS，VSS 再通知已经注册的文件系统以及各应用的 <code>VSS writer</code> 执行各自的数据下刷和冻结操作（应用的暂时冻结不能超过60秒）</p></li><li><p>一旦完成，VMware tools 将就结果告诉 hostd</p></li><li><p><code>Hostd</code> 再执行快照操作</p></li><li><p>操作结束，按照前面的顺序再对文件系统和应用进行解冻。</p></li></ul><div class="hint-container note"><p class="hint-container-title">注</p><p>从以上看出，该类型快照，需要在虚拟机内部安装VMWare Tools以及需要应用程序厂商对应的VSS Writer。微软应用一般都有，比例比较常见的Exchange和MSSQL。通过<code>vssadmin list providers</code> 和<code>vssadmin list writers</code> 可以查看。</p></div><p><strong>其他系统</strong></p><p>和Windows系统不同，Linux没有所谓的VSS Writer。这样，静默Linux虚拟机需要管理员自己编写静默脚本配合VMWare Tools来完成。主要是要写一个脚本实现VMware Tools的3个操作。</p><p>脚本要放在位置<code> /etc/vmware-tools/backupScripts.d</code>,脚本可以有多个。每个脚本要实现：</p><ul><li><code>freeze</code>。怎么开始冻结操作；</li><li><code>thaw</code>, 怎么释放冻结；</li><li><code>freezFail</code>,冻结失败怎么处理；</li></ul><p>范例：support quiescing for a Linux VM running a PostgreSQL database.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$1</span> <span class="token operator">==</span> <span class="token string">&quot;freeze&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
        <span class="token comment"># set log directory</span>
        <span class="token assign-left variable">log</span><span class="token operator">=</span><span class="token string">&quot;/var/log/vpostgres_backup.log&quot;</span>
        <span class="token comment"># set and log start date</span>
        <span class="token assign-left variable">today</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> +%Y<span class="token punctuation">\\</span>/%m<span class="token punctuation">\\</span>/%d<span class="token punctuation">\\</span> %H:%M:%S<span class="token variable">\`</span></span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${today}</span>: Start of creation consistent state&quot;</span> <span class="token operator">&gt;&gt;</span> <span class="token variable">\${log}</span>
        <span class="token comment"># execute freeze command.</span>
        <span class="token comment"># This command can be modified as per the database command</span>
        <span class="token assign-left variable">cmd</span><span class="token operator">=</span><span class="token string">&quot;echo <span class="token entity" title="\\&quot;">\\&quot;</span>SELECT pg_start_backup(&#39;<span class="token variable">\${today}</span>&#39;, true);<span class="token entity" title="\\&quot;">\\&quot;</span> | sudo -i -u postgres psql &gt;&gt; <span class="token variable">\${log}</span> 2&gt;&amp;1&quot;</span>
        <span class="token builtin class-name">eval</span> <span class="token variable">\${cmd}</span>
        <span class="token comment"># set and log end date</span>
        <span class="token assign-left variable">today</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> +%Y<span class="token punctuation">\\</span>/%m<span class="token punctuation">\\</span>/%d<span class="token punctuation">\\</span> %H:%M:%S<span class="token variable">\`</span></span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${today}</span>: Finished freeze script&quot;</span> <span class="token operator">&gt;&gt;</span> <span class="token variable">\${log}</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$1</span> <span class="token operator">==</span> <span class="token string">&quot;thaw&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;This section is executed when the Snapshot is removed&quot;</span>
        <span class="token assign-left variable">log</span><span class="token operator">=</span><span class="token string">&quot;/var/log/vpostgres_backup.log&quot;</span>
        <span class="token comment"># set and log start date</span>
        <span class="token assign-left variable">today</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> +%Y<span class="token punctuation">\\</span>/%m<span class="token punctuation">\\</span>/%d<span class="token punctuation">\\</span> %H:%M:%S<span class="token variable">\`</span></span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${today}</span>: Release of backup&quot;</span> <span class="token operator">&gt;&gt;</span> <span class="token variable">\${log}</span>
        <span class="token comment"># execute release command</span>
        <span class="token assign-left variable">cmd</span><span class="token operator">=</span><span class="token string">&quot;echo <span class="token entity" title="\\&quot;">\\&quot;</span>SELECT pg_stop_backup();<span class="token entity" title="\\&quot;">\\&quot;</span> | sudo -i -u postgres psql &gt;&gt; <span class="token variable">\${log}</span> 2&gt;&amp;1&quot;</span>
        <span class="token builtin class-name">eval</span> <span class="token variable">\${cmd}</span>
        <span class="token comment"># set and log end date</span>
        <span class="token assign-left variable">today</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> +%Y<span class="token punctuation">\\</span>/%m<span class="token punctuation">\\</span>/%d<span class="token punctuation">\\</span> %H:%M:%S<span class="token variable">\`</span></span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${today}</span>: Finished thaw script&quot;</span> <span class="token operator">&gt;&gt;</span> <span class="token variable">\${log}</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$1</span> <span class="token operator">==</span> <span class="token string">&quot;freezeFail&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;This section is executed when the Quiescing Fails.&quot;</span>
<span class="token keyword">else</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;No argument was provided&quot;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件系统一致性快照" tabindex="-1"><a class="header-anchor" href="#文件系统一致性快照" aria-hidden="true">#</a> 文件系统一致性快照</h3><p>又称<code>文件系统静默快照</code> (File System Quiseced Snapshot)，就是可以保证客户端操作系统的文件系统一致性的快照。同样，做快照之前，虚机的文件系统被暂时冻结（Quiseced)，内存中的脏数据都被刷进磁盘；在快照做完之后，文件系统被解冻。此时的快照是文件系统一致的。</p><p><strong>一、特点</strong></p><p>略</p><p><strong>二、前提条件</strong></p><p>虚拟机上安装对应的VMWare Tools</p><p><strong>三、应用场景</strong></p><p>该类型的快照多用于虚拟机的整机备份。</p><p><strong>四、创建方法</strong></p><p>通过vSphere Web控制台创建快照时，勾选【静默客户端文件系统】并确保虚拟机没有安装VMware Tools，则创建的是该类型快照。</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,69),v={href:"https://www.jb51.net/article/108224.htm",target:"_blank",rel:"noopener noreferrer"},h={href:"https://docs.vmware.com/en/VMware-Cloud-Disaster-Recovery/services/vmware-cloud-disaster-recovery/GUID-DBF1DFD5-F956-4ED9-AF06-95664D3AA89D.html",target:"_blank",rel:"noopener noreferrer"};function b(m,g){const n=l("ExternalLinkIcon");return o(),p("div",null,[d,s("p",null,[a("通过 "),s("a",u,[a("虚拟机系列：虚拟机磁盘文件介绍"),e(n)]),a(" 了解了虚拟机磁盘文件, 这篇是学习虚拟机快照的基础原理，对快照管理提高认识，也是对参考文章的知识点进行highlight。")]),k,s("ul",null,[s("li",null,[s("p",null,[s("a",v,[a("详解云与备份之VMware虚机备份和恢复"),e(n)]),a(",作者SammyLiu")])]),s("li",null,[s("p",null,[s("a",h,[a("Enabling Quiescing for Linux VMs"),e(n)])])])])])}const q=t(r,[["render",b],["__file","post64_ops_vmware_02.html.vue"]]);export{q as default};
