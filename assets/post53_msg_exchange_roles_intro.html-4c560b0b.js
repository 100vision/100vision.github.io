import{_ as e,W as i,X as n,Y as a}from"./framework-b5535326.js";const l="/assets/post53_ex_role_rbac-3f8cfafd.jpg",r="/assets/post53_ex_custom_role_deny_email_fwd-386a4e31.jpg",t="/assets/post53_ex_custom_role_deny_delegation-eb6abf6f.jpg",d="/assets/post53_ex_role_rbac_workflow-3adb7bf8.jpg",o={},s=a('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>基于角色<code>Role Based Access Control</code> 介绍Exchange Server的管理权限，满足ISO 270001 <code>A9.2.3 特殊权限管理</code>或是其他安全体系的类似要求，做到不同岗位不同权限。</p><h2 id="一、exchange-server权限介绍" tabindex="-1"><a class="header-anchor" href="#一、exchange-server权限介绍" aria-hidden="true">#</a> 一、Exchange Server权限介绍</h2><h3 id="管理权限组成" tabindex="-1"><a class="header-anchor" href="#管理权限组成" aria-hidden="true">#</a> 管理权限组成</h3><p>分层管理和权限模型是：</p><ul><li>管理角色组 (Role Group)</li><li>角色 (Role)</li><li>管理权限条目 (Role Entry)</li></ul><h3 id="管理角色组-role-group" tabindex="-1"><a class="header-anchor" href="#管理角色组-role-group" aria-hidden="true">#</a> 管理角色组 (Role Group)</h3><p>管理角色组,是由一组角色组成，即一对多关系，一个角色组可以拥有多个角色。</p><ul><li>默认角色组</li></ul><p>Exchange常用有：</p><ul><li>Organization Mangement （Exchange组织管理员，权限很高)</li><li>Recipient Management (Exchange用户邮箱管理员)</li></ul><p>更多的可以在Active Directory的ADUC的<code>Microsoft Exchange Security Groups</code>看到. <img src="'+l+`" alt="Role Groups" loading="lazy"></p><ul><li>可以通过看到角色组对应了哪些角色</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PS C:\\&gt; Get-RoleGroup &quot;recipient management&quot; | select -expand roles
Distribution Groups
Migration
Mail Recipients
Team Mailboxes
Move Mailboxes
Mail Recipient Creation
Recipient Policies
Message Tracking
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>定义角色组</li></ul><p>可以自定义角色组。步骤文章后面【授权】章节介绍。</p><h3 id="角色-role" tabindex="-1"><a class="header-anchor" href="#角色-role" aria-hidden="true">#</a> 角色 （Role)</h3><blockquote><p>Role是Role Group的子集。</p></blockquote><p><strong>默认Role</strong></p><p>默认有很多，分得比较细，不同role执行不同管理任务：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PS C:\\&gt; get-managementrole | select name| sort -Property name

Name
----
Active Directory Permissions
Address Lists
ApplicationImpersonation
ArchiveApplication
Audit Logs
Cmdlet Extension Agents
...
Role Management
...
User Options
UserApplication
View-Only Audit Logs
View-Only Configuration
View-Only Recipients
WorkloadManagement
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，常用的角色是：</p><ul><li><code>Mail Recipients</code> 邮箱管理</li><li><code>Distribution Group</code> 邮件通讯组管理</li><li><code>User Options</code> 高级邮箱选项管理</li></ul><p><strong>自定义Role</strong></p><p>除了默认Role, 我们还可以自定义role, 后面【授权】章节介绍。</p><p><strong>查看Role都能干些什么</strong></p><ul><li>查看指定Role都有哪些Role Entry (即有权做什么)。例如查看角色<code>Mail Recipients</code>对应的entry:</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PS C:\\&gt; Get-ManagementRole  &quot;mail recipients&quot; | select -expand RoleEntries |select-string &quot;new-mailbox&quot;

(Microsoft.Exchange.Management.PowerShell.E2010) New-Mailbox -EnableRoomMailboxAccount
(Microsoft.Exchange.Management.PowerShell.E2010) New-MailboxRepairRequest -Archive -Confirm -CorruptionType -Database -Debug -DetectOnly -DomainController -ErrorAction -ErrorVariable -Force
 -Mailbox -OutBuffer -OutVariable -StoreMailbox -Verbose -WarningAction -WarningVariable -WhatIf

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="role-entry" tabindex="-1"><a class="header-anchor" href="#role-entry" aria-hidden="true">#</a> Role Entry</h3><blockquote><p><code>Role Entry</code> 是role的子集，由<code>Exchange cmdlet</code>和<code>Exchange cmdParameter</code>组成, 例如<code>Exchange cmdlet</code>常用的,新建邮箱<code>New-mailbox</code>、设置邮箱<code>Set-mailbox</code></p></blockquote><div class="hint-container note"><p class="hint-container-title">注</p><p>由上可以看出Exchange RBAC就是通过控制使用cmdlet和Parameter来管理权限，我们可以通过给Role指定分配不同的entry来自定义role, 最终决定哪些角色可以执行哪些cmdlet。</p></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>另外，可以通过cmdlet来倒查哪些角色拥有的权限。例如，想查询哪些角色有新建邮箱的权限。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PS C:\\&gt; Get-ManagementRole  -cmdlet &quot;new-mailbox&quot;

Name                        RoleType
----                        --------
Mail Recipient Creation     MailRecipientCreation
Mail Enabled Public Folders MailEnabledPublicFolders
Public Folders              PublicFolders
Retention Management        RetentionManagement
Mail Recipients             MailRecipients
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="二、授权" tabindex="-1"><a class="header-anchor" href="#二、授权" aria-hidden="true">#</a> 二、授权</h2><ul><li>方法1：使用默认角色组和自定义角色组授权。</li><li>方法2：使用自定义角色授权；</li></ul><p>以上管理授权颗粒由粗到细。</p><h3 id="使用角色组" tabindex="-1"><a class="header-anchor" href="#使用角色组" aria-hidden="true">#</a> 使用角色组</h3><p>一般情况下，使用角色组授权就可以满足基于RBAC的管理需求。常用的是：</p><ul><li><code>Organization Management</code> 成员是Exchange管理员，管理组织所有设置/策略；</li><li><code>Recipient Management</code>的成员是桌面运维支持人员，可以创建邮箱和设置邮箱选项等；</li></ul><p>如果不能满足，则自定义角色组。下面举例说明：</p><p><strong>需求</strong></p><p>例如，如果新建一个自定义管理角色组只允许创建邮箱，不允许管理通讯组。则可以新建一个角色组，可以考虑只给予<code>Mail Recipient Creation</code>角色，不给予<code>Distribution Groups</code>角色。</p><p><strong>开始</strong></p><p>1、登录EAC,点击【新建】或是通过【复制】，然后编辑复制出然后编辑角色；</p><p>2、 添加给新建的角色Mail Recipient Creation；不添加其他角色；</p><p>3、 如果是复制的角色组，则移除Mail Recipient Creation外的所有其他权限；</p><p>4、 添加成员；</p><p><strong>小结</strong></p><p>通过自定义角色组，可以满足一般的授权需求。如果需要更加精细的控制颗粒，例如不允许角色设置某个邮箱属性，则需要通过自定义角色，可以参照以下【使用自定义角色】。</p><h3 id="使用自定义角色" tabindex="-1"><a class="header-anchor" href="#使用自定义角色" aria-hidden="true">#</a> 使用自定义角色</h3><blockquote><p>通过前面介绍，我们知道可以通过给Role指定分配不同的entry来自定义role, 最终决定哪些角色可以执行哪些cmdlet，这样就可以定义更细致的授权颗粒，下面通过举例说明。</p></blockquote><div class="hint-container note"><p class="hint-container-title">注</p><p>自定义角色必须通过Exchange Management Shell，Exchange Admin Console不支持。</p></div><p><strong>需求</strong></p><p>需要一个邮箱管理员角色，改角色可以新建邮箱但不可以设置用户邮箱的【邮件转发】、【邮箱委托】。如下图：</p><figure><img src="`+r+'" alt="邮件转发" tabindex="0" loading="lazy"><figcaption>邮件转发</figcaption></figure><figure><img src="'+t+`" alt="邮箱委托" tabindex="0" loading="lazy"><figcaption>邮箱委托</figcaption></figure><p><strong>需求分析</strong></p><p>了解到<code>邮件转发</code>、<code>邮箱委托</code>对应的cmdlet和cmdParameter. 了解到：</p><ul><li><p>邮件转发对应的cmdlet是<code>Set-Mailbox</code> ,对应的parameters有 cmdParameters <code>ForwardingAddress</code>,<code>ForwardingSmtpAddress</code>,<code>DeliverToMailboxAndForward</code></p></li><li><p>邮箱委托对应的cmdlet是<code>Add-mailboxPermission</code></p></li><li><p>新建一个角色，不给这个角色这几个cmdlet和parameter的执行权限就可以实现。</p></li></ul><p><strong>开始</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 先新建一个自定义角色 My Mailbox Admins。这角色必须以已有角色为模板，本例中使用Mail Recipients为模板。
PS C:\\&gt; New-ManagementRole -Parent &quot;Mail Recipients&quot; -Name &quot;My Mailbox Admins&quot; 

## 编辑自定义角色。通过编辑Role Entry，编辑cmdlet或cmdParameter来达到编辑目的. 

# 例1：删掉set-mailbox 这个cmdlet的部分cmdParameters来降低权限，在本例中移除几个相关cmdParameters来删除邮件转发设置权限。
PS C:\\&gt; Set-ManagementRoleEntry &quot;My Mailbox Admins\\Set-mailbox&quot;  -RemoveParameter -Parameters GrantSendOnBehalfTo,ForwardingAddress,ForwardingSmtpAddress,DeliverToMailboxAndForwardPS 

#例2：禁止该角色授权邮箱权限给其他用户，通过删除整个Add-mailboxPermission cmdlet.
PS C:\\&gt; Remove-ManagementRoleEntry &quot;My Mailbox Admins\\Add-MailboxPermission&quot; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><ul><li>改角色的成员登录EAC后，邮件流 - 邮件转发复选框是灰色的，不可以勾选。</li><li>邮箱委托添加成员后不可保存设置。</li></ul><p><strong>小结</strong></p><p>通过以上，可以比较精细控制Exchange管理权限。过程比较花时间的就是找出需要控制的cmdlet和parameters，只能多查询得到。</p><h3 id="授权流程" tabindex="-1"><a class="header-anchor" href="#授权流程" aria-hidden="true">#</a> 授权流程</h3><blockquote><p>通过以下图示一览授权流程。</p></blockquote><figure><img src="`+d+'" alt="授权总览" tabindex="0" loading="lazy"><figcaption>授权总览</figcaption></figure><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ol><li>授权颗粒从大到小分别是：</li></ol><p>默认角色组&gt; 自定义角色组 &gt; 自定义角色</p><ol start="2"><li>授权原则</li></ol><ul><li>一般授权使用默认角色组；</li><li>更细一点选择使用自定义角色组 + 默认角色</li><li>最细一点选择使用自定角色组 + 自定义角色</li></ul><p>根据控制需求选择适合的授权模式。</p>',73),c=[s];function p(u,m){return i(),n("div",null,c)}const g=e(o,[["render",p],["__file","post53_msg_exchange_roles_intro.html.vue"]]);export{g as default};
