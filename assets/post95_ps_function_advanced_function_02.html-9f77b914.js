const e=JSON.parse(`{"key":"v-715a5884","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BC%96%E7%A8%8B/post95_ps_function_advanced_function_02.html","title":"脚本编程：Powershell：Powershell Function参数使用技巧（1）","lang":"zh-CN","frontmatter":{"title":"脚本编程：Powershell：Powershell Function参数使用技巧（1）","icon":"page","order":95,"date":"2024-06-05T00:00:00.000Z","category":["Scripting Language","脚本编程","Powershell"],"tag":["Powershell"],"sticky":false,"star":true,"description":"前言 几个常用Powershell Function参数使用技巧 正文 来自DeepSeek Chat 在 PowerShell 中，你可以通过多种方式来判断是否带上了指定的参数。以下是一些常见的方法： 判断和检查参数是带值 如果你在脚本或函数中使用 Param 关键字定义了参数，你可以通过检查参数的值来判断是否带上了该参数。例如： function Test-Parameter { Param ( [Parameter(Mandatory=$true)] [string]$Name ) if ($Name) { Write-Output \\"Parameter 'Name' is provided with value: $Name\\" } else { Write-Output \\"Parameter 'Name' is not provided.\\" } } # 调用函数 Test-Parameter -Name \\"John\\"","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BC%96%E7%A8%8B/post95_ps_function_advanced_function_02.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"脚本编程：Powershell：Powershell Function参数使用技巧（1）"}],["meta",{"property":"og:description","content":"前言 几个常用Powershell Function参数使用技巧 正文 来自DeepSeek Chat 在 PowerShell 中，你可以通过多种方式来判断是否带上了指定的参数。以下是一些常见的方法： 判断和检查参数是带值 如果你在脚本或函数中使用 Param 关键字定义了参数，你可以通过检查参数的值来判断是否带上了该参数。例如： function Test-Parameter { Param ( [Parameter(Mandatory=$true)] [string]$Name ) if ($Name) { Write-Output \\"Parameter 'Name' is provided with value: $Name\\" } else { Write-Output \\"Parameter 'Name' is not provided.\\" } } # 调用函数 Test-Parameter -Name \\"John\\""}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-05T09:34:18.000Z"}],["meta",{"property":"article:tag","content":"Powershell"}],["meta",{"property":"article:published_time","content":"2024-06-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-05T09:34:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"脚本编程：Powershell：Powershell Function参数使用技巧（1）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-05T09:34:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"正文","slug":"正文","link":"#正文","children":[{"level":3,"title":"判断和检查参数是带值","slug":"判断和检查参数是带值","link":"#判断和检查参数是带值","children":[]},{"level":3,"title":"判断和检查参数是否被使用","slug":"判断和检查参数是否被使用","link":"#判断和检查参数是否被使用","children":[]},{"level":3,"title":"使用 ArgumentCompleter 属性","slug":"使用-argumentcompleter-属性","link":"#使用-argumentcompleter-属性","children":[]}]}],"git":{"createdTime":1717580058000,"updatedTime":1717580058000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":1}]},"readingTime":{"minutes":2.11,"words":633},"filePathRelative":"zh/信息技术/编程/post95_ps_function_advanced_function_02.md","localizedDate":"2024年6月5日","excerpt":"<h2> 前言</h2>\\n<p>几个常用Powershell Function参数使用技巧</p>\\n<h2> 正文</h2>\\n<blockquote>\\n<p>来自DeepSeek Chat</p>\\n</blockquote>\\n<p>在 PowerShell 中，你可以通过多种方式来判断是否带上了指定的参数。以下是一些常见的方法：</p>\\n<h3> 判断和检查参数是带值</h3>\\n<p>如果你在脚本或函数中使用 <code>Param</code> 关键字定义了参数，你可以通过检查参数的值来判断是否带上了该参数。例如：</p>\\n<div class=\\"language-powershell line-numbers-mode\\" data-ext=\\"powershell\\"><pre class=\\"language-powershell\\"><code><span class=\\"token keyword\\">function</span> <span class=\\"token function\\">Test-Parameter</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">Param</span> <span class=\\"token punctuation\\">(</span>\\n        <span class=\\"token namespace\\">[Parameter(Mandatory=$true)]</span>\\n        <span class=\\"token namespace\\">[string]</span><span class=\\"token variable\\">$Name</span>\\n    <span class=\\"token punctuation\\">)</span>\\n\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token variable\\">$Name</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">Write-Output</span> <span class=\\"token string\\">\\"Parameter 'Name' is provided with value: <span class=\\"token variable\\">$Name</span>\\"</span>\\n    <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">Write-Output</span> <span class=\\"token string\\">\\"Parameter 'Name' is not provided.\\"</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token comment\\"># 调用函数</span>\\n<span class=\\"token function\\">Test-Parameter</span> <span class=\\"token operator\\">-</span>Name <span class=\\"token string\\">\\"John\\"</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{e as data};