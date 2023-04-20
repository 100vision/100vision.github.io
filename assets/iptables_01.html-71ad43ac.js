const t=JSON.parse(`{"key":"v-a6910db2","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BD%91%E7%BB%9C/iptables_01.html","title":"iptables表和链的浅显理解","lang":"zh-CN","frontmatter":{"title":"iptables表和链的浅显理解","icon":"page","order":18,"date":"2023-04-20T00:00:00.000Z","category":["networking"],"tag":["networking","防火墙"],"sticky":false,"star":true,"footer":null,"copyright":"无版权","description":"iptables的常用表 表是iptables规则的集合，表中包含了若干个链. filter表 (iptables默认表，用来过滤网络包) nat表 （该表用于处理网络地址转换和端口转发等操作） mangle表(较少用，允许管理员修改数据包的TTL等) 链 以下都是个人粗解。 INPUT (用在filter表，用来防火墙过滤进入主机防火墙的包) OUTPUT （用在filter表和NAT表，用来控制离开主机的数据包） PREROUTING POSTROUTING FORWARD","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BD%91%E7%BB%9C/iptables_01.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"iptables表和链的浅显理解"}],["meta",{"property":"og:description","content":"iptables的常用表 表是iptables规则的集合，表中包含了若干个链. filter表 (iptables默认表，用来过滤网络包) nat表 （该表用于处理网络地址转换和端口转发等操作） mangle表(较少用，允许管理员修改数据包的TTL等) 链 以下都是个人粗解。 INPUT (用在filter表，用来防火墙过滤进入主机防火墙的包) OUTPUT （用在filter表和NAT表，用来控制离开主机的数据包） PREROUTING POSTROUTING FORWARD"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-20T06:42:04.000Z"}],["meta",{"property":"article:tag","content":"networking"}],["meta",{"property":"article:tag","content":"防火墙"}],["meta",{"property":"article:published_time","content":"2023-04-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-20T06:42:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"iptables表和链的浅显理解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-20T00:00:00.000Z\\",\\"dateModified\\":\\"2023-04-20T06:42:04.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"iptables的常用表","slug":"iptables的常用表","link":"#iptables的常用表","children":[]},{"level":2,"title":"链","slug":"链","link":"#链","children":[{"level":3,"title":"PREROUTING 链","slug":"prerouting-链","link":"#prerouting-链","children":[]},{"level":3,"title":"POSTROUTING 链","slug":"postrouting-链","link":"#postrouting-链","children":[]},{"level":3,"title":"FORWARD 链","slug":"forward-链","link":"#forward-链","children":[]}]}],"git":{"createdTime":1681963355000,"updatedTime":1681972924000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":4}]},"readingTime":{"minutes":2.36,"words":708},"filePathRelative":"zh/信息技术/网络/iptables_01.md","localizedDate":"2023年4月20日","excerpt":"<h2> iptables的常用表</h2>\\n<blockquote>\\n<p>表是iptables规则的集合，表中包含了若干个链.</p>\\n</blockquote>\\n<ul>\\n<li>filter表 (iptables默认表，用来过滤网络包)</li>\\n<li>nat表 （该表用于处理网络地址转换和端口转发等操作）</li>\\n<li>mangle表(较少用，允许管理员修改数据包的TTL等)</li>\\n</ul>\\n<h2> 链</h2>\\n<p>以下都是个人粗解。</p>\\n<ul>\\n<li>INPUT (用在filter表，用来防火墙过滤进入主机防火墙的包)</li>\\n<li>OUTPUT  （用在filter表和NAT表，用来控制离开主机的数据包）</li>\\n<li>PREROUTING</li>\\n<li>POSTROUTING</li>\\n<li>FORWARD</li>\\n</ul>","autoDesc":true}`);export{t as data};
