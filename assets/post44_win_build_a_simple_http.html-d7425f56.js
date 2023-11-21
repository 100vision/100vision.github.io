import{_ as t,W as p,X as o,Z as n,$ as s,a0 as e,Y as l,G as c}from"./framework-b5535326.js";const i={},u=n("h2",{id:"前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),s(" 前言")],-1),r={href:"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BC%96%E7%A8%8B/post42_ps_file_uploading_sftp.html",target:"_blank",rel:"noopener noreferrer"},d=n("h2",{id:"步骤",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#步骤","aria-hidden":"true"},"#"),s(" 步骤")],-1),k=n("blockquote",null,[n("p",null,"Windows环境，部署一个简单的文件下载站点。例如由3个文件")],-1),v={href:"http://www.nodejs.com.cn/",target:"_blank",rel:"noopener noreferrer"},m=n("li",null,[n("p",null,[s("创建一个站点文件夹，例如"),n("code",null,"D:\\SimpleSiteDefault")])],-1),h=n("li",null,[n("p",null,"创建要给下载目录,例如 ``D:\\SimpleSiteDefault\\downloads`")],-1),_=n("li",null,[n("p",null,[s("把下载文件放到"),n("code",null,"D:\\SimpleSiteDefault\\downloads"),s("下。")])],-1),b=n("li",null,[n("p",null,"切换到command prompt,并初始化目录。执行:")],-1),f=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>D:\\SimpleSiteDefault&gt; npm init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>安装express模块，执行：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>D:\\SimpleSiteDefault&gt; npm i express
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>创建一个<code>server.js</code>文件。文件内容：</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Define the folder path where your file is located</span>
<span class="token keyword">const</span> folderPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;download&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// on the request to root (localhost:3000/)</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/download/:file&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Use the path module to join the folder path and the file name</span>
  <span class="token keyword">const</span> file <span class="token operator">=</span> req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>file<span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">download</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>folderPath<span class="token punctuation">,</span> file<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Server started on port 3000.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动Web服务器。执行：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>D:\\SimpleSiteDefault&gt;node server
Server started on port 3000.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>最后，可以尝试使用浏览器访问和文件下载. 文件下载Url分别是</li></ul><p>http://&lt;IP地址&gt;:3000/download/fileName</p>`,9);function g(x,w){const a=c("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[s("有时需要快速起一个简单的Web服务器，提供文件下载服务，就像在之前文章："),n("a",r,[s("脚本编程：Powershell：使用WinSCP Assembly实现文件上传"),e(a)]),s(" 使用场景。")]),d,k,n("ul",null,[n("li",null,[n("p",null,[s("下载安装Node.js。"),n("a",v,[s("http://www.nodejs.com.cn/"),e(a)])])]),m,h,_,b]),f])}const D=t(i,[["render",g],["__file","post44_win_build_a_simple_http.html.vue"]]);export{D as default};
