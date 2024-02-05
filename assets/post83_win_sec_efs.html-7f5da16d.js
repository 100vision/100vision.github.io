import{_ as r,W as l,X as n,Z as e,$ as i,a0 as o,Y as s,G as c}from"./framework-b5535326.js";const a="/assets/post83_encypted_file-362dbcd7.png",p="/assets/post83_ca_template-permissions-89603284.png",d="/assets/post83_efs_dra_thumbprint_when_encrypted-03657edc.png",u="/assets/post83_efs_dra_thumbprint_when_recovered-8bf02486.png",h={},f=s('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>很多企业，信息安全工作的工作重点就是防泄密，而文件加密就是防泄密重要一环。</p><p>商业解决方案有很多种，比较重的有<code>Symantec PGP </code>磁盘加密，还有其他。普通的可以选择<code>Windows Bitlocker</code>分区和文件加密，以及基于用户的<code>Windows EFS</code>文件加密。 本文主要介绍使用EFS，Bitlocker和 EFS的比较放在文末。</p><blockquote><p>闲话：有的企业不仅要防普通员工，还要防IT人员，为什么呢？一般情况下，IT的系统权限都比较大，好像什么都可以访问，比如还能远程打开Windows管理共享 \\boss_pc\\c$,高管听说后都吓坏了。另外，商业竞争白热化情况下，竞争对手互派专业人员到你企业“卧底”成IT人员，然后就...都是道听途说的。</p></blockquote><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><blockquote><p>EFS, <code>Encrypted File System</code>，使用的是公钥对文件进行加密,是比较可靠的加密选项。</p></blockquote><h3 id="简单介绍" tabindex="-1"><a class="header-anchor" href="#简单介绍" aria-hidden="true">#</a> 简单介绍</h3><ul><li>使用的是用户公钥对文件进行加密，不是普通的密码保护；</li><li>不需要硬件支持；</li><li>需要NTFS文件系统；</li><li>加密后的文件，用户透明访问；其他用户则打不开，拷贝到其他位置或其他系统（重装系统）也不行。</li></ul><h3 id="普通使用" tabindex="-1"><a class="header-anchor" href="#普通使用" aria-hidden="true">#</a> 普通使用</h3><ul><li>选择一个要加密的文件夹，【属性】、【高级】</li><li>勾起【加密内容以便保护数据】</li><li>这样文件就加密好了；加密后的文件上图标有一把黄色小锁，如下图： <img src="'+a+'" alt="图：加密后的文件" loading="lazy"></li><li>备份和保管好证书私钥，以防系统重装或证书丢失后打不开加密文件；</li></ul><h3 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践" aria-hidden="true">#</a> 最佳实践</h3><blockquote><p>最佳实践适合应用到企业。</p></blockquote><ul><li>准备AD域环境</li><li>准备部署企业证书CA</li><li>准备企业CA的EFS恢复代理证书模板</li><li>准备企业CA的用户EFS加密证书模板</li><li>指定企业EFS的恢复代理Data Recovery Agent(DRA)（用户证书丢失的备用恢复解决方案）</li></ul><p><strong>1、准备AD域环境</strong></p><p>步骤略。企业一般都有AD域环境。有了AD部署组策略和证书颁发都很方便；</p><p><strong>2、准备部署企业证书CA机构</strong></p><blockquote><p>步骤略，主要像说说CA的重要和好处。</p></blockquote><p>即企业内部CA，用Windows证书服务机构即可，可以多级。有了内部CA，好处多多，可以根据不同需要创建证书模板：</p><ul><li>内部有需要使用SSL加密通讯的Web服务都可以申请、颁发。</li><li>本文会使用EFS加密也可以使用指定用户证书模板和恢复代理模板；</li><li>802.1X/Radius认证、网络接入也可以使用，比较计算机证书模板；</li></ul><p><strong>3、准备EFS恢复代理证书模板</strong></p><blockquote><p>目的：即指定1个或多个企业（组织）内的EFS恢复代理用户，这样即使用户的证书弄丢了，使用EFS恢复代理用户的证书来解密文件。</p></blockquote><ul><li>登录CA服务器打开CA机构，找到【文件恢复代理】模板，复制1份，并重命名例如&quot;MY_EFS_dra_certificates&quot;。</li><li>【常规】，指定设置有效期，例如10年；</li><li>【常规】 勾上“允许发布到Active Directory&quot; （可选）</li><li>【安全】，指定可以申请该证书的用户或组，一般是给域管理员，例如<code>Administrator</code>,确保ACL授权给用户或组勾上【申请】或【Enroll】。注意：勾掉其他用户；如下图： <img src="'+p+'" alt="指定证书模板权限" loading="lazy"></li></ul><p><strong>4、 准备用户的EFS证书模板</strong></p><blockquote><p>目的：准备用户的EFS证书模板给用户申请或自动颁发，用户申请到这个证书后就可以用来加密自己的文件。</p></blockquote><ul><li>打开CA机构，找到【用户】模板，复制1份，并重命名例如&quot;MY_EFS_User_certificates&quot;。我们选择这个模板而不是【EFS既不加密】模板，是因为这个模板的使用范围比较大，可以做文件加密用途，也可以做客户端身份验证，详见它的OID。</li><li>同样，设置模板属性，名称和有效期；</li><li>最重要的是，设置【安全】标签下的ACL， 我们允许所有【Authenticated Users】可以【申请】或【Enroll】；</li></ul><p><strong>5、准备EFS恢复代理证书</strong></p><blockquote><p>目的: 需要准备一份EFS恢复代理证书，这证书要发放到所有域计算机，有可能使用EFS加密的系统上。</p></blockquote><ul><li>使用EFS恢复代理模板指定的授权账户登录到域控制器或是任意一台其他域成员服务器，在本例是<code>Administrator</code>。</li><li>启动<code>certmgr.msc</code>证书管理，展开【个人】、【证书】。右键【申请新证书】。</li><li>证书注册向导，选择【Active Directory】注册策略，【下一步】</li><li>选择 【恢复代理证书】模板，在本例是【My_EFS_DRA_Certificate】，完成步骤。</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果申请时不见该模板，一般是在准备EFS恢复模板时，没有给对权限。</p></div><ul><li>完成证书安装；</li><li>右键选择【导出】证书。导出时，注意选择【同时导出私钥】。最后，导出的密钥文件一般是<code>xxx.pfx</code></li></ul><div class="hint-container note"><p class="hint-container-title">注</p><p>导出时注意可以考虑使用密码保护以及指定用户或组加强密钥安全。</p></div><p><strong>6、发布和部署企业EFS恢复代理</strong></p><blockquote><p>目的：EFS恢复代理要下发到域计算机上，这样用户加密文件时才会把恢复代理加进去文件中，多一般钥匙。</p></blockquote><ul><li>把前面导出的恢复代理证书拷贝；</li><li>通过组策略，可以使用默认域策略也可以新建一个专门的组策略；</li><li>编辑组策略，【计算机配置】，【安全配置】、【EFS】</li><li>新增EFS恢复代理程序，指定pfx文件；</li></ul><p><strong>7、用户申请EFS证书加密</strong></p><blockquote><p>域用户登录自己计算机后，即可申请CA发布的EFS证书或是自动申请；</p></blockquote><ul><li>启动<code>certmgr.msc</code>证书管理，展开【个人】、【证书】。右键【申请新证书】。</li><li>证书注册向导，选择【Active Directory】注册策略，【下一步】</li><li>选择 【用户】模板，在本例是【My_EFS_User_Certificate】，完成步骤。</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果申请时不见该模板，一般是在准备EFS恢复模板时，没有给对权限。</p></div><p><strong>8、开始加密文件和文件夹</strong></p><p>步骤可以参考可以参考文章开头的【简单使用】。</p><p><strong>9、附加：备份EFS证书密钥</strong></p><p>::warning 备份EFS证书密钥很重要，否则系统重装后证书就没有了，加密文件会打不开。如果用户重新申请1张，就是新证书。新证书解密不了以前的加密文件。 :::</p><ul><li>EFS恢复代理管理员通过证书管理单元导出证书和私钥即可，然后保存到一个安全位置；</li><li>用户同样通过证书管理单元导出证书和私钥即可，然后保存到一个安全位置；用户重装了操作系统或丢失了备份证书私钥，可以寻求EFS恢复代理管理员帮忙解密文件。</li></ul><div class="hint-container note"><p class="hint-container-title">注</p><p>注意保管好证书和私钥，考虑使用密码保护。如果不慎被其他人拿到，其他人则可以访问加密文件。</p></div><p><strong>10、EFS恢复代理管理员如何协助用户解密</strong></p><ul><li>EFS恢复代理管理员登录到用户计算机；</li><li>EFS恢复代理管理员把自己备份的证书私钥导入到用户计算机；</li><li>把加密文件和加密文件夹即可解密或使用<code>cipher /d</code>命令行工具；</li></ul><p><strong>11、常见问题</strong></p><blockquote><p>EFS恢复代理也不能解密文件。</p></blockquote><p>原因1：用户加密前，没有指定EFS恢复代理。</p><p>解决办法：如果用户也没有备份证书，没有办法解密，因此备份证书很重要。</p><p>原因2：使用错误的EFS恢复代理证书可能会解密失败，即用户加密时的EFS恢复代理证书和尝试解密的EFS证书不是同一个。</p><p>解决办法：</p><p>务必使用正确的恢复代理证书。通过对证书的指纹thumbprint来验证证书是否同一个， 步骤：</p><ul><li>检查解密出问题的加密文件的属性，文件的加密属性里【详细信息】，可以看到加密时指定的EFS恢复代理证书和指纹。如下图： <img src="'+d+'" alt="图：检查加密时的使用EFS恢复代理证书指纹" loading="lazy"></li><li>检查导入的EFS恢复代理的证书指纹。如下图： <img src="'+u+`" alt="图：检查导入的EFS恢复代理证书指纹" loading="lazy"></li></ul><h2 id="扩展-bitlocker-vs-encrypting-file-system-efs" tabindex="-1"><a class="header-anchor" href="#扩展-bitlocker-vs-encrypting-file-system-efs" aria-hidden="true">#</a> 扩展：BitLocker vs. Encrypting File System (EFS)</h2><blockquote><p>Bitlocker比较适合外置磁盘加密，例如U盘</p></blockquote><pre><code>BitLocker encrypts all personal and system files on the drive where Windows is installed, or on data drives on the same computer.
EFS encrypts individual files on any drive.
BitLocker does not depend on the individual user accounts associated with files. BitLocker is either on or off, for all users or groups.
EFS encrypts files based on the user account associated with it. If a computer has multiple users or groups, each can encrypt their own files independently.
BitLocker uses the Trusted Platform Module (TPM), a special microchip in some newer computers that supports advanced security features.
EFS does not require or use any special hardware.
You must be an administrator to turn BitLocker encryption on or off once it&#39;s enabled.
You do not have to be an administrator to use EFS.
You can use BitLocker Drive Encryption and the Encrypting File System together to get the protection offered by both features. When using EFS, encryption keys are stored with the computer&#39;s operating system. While these are encrypted, that level of security could potentially be compromised if a hacker is able to boot or access the system drive. Using BitLocker to encrypt the system drive can help protect these keys by preventing the system drive from booting or being accessed if it is installed into another computer.
</code></pre><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,58),E={href:"https://superuser.com/questions/527010/what-are-differences-between-efs-and-bitlocker-in-windows",target:"_blank",rel:"noopener noreferrer"},S={href:"https://www.rootusers.com/configure-efs-recovery-agent/",target:"_blank",rel:"noopener noreferrer"};function _(g,F){const t=c("ExternalLinkIcon");return l(),n("div",null,[f,e("ul",null,[e("li",null,[e("p",null,[e("a",E,[i("Stackflow: What are differences between EFS and BitLocker in Windows?"),o(t)])])]),e("li",null,[e("p",null,[e("a",S,[i("RouteUser:Configure the EFS Recovery Agent"),o(t)])])])])])}const b=r(h,[["render",_],["__file","post83_win_sec_efs.html.vue"]]);export{b as default};
