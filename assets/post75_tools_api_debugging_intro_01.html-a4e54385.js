import{_ as s,W as i,X as r,Z as e,$ as a,a0 as n,Y as d,G as t}from"./framework-b5535326.js";const c={},l=d('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>说到api调试，第一选择就是<code>Postman</code> ，但不知道什么开始，开始需要登录网络后才可以使用。功能也强大了，但也更臃肿了。</p><p>现在一些api工具，不仅可以做到更小巧，也能做到边调试边生成Api文档，还支持本地部署。</p><p>本文介绍的一款是<code>Showdoc</code>。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="showdoc" tabindex="-1"><a class="header-anchor" href="#showdoc" aria-hidden="true">#</a> ShowDoc</h3><blockquote><p>ShowDoc is a tool greatly applicable for an IT team to share documents online一个非常适合IT团队的在线API文档、技术文档工具</p></blockquote>',7),h={href:"https://github.com/star7th/showdoc",target:"_blank",rel:"noopener noreferrer"},u=d(`<h3 id="showdoc组成" tabindex="-1"><a class="header-anchor" href="#showdoc组成" aria-hidden="true">#</a> ShowDoc组成</h3><ul><li>Showdoc（服务端）</li><li>RunApi (Showdoc客户端）</li></ul><h3 id="showdoc服务器部署" tabindex="-1"><a class="header-anchor" href="#showdoc服务器部署" aria-hidden="true">#</a> showDoc服务器部署</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 原版官方镜像安装命令(中国大陆用户不建议直接使用原版镜像，可以用后面的加速镜像)
# 如果你打算安装ARM版本的docker镜像，请将 latest 标签改为 arm-latest
docker pull star7th/showdoc:latest 

# 中国大陆镜像安装命令（安装后记得执行docker tag命令以进行重命名）
docker pull registry.cn-shenzhen.aliyuncs.com/star7th/showdoc
docker tag registry.cn-shenzhen.aliyuncs.com/star7th/showdoc:latest star7th/showdoc:latest 

##后续命令无论使用官方镜像还是加速镜像都需要执行

#新建存放showdoc数据的目录
mkdir -p /showdoc_data/html
chmod  -R 777 /showdoc_data
# 如果你是想把数据挂载到其他目录，比如说/data1，那么，可以在/data1目录下新建一个showdoc_data/目录，
# 然后在根目录的新建一个软链接/showdoc_data到/data1/showdoc_data
# 这样既能保持跟官方教程推荐的路径一致，又能达到自定义存储的目的.

#启动showdoc容器
docker run -d --name showdoc --user=root --privileged=true -p 4999:80 \\
-v /showdoc_data/html:/var/www/html/ star7th/showdoc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="showdoc客户端runapi" tabindex="-1"><a class="header-anchor" href="#showdoc客户端runapi" aria-hidden="true">#</a> Showdoc客户端runApi</h3>`,5),v={href:"https://www.showdoc.com.cn/runapi/30291",target:"_blank",rel:"noopener noreferrer"};function m(p,w){const o=t("ExternalLinkIcon");return i(),r("div",null,[l,e("p",null,[a("项目地址："),e("a",h,[a("https://github.com/star7th/showdoc"),n(o)])]),u,e("blockquote",null,[e("p",null,[e("a",v,[a("https://www.showdoc.com.cn/runapi/30291"),n(o)])])])])}const b=s(c,[["render",m],["__file","post75_tools_api_debugging_intro_01.html.vue"]]);export{b as default};
