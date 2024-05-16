const t=JSON.parse(`{"key":"v-331976b0","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BD%91%E7%BB%9C/post46_dns_solutions.html","title":"基础服务：DNS:解决DNS污染问题","lang":"zh-CN","frontmatter":{"title":"基础服务：DNS:解决DNS污染问题","icon":"page","order":46,"date":"2023-07-14T00:00:00.000Z","category":["networking","DNS"],"tag":["networking","dns","dnsmasq","doh","solution","dns污染"],"sticky":false,"star":true,"footer":null,"copyright":"无版权","description":"前言 国内环境下，除了不能直连海外服务器问题外，还有DNS污染问题让人恼火，因此需要了解一下怎么解决。 什么是DNS污染 又称DNS“投毒”,执行DNS劫持攻击导致下游DNS服务器缓存了错误记录的现象。详见wiki","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BD%91%E7%BB%9C/post46_dns_solutions.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"基础服务：DNS:解决DNS污染问题"}],["meta",{"property":"og:description","content":"前言 国内环境下，除了不能直连海外服务器问题外，还有DNS污染问题让人恼火，因此需要了解一下怎么解决。 什么是DNS污染 又称DNS“投毒”,执行DNS劫持攻击导致下游DNS服务器缓存了错误记录的现象。详见wiki"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-06T08:50:42.000Z"}],["meta",{"property":"article:tag","content":"networking"}],["meta",{"property":"article:tag","content":"dns"}],["meta",{"property":"article:tag","content":"dnsmasq"}],["meta",{"property":"article:tag","content":"doh"}],["meta",{"property":"article:tag","content":"solution"}],["meta",{"property":"article:tag","content":"dns污染"}],["meta",{"property":"article:published_time","content":"2023-07-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-06T08:50:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基础服务：DNS:解决DNS污染问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-06T08:50:42.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"什么是DNS污染","slug":"什么是dns污染","link":"#什么是dns污染","children":[]},{"level":2,"title":"正文","slug":"正文","link":"#正文","children":[{"level":3,"title":"实现原理：","slug":"实现原理","link":"#实现原理","children":[]},{"level":3,"title":"具体实现","slug":"具体实现","link":"#具体实现","children":[]}]},{"level":2,"title":"方案选项1：配置本地DNS缓存服务器 + DOH","slug":"方案选项1-配置本地dns缓存服务器-doh","link":"#方案选项1-配置本地dns缓存服务器-doh","children":[{"level":3,"title":"步骤1：选择DOH服务器作为上游DNS服务器","slug":"步骤1-选择doh服务器作为上游dns服务器","link":"#步骤1-选择doh服务器作为上游dns服务器","children":[]},{"level":3,"title":"步骤2：部署本地DNS缓存服务器","slug":"步骤2-部署本地dns缓存服务器","link":"#步骤2-部署本地dns缓存服务器","children":[]},{"level":3,"title":"步骤3：使用本地缓存服务器dnsmasq","slug":"步骤3-使用本地缓存服务器dnsmasq","link":"#步骤3-使用本地缓存服务器dnsmasq","children":[]}]},{"level":2,"title":"方案选项2：使用DNS Encrypt","slug":"方案选项2-使用dns-encrypt","link":"#方案选项2-使用dns-encrypt","children":[]}],"git":{"createdTime":1689306014000,"updatedTime":1707209442000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":6}]},"readingTime":{"minutes":2.56,"words":768},"filePathRelative":"zh/信息技术/网络/post46_dns_solutions.md","localizedDate":"2023年7月14日","excerpt":"<h2> 前言</h2>\\n<p>国内环境下，除了不能直连海外服务器问题外，还有DNS污染问题让人恼火，因此需要了解一下怎么解决。</p>\\n<h2> 什么是DNS污染</h2>\\n<blockquote>\\n<p>又称DNS“投毒”,执行DNS劫持攻击导致下游DNS服务器缓存了错误记录的现象。详见<a href=\\"https://zh.wikipedia.org/zh-cn/%E5%9F%9F%E5%90%8D%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%BC%93%E5%AD%98%E6%B1%A1%E6%9F%93\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">wiki</a></p>\\n</blockquote>","autoDesc":true}`);export{t as data};