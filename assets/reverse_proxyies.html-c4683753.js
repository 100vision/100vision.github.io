import{_ as l,W as n,X as o,Z as e,$ as t,a0 as a,Y as i,G as s}from"./framework-2e6688e7.js";const d={},c=i('<h2 id="什么是内网穿透" tabindex="-1"><a class="header-anchor" href="#什么是内网穿透" aria-hidden="true">#</a> 什么是内网穿透</h2><blockquote><p>内网穿透，指的是将内网端口暴露到公网。由于防火墙的限制，或者普遍的 NAT 宽带接入方式，大多用户没有属于自己的公网 IP，因此其它用户无法访问其设备上对外开放的服务（例如 Web 服务器，或者比较常见的案例是 Minecraft 服务器）。过去有许多常见的内网穿透解决方案（例如花生壳、Ngrok、frp 及一系列衍生自 frp 的服务等），而 Cloudflare Tunnel 的免费开放，又为我们提供了一种看起来不错的新选择。内网穿透，指的是将内网端口暴露到公网。</p></blockquote><h2 id="方法和工具" tabindex="-1"><a class="header-anchor" href="#方法和工具" aria-hidden="true">#</a> 方法和工具</h2><p>主要有这么几种。</p><ul><li>CloudFlare Tunnel</li><li>FRP</li><li>Zerotier</li></ul><h2 id="cloudflare-tunnel" tabindex="-1"><a class="header-anchor" href="#cloudflare-tunnel" aria-hidden="true">#</a> Cloudflare Tunnel</h2><div class="hint-container tip"><p class="hint-container-title">先决条件</p><p>需要把DNS域名托管在CloudFalre</p></div><p><strong>大致步骤</strong></p><ul><li>申请免费的CloudFlare账户</li><li>内网服务器要安装cloudflared软件</li><li>创建CloudFlare Tunnel</li></ul><h2 id="frp" tabindex="-1"><a class="header-anchor" href="#frp" aria-hidden="true">#</a> frp</h2><blockquote><p>frp 是一个开源项目，专注于内网穿透的高性能的反向代理应用，支持 TCP、UDP、HTTP、HTTPS 等多种协议。可以将内网服务以安全、便捷的方式通过具有公网 IP 节点的中转暴露到公网。</p></blockquote><div class="hint-container tip"><p class="hint-container-title">前提条件</p><p>需要一台ECS云主机，有公网IP</p></div><p><strong>Github项目</strong></p>',13),p={href:"https://github.com/fatedier/frp/blob/dev/README_zh.md",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,[e("strong",null,"文档位置")],-1),u={href:"https://gofrp.org/docs/",target:"_blank",rel:"noopener noreferrer"};function f(_,b){const r=s("ExternalLinkIcon");return n(),o("div",null,[c,e("p",null,[e("a",p,[t("https://github.com/fatedier/frp/blob/dev/README_zh.md"),a(r)])]),h,e("p",null,[e("a",u,[t("https://gofrp.org/docs/"),a(r)])])])}const m=l(d,[["render",f],["__file","reverse_proxyies.html.vue"]]);export{m as default};