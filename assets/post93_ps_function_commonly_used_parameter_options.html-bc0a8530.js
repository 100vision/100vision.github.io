const n=JSON.parse(`{"key":"v-6803ebc6","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BC%96%E7%A8%8B/post93_ps_function_commonly_used_parameter_options.html","title":"脚本编程：Powershell：Powershell 常用参数修饰词选项","lang":"zh-CN","frontmatter":{"title":"脚本编程：Powershell：Powershell 常用参数修饰词选项","icon":"page","order":93,"date":"2024-05-20T00:00:00.000Z","category":["Scripting Language","脚本编程","Powershell"],"tag":["Powershell"],"sticky":false,"star":true,"description":"前言 几个常用Powershell参数修饰词 正文 function Write-Log { [CmdletBinding()] Param ( [Parameter(Mandatory=$true, ValueFromPipelineByPropertyName=$true)] [ValidateNotNullOrEmpty()] [Alias(\\"LogContent\\")] [string]$Message, [Parameter(Mandatory=$false)] [Alias('LogPath')] [string]$Path='C:\\\\Logs\\\\PowerShellLog.log', [Parameter(Mandatory=$false)] [ValidateSet(\\"Error\\",\\"Warn\\",\\"Info\\")] [string]$Level=\\"Info\\", [Parameter(Mandatory=$false)] [switch]$NoClobber )","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BC%96%E7%A8%8B/post93_ps_function_commonly_used_parameter_options.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"脚本编程：Powershell：Powershell 常用参数修饰词选项"}],["meta",{"property":"og:description","content":"前言 几个常用Powershell参数修饰词 正文 function Write-Log { [CmdletBinding()] Param ( [Parameter(Mandatory=$true, ValueFromPipelineByPropertyName=$true)] [ValidateNotNullOrEmpty()] [Alias(\\"LogContent\\")] [string]$Message, [Parameter(Mandatory=$false)] [Alias('LogPath')] [string]$Path='C:\\\\Logs\\\\PowerShellLog.log', [Parameter(Mandatory=$false)] [ValidateSet(\\"Error\\",\\"Warn\\",\\"Info\\")] [string]$Level=\\"Info\\", [Parameter(Mandatory=$false)] [switch]$NoClobber )"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-20T01:56:02.000Z"}],["meta",{"property":"article:tag","content":"Powershell"}],["meta",{"property":"article:published_time","content":"2024-05-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-20T01:56:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"脚本编程：Powershell：Powershell 常用参数修饰词选项\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-05-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-05-20T01:56:02.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"正文","slug":"正文","link":"#正文","children":[]}],"git":{"createdTime":1716170162000,"updatedTime":1716170162000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":1}]},"readingTime":{"minutes":0.93,"words":280},"filePathRelative":"zh/信息技术/编程/post93_ps_function_commonly_used_parameter_options.md","localizedDate":"2024年5月20日","excerpt":"<h2> 前言</h2>\\n<p>几个常用Powershell参数修饰词</p>\\n<h2> 正文</h2>\\n<div class=\\"language-powershell line-numbers-mode\\" data-ext=\\"powershell\\"><pre class=\\"language-powershell\\"><code><span class=\\"token keyword\\">function</span> <span class=\\"token function\\">Write-Log</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token namespace\\">[CmdletBinding()]</span>\\n    <span class=\\"token keyword\\">Param</span>\\n    <span class=\\"token punctuation\\">(</span>\\n        <span class=\\"token namespace\\">[Parameter(Mandatory=$true,\\n                   ValueFromPipelineByPropertyName=$true)]</span>\\n        <span class=\\"token namespace\\">[ValidateNotNullOrEmpty()]</span>\\n        <span class=\\"token punctuation\\">[</span>Alias<span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"LogContent\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">]</span>\\n        <span class=\\"token namespace\\">[string]</span><span class=\\"token variable\\">$Message</span><span class=\\"token punctuation\\">,</span>\\n\\n        <span class=\\"token namespace\\">[Parameter(Mandatory=$false)]</span>\\n        <span class=\\"token punctuation\\">[</span>Alias<span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'LogPath'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">]</span>\\n        <span class=\\"token namespace\\">[string]</span><span class=\\"token variable\\">$Path</span>=<span class=\\"token string\\">'C:\\\\Logs\\\\PowerShellLog.log'</span><span class=\\"token punctuation\\">,</span>\\n        \\n        <span class=\\"token namespace\\">[Parameter(Mandatory=$false)]</span>\\n        <span class=\\"token punctuation\\">[</span>ValidateSet<span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Error\\"</span><span class=\\"token punctuation\\">,</span><span class=\\"token string\\">\\"Warn\\"</span><span class=\\"token punctuation\\">,</span><span class=\\"token string\\">\\"Info\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">]</span>\\n        <span class=\\"token namespace\\">[string]</span><span class=\\"token variable\\">$Level</span>=<span class=\\"token string\\">\\"Info\\"</span><span class=\\"token punctuation\\">,</span>\\n        \\n        <span class=\\"token namespace\\">[Parameter(Mandatory=$false)]</span>\\n        <span class=\\"token namespace\\">[switch]</span><span class=\\"token variable\\">$NoClobber</span>\\n    <span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};
