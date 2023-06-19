const e=JSON.parse(`{"key":"v-90b8a376","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/post38_backup_nbu_02.html","title":"数据保护：Netbackup：解决 CA Host-ID获取证书失败：Error 8504","lang":"zh-CN","frontmatter":{"title":"数据保护：Netbackup：解决 CA Host-ID获取证书失败：Error 8504","icon":"page","order":39,"date":"2023-06-19T00:00:00.000Z","category":["数据保护","问题解决"],"tag":["数据备份","Netbackup","原创"],"sticky":false,"star":true,"description":"问题描述 在admin console GUI里，当前配置Storage服务求或操作AIR或添加信任Master服务器，当Netbackup备份域内或跨域之间获取Master证书失败； 在shell下，使用nbcertcmd -getCertificate获取master服务器失败。提示错误8504,因为CA证书不信任。 问题分析 媒体服务器（Storage Server)不信任Master服务器CA证书。 解决办法","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/post38_backup_nbu_02.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"数据保护：Netbackup：解决 CA Host-ID获取证书失败：Error 8504"}],["meta",{"property":"og:description","content":"问题描述 在admin console GUI里，当前配置Storage服务求或操作AIR或添加信任Master服务器，当Netbackup备份域内或跨域之间获取Master证书失败； 在shell下，使用nbcertcmd -getCertificate获取master服务器失败。提示错误8504,因为CA证书不信任。 问题分析 媒体服务器（Storage Server)不信任Master服务器CA证书。 解决办法"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-19T09:08:04.000Z"}],["meta",{"property":"article:tag","content":"数据备份"}],["meta",{"property":"article:tag","content":"Netbackup"}],["meta",{"property":"article:tag","content":"原创"}],["meta",{"property":"article:published_time","content":"2023-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-19T09:08:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数据保护：Netbackup：解决 CA Host-ID获取证书失败：Error 8504\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2023-06-19T09:08:04.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"问题描述","slug":"问题描述","link":"#问题描述","children":[]},{"level":2,"title":"问题分析","slug":"问题分析","link":"#问题分析","children":[]},{"level":2,"title":"解决办法","slug":"解决办法","link":"#解决办法","children":[{"level":3,"title":"步骤","slug":"步骤","link":"#步骤","children":[]}]}],"git":{"createdTime":1687165684000,"updatedTime":1687165684000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":1}]},"readingTime":{"minutes":1.13,"words":338},"filePathRelative":"zh/信息技术/SysOps/post38_backup_nbu_02.md","localizedDate":"2023年6月19日","excerpt":"<h2> 问题描述</h2>\\n<ul>\\n<li>在admin console GUI里，当前配置Storage服务求或操作AIR或添加信任Master服务器，当Netbackup备份域内或跨域之间获取Master证书失败；</li>\\n<li>在shell下，使用<code>nbcertcmd -getCertificate</code>获取master服务器失败。提示错误<code>8504</code>,因为CA证书不信任。</li>\\n</ul>\\n<h2> 问题分析</h2>\\n<p>媒体服务器（Storage Server)不信任Master服务器CA证书。</p>\\n<h2> 解决办法</h2>","autoDesc":true}`);export{e as data};
