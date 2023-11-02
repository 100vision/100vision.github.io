import{_ as n,W as d,X as s,Z as o,$ as e,a0 as a,a1 as c,Y as u,G as l}from"./framework-b5535326.js";const i={},_=o("h2",{id:"前言",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),e(" 前言")],-1),h={href:"https://nova.moe/cloudflared-distributed/",target:"_blank",rel:"noopener noreferrer"},f=u('<p>站点就近回源是很多CDN厂商的商用主打产品技术，加速网站静态资源，让访问用户就近下载，Cloudflare这边却是可以免费使用！</p><blockquote><p>P.S. Cloudflare真是大善人，它的其他产品Cloudflare Worker，还有Cloudflare R2对象存储都是很慷慨让用户撸。</p></blockquote><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><p>通过Cloudflare Tunnel就近回源实现很简单，就是各地多台主机只要使用同一个Cloudflare Tunnel和Token即可。详细步骤可以参考以上博客链接文章。</p><h3 id="就近回源实现场景" tabindex="-1"><a class="header-anchor" href="#就近回源实现场景" aria-hidden="true">#</a> 就近回源实现场景</h3><ul><li>场景1：不用地区的用户访问同一个域名，但访客访问不同内容。</li></ul><p>例如www.example.com可以看到不同的内容；因为各主机后面是不同的服务实例，例如中国用户就近访问的中国服务实例，则看到是中文内容；美国用户就近访问的是美国服务实例，可以是英文内容；</p><ul><li>场景2：不用地区的用户访问同一个域名，访客访问相同内容，但内容下载源不同，加快访问速度提高用户体验。</li></ul><p>例如中国用户就近访问的中国服务实例，则从中国服务器下载；例如美国用户就近访问的美国服务实例，则从美国服务器下载；</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>',10),p={href:"https://nova.moe/cloudflared-distributed/",target:"_blank",rel:"noopener noreferrer"};function m(k,C){const t=l("RouterLink"),r=l("ExternalLinkIcon");return d(),s("div",null,[_,o("p",null,[e("就上次使用介绍使用 "),a(t,{to:"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BD%91%E7%BB%9C/post64_net_cloudflare_rdp_01.html"},{default:c(()=>[e("标题：Cloudflare Tunnel 实现穿透Microsoft Remote Desktop")]),_:1}),e("，又从"),o("a",h,[e("Nova Kwok's Awesome Blog：分布式部署 Cloudflared 让访客就近回源，进一步提升访问速度"),a(r)]),e(" 了解到Cloudflare Tunnel可以做站点就近回源。")]),f,o("p",null,[o("a",p,[e("Nova Kwok's Awesome Blog：分布式部署 Cloudflared 让访客就近回源，进一步提升访问速度"),a(r)])])])}const b=n(i,[["render",m],["__file","post69_devops_cloudflare_tunnel_usecase01.html.vue"]]);export{b as default};
