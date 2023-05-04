const e=JSON.parse(`{"key":"v-211907fa","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/vmware_horizon_01.html","title":"VMware Horizon：FSLogix和App Volumes","lang":"zh-CN","frontmatter":{"title":"VMware Horizon：FSLogix和App Volumes","icon":"page","order":19,"date":"2023-05-04T00:00:00.000Z","category":["Windows","桌面虚拟化","应用交付"],"tag":["应用交付","Horizon","FSLogix","用户配置管理","Profile Container","VMware","App Volumes"],"sticky":false,"star":true,"description":"一、配置管理解决方案 Microsoft FSLogix 1.1 什么是FSLogix FSLogix是微软免费的Windows用户配置管理解决方案。把用户账户配置从系统里抽象剥离出来，然后使用vhd或vhdx虚拟磁盘文件进行封装，放到一个网络位置，例如SMB共享。用户登录时，系统（具体时FSLogix Agent)会去挂载用户的vhd/vhdx磁盘文件到本地。这样实现了： 用户配置文件统一管理 用户配置文件都封装重定向到一个网络位置 提供了用户体验","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/vmware_horizon_01.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"VMware Horizon：FSLogix和App Volumes"}],["meta",{"property":"og:description","content":"一、配置管理解决方案 Microsoft FSLogix 1.1 什么是FSLogix FSLogix是微软免费的Windows用户配置管理解决方案。把用户账户配置从系统里抽象剥离出来，然后使用vhd或vhdx虚拟磁盘文件进行封装，放到一个网络位置，例如SMB共享。用户登录时，系统（具体时FSLogix Agent)会去挂载用户的vhd/vhdx磁盘文件到本地。这样实现了： 用户配置文件统一管理 用户配置文件都封装重定向到一个网络位置 提供了用户体验"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-04T06:33:16.000Z"}],["meta",{"property":"article:tag","content":"应用交付"}],["meta",{"property":"article:tag","content":"Horizon"}],["meta",{"property":"article:tag","content":"FSLogix"}],["meta",{"property":"article:tag","content":"用户配置管理"}],["meta",{"property":"article:tag","content":"Profile Container"}],["meta",{"property":"article:tag","content":"VMware"}],["meta",{"property":"article:tag","content":"App Volumes"}],["meta",{"property":"article:published_time","content":"2023-05-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-04T06:33:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"VMware Horizon：FSLogix和App Volumes\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-04T00:00:00.000Z\\",\\"dateModified\\":\\"2023-05-04T06:33:16.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1.1 什么是FSLogix","slug":"_1-1-什么是fslogix","link":"#_1-1-什么是fslogix","children":[]},{"level":2,"title":"1.2 FSLogix应用范围","slug":"_1-2-fslogix应用范围","link":"#_1-2-fslogix应用范围","children":[]},{"level":2,"title":"1.3 部署FSLogix","slug":"_1-3-部署fslogix","link":"#_1-3-部署fslogix","children":[{"level":3,"title":"1.3.1 部署到Horizon View自动场:虚拟桌面或RDSH服务器","slug":"_1-3-1-部署到horizon-view自动场-虚拟桌面或rdsh服务器","link":"#_1-3-1-部署到horizon-view自动场-虚拟桌面或rdsh服务器","children":[]},{"level":3,"title":"1.3.2 部署到Horizon View的手动场：RDSH服务器","slug":"_1-3-2-部署到horizon-view的手动场-rdsh服务器","link":"#_1-3-2-部署到horizon-view的手动场-rdsh服务器","children":[]},{"level":3,"title":"1.3.3 部署到Citrix","slug":"_1-3-3-部署到citrix","link":"#_1-3-3-部署到citrix","children":[]},{"level":3,"title":"其他：FSLogix配置磁盘文件的压缩","slug":"其他-fslogix配置磁盘文件的压缩","link":"#其他-fslogix配置磁盘文件的压缩","children":[]}]},{"level":2,"title":"2.1 什么是App Volumes","slug":"_2-1-什么是app-volumes","link":"#_2-1-什么是app-volumes","children":[]},{"level":2,"title":"2.2 部署App Volumes","slug":"_2-2-部署app-volumes","link":"#_2-2-部署app-volumes","children":[{"level":3,"title":"2.2.1 如何部署到Horizon VDI虚拟桌面环境","slug":"_2-2-1-如何部署到horizon-vdi虚拟桌面环境","link":"#_2-2-1-如何部署到horizon-vdi虚拟桌面环境","children":[]},{"level":3,"title":"2.2.2 如何部署到Citrix虚拟桌面环境","slug":"_2-2-2-如何部署到citrix虚拟桌面环境","link":"#_2-2-2-如何部署到citrix虚拟桌面环境","children":[]}]}],"git":{"createdTime":1683166934000,"updatedTime":1683181996000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":9}]},"readingTime":{"minutes":7.43,"words":2228},"filePathRelative":"zh/信息技术/SysOps/vmware_horizon_01.md","localizedDate":"2023年5月4日","excerpt":"<h1> 一、配置管理解决方案 Microsoft FSLogix</h1>\\n<h2> 1.1 什么是FSLogix</h2>\\n<p>FSLogix是微软免费的Windows用户配置管理解决方案。把用户账户配置从系统里抽象剥离出来，然后使用vhd或vhdx虚拟磁盘文件进行封装，放到一个网络位置，例如SMB共享。用户登录时，系统（具体时FSLogix Agent)会去挂载用户的vhd/vhdx磁盘文件到本地。这样实现了：</p>\\n<ul>\\n<li>用户配置文件统一管理</li>\\n</ul>\\n<p>用户配置文件都封装重定向到一个网络位置</p>\\n<ul>\\n<li>提供了用户体验</li>\\n</ul>","autoDesc":true}`);export{e as data};