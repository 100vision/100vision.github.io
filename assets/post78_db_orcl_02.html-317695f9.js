const e=JSON.parse(`{"key":"v-d852e3bc","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/Database/post78_db_orcl_02.html","title":"Oracle：使用Package授权普通用户杀掉会话","lang":"zh-CN","frontmatter":{"title":"Oracle：使用Package授权普通用户杀掉会话","icon":"page","order":78,"date":"2024-01-17T00:00:00.000Z","category":["数据库"],"tag":["Oracle","数据库","PLSQL"],"sticky":false,"star":true,"description":"前言 处理死锁问题一般都是杀死会话，一般是DBA角色来执行，或是用户授予了使用alter system kill session 但如果想让普通用户在不拥有DBA角色，或不能拥有alter system的情况下杀死会话，可以考虑 以下方法授权给普通用户。 正文 实现方式 授权一个高级用户，例如system可以查询v$session 授权这个高级用户可以执行alter system特权； 这个高级用户身份下创建一个Package或procedure,核心语句是授权package的body中包含alter system kill session 授权1个普通用户可以执行该package或procedure。","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/Database/post78_db_orcl_02.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"Oracle：使用Package授权普通用户杀掉会话"}],["meta",{"property":"og:description","content":"前言 处理死锁问题一般都是杀死会话，一般是DBA角色来执行，或是用户授予了使用alter system kill session 但如果想让普通用户在不拥有DBA角色，或不能拥有alter system的情况下杀死会话，可以考虑 以下方法授权给普通用户。 正文 实现方式 授权一个高级用户，例如system可以查询v$session 授权这个高级用户可以执行alter system特权； 这个高级用户身份下创建一个Package或procedure,核心语句是授权package的body中包含alter system kill session 授权1个普通用户可以执行该package或procedure。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-17T09:30:09.000Z"}],["meta",{"property":"article:tag","content":"Oracle"}],["meta",{"property":"article:tag","content":"数据库"}],["meta",{"property":"article:tag","content":"PLSQL"}],["meta",{"property":"article:published_time","content":"2024-01-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-17T09:30:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Oracle：使用Package授权普通用户杀掉会话\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-17T09:30:09.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"正文","slug":"正文","link":"#正文","children":[{"level":3,"title":"实现方式","slug":"实现方式","link":"#实现方式","children":[]},{"level":3,"title":"实现步骤","slug":"实现步骤","link":"#实现步骤","children":[]},{"level":3,"title":"使用","slug":"使用","link":"#使用","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1705471453000,"updatedTime":1705483809000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":3}]},"readingTime":{"minutes":2.1,"words":631},"filePathRelative":"zh/信息技术/Database/post78_db_orcl_02.md","localizedDate":"2024年1月17日","excerpt":"<h2> 前言</h2>\\n<p>处理死锁问题一般都是杀死会话，一般是DBA角色来执行，或是用户授予了使用<code>alter system kill session</code></p>\\n<p>但如果想让普通用户在不拥有DBA角色，或不能拥有alter system的情况下杀死会话，可以考虑</p>\\n<p>以下方法授权给普通用户。</p>\\n<h2> 正文</h2>\\n<h3> 实现方式</h3>\\n<ul>\\n<li>授权一个高级用户，例如system可以查询v$session</li>\\n<li>授权这个高级用户可以执行<code>alter system</code>特权；</li>\\n<li>这个高级用户身份下创建一个Package或procedure,核心语句是授权package的body中包含<code>alter system kill session</code></li>\\n<li>授权1个普通用户可以执行该package或procedure。</li>\\n</ul>","autoDesc":true}`);export{e as data};
