import{_ as i,W as r,X as l,Z as e,$ as n,a0 as t,Y as o,G as c}from"./framework-2e6688e7.js";const s={},d=o('<div class="hint-container note"><p class="hint-container-title">注</p><p>了解到<code>Alpine</code>基础镜像的一些弊端，方便以后避坑。</p></div><h2 id="alpine介绍" tabindex="-1"><a class="header-anchor" href="#alpine介绍" aria-hidden="true">#</a> Alpine介绍</h2><blockquote><p>Alpine 操作系统是一个面向安全的轻型 Linux 发行版。它不同于通常 Linux 发行版，Alpine 采用了 musl libc 和 busybox 以减小系统的体积和运行时资源消耗，但功能上比 busybox 又完善的多，因此得到开源社区越来越多的青睐。在保持瘦身的同时，Alpine 还提供了自己的包管理工具 apk</p></blockquote><h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3><ul><li>体积小。只有几MB。</li><li>使用了musl C类动态库。没有使用 glibc 这样比较重的动态库，而是使用 busybox + musl libc，也使得它所以体积小。</li></ul><h3 id="存在的坑" tabindex="-1"><a class="header-anchor" href="#存在的坑" aria-hidden="true">#</a> 存在的坑</h3><ul><li>DNS 转发失败</li><li>底层依赖缺失很多</li><li>构建 Python docker 容器速度慢</li></ul><div class="hint-container warning"><p class="hint-container-title">注意</p><p>生产环境，应该尽力避免使用Alpine作为基础镜像</p></div><h3 id="推荐基础镜像" tabindex="-1"><a class="header-anchor" href="#推荐基础镜像" aria-hidden="true">#</a> 推荐基础镜像</h3><p><code>Debian或Ubuntu</code> , 这些镜像也不是很大，才几十MB</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>',11),h={href:"https://juejin.cn/post/7120557446682116132",target:"_blank",rel:"noopener noreferrer"},p={href:"https://cloud.tencent.com/developer/article/2168079",target:"_blank",rel:"noopener noreferrer"};function u(_,b){const a=c("ExternalLinkIcon");return r(),l("div",null,[d,e("p",null,[e("a",h,[n("https://juejin.cn/post/7120557446682116132"),t(a)])]),e("p",null,[e("a",p,[n("https://cloud.tencent.com/developer/article/2168079"),t(a)])])])}const x=i(s,[["render",u],["__file","docker_base_image_with_cares.html.vue"]]);export{x as default};
