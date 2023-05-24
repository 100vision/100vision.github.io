const t=JSON.parse(`{"key":"v-5daae885","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/DevOps/curl_with_contenttype.html","title":"curl调试api时常用的Http Content Type","lang":"zh-CN","frontmatter":{"title":"curl调试api时常用的Http Content Type","icon":"page","order":5,"date":"2023-02-22T00:00:00.000Z","category":["Web编程","工具利器"],"tag":["Web编程","http基础","curl"],"sticky":false,"star":true,"footer":null,"copyright":"无版权","description":"了解Http Content Type的起因 curl，一个很好的api调试工具。好几次想在Linxu Shell使用curl调试上游api接口，但我用起来不是很利索，原因之一是对Content Type 记不住有哪几种，以及它们之间的区别。 什么是Content Type 一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因。Content-Type 标头告诉客户端实际返回的内容的内容类型。","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/DevOps/curl_with_contenttype.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"curl调试api时常用的Http Content Type"}],["meta",{"property":"og:description","content":"了解Http Content Type的起因 curl，一个很好的api调试工具。好几次想在Linxu Shell使用curl调试上游api接口，但我用起来不是很利索，原因之一是对Content Type 记不住有哪几种，以及它们之间的区别。 什么是Content Type 一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因。Content-Type 标头告诉客户端实际返回的内容的内容类型。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-22T09:05:41.000Z"}],["meta",{"property":"article:tag","content":"Web编程"}],["meta",{"property":"article:tag","content":"http基础"}],["meta",{"property":"article:tag","content":"curl"}],["meta",{"property":"article:published_time","content":"2023-02-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-22T09:05:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"curl调试api时常用的Http Content Type\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-22T00:00:00.000Z\\",\\"dateModified\\":\\"2023-02-22T09:05:41.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"了解Http Content Type的起因","slug":"了解http-content-type的起因","link":"#了解http-content-type的起因","children":[]},{"level":2,"title":"什么是Content Type","slug":"什么是content-type","link":"#什么是content-type","children":[]},{"level":2,"title":"curl常用的Content Type","slug":"curl常用的content-type","link":"#curl常用的content-type","children":[]},{"level":2,"title":"curl POST数据到api接口","slug":"curl-post数据到api接口","link":"#curl-post数据到api接口","children":[{"level":3,"title":"1、提交json","slug":"_1、提交json","link":"#_1、提交json","children":[]},{"level":3,"title":"2. 提交application/x-www-form-urlencoded","slug":"_2-提交application-x-www-form-urlencoded","link":"#_2-提交application-x-www-form-urlencoded","children":[]}]},{"level":2,"title":"扩展","slug":"扩展","link":"#扩展","children":[]}],"git":{"createdTime":1677056741000,"updatedTime":1677056741000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":1}]},"readingTime":{"minutes":2.19,"words":658},"filePathRelative":"zh/信息技术/DevOps/curl_with_contenttype.md","localizedDate":"2023年2月22日","excerpt":"<h2> 了解Http Content Type的起因</h2>\\n<p>curl，一个很好的api调试工具。好几次想在Linxu Shell使用curl调试上游api接口，但我用起来不是很利索，原因之一是对<strong>Content Type</strong> 记不住有哪几种，以及它们之间的区别。</p>\\n<h2> 什么是Content Type</h2>\\n<blockquote>\\n<p>一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因。Content-Type 标头告诉客户端实际返回的内容的内容类型。</p>\\n</blockquote>","autoDesc":true}`);export{t as data};