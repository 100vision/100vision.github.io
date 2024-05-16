const e=JSON.parse(`{"key":"v-0dbecb2a","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/post83_win_sec_efs.html","title":"Windows：文件加密：EFS和PKI","lang":"zh-CN","frontmatter":{"title":"Windows：文件加密：EFS和PKI","icon":"page","order":83,"date":"2024-02-05T00:00:00.000Z","category":["Windows","文件加密","信息安全"],"tag":["efs","pki","Information Security"],"sticky":false,"star":true,"description":"前言 很多企业，信息安全工作的工作重点就是防泄密，而文件加密就是防泄密重要一环。 商业解决方案有很多种，比较重的有Symantec PGP 磁盘加密，还有其他。普通的可以选择Windows Bitlocker分区和文件加密，以及基于用户的Windows EFS文件加密。 本文主要介绍使用EFS，Bitlocker和 EFS的比较放在文末。 闲话：有的企业不仅要防普通员工，还要防IT人员，为什么呢？ IT的系统权限太大。 好像什么都可以访问，比如还能远程打开Windows管理共享 \\\\\\\\boss_pc\\\\c$, 如果碰上一些没有职业操守的IT，后果就严重了，高管听说后都吓坏了。另外，商业竞争白热化情况下，竞争对手（或是其他机构）雇佣专业人员到你企业“卧底”成IT人员，然后就...都是道听途说的。","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/post83_win_sec_efs.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"Windows：文件加密：EFS和PKI"}],["meta",{"property":"og:description","content":"前言 很多企业，信息安全工作的工作重点就是防泄密，而文件加密就是防泄密重要一环。 商业解决方案有很多种，比较重的有Symantec PGP 磁盘加密，还有其他。普通的可以选择Windows Bitlocker分区和文件加密，以及基于用户的Windows EFS文件加密。 本文主要介绍使用EFS，Bitlocker和 EFS的比较放在文末。 闲话：有的企业不仅要防普通员工，还要防IT人员，为什么呢？ IT的系统权限太大。 好像什么都可以访问，比如还能远程打开Windows管理共享 \\\\\\\\boss_pc\\\\c$, 如果碰上一些没有职业操守的IT，后果就严重了，高管听说后都吓坏了。另外，商业竞争白热化情况下，竞争对手（或是其他机构）雇佣专业人员到你企业“卧底”成IT人员，然后就...都是道听途说的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-06T00:30:59.000Z"}],["meta",{"property":"article:tag","content":"efs"}],["meta",{"property":"article:tag","content":"pki"}],["meta",{"property":"article:tag","content":"Information Security"}],["meta",{"property":"article:published_time","content":"2024-02-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-06T00:30:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Windows：文件加密：EFS和PKI\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-02-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-06T00:30:59.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"正文","slug":"正文","link":"#正文","children":[{"level":3,"title":"简单介绍","slug":"简单介绍","link":"#简单介绍","children":[]},{"level":3,"title":"普通使用","slug":"普通使用","link":"#普通使用","children":[]},{"level":3,"title":"最佳实践","slug":"最佳实践","link":"#最佳实践","children":[]}]},{"level":2,"title":"扩展：BitLocker vs. Encrypting File System (EFS)","slug":"扩展-bitlocker-vs-encrypting-file-system-efs","link":"#扩展-bitlocker-vs-encrypting-file-system-efs","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1707122529000,"updatedTime":1707179459000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":5},{"name":"100vision","email":"30432527+100vision@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.55,"words":2564},"filePathRelative":"zh/信息技术/SysOps/post83_win_sec_efs.md","localizedDate":"2024年2月5日","excerpt":"<h2> 前言</h2>\\n<p>很多企业，信息安全工作的工作重点就是防泄密，而文件加密就是防泄密重要一环。</p>\\n<p>商业解决方案有很多种，比较重的有<code>Symantec PGP </code>磁盘加密，还有其他。普通的可以选择<code>Windows Bitlocker</code>分区和文件加密，以及基于用户的<code>Windows EFS</code>文件加密。 本文主要介绍使用EFS，Bitlocker和 EFS的比较放在文末。</p>\\n<blockquote>\\n<p>闲话：有的企业不仅要防普通员工，还要防IT人员，为什么呢？ IT的系统权限太大。\\n好像什么都可以访问，比如还能远程打开Windows管理共享 <code>\\\\\\\\boss_pc\\\\c$</code>, 如果碰上一些没有职业操守的IT，后果就严重了，高管听说后都吓坏了。另外，商业竞争白热化情况下，竞争对手（或是其他机构）雇佣专业人员到你企业“卧底”成IT人员，然后就...都是道听途说的。</p>\\n</blockquote>","autoDesc":true}`);export{e as data};