import{_ as i,W as t,X as l,Z as n,$ as e,a0 as a,Y as r,G as d}from"./framework-b5535326.js";const c={},o=n("h2",{id:"前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),e(" 前言")],-1),p={href:"https://www.cnblogs.com/xinzhao/p/6233009.html",target:"_blank",rel:"noopener noreferrer"},u=r(`<h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3><p>wrk可以简单测试网站和接口压力测试，了解压力测试下的性能表现。性能表现主要是看的能处理的web请求数。</p><blockquote><p>wrk is a modern HTTP benchmarking tool capable of generating significant load when run on a single multi-core CPU. It combines a multithreaded design with scalable event notification systems such as epoll and kqueue.</p></blockquote><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><p>安装wrk非常简单，只要从github上下载wrk源码，在项目路径下执行make命令即可。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/wg/wrk
<span class="token function">make</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="开始使用" tabindex="-1"><a class="header-anchor" href="#开始使用" aria-hidden="true">#</a> 开始使用</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>使用方法: wrk &lt;选项&gt; &lt;被测HTTP服务的URL&gt;                            
  Options:                                            
    -c, --connections &lt;N&gt;  跟服务器建立并保持的TCP连接数量  
    -d, --duration    &lt;T&gt;  压测时间           
    -t, --threads     &lt;N&gt;  使用多少个线程进行压测   
                                                      
    -s, --script      &lt;S&gt;  指定Lua脚本路径       
    -H, --header      &lt;H&gt;  为每一个HTTP请求添加HTTP头      
        --latency          在压测结束后，打印延迟统计信息   
        --timeout     &lt;T&gt;  超时时间     
    -v, --version          打印正在使用的wrk的详细版本信息
                                                      
  &lt;N&gt;代表数字参数，支持国际单位 (1k, 1M, 1G)
  &lt;T&gt;代表时间参数，支持时间单位 (2s, 2m, 2h)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="范例" tabindex="-1"><a class="header-anchor" href="#范例" aria-hidden="true">#</a> 范例</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>wrk <span class="token parameter variable">-t8</span> <span class="token parameter variable">-c200</span> <span class="token parameter variable">-d30s</span> <span class="token parameter variable">--latency</span>  <span class="token string">&quot;http://www.bing.com&quot;</span>

输出：
Running 30s <span class="token builtin class-name">test</span> @ http://www.bing.com
  <span class="token number">8</span> threads and <span class="token number">200</span> connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    <span class="token number">46</span>.67ms  <span class="token number">215</span>.38ms   <span class="token number">1</span>.67s    <span class="token number">95.59</span>%
    Req/Sec     <span class="token number">7</span>.91k     <span class="token number">1</span>.15k   <span class="token number">10</span>.26k    <span class="token number">70.77</span>%
  Latency Distribution
     <span class="token number">50</span>%    <span class="token number">2</span>.93ms
     <span class="token number">75</span>%    <span class="token number">3</span>.78ms
     <span class="token number">90</span>%    <span class="token number">4</span>.73ms
     <span class="token number">99</span>%    <span class="token number">1</span>.35s 
  <span class="token number">1790465</span> requests <span class="token keyword">in</span> <span class="token number">30</span>.01s, <span class="token number">684</span>.08MB <span class="token builtin class-name">read</span>
Requests/sec:  <span class="token number">59658.29</span>
Transfer/sec:     <span class="token number">22</span>.79MB

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更多" tabindex="-1"><a class="header-anchor" href="#更多" aria-hidden="true">#</a> 更多</h3><p>高级使用使用Lua脚本个性化wrk压测</p>`,13),m={href:"https://www.cnblogs.com/xinzhao/p/6233009.html",target:"_blank",rel:"noopener noreferrer"};function b(v,h){const s=d("ExternalLinkIcon");return t(),l("div",null,[o,n("p",null,[e("了解一下一款站点压测工具wrk, 备查。以后再了解一下Jmeter等更复杂的压测工具。 以下大部分内容来自 "),n("a",p,[e("https://www.cnblogs.com/xinzhao/p/6233009.html"),a(s)])]),u,n("p",null,[e("详见 "),n("a",m,[e("https://www.cnblogs.com/xinzhao/p/6233009.html"),a(s)])])])}const g=i(c,[["render",b],["__file","post52_devops_tools_01_wrk.html.vue"]]);export{g as default};
