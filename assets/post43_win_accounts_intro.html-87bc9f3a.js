import{_ as t,W as r,X as l,Z as e,$ as i,a0 as a,Y as n,G as s}from"./framework-2e6688e7.js";const d="/assets/post43_win_serviceAccount_add_perm_for_a_gMSA-0d702e24.jpg",c={},p=n('<div class="hint-container tip"><p class="hint-container-title">背景</p><p>了解Windows如何更好地管理服务账户，特别是服务账户的密码管理。按照以往的经验，服务账户都是管理员手动创建和管理密码生命周期。一般情况下，为保证服务稳定，管理员在没有安全审计强制要求下，不会更新服务账户密码，但这样长久不更新密码存在安全隐患。微软提供的特殊服务账户可以交由系统自动更新和管理密码。</p></div><h2 id="了解windows服务账户" tabindex="-1"><a class="header-anchor" href="#了解windows服务账户" aria-hidden="true">#</a> 了解Windows服务账户</h2><h3 id="服务账户特点" tabindex="-1"><a class="header-anchor" href="#服务账户特点" aria-hidden="true">#</a> 服务账户特点</h3><p>个人理解，广义上说，服务账户(Service Account)是服务运行凭据，也是服务进程访问系统资源，网络资源等资源的凭据。一般有这些特点：</p><ul><li>使用范围都是特定的，专用于某个服务，不共享使用；</li><li>不常更新密码 （保证服务稳定）</li><li>权限都比较低 （最小权限原则，降低安全风险）；</li></ul><h3 id="服务账户使用范围" tabindex="-1"><a class="header-anchor" href="#服务账户使用范围" aria-hidden="true">#</a> 服务账户使用范围</h3><ul><li>使用于Windows服务，即通过Service管理单元管理。</li><li>使用于非Windows平台上的服务，用来访问Windows系统系统、网络资源。例如Linux下访问Windows共享或是Active Directory资源。</li></ul><h3 id="windows服务账户的管理方式" tabindex="-1"><a class="header-anchor" href="#windows服务账户的管理方式" aria-hidden="true">#</a> Windows服务账户的管理方式</h3><ul><li>通过管理员手动管理。</li><li>通过系统托管管理服务账户。系统自动更新密码；</li></ul><p><strong>1、通过管理员手动管理</strong></p><blockquote><p>这是传统的管理方法,不展开介绍。</p></blockquote><p>好处：适用范围更广，支持各种服务账户运行场景，例如，Windows原生服务不用说，也适用于Linux平台、网络设备上。</p><p>不足：管理麻烦。管理手动创建服务账户、管理密码、指定服务账户的权限等，给管理员带来更多管理负担。</p><p><strong>2、通过系统托管管理</strong></p><blockquote><p>这是本文要重点介绍的方法，即虚拟服务账户和可管理的服务账户。</p></blockquote><p>好处：更少的管理任务，密码自动更新，安全性更强。</p><p>不足: 适用范围小，仅支持Windows服务；不适用其他平台下的服务。</p><h1 id="托管windows服务账户" tabindex="-1"><a class="header-anchor" href="#托管windows服务账户" aria-hidden="true">#</a> 托管Windows服务账户</h1><blockquote><p>以上了解到Windows服务账户可以交由系统托管，最大的特性是不用管理密码，减少管理任务，提高安全性，但也需要注意局限性，例如不适用非Windows平台。</p></blockquote><h2 id="了解托管windows服务账户" tabindex="-1"><a class="header-anchor" href="#了解托管windows服务账户" aria-hidden="true">#</a> 了解托管Windows服务账户</h2><p><strong>有3种托管服务账户</strong></p><ul><li>普通可管理服务账户(Standalone Managed Service Account, MSA)</li><li>组可管理服务账户（ Group-Managed Service Account, gMSA)</li><li>虚拟账户 （Virtual Account or Local Managed Account)</li></ul><h2 id="一、普通可管理服务账户-msa" tabindex="-1"><a class="header-anchor" href="#一、普通可管理服务账户-msa" aria-hidden="true">#</a> 一、普通可管理服务账户 (MSA)</h2><blockquote><p>普通可管理服务账户是一种特殊的域计算机账户，就像域计算机账户一样，继承同一个AD对象类。所以就会像计算机账户一样有能力每隔30天自动更新密码。</p></blockquote><blockquote><p>MSA有一些局限性。</p></blockquote><ul><li>只能绑定给一台计算机上的服务使用，因此不能用于一些服务集群场景。</li><li>不能用于多台计算机。否则服务启动失败。</li><li>已经被接下来的gMSA取代。</li></ul><h3 id="使用msa" tabindex="-1"><a class="header-anchor" href="#使用msa" aria-hidden="true">#</a> 使用MSA</h3><p>MSA被gMSA取代，使用方法大致可参照以下gMSA，不展开写。具体参考：</p>',28),u={href:"https://techcommunity.microsoft.com/t5/ask-the-directory-services-team/managed-service-accounts-understanding-implementing-best/ba-p/397009",target:"_blank",rel:"noopener noreferrer"},h=n('<h2 id="二、组可管理服务账户-gmsa" tabindex="-1"><a class="header-anchor" href="#二、组可管理服务账户-gmsa" aria-hidden="true">#</a> 二、组可管理服务账户 (gMSA)</h2><blockquote><p>gMSA是MSA的增强服务账户类型，旨在取代MSA，本文重点。</p></blockquote><p>相比普通MSA, gMSA在拥有相同功能情况下，还扩展了更多特性，gMSA可以绑定到更多计算机上，支持多主机网络均衡负载等复杂服务和其他使用场景,目前已知支持的服务有：</p><ul><li>SQL Server</li><li>IIS</li><li>AD LDS</li><li>Exchange Server</li><li>Windows计划任务</li></ul><div class="hint-container warning"><p class="hint-container-title">不支持的场景和服务</p><p>gMSA不支持用于Windows集群服务，但支持应用到集群之上的服务。其他服务则需要和软件服务商确认。</p></div><h3 id="前提要求" tabindex="-1"><a class="header-anchor" href="#前提要求" aria-hidden="true">#</a> 前提要求</h3><ul><li>操作系统最好是Windows Server 2012或更高；</li><li>域环境，域架构级别是Windows Server 2012以上；</li><li>64位系统；</li></ul><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>',8),g={href:"https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/jj128431(v=ws.11)?redirectedfrom=MSDN",target:"_blank",rel:"noopener noreferrer"},S=n(`<ul><li>创建Kds Root Key。在Windows Server 2012或更高的域控制器上执行:</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token function">Add-KdsRootKey</span> –EffectiveImmediately
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>并等待10个小时的AD复制。</p><blockquote><p>可使用 <code>Test-KdsRootKey -KeyId (Get-KdsRootKey).KeyId</code>查看创建结果。</p></blockquote><ul><li><p>10小时后，创建一个AD安全组。这个安全组成员将包含所有将要使用这个gMSA的计算机。</p></li><li><p>创建gMSA账户并绑定给安全组。</p></li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token function">New-ADServiceAccount</span> <span class="token operator">-</span>name &lt;gMSA_Name&gt;  <span class="token operator">-</span>PrincipalsAllowedToRetrieveManagedPassword &lt;ad_group_name&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>创建MSA需要Domain Admin成员。另外默认情况下，MSA账户创建在CN=Managed Service Accounts，可以在<code>AD计算机和账户</code>下的 <code>Managed Service Account</code> 中查看到。</p></blockquote><ul><li>部署安装MSA账户到目标主机。使用域管理员身份账户登录到所有需要使用gMSA主机(是那个安全组成员)，然后执行：</li></ul><div class="language-Powershell line-numbers-mode" data-ext="Powershell"><pre class="language-Powershell"><code>Install-ADServiceAccount -Identity &lt;the new gMSA you created&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>主机需要安装和加载Active Directory Module for Powershell。并可以使用<code>Test-ADServiceAcount -id &lt;gMSA_Name&gt;</code>来查看部署是否成功。</p></blockquote><div class="hint-container tip"><p class="hint-container-title">安装异常</p><p>安装时可能会有异常。提示类似权限不足的错误信息，可以尝试把主机重新启动一下后再尝试。</p><ul><li>最后，把gMSA账户给目标服务</li></ul><p>在服务属性里，输入gMSA账户名，账户名格式 <code>&lt;domainName&gt;\\&lt;服务账户名&gt;$ </code>,例如 <code>mydomain\\myMSA$</code>，密码一定留空。</p><blockquote><p>另外，也可以把MSA账户用到Windows计划任务。</p></blockquote><ul><li>重启服务。如果无问题，服务正常启动。</li></ul><h3 id="关于gmsa服务账户的权限" tabindex="-1"><a class="header-anchor" href="#关于gmsa服务账户的权限" aria-hidden="true">#</a> 关于gMSA服务账户的权限</h3><p>默认gMSA都是<code>Domain Computers</code>安全组成员，权限都不高。如果需要增加权限，可以直接把gMSA账户加入到指定的域安全组或本地安全组即可。如下图，添加到目标主机的本地管理员组：</p><figure><img src="`+d+'" alt="Add permissions for gMSA" tabindex="0" loading="lazy"><figcaption>Add permissions for gMSA</figcaption></figure><p>另外，前面提到gMSA服务账户已可以使用到Windows计划任务中，这时也要给gMSA授权，授予<code>Log on as a batch job</code> 允许批处理权限，具体方法是在本地组策略用户权限指派中完成。当然，也可以简单点，直接把gMSA添加到Local Administrators组中。</p><h2 id="三、虚拟账户-virtual-account" tabindex="-1"><a class="header-anchor" href="#三、虚拟账户-virtual-account" aria-hidden="true">#</a> 三、虚拟账户 Virtual Account</h2><blockquote><p>虚拟服务账户，又称Local Managed Account，是Windows Server 2008 R2和Windows 7引入，特点有：</p></blockquote><ul><li>它们是本地系统账户，不是域账户。账户名格式 NT SERVICE&lt;SERVICENAME&gt;.</li><li>它们可以访问域环境资源，是通过域计算机账户身份访问网络资源的, 例如MyDomain\\mycomputer$</li><li>不需要管理密码；</li></ul><blockquote><p>虚拟账户的创建。</p></blockquote><p>一般都是由Windows应用程序安装时创建生成的。例如SQL Server下有：</p><ul><li>NT SERVICE\\MSSQLSERVER （数据库引擎服务使用）</li><li>NT Service\\SQLSERVERAGENT （SQL Agent服务使用）</li></ul><blockquote><p>虚拟服务账户的权限分配。</p></blockquote><p>一般情况下，服务默认使用虚拟服务账户凭据运行，本着最小权限运行服务的最佳实践。但有时需要访问一些本地特殊系统资源，则可以额外授权。或是改用其他服务账户类型，即以下的MSA或gMSA。</p><blockquote><p>虚拟服务账户的授权方法。</p></blockquote><p>本地资源授权时，授权目标是虚拟服务账户名，网络资源授权时，授权目标是虚拟账户所在的计算机账户，例如MyDomain\\mySQLServerHost$</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>虚拟账户在本地计算机账户管理中看不到的，在授权时可以直接输入账户名。</p></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>',12),A={href:"https://woshub.com/group-managed-service-accounts-in-windows-server-2012/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/jj128431(v=ws.11)?redirectedfrom=MSDN",target:"_blank",rel:"noopener noreferrer"};function w(v,b){const o=s("ExternalLinkIcon");return r(),l("div",null,[p,e("p",null,[e("a",u,[i("Managed Service Accounts: Understanding, Implementing, Best Practices, and Troubleshooting"),a(o)])]),h,e("blockquote",null,[e("p",null,[i("开始之前要先创建一个Kds Root Key,详见 "),e("a",g,[i("Get Started with Group-Managed Server Account"),a(o)])])]),S,e("p",null,[e("a",A,[i("Using Managed Service Accounts (MSA and gMSA) in Active Directory "),a(o)])]),e("p",null,[e("a",m,[i("Getting Started with Group Managed Service Accounts"),a(o)])])])}const _=t(c,[["render",w],["__file","post43_win_accounts_intro.html.vue"]]);export{_ as default};
