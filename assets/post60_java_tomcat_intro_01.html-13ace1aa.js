import{_ as p,W as o,X as c,Z as n,$ as a,a0 as e,Y as s,G as u}from"./framework-b5535326.js";const l={},r=s(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p><code>Tomcat</code>, 广泛使用Web服务器，java容器。了解它的常用端口。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><p>从 tomcat 的配置文件中可以看到默认开了三个端口，分别是：8080（8443）、8009、8005。</p><h3 id="_8080-8443-端口" tabindex="-1"><a class="header-anchor" href="#_8080-8443-端口" aria-hidden="true">#</a> 8080（8443）端口</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Connector</span> <span class="token attr-name">connectionTimeout</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>20000<span class="token punctuation">&quot;</span></span> <span class="token attr-name">port</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>8080<span class="token punctuation">&quot;</span></span> <span class="token attr-name">protocol</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>HTTP/1.1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">redirectPort</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>8443<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,6),i={href:"http://localhost",target:"_blank",rel:"noopener noreferrer"},k=s(`<p><code>8080</code>,http 协议，其中 redirectPort 表示如果发送的是 https 请求，就将请求转发到 8443 端口。</p><p>\`8443\`\` 是默认的 https 监听端口。 默认未开启，如果要开启由于 tomcat 不自带证书所以除了取消注释之外，还要自己生成证书并在 中指定，例如：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Connector</span>
           <span class="token attr-name">protocol</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.apache.coyote.http11.Http11NioProtocol<span class="token punctuation">&quot;</span></span>
           <span class="token attr-name">port</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>8443<span class="token punctuation">&quot;</span></span> <span class="token attr-name">maxThreads</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>200<span class="token punctuation">&quot;</span></span>
           <span class="token attr-name">scheme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https<span class="token punctuation">&quot;</span></span> <span class="token attr-name">secure</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token attr-name">SSLEnabled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>
           <span class="token attr-name">keystoreFile</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>\${user.home}/.keystore<span class="token punctuation">&quot;</span></span> <span class="token attr-name">keystorePass</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>changeit<span class="token punctuation">&quot;</span></span>
           <span class="token attr-name">clientAuth</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span> <span class="token attr-name">sslProtocol</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>TLS<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8005端口" tabindex="-1"><a class="header-anchor" href="#_8005端口" aria-hidden="true">#</a> 8005端口</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Server</span> <span class="token attr-name">port</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>8005<span class="token punctuation">&quot;</span></span> <span class="token attr-name">shutdown</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>SHUTDOWN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,5),d={href:"http://shutdown.sh",target:"_blank",rel:"noopener noreferrer"},m=s(`<div class="hint-container warning"><p class="hint-container-title">注意</p><p>这可能是个安全隐患，生产环境最好注释关闭该端口。</p></div><h3 id="_8009端口" tabindex="-1"><a class="header-anchor" href="#_8009端口" aria-hidden="true">#</a> 8009端口</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Connector</span> <span class="token attr-name">port</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>8009<span class="token punctuation">&quot;</span></span> <span class="token attr-name">protocol</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>AJP/1.3<span class="token punctuation">&quot;</span></span> <span class="token attr-name">redirectPort</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>8443<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Nginx、Apache 等反向代理 tomcat 时就可以使用使用 ajp 协议反向代理到该端口。 虽然我们经常都是使用 http 反向代理到 8080 端口，但由于 ajp 建立 tcp 连接后一般长时间保持，从而减少了 http 反复进行 tcp 连接和断开的开销，所以反向代理中 ajp 是比 http 高效的。</p>`,4);function h(v,q){const t=u("ExternalLinkIcon");return o(),c("div",null,[r,n("p",null,[a("最熟悉的一个， Connector 用于监听浏览器发送的请求. 设置成80 后可以直接使用 "),n("a",i,[a("http://localhost"),e(t)]),a(" 访问。")]),k,n("p",null,[a("tomcat 监听的关闭端口，就是说 这个端口负责监听关闭 Tomcat 的请求 当执行 "),n("a",d,[a("shutdown.sh"),e(t)]),a(" 关闭 tomcat 时就是连接 8005 端口执行 “SHUTDOWN” 命令； 由此，我们直接用 telnet 向 8005 端口执行 “SHUTDOWN”（要大写，小写没用）来关闭 tomcat，这也是正统的关闭方式，如果这个端口没被监听，那么 sh 脚本就无效了。")]),m])}const g=p(l,[["render",h],["__file","post60_java_tomcat_intro_01.html.vue"]]);export{g as default};
