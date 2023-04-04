import{_ as a,W as s,X as e,Y as n}from"./framework-2e6688e7.js";const l={},i=n(`<h2 id="curl介绍" tabindex="-1"><a class="header-anchor" href="#curl介绍" aria-hidden="true">#</a> curl介绍</h2><p>curl，一个很强大的http api调试工具，可以在Shell上直接使用。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>作为一个运维，我应该要熟练使用该工具</p></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>https://curl.haxx.se/download.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="常见使用" tabindex="-1"><a class="header-anchor" href="#常见使用" aria-hidden="true">#</a> 常见使用</h2><ul><li>发起GET 请求</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-i</span> https://www.163.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>携带cookies发起请求</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-b</span> <span class="token string">&#39;a=1;b=2&#39;</span> https://www.163.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>保存cookies到文件并使用</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-c</span> /tmp/mycookies https://www.163.com
<span class="token function">curl</span> <span class="token parameter variable">-b</span> @/tmp/mycookies https://www.163.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>携带header发起请求，可以多个-H参数</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type:application/json&#39;</span> 
<span class="token parameter variable">-H</span> <span class="token string">&#39;CustomHeader=hello&#39;</span> https://163.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>发起POST(携带json)</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type:application/json&#39;</span> <span class="token parameter variable">-d</span> &#39;<span class="token punctuation">{</span><span class="token string">&quot;id:1&quot;</span>,<span class="token string">&quot;name:lin&quot;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>发起POST (携带KV, application/x-www-form-urlencoded)</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;k1=value1&amp;k2=value2&#39;</span> https://www.163.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>携带User-Agent</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-A</span> <span class="token string">&#39;Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0&#39;</span> https://163.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h2><ul><li>可以使用POSTMAN帮忙生成curl参数，如图：</li></ul>`,22),r=[i];function t(c,d){return s(),e("div",null,r)}const p=a(l,[["render",t],["__file","how_to_use_curl.html.vue"]]);export{p as default};