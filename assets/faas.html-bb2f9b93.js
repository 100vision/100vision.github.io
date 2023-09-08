import{_ as n,W as o,X as s,Z as e,$ as r,a0 as t,Y as c,G as h}from"./framework-b5535326.js";const l={},i={class:"hint-container note"},d=e("p",{class:"hint-container-title"},"注",-1),p={href:"https://github.com/TBXark/ChatGPT-Telegram-Workers",target:"_blank",rel:"noopener noreferrer"},_=c('<h2 id="faas-是什么" tabindex="-1"><a class="header-anchor" href="#faas-是什么" aria-hidden="true">#</a> FaaS 是什么</h2><p>传统的 webserver 24 小时在后台运行，监听 TCP 端口的 HTTP 请求，处理后再返回。优点是响应很快，缺点是运行成本比较高，无论有没有请求，都 24 小时跑在那里。</p><p>为了提高应对请求压力的灵活性，人们提出了 stateless。就是如果 webserver 做成无状态的， 可以理解为其内部不保存任何中间变量，数据都在外部进行持久化存储，其本身只负责业务逻辑。那么 webserver 就可以随时随地的跟随负载压力进行扩缩容。</p><p>这个想法再激进一点，如果有一些请求的频率非常低，比如 CI/CD，或者一些 cronjob， 或者流量的峰值效应很明显，绝大部分请求集中在一天的一部分时间。那么人们就认为根本没必要随时随地运行一个服务器在那等着， 完全可以在有请求来的时候，再去启动一个服务，如果请求量很大，就启动更多的服务， 如果一段时间没有请求量，就把服务器关机释放出来。</p><p>这种想法就被称为 FaaS（<code>Function as a Service</code>），<strong>因为此时的后端服务表现得就像是一个普通函数（而且不是闭包哦）， 接受固定的入参，执行一些逻辑，然后返回，销毁</strong>。</p><h2 id="cf-worker-是什么" tabindex="-1"><a class="header-anchor" href="#cf-worker-是什么" aria-hidden="true">#</a> CF Worker 是什么</h2><p>了解了上述的背景知识，我们就可以来交接 CF Worker 是什么了。</p><p>抛开 LB、SSL 等 infra，纯粹从后端的角度来看 webserver，实际上就是整个逻辑链路就是 socket listener、router、handler。listener 获取到请求后，交给 router 分发给 handler 处理，然后返回。</p><p>那我们再来回头看看 CDN，CDN 因为会进行 SSL 卸载，所以可以获取 HTTP 的全部负载明文。我们知道 CDN 可以分析 HTTP URL，发现是静态请求就直接返回缓存，发现是动态请求就转发回源站。</p><p>那么如果我们在 CDN 里跑一个 FaaS 的体系，让你可以编写一些相对简单的代码， 直接在 CDN 服务器内处理和响应一些动态的请求，而不是把它们转发给源站，这样整个 RTT 的链路不是更少了吗？这样就可以更快地响应请求，也可以进一步为源站减压。</p><p><code>CF worker</code> 就是这么一个运行在 CF CDN 内的 FaaS。它的核心组成就是：router、FaaS（handler）和 KV（存储）。</p><p>你把域名托管在 CF 上并启用 CDN 后。就可以为域名创建 worker，编写一些 handler 函数（可以用 JS、Python 等等）。这些 handler 都是无状态的（因为会被随机启停），持久化的数据可以使用外部的 KV 存储。然后再配置上路由，将匹配的流量分发给 worker， worker 内的代码可以选择将能处理的请求直接就地处理，不能处理的再转发会源站处理。</p><h2 id="文章来源" tabindex="-1"><a class="header-anchor" href="#文章来源" aria-hidden="true">#</a> 文章来源</h2>',13),k={href:"https://blog.csdn.net/alex_yangchuansheng/article/details/121279538",target:"_blank",rel:"noopener noreferrer"},T={href:"https://github.com/TBXark/ChatGPT-Telegram-Workers",target:"_blank",rel:"noopener noreferrer"};function f(u,C){const a=h("ExternalLinkIcon");return o(),s("div",null,[e("div",i,[d,e("p",null,[r("学习和了解一下FaaS. 然后使用CloudFlare Worker部署一个OpenAI ChatGPT TG机器人 "),e("a",p,[r("https://github.com/TBXark/ChatGPT-Telegram-Workers"),t(a)])])]),_,e("p",null,[e("a",k,[r("https://blog.csdn.net/alex_yangchuansheng/article/details/121279538"),t(a)])]),e("p",null,[e("a",T,[r("https://github.com/TBXark/ChatGPT-Telegram-Workers"),t(a)])])])}const b=n(l,[["render",f],["__file","faas.html.vue"]]);export{b as default};