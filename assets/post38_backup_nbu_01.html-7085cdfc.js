const e=JSON.parse(`{"key":"v-942254b4","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/post38_backup_nbu_01.html","title":"数据保护：Netbackup：使用Automatic Image Replication (AIR)","lang":"zh-CN","frontmatter":{"title":"数据保护：Netbackup：使用Automatic Image Replication (AIR)","icon":"page","order":34,"date":"2023-06-19T00:00:00.000Z","category":["数据保护"],"tag":["数据备份","操作指南","Netbackup"],"sticky":false,"star":true,"description":"前言 这几天因为要做NBU还原数据库，但备份在另一个Netbackup服务器（即其他备份域），依稀记得使用AIR可以跨域取备份，但不知道怎么具体操作，于是又把Netbackup学习了一遍，主要是备份复制方面。最后明白其实不使用AIR也可以取备份，后面再说。 Netbackup复制 (Replication)介绍 用于实现不同备份域之间备份数据复制；如果是相同备份域，要使用Duplicate Automatic Image Replication (AIR) 自动复制 》AIR功能（Automatic Image Replicate）用于实现不同备份域之间的备份数据自动复制。接合SLP (Storage Lifecycle Policy) 实现备份镜像（备份片）自动复制。","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/post38_backup_nbu_01.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"数据保护：Netbackup：使用Automatic Image Replication (AIR)"}],["meta",{"property":"og:description","content":"前言 这几天因为要做NBU还原数据库，但备份在另一个Netbackup服务器（即其他备份域），依稀记得使用AIR可以跨域取备份，但不知道怎么具体操作，于是又把Netbackup学习了一遍，主要是备份复制方面。最后明白其实不使用AIR也可以取备份，后面再说。 Netbackup复制 (Replication)介绍 用于实现不同备份域之间备份数据复制；如果是相同备份域，要使用Duplicate Automatic Image Replication (AIR) 自动复制 》AIR功能（Automatic Image Replicate）用于实现不同备份域之间的备份数据自动复制。接合SLP (Storage Lifecycle Policy) 实现备份镜像（备份片）自动复制。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-19T02:30:08.000Z"}],["meta",{"property":"article:tag","content":"数据备份"}],["meta",{"property":"article:tag","content":"操作指南"}],["meta",{"property":"article:tag","content":"Netbackup"}],["meta",{"property":"article:published_time","content":"2023-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-19T02:30:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数据保护：Netbackup：使用Automatic Image Replication (AIR)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2023-06-19T02:30:08.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"Netbackup复制 (Replication)介绍","slug":"netbackup复制-replication-介绍","link":"#netbackup复制-replication-介绍","children":[{"level":3,"title":"Automatic Image Replication (AIR) 自动复制","slug":"automatic-image-replication-air-自动复制","link":"#automatic-image-replication-air-自动复制","children":[]},{"level":3,"title":"手动复制","slug":"手动复制","link":"#手动复制","children":[]},{"level":3,"title":"AIR VS 手动复制","slug":"air-vs-手动复制","link":"#air-vs-手动复制","children":[]}]},{"level":2,"title":"一. AIR复制","slug":"一-air复制","link":"#一-air复制","children":[{"level":3,"title":"AIR配置要求","slug":"air配置要求","link":"#air配置要求","children":[]},{"level":3,"title":"实现目的","slug":"实现目的","link":"#实现目的","children":[]},{"level":3,"title":"AIR配置步骤","slug":"air配置步骤","link":"#air配置步骤","children":[]},{"level":3,"title":"其他AIR事项","slug":"其他air事项","link":"#其他air事项","children":[]}]},{"level":2,"title":"二、 手动复制","slug":"二、-手动复制","link":"#二、-手动复制","children":[{"level":3,"title":"手动复制通过SLP备份的数据到远程域","slug":"手动复制通过slp备份的数据到远程域","link":"#手动复制通过slp备份的数据到远程域","children":[]},{"level":3,"title":"手动复制未通过SLP备份的数据到远程域","slug":"手动复制未通过slp备份的数据到远程域","link":"#手动复制未通过slp备份的数据到远程域","children":[]}]}],"git":{"createdTime":1687141808000,"updatedTime":1687141808000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":1}]},"readingTime":{"minutes":4.45,"words":1335},"filePathRelative":"zh/信息技术/SysOps/post38_backup_nbu_01.md","localizedDate":"2023年6月19日","excerpt":"<h2> 前言</h2>\\n<p>这几天因为要做NBU还原数据库，但备份在另一个Netbackup服务器（即其他备份域），依稀记得使用AIR可以跨域取备份，但不知道怎么具体操作，于是又把Netbackup学习了一遍，主要是备份复制方面。最后明白其实不使用AIR也可以取备份，后面再说。</p>\\n<h2> Netbackup复制 (Replication)介绍</h2>\\n<p>用于实现不同备份域之间备份数据复制；如果是相同备份域，要使用Duplicate</p>\\n<h3> Automatic Image Replication (AIR) 自动复制</h3>\\n<p>》AIR功能（Automatic Image Replicate）用于实现不同备份域之间的备份数据自动复制。接合SLP (Storage Lifecycle Policy) 实现备份镜像（备份片）自动复制。</p>","autoDesc":true}`);export{e as data};
