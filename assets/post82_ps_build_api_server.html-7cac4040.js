const n=JSON.parse(`{"key":"v-372debaa","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BC%96%E7%A8%8B/post82_ps_build_api_server.html","title":"脚本编程：Powershell：创建一个简单的HTTP REST Api服务","lang":"zh-CN","frontmatter":{"title":"脚本编程：Powershell：创建一个简单的HTTP REST Api服务","icon":"page","order":82,"date":"2024-02-04T00:00:00.000Z","category":["Scripting Language","脚本编程","Powershell"],"tag":["Powershell","Web编程","api"],"sticky":false,"star":true,"description":"前言 Powershell作为一个脚本语言，也是可以像服务端编程语言，例如Java/C#一样启动一个Web服务器，提供简单的REST Api服务。 这样，结合丰富Powershell Cmdlets就可以对外提供丰富的数据。 正文 示例代码 注意 需要管理员启动该脚本 # Source code https://hkeylocalmachine.com/?p=518 # Create a listener on port 8000 $listener = New-Object System.Net.HttpListener $listener.Prefixes.Add('http://+:8010/') $listener.Start() 'Listening ...' # Run until you send a GET request to /end while ($true) { $context = $listener.GetContext() # Capture the details about the request $request = $context.Request # Setup a place to deliver a response $response = $context.Response # Break from loop if GET request sent to /end if ($request.Url -match '/end$') { break } else { # Split request URL to get command and options $requestvars = ([String]$request.Url).split(\\"/\\"); # If a request is sent to http:// :8000/wmi if ($requestvars[3] -eq \\"wmi\\") { # Get the class name and server name from the URL and run get-WMIObject $result = get-WMIObject $requestvars[4] -computer $requestvars[5]; # Convert the returned data to JSON and set the HTTP content type to JSON $message = $result | ConvertTo-Json; $response.ContentType = 'application/json'; } else { # If no matching subdirectory/route is found generate a 404 message $message = \\"This is not the page you're looking for.\\"; $response.ContentType = 'text/html' ; } # Convert the data to UTF8 bytes [byte[]]$buffer = [System.Text.Encoding]::UTF8.GetBytes($message) # Set length of response $response.ContentLength64 = $buffer.length # Write response out and close $output = $response.OutputStream $output.Write($buffer, 0, $buffer.length) $output.Close() } } #Terminate the listener $listener.Stop() $listener.Dispose()","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BC%96%E7%A8%8B/post82_ps_build_api_server.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"脚本编程：Powershell：创建一个简单的HTTP REST Api服务"}],["meta",{"property":"og:description","content":"前言 Powershell作为一个脚本语言，也是可以像服务端编程语言，例如Java/C#一样启动一个Web服务器，提供简单的REST Api服务。 这样，结合丰富Powershell Cmdlets就可以对外提供丰富的数据。 正文 示例代码 注意 需要管理员启动该脚本 # Source code https://hkeylocalmachine.com/?p=518 # Create a listener on port 8000 $listener = New-Object System.Net.HttpListener $listener.Prefixes.Add('http://+:8010/') $listener.Start() 'Listening ...' # Run until you send a GET request to /end while ($true) { $context = $listener.GetContext() # Capture the details about the request $request = $context.Request # Setup a place to deliver a response $response = $context.Response # Break from loop if GET request sent to /end if ($request.Url -match '/end$') { break } else { # Split request URL to get command and options $requestvars = ([String]$request.Url).split(\\"/\\"); # If a request is sent to http:// :8000/wmi if ($requestvars[3] -eq \\"wmi\\") { # Get the class name and server name from the URL and run get-WMIObject $result = get-WMIObject $requestvars[4] -computer $requestvars[5]; # Convert the returned data to JSON and set the HTTP content type to JSON $message = $result | ConvertTo-Json; $response.ContentType = 'application/json'; } else { # If no matching subdirectory/route is found generate a 404 message $message = \\"This is not the page you're looking for.\\"; $response.ContentType = 'text/html' ; } # Convert the data to UTF8 bytes [byte[]]$buffer = [System.Text.Encoding]::UTF8.GetBytes($message) # Set length of response $response.ContentLength64 = $buffer.length # Write response out and close $output = $response.OutputStream $output.Write($buffer, 0, $buffer.length) $output.Close() } } #Terminate the listener $listener.Stop() $listener.Dispose()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-04T08:00:34.000Z"}],["meta",{"property":"article:tag","content":"Powershell"}],["meta",{"property":"article:tag","content":"Web编程"}],["meta",{"property":"article:tag","content":"api"}],["meta",{"property":"article:published_time","content":"2024-02-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-04T08:00:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"脚本编程：Powershell：创建一个简单的HTTP REST Api服务\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-02-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-04T08:00:34.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"正文","slug":"正文","link":"#正文","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1707033634000,"updatedTime":1707033634000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":1}]},"readingTime":{"minutes":1.36,"words":408},"filePathRelative":"zh/信息技术/编程/post82_ps_build_api_server.md","localizedDate":"2024年2月4日","excerpt":"<h2> 前言</h2>\\n<p>Powershell作为一个脚本语言，也是可以像服务端编程语言，例如Java/C#一样启动一个Web服务器，提供简单的REST Api服务。</p>\\n<p>这样，结合丰富Powershell Cmdlets就可以对外提供丰富的数据。</p>\\n<h2> 正文</h2>\\n<ul>\\n<li>示例代码</li>\\n</ul>\\n<div class=\\"hint-container note\\">\\n<p class=\\"hint-container-title\\">注意</p>\\n<p>需要管理员启动该脚本</p>\\n</div>\\n<div class=\\"language-powershell line-numbers-mode\\" data-ext=\\"powershell\\"><pre class=\\"language-powershell\\"><code><span class=\\"token comment\\"># Source code https://hkeylocalmachine.com/?p=518</span>\\n<span class=\\"token comment\\"># Create a listener on port 8000</span>\\n<span class=\\"token variable\\">$listener</span> = <span class=\\"token function\\">New-Object</span> System<span class=\\"token punctuation\\">.</span>Net<span class=\\"token punctuation\\">.</span>HttpListener\\n<span class=\\"token variable\\">$listener</span><span class=\\"token punctuation\\">.</span>Prefixes<span class=\\"token punctuation\\">.</span>Add<span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'http://+:8010/'</span><span class=\\"token punctuation\\">)</span> \\n<span class=\\"token variable\\">$listener</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Start</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token string\\">'Listening ...'</span>\\n\\n<span class=\\"token comment\\"># Run until you send a GET request to /end</span>\\n<span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">$true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token variable\\">$context</span> = <span class=\\"token variable\\">$listener</span><span class=\\"token punctuation\\">.</span>GetContext<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> \\n\\n    <span class=\\"token comment\\"># Capture the details about the request</span>\\n    <span class=\\"token variable\\">$request</span> = <span class=\\"token variable\\">$context</span><span class=\\"token punctuation\\">.</span>Request\\n\\n    <span class=\\"token comment\\"># Setup a place to deliver a response</span>\\n    <span class=\\"token variable\\">$response</span> = <span class=\\"token variable\\">$context</span><span class=\\"token punctuation\\">.</span>Response\\n   \\n    <span class=\\"token comment\\"># Break from loop if GET request sent to /end</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token variable\\">$request</span><span class=\\"token punctuation\\">.</span>Url <span class=\\"token operator\\">-match</span> <span class=\\"token string\\">'/end$'</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span> \\n        <span class=\\"token keyword\\">break</span> \\n    <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token punctuation\\">{</span>\\n\\n        <span class=\\"token comment\\"># Split request URL to get command and options</span>\\n        <span class=\\"token variable\\">$requestvars</span> = <span class=\\"token punctuation\\">(</span><span class=\\"token namespace\\">[String]</span><span class=\\"token variable\\">$request</span><span class=\\"token punctuation\\">.</span>Url<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span>split<span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"/\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>        \\n\\n        <span class=\\"token comment\\"># If a request is sent to http:// :8000/wmi</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token variable\\">$requestvars</span><span class=\\"token punctuation\\">[</span>3<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">-eq</span> <span class=\\"token string\\">\\"wmi\\"</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n           \\n            <span class=\\"token comment\\"># Get the class name and server name from the URL and run get-WMIObject</span>\\n            <span class=\\"token variable\\">$result</span> = <span class=\\"token function\\">get-WMIObject</span> <span class=\\"token variable\\">$requestvars</span><span class=\\"token punctuation\\">[</span>4<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">-</span>computer <span class=\\"token variable\\">$requestvars</span><span class=\\"token punctuation\\">[</span>5<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n\\n            <span class=\\"token comment\\"># Convert the returned data to JSON and set the HTTP content type to JSON</span>\\n            <span class=\\"token variable\\">$message</span> = <span class=\\"token variable\\">$result</span> <span class=\\"token punctuation\\">|</span> <span class=\\"token function\\">ConvertTo-Json</span><span class=\\"token punctuation\\">;</span> \\n            <span class=\\"token variable\\">$response</span><span class=\\"token punctuation\\">.</span>ContentType = <span class=\\"token string\\">'application/json'</span><span class=\\"token punctuation\\">;</span>\\n\\n       <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token punctuation\\">{</span>\\n\\n            <span class=\\"token comment\\"># If no matching subdirectory/route is found generate a 404 message</span>\\n            <span class=\\"token variable\\">$message</span> = <span class=\\"token string\\">\\"This is not the page you're looking for.\\"</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token variable\\">$response</span><span class=\\"token punctuation\\">.</span>ContentType = <span class=\\"token string\\">'text/html'</span> <span class=\\"token punctuation\\">;</span>\\n       <span class=\\"token punctuation\\">}</span>\\n\\n       <span class=\\"token comment\\"># Convert the data to UTF8 bytes</span>\\n       <span class=\\"token namespace\\">[byte[]]</span><span class=\\"token variable\\">$buffer</span> = <span class=\\"token namespace\\">[System.Text.Encoding]</span>::UTF8<span class=\\"token punctuation\\">.</span>GetBytes<span class=\\"token punctuation\\">(</span><span class=\\"token variable\\">$message</span><span class=\\"token punctuation\\">)</span>\\n       \\n       <span class=\\"token comment\\"># Set length of response</span>\\n       <span class=\\"token variable\\">$response</span><span class=\\"token punctuation\\">.</span>ContentLength64 = <span class=\\"token variable\\">$buffer</span><span class=\\"token punctuation\\">.</span>length\\n       \\n       <span class=\\"token comment\\"># Write response out and close</span>\\n       <span class=\\"token variable\\">$output</span> = <span class=\\"token variable\\">$response</span><span class=\\"token punctuation\\">.</span>OutputStream\\n       <span class=\\"token variable\\">$output</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Write</span><span class=\\"token punctuation\\">(</span><span class=\\"token variable\\">$buffer</span><span class=\\"token punctuation\\">,</span> 0<span class=\\"token punctuation\\">,</span> <span class=\\"token variable\\">$buffer</span><span class=\\"token punctuation\\">.</span>length<span class=\\"token punctuation\\">)</span>\\n       <span class=\\"token variable\\">$output</span><span class=\\"token punctuation\\">.</span>Close<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n   <span class=\\"token punctuation\\">}</span>    \\n<span class=\\"token punctuation\\">}</span>\\n \\n<span class=\\"token comment\\">#Terminate the listener</span>\\n<span class=\\"token variable\\">$listener</span><span class=\\"token punctuation\\">.</span>Stop<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token variable\\">$listener</span><span class=\\"token punctuation\\">.</span>Dispose<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};
