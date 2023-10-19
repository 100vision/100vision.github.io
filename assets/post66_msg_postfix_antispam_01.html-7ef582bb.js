import{_ as l,W as t,X as o,Z as s,$ as a,a0 as e,Y as i,G as c}from"./framework-b5535326.js";const p={},r=s("h2",{id:"前言",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),a(" 前言")],-1),d=s("code",null,"SpamAssassin",-1),m={href:"https://cwiki.apache.org/confluence/display/SPAMASSASSIN/Home",target:"_blank",rel:"noopener noreferrer"},u=i('<p>SpamAssassin提供两个机制来过滤邮件：</p><ul><li>评分规则系统</li><li>贝叶斯过滤器</li></ul><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="spamassassin评分" tabindex="-1"><a class="header-anchor" href="#spamassassin评分" aria-hidden="true">#</a> SpamAssassin评分</h3><p>评分规则系统来判定、标识来邮是否是垃圾邮件，这个规则可以通过<code>/etc/spamassassin/local.cf</code> （CentOS分支）来自定义规则。这个规则定义了来邮满足什么特征给多少惩罚分，分数越高垃圾邮件嫌疑越大。然后根据分值高低交给<code>Amavisd-new</code>做动作（【丢弃】、【投递到隔离邮箱】、【标记提醒】</p>',5),h={href:"https://gist.github.com/ychaouche/a2faff159c2a1fea16019156972c7f8b",target:"_blank",rel:"noopener noreferrer"},v=i(`<h3 id="贝叶斯过滤器" tabindex="-1"><a class="header-anchor" href="#贝叶斯过滤器" aria-hidden="true">#</a> 贝叶斯过滤器</h3><p>SpamAssassin还允许管理员训练一个<code>贝叶斯过滤器</code>来学习邮件样本，从样本中提取关键字(token)提高识别能力。</p><p>SpamAssassin pam是通过一个<code>sa-learn</code>程序来学习，管理员需要投喂样本。</p><p>投喂垃圾邮件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sa-learn <span class="token parameter variable">--spam</span> <span class="token parameter variable">--mbox</span> /path/to/spam.mbox 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>投喂正常邮件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sa-learn <span class="token parameter variable">--ham</span> <span class="token parameter variable">--mbox</span> /path/to/ham.mbox 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">注意</p><p>SpamAssassin Bayes需要投喂200封垃圾邮件和200封正常邮件后才能开始工作. &quot;The bayesian classifier can only score new messages if it already has 200 known spams and 200 known hams&quot;</p></div><p><strong>投喂方式</strong></p><ul><li>手动投喂</li><li>自动投喂（本文重点）</li></ul><p><strong>手动投喂</strong></p><p>手动投喂就是通过以上命令完成。但实际步骤有点繁琐，简单说一下步骤，管理员首先需要：</p>`,12),b=s("li",null,"1、收集垃圾邮件样本。如果是从Outlook邮件客户端取样本，要把这些邮件转换成mbox邮箱格式。",-1),g={href:"https://www.kdetools.com/pst/mbox/",target:"_blank",rel:"noopener noreferrer"},k=s("li",null,"3、上传mbox文件到SpamAssassin所在主机；",-1),_=s("li",null,"4、执行以上投喂指令；",-1),f=i(`<p><strong>自动投喂</strong></p><p>通过以上看出，手动投喂还是比较麻烦的，每次都要把以上步骤操作一遍不能自动。自动投喂是什么效果？</p><ul><li>邮件管理员平时只要鼠标点点，用肉眼识别一下邮件，如果看到垃圾邮件就拖到指定文件夹；</li><li>SpamAssassin在后台自动从指定文件夹下载样本自动学习；</li></ul><h3 id="实现自动投喂" tabindex="-1"><a class="header-anchor" href="#实现自动投喂" aria-hidden="true">#</a> 实现自动投喂</h3><p>看看怎么实现自动投喂，如果你是使用Exchange邮箱，大致要实现几个初始配置：</p><ul><li>创建一个投喂专用邮箱，可以是Exchange邮箱，并开启IMAP/POP3；</li><li>在这个邮箱下面创建两个文件夹，一个文件夹用来存放垃圾邮件，另一个正常邮件；</li><li>在SpamAssassin所在主机上运行<code>fetchmail</code>等支持IMAP/POP3的邮件MUA客户端。</li><li>在SpamAssassin所在主机上绑定两个本地用户到fetchmail里的2个mbox文件；</li><li>在SpamAssassin所在主机上设置fetchmail定期从那个专用邮箱下载邮件样本；</li><li>在SpamAssassin所在主机上设置sa-learn从以上两个mbox文件中学习；</li></ul><p>以上配置看似步骤很多，但是是一次性初始配置实现自动投喂，一劳永逸。</p><ul><li>创建Exchange邮箱且开启IMAP</li></ul><p>（步骤略）</p><ul><li>创建邮件文件夹。</li></ul><p>创建一个<code>sa_spam</code> 和<code>sa_ham</code> （文件名可以任意，尽量不用中文和一些特殊字符)</p><ul><li>在SpamAssassin安装和运行fetchmail</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> fetchmail
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>在SpamAssassin主机上创建两个本地用户</li></ul><p>需要两个本地用户来绑定两个mbox来接收样本邮件，一个对应垃圾样本，一个对应正常样本；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">useradd</span> sa_spam
<span class="token function">useradd</span> sa_ham
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建后，可以看到<code>/var/spool/mail/sa_spam</code> 和 <code>/var/spool/mail/sa_ham</code> 这两个文件是mbox,fetchmail下载的邮件将分别存放在这两个文件中。</p><ul><li>在SpamAssassin主机上配置fetchmail来下载样本</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>fetchmail使用一个配置文件<code>.fetchmailrc</code>，注意：文件要在家目录下。</p></div><p><strong>在接收垃圾样本的用户下</strong></p><p>创建<code>.fetchmailrc</code>,并<code>chmod 600 .fetchmailrc</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@i ~<span class="token punctuation">]</span>su - sa_spam
<span class="token punctuation">[</span>sa_spam@i ~<span class="token punctuation">]</span>$ <span class="token function">cat</span> .fetchmailrc
<span class="token builtin class-name">set</span> daemon <span class="token number">300</span>
<span class="token builtin class-name">set</span> no bouncemail
<span class="token builtin class-name">set</span> postmaster <span class="token string">&quot;postmaster@example.com&quot;</span>
<span class="token builtin class-name">set</span> no spambounce
<span class="token builtin class-name">set</span> logfile fetch_spam.log
<span class="token builtin class-name">set</span> limit <span class="token number">1024000</span>
<span class="token builtin class-name">set</span> properties <span class="token string">&quot;&quot;</span>
defaults proto imap
poll my-email-server.example.com with proto imap
user <span class="token string">&#39;quarantine@example.com&#39;</span> there with password <span class="token string">&#39;password_for_the_exchange_mailbox&#39;</span> is <span class="token string">&#39;sa_spam&#39;</span> here
smtphost localhost/10025
ssl
<span class="token comment"># 下载邮箱里的spam文件夹下所有邮件</span>
folder sa_spam
fetchall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动fetchmail</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>sa_spam@i ~<span class="token punctuation">]</span>$ fetchmail <span class="token parameter variable">-vvvv</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>在接收正常样本的用户下</strong></p><p>创建<code>.fetchmailrc</code>,并<code>chmod 600 .fetchmailrc</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@mailhost ~<span class="token punctuation">]</span>su - sa_ham
<span class="token punctuation">[</span>sa_spam@i ~<span class="token punctuation">]</span>$ <span class="token function">cat</span> .fetchmailrc
<span class="token builtin class-name">set</span> daemon <span class="token number">300</span>
<span class="token builtin class-name">set</span> no bouncemail
<span class="token builtin class-name">set</span> postmaster <span class="token string">&quot;postmaster@example.com&quot;</span>
<span class="token builtin class-name">set</span> no spambounce
<span class="token builtin class-name">set</span> logfile fetch_ham.log
<span class="token builtin class-name">set</span> limit <span class="token number">1024000</span>
<span class="token builtin class-name">set</span> properties <span class="token string">&quot;&quot;</span>
defaults proto imap
poll my-email-server.example.com with proto imap
user <span class="token string">&#39;quarantine@example.com&#39;</span> there with password <span class="token string">&#39;password_for_the_exchange_mailbox&#39;</span> is <span class="token string">&#39;sa_ham&#39;</span> here

smtphost localhost/10025
ssl
<span class="token comment"># 邮箱里的sa_ham文件夹</span>
folder sa_spam
fetchall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动fetchmail</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>sa_spam@i ~<span class="token punctuation">]</span>$ fetchmail <span class="token parameter variable">-vvvv</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>检查fetchmail运行状况</li></ul><ol><li>在专用邮箱里，拖动邮件样本到指定文件夹；</li><li>使用<code>mailx -f /var/spool/mail/sa_spam</code>检查邮件是否下载</li><li>如果有邮件则正常，如果没有检查fetchmail日志</li></ol><ul><li>配置crontab job定期执行sa-learn学习</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@mailhost ~<span class="token punctuation">]</span>crontab <span class="token parameter variable">-l</span>
<span class="token comment">#Schedule a SpamAssassin SA-Learning </span>
*/1 * * * *  /usr/bin/sa-learn <span class="token parameter variable">--spam</span> <span class="token parameter variable">--mbox</span> /var/spool/mail/sa_spam <span class="token operator">&gt;</span> /var/log/sa-learn-spam.log
* */3 * * *  /usr/bin/sa-learn <span class="token parameter variable">--ham</span> <span class="token parameter variable">--mbox</span> /var/spool/mail/sa_ham <span class="token operator">&gt;</span> /var/log/sa-learn-ham.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="扩展-how-fetchmail-works" tabindex="-1"><a class="header-anchor" href="#扩展-how-fetchmail-works" aria-hidden="true">#</a> 扩展：How fetchmail works</h2><ul><li>下载邮件(IMAP/POP3)</li><li>使用管理员指定的MDA（POSTFIX)转发邮件到本地用户邮箱</li></ul>`,35);function x(A,S){const n=c("ExternalLinkIcon");return t(),o("div",null,[r,s("p",null,[d,a(" 是一款很著名、很强大的防垃圾邮件过滤系统，更多介绍看"),s("a",m,[a("官方Wiki"),e(n)])]),u,s("p",null,[a("SpamAssassin评分将在另开一篇介绍，这里不展开。这里有一些 "),s("a",h,[a("SpamAssassin规则解释"),e(n)])]),v,s("ul",null,[b,s("li",null,[a("2、使用工具把垃圾邮件汇集到一个mbox，把正常邮件汇集到一个mbox文件。（这个工具比较难找，网上有一款"),s("a",g,[a("PST to MBOX Converter"),e(n)]),a(" 试用版只能一次性转换30封。")]),k,_]),f])}const P=l(p,[["render",x],["__file","post66_msg_postfix_antispam_01.html.vue"]]);export{P as default};
