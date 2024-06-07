const t=JSON.parse(`{"key":"v-831961a6","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BD%91%E7%BB%9C/post58_proxies_ssh_tunnel.html","title":"Networking：网络代理：使用SSH Tunnel隧道代理来访问远程服务","lang":"zh-CN","frontmatter":{"title":"Networking：网络代理：使用SSH Tunnel隧道代理来访问远程服务","icon":"page","order":58,"date":"2023-09-13T00:00:00.000Z","category":["networking","代理上网","productivity"],"tag":["networking","proxy","SSH","RDP","Socks5","Bitvise"],"sticky":false,"star":true,"description":"前言 一直在使用SSH隧道做http、socks5代理实现上网、联网。简单说，就是使用SSH服务器作为中转跳板，连接到其他服务器或服务。 使用场景 场景1：使用SSH通道访问远程服务 当前所在的网络有很严格的网络限制，目标端口只有开放22端口（SSH服务器），没有办法直接访问远程目标服务，例如MySQL Server（端口3306）,但SSH服务器可以到达MySQL服务器。 实现原理 SSH通道和端口转发. 流量路径：","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BD%91%E7%BB%9C/post58_proxies_ssh_tunnel.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"Networking：网络代理：使用SSH Tunnel隧道代理来访问远程服务"}],["meta",{"property":"og:description","content":"前言 一直在使用SSH隧道做http、socks5代理实现上网、联网。简单说，就是使用SSH服务器作为中转跳板，连接到其他服务器或服务。 使用场景 场景1：使用SSH通道访问远程服务 当前所在的网络有很严格的网络限制，目标端口只有开放22端口（SSH服务器），没有办法直接访问远程目标服务，例如MySQL Server（端口3306）,但SSH服务器可以到达MySQL服务器。 实现原理 SSH通道和端口转发. 流量路径："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-13T08:12:52.000Z"}],["meta",{"property":"article:tag","content":"networking"}],["meta",{"property":"article:tag","content":"proxy"}],["meta",{"property":"article:tag","content":"SSH"}],["meta",{"property":"article:tag","content":"RDP"}],["meta",{"property":"article:tag","content":"Socks5"}],["meta",{"property":"article:tag","content":"Bitvise"}],["meta",{"property":"article:published_time","content":"2023-09-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-13T08:12:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Networking：网络代理：使用SSH Tunnel隧道代理来访问远程服务\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-13T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-13T08:12:52.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"使用场景","slug":"使用场景","link":"#使用场景","children":[]},{"level":2,"title":"具体实现","slug":"具体实现","link":"#具体实现","children":[{"level":3,"title":"Windows","slug":"windows","link":"#windows","children":[]},{"level":3,"title":"Linux","slug":"linux","link":"#linux","children":[]}]}],"git":{"createdTime":1694589807000,"updatedTime":1694592772000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":4}]},"readingTime":{"minutes":3.32,"words":997},"filePathRelative":"zh/信息技术/网络/post58_proxies_ssh_tunnel.md","localizedDate":"2023年9月13日","excerpt":"<h2> 前言</h2>\\n<p>一直在使用SSH隧道做http、socks5代理实现上网、联网。简单说，就是使用SSH服务器作为中转跳板，连接到其他服务器或服务。</p>\\n<h2> 使用场景</h2>\\n<p><strong>场景1：使用SSH通道访问远程服务</strong></p>\\n<p>当前所在的网络有很严格的网络限制，目标端口只有开放22端口（SSH服务器），没有办法直接访问远程目标服务，例如MySQL Server（端口3306）,但SSH服务器可以到达MySQL服务器。</p>\\n<p><strong>实现原理</strong></p>\\n<p>SSH通道和端口转发.</p>\\n<p>流量路径：</p>","autoDesc":true}`);export{t as data};