import{_ as a,W as e,X as t,Z as n,$ as p,a0 as i,Y as l,G as o}from"./framework-b5535326.js";const c={},u=l(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>Powershell作为一个脚本语言，也是可以像服务端编程语言，例如Java/C#一样启动一个Web服务器，提供简单的REST Api服务。</p><p>这样，结合丰富Powershell Cmdlets就可以对外提供丰富的数据。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><ul><li>示例代码1: HTTP REST Api,返回json数据。</li></ul><div class="hint-container note"><p class="hint-container-title">注意</p><p>需要管理员启动该脚本</p></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># Source code https://hkeylocalmachine.com/?p=518</span>
<span class="token comment"># Create a listener on port 8000</span>
<span class="token variable">$listener</span> = <span class="token function">New-Object</span> System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>HttpListener
<span class="token variable">$listener</span><span class="token punctuation">.</span>Prefixes<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&#39;http://+:8010/&#39;</span><span class="token punctuation">)</span> 
<span class="token variable">$listener</span><span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token string">&#39;Listening ...&#39;</span>

<span class="token comment"># Run until you send a GET request to /end</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">$true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$context</span> = <span class="token variable">$listener</span><span class="token punctuation">.</span>GetContext<span class="token punctuation">(</span><span class="token punctuation">)</span> 

    <span class="token comment"># Capture the details about the request</span>
    <span class="token variable">$request</span> = <span class="token variable">$context</span><span class="token punctuation">.</span>Request

    <span class="token comment"># Setup a place to deliver a response</span>
    <span class="token variable">$response</span> = <span class="token variable">$context</span><span class="token punctuation">.</span>Response
   
    <span class="token comment"># Break from loop if GET request sent to /end</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$request</span><span class="token punctuation">.</span>Url <span class="token operator">-match</span> <span class="token string">&#39;/end$&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">break</span> 
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>

        <span class="token comment"># Split request URL to get command and options</span>
        <span class="token variable">$requestvars</span> = <span class="token punctuation">(</span><span class="token namespace">[String]</span><span class="token variable">$request</span><span class="token punctuation">.</span>Url<span class="token punctuation">)</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        

        <span class="token comment"># If a request is sent to http:// :8000/wmi</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$requestvars</span><span class="token punctuation">[</span>3<span class="token punctuation">]</span> <span class="token operator">-eq</span> <span class="token string">&quot;wmi&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           
            <span class="token comment"># Get the class name and server name from the URL and run get-WMIObject</span>
            <span class="token variable">$result</span> = <span class="token function">get-WMIObject</span> <span class="token variable">$requestvars</span><span class="token punctuation">[</span>4<span class="token punctuation">]</span> <span class="token operator">-</span>computer <span class="token variable">$requestvars</span><span class="token punctuation">[</span>5<span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token comment"># Convert the returned data to JSON and set the HTTP content type to JSON</span>
            <span class="token variable">$message</span> = <span class="token variable">$result</span> <span class="token punctuation">|</span> <span class="token function">ConvertTo-Json</span><span class="token punctuation">;</span> 
            <span class="token variable">$response</span><span class="token punctuation">.</span>ContentType = <span class="token string">&#39;application/json&#39;</span><span class="token punctuation">;</span>

       <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>

            <span class="token comment"># If no matching subdirectory/route is found generate a 404 message</span>
            <span class="token variable">$message</span> = <span class="token string">&quot;This is not the page you&#39;re looking for.&quot;</span><span class="token punctuation">;</span>
            <span class="token variable">$response</span><span class="token punctuation">.</span>ContentType = <span class="token string">&#39;text/html&#39;</span> <span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

       <span class="token comment"># Convert the data to UTF8 bytes</span>
       <span class="token namespace">[byte[]]</span><span class="token variable">$buffer</span> = <span class="token namespace">[System.Text.Encoding]</span>::UTF8<span class="token punctuation">.</span>GetBytes<span class="token punctuation">(</span><span class="token variable">$message</span><span class="token punctuation">)</span>
       
       <span class="token comment"># Set length of response</span>
       <span class="token variable">$response</span><span class="token punctuation">.</span>ContentLength64 = <span class="token variable">$buffer</span><span class="token punctuation">.</span>length
       
       <span class="token comment"># Write response out and close</span>
       <span class="token variable">$output</span> = <span class="token variable">$response</span><span class="token punctuation">.</span>OutputStream
       <span class="token variable">$output</span><span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token variable">$buffer</span><span class="token punctuation">,</span> 0<span class="token punctuation">,</span> <span class="token variable">$buffer</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span>
       <span class="token variable">$output</span><span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>    
<span class="token punctuation">}</span>
 
<span class="token comment">#Terminate the listener</span>
<span class="token variable">$listener</span><span class="token punctuation">.</span>Stop<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token variable">$listener</span><span class="token punctuation">.</span>Dispose<span class="token punctuation">(</span><span class="token punctuation">)</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>示例2：提供文件下载。 <code>https://localhost:8010/downloads/filename</code></li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建一个http监听器listner，和其他语言大同小异</span>
<span class="token variable">$listener</span> = <span class="token function">New-Object</span> System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>HttpListener
<span class="token variable">$listener</span><span class="token punctuation">.</span>Prefixes<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&#39;http://+:8010/&#39;</span><span class="token punctuation">)</span> 

<span class="token comment"># 启动一个监听器</span>
<span class="token variable">$listener</span><span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token string">&#39;Listening ...&#39;</span>

<span class="token comment"># 该HTTP服务一直运行，除非向它发送一个&quot;http://xxx/end&quot;请求。Run until you send a GET request to /end</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">$true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$context</span> = <span class="token variable">$listener</span><span class="token punctuation">.</span>GetContext<span class="token punctuation">(</span><span class="token punctuation">)</span> 

    <span class="token comment"># Capture the details about the request 获取一个会话的HTTP Request对象</span>
    <span class="token variable">$request</span> = <span class="token variable">$context</span><span class="token punctuation">.</span>Request

    <span class="token comment"># Setup a place to deliver a response 获取一个会话的HTTP Response对象</span>
    <span class="token variable">$response</span> = <span class="token variable">$context</span><span class="token punctuation">.</span>Response
   
    <span class="token comment"># Break from loop if GET request sent to /end</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$request</span><span class="token punctuation">.</span>Url <span class="token operator">-match</span> <span class="token string">&#39;/end$&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">break</span> 
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>

        <span class="token comment"># Split request URL to get command and options</span>
        <span class="token variable">$requestvars</span> = <span class="token punctuation">(</span><span class="token namespace">[String]</span><span class="token variable">$request</span><span class="token punctuation">.</span>Url<span class="token punctuation">)</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        

        <span class="token comment"># If a request is sent to http:// :8010/downloads </span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$requestvars</span><span class="token punctuation">[</span>3<span class="token punctuation">]</span> <span class="token operator">-eq</span> <span class="token string">&quot;downloads&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           
            <span class="token comment">#文件转换成字节（读一个文件到内存）</span>
            <span class="token variable">$inputBytes</span> = <span class="token namespace">[IO.File]</span>::ReadAllBytes<span class="token punctuation">(</span><span class="token string">&quot;C:\\AdminPack\\a\\DB_Backup_Download.ps1&quot;</span><span class="token punctuation">)</span>
            <span class="token comment"># 指定文件下载的内容类型</span>
            <span class="token variable">$response</span><span class="token punctuation">.</span>ContentType = <span class="token string">&#39;application/octet-stream&#39;</span><span class="token punctuation">;</span>



       <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>

            <span class="token comment"># If no matching subdirectory/route is found generate a 404 message</span>
            <span class="token variable">$message</span> = <span class="token string">&quot;This is not the page you&#39;re looking for.&quot;</span><span class="token punctuation">;</span>

            <span class="token comment">#字符串转换成字节</span>
            <span class="token variable">$inputBytes</span> = <span class="token namespace">[System.Text.Encoding]</span>::UTF8<span class="token punctuation">.</span>GetBytes<span class="token punctuation">(</span><span class="token variable">$message</span><span class="token punctuation">)</span>
            <span class="token variable">$response</span><span class="token punctuation">.</span>ContentType = <span class="token string">&#39;text/html&#39;</span> <span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

       
       <span class="token comment"># Set length of response</span>
       <span class="token variable">$response</span><span class="token punctuation">.</span>ContentLength64 = <span class="token variable">$inputBytes</span><span class="token punctuation">.</span>length

       <span class="token comment"># 获取HTTP Response输出流</span>
       <span class="token variable">$output</span> = <span class="token variable">$response</span><span class="token punctuation">.</span>OutputStream

       <span class="token comment">#通过Response输出流对象输出，返回给浏览器</span>
       <span class="token variable">$output</span><span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token variable">$inputBytes</span><span class="token punctuation">,</span> 0<span class="token punctuation">,</span> <span class="token variable">$inputBytes</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span>
       <span class="token variable">$output</span><span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>    
<span class="token punctuation">}</span>
 
<span class="token comment">#停止关闭和销毁监听器对象</span>
<span class="token variable">$listener</span><span class="token punctuation">.</span>Stop<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token variable">$listener</span><span class="token punctuation">.</span>Dispose<span class="token punctuation">(</span><span class="token punctuation">)</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,10),r={href:"https://hkeylocalmachine.com/?p=518",target:"_blank",rel:"noopener noreferrer"};function d(v,k){const s=o("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",r,[p("https://hkeylocalmachine.com/?p=518"),i(s)])])])}const b=a(c,[["render",d],["__file","post82_ps_advanced_function.html.vue"]]);export{b as default};
