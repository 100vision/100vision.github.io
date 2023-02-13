import{_ as n,W as l,X as o,Z as e,$ as r,a0 as t,Y as i,G as d}from"./framework-2e6688e7.js";const h={},c=i('<h2 id="什么是内网穿透" tabindex="-1"><a class="header-anchor" href="#什么是内网穿透" aria-hidden="true">#</a> 什么是内网穿透</h2><blockquote><p>内网穿透，指的是将内网端口暴露到公网。由于防火墙的限制，或者普遍的 NAT 宽带接入方式，大多用户没有属于自己的公网 IP，因此其它用户无法访问其设备上对外开放的服务（例如 Web 服务器，或者比较常见的案例是 Minecraft 服务器）。过去有许多常见的内网穿透解决方案（例如花生壳、Ngrok、frp 及一系列衍生自 frp 的服务等），而 Cloudflare Tunnel 的免费开放，又为我们提供了一种看起来不错的新选择。内网穿透，指的是将内网端口暴露到公网。</p></blockquote><h2 id="方法和工具" tabindex="-1"><a class="header-anchor" href="#方法和工具" aria-hidden="true">#</a> 方法和工具</h2><p>主要有这么几种。</p><ul><li>CloudFlare Tunnel</li><li>FRP</li><li>Zerotier</li></ul><h2 id="cloudflare-tunnel" tabindex="-1"><a class="header-anchor" href="#cloudflare-tunnel" aria-hidden="true">#</a> Cloudflare Tunnel</h2><div class="hint-container tip"><p class="hint-container-title">先决条件</p><p>需要把DNS域名托管在CloudFalre</p></div><h2 id="大致步骤" tabindex="-1"><a class="header-anchor" href="#大致步骤" aria-hidden="true">#</a> 大致步骤</h2><ul><li>申请免费的CloudFlare账户</li><li>内网服务器要安装cloudflared软件</li><li>创建CloudFlare Tunnel</li></ul><h2 id="frp" tabindex="-1"><a class="header-anchor" href="#frp" aria-hidden="true">#</a> FRP</h2><blockquote><p>frp 是一个开源项目，专注于内网穿透的高性能的反向代理应用，支持 TCP、UDP、HTTP、HTTPS 等多种协议。可以将内网服务以安全、便捷的方式通过具有公网 IP 节点的中转暴露到公网。</p></blockquote><h3 id="github项目" tabindex="-1"><a class="header-anchor" href="#github项目" aria-hidden="true">#</a> Github项目</h3>',12),s={href:"https://github.com/fatedier/frp/blob/dev/README_zh.md",target:"_blank",rel:"noopener noreferrer"},u=e("div",{class:"hint-container tip"},[e("p",{class:"hint-container-title"},"前提条件"),e("p",null,"需要一台ECS云主机，有公网IP")],-1),p=e("h3",{id:"文档位置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#文档位置","aria-hidden":"true"},"#"),r(" 文档位置")],-1),f={href:"https://gofrp.org/docs/",target:"_blank",rel:"noopener noreferrer"};function _(b,x){const a=d("ExternalLinkIcon");return l(),o("div",null,[c,e("p",null,[e("a",s,[r("https://github.com/fatedier/frp/blob/dev/README_zh.md"),t(a)])]),u,p,e("p",null,[e("a",f,[r("https://gofrp.org/docs/"),t(a)])])])}const g=n(h,[["render",_],["__file","reverse_proxyies.html.vue"]]);export{g as default};
