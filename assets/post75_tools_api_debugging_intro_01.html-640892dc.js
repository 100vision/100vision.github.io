import{_ as t,W as i,X as l,Z as e,$ as n,a0 as o,a1 as c,Y as r,G as a}from"./framework-b5535326.js";const h={},u=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),n(" 前言")],-1),_=e("p",null,[n("说到api调试，第一选择就是"),e("code",null,"Postman"),n(" ，但不知道什么开始，开始需要登录网络后才可以使用。功能也强大了，但也更臃肿了。")],-1),v=e("code",null,"Insommia",-1),m=e("p",null,"现在一些api工具，不仅可以做到更小巧，也能做到边调试边生成Api文档，还支持本地部署。",-1),p=e("p",null,[n("本文介绍的一款是"),e("code",null,"Showdoc"),n("。")],-1),w=e("h2",{id:"正文",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#正文","aria-hidden":"true"},"#"),n(" 正文")],-1),b=e("h3",{id:"showdoc",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#showdoc","aria-hidden":"true"},"#"),n(" ShowDoc")],-1),f=e("blockquote",null,[e("p",null,"ShowDoc is a tool greatly applicable for an IT team to share documents online一个非常适合IT团队的在线API文档、技术文档工具")],-1),g={href:"https://github.com/star7th/showdoc",target:"_blank",rel:"noopener noreferrer"},x=r(`<h3 id="showdoc组成" tabindex="-1"><a class="header-anchor" href="#showdoc组成" aria-hidden="true">#</a> ShowDoc组成</h3><ul><li>Showdoc（服务端）</li><li>RunApi (Showdoc客户端）</li></ul><h3 id="showdoc服务器部署" tabindex="-1"><a class="header-anchor" href="#showdoc服务器部署" aria-hidden="true">#</a> showDoc服务器部署</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 原版官方镜像安装命令(中国大陆用户不建议直接使用原版镜像，可以用后面的加速镜像)
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="showdoc客户端runapi" tabindex="-1"><a class="header-anchor" href="#showdoc客户端runapi" aria-hidden="true">#</a> Showdoc客户端runApi</h3>`,5),k={href:"https://www.showdoc.com.cn/runapi/30291",target:"_blank",rel:"noopener noreferrer"},A=e("h2",{id:"其他api调试工具",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#其他api调试工具","aria-hidden":"true"},"#"),n(" 其他Api调试工具")],-1),E=e("ul",null,[e("li",null,[n("类似showdoc的"),e("code",null,"RunnerGO")]),e("li",null,"IDE里面的插件http Restclient")],-1);function S(I,R){const d=a("RouterLink"),s=a("ExternalLinkIcon");return i(),l("div",null,[u,_,e("p",null,[n("之前也介绍过"),v,n(),o(d,{to:"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/DevOps/post59_devops_tools_03_rest_api.html"},{default:c(()=>[n("文章见这里")]),_:1}),n("，但好像不太好用了。")]),m,p,w,b,f,e("p",null,[n("项目地址："),e("a",g,[n("https://github.com/star7th/showdoc"),o(s)])]),x,e("blockquote",null,[e("p",null,[e("a",k,[n("https://www.showdoc.com.cn/runapi/30291"),o(s)])])]),A,E])}const y=t(h,[["render",S],["__file","post75_tools_api_debugging_intro_01.html.vue"]]);export{y as default};
