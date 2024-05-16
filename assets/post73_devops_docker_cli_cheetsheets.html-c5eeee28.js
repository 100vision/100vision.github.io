import{_ as l,W as d,X as c,Z as e,$ as n,a0 as s,a1 as r,Y as i,G as a}from"./framework-b5535326.js";const u={},m=i(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>收集一些Docker常用基础命令。主要记录镜像(Image)管理。<code>镜像像是编程概念中的类，容器则是对象实例</code>，这样可以帮助理解镜像和容器的关系。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="镜像管理" tabindex="-1"><a class="header-anchor" href="#镜像管理" aria-hidden="true">#</a> 镜像管理</h3><ul><li><p>查看本地所有镜像。<code>docker image ls</code></p></li><li><p>使用镜像源的国内镜像。<code>vi /etc/docker/daemon.json </code></p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    {

         &quot;registry-mirrors&quot;: [
              &quot;https://hub-mirror.c.163.com&quot;,&quot;https://xxxxx.mirror.aliyuncs.com&quot;, &quot;https://dockerhub.azk8s.cn&quot;
         ],

         &quot;insecure-registries&quot;: [
              &quot;local.example.com:6000&quot;
         ]

    }
{
    &quot;storage-driver&quot;: &quot;devicemapper&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置镜像源的代理. <code>vi /etc/systemd/system/docker.service.d/http-proxy.conf</code></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Service]
Environment=&quot;HTTPS_PROXY=http://192.168.2.153:1080&quot;
Environment=&quot;HTTP_PROXY=http://192.168.2.153:1080&quot;
                                                       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>拉(下载）远程镜像。<code>docker pull &lt;镜像名&gt;</code></p></li><li><p>推送（上传）本地镜像到远程registry。<code>docker push</code>，一般是：</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#先给本地镜像打上包含远程镜像服务器名的tag</span>
<span class="token punctuation">[</span>root@dockerhost01 ~<span class="token punctuation">]</span><span class="token comment"># docker tag localhost:3000/myImage:latest remote.domain.com/myImage:latest</span>

<span class="token comment"># 开始推送。如果需要远程库需要认证，先登录docker login</span>
<span class="token punctuation">[</span>root@dockerhost01 ~<span class="token punctuation">]</span><span class="token comment"># docker push remote.domain.com/myImage:latest</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>创建（构建）镜像。<code>docker build -t &lt;image_name&gt; .</code>,需要编写Dockerfile。Dockerfile示例：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Make port 8080 available outside the container
EXPOSE 8080

# Define the command to run the application
CMD [ &quot;npm&quot;, &quot;start&quot; ]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),v={class:"hint-container tip"},p=e("p",{class:"hint-container-title"},"编写高效的Dockerfile",-1),h=i(`<h3 id="镜像备份" tabindex="-1"><a class="header-anchor" href="#镜像备份" aria-hidden="true">#</a> 镜像备份</h3><ul><li>可使用<code>docker save -o myImage.tar myImage:lastest</code> 导出（备份）镜像到本地磁盘；</li><li>可以使用<code>docker load -i myImage.tar</code> 导入镜像包到本地镜像库；</li></ul><h3 id="镜像分析" tabindex="-1"><a class="header-anchor" href="#镜像分析" aria-hidden="true">#</a> 镜像分析</h3><ul><li>查看镜像配置 <code>docker inspect &lt;image ID&gt;</code> ,也可以查看容器配置,把image ID 换成container ID；</li><li>查看镜像的创建历史信息 <code>docker history &lt;image ID 或image name&gt;</code>。可以看到镜像各层的sha256。 使用<code>--no-trunc</code>可以看到完整的sha256</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@runoob:~<span class="token comment"># docker history runoob/ubuntu:v3</span>
IMAGE             CREATED           CREATED BY                                      SIZE      COMMENT
4e3b13c8a266      <span class="token number">3</span> months ago      /bin/sh <span class="token parameter variable">-c</span> <span class="token comment">#(nop) CMD [&quot;/bin/bash&quot;]             0 B                 </span>
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>         <span class="token number">3</span> months ago      /bin/sh <span class="token parameter variable">-c</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^#\\s*\\(deb.*universe\\)$/   1.863 kB            
&lt;missing&gt;         3 months ago      /bin/sh -c set -xe   &amp;&amp; echo &#39;</span><span class="token comment">#!/bin/sh&#39; &gt; /u   701 B               </span>
<span class="token operator">&lt;</span>missing<span class="token operator">&gt;</span>         <span class="token number">3</span> months ago      /bin/sh <span class="token parameter variable">-c</span> <span class="token comment">#(nop) ADD file:43cb048516c6b80f22   136.3 MB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),b=e("code",null,"dive",-1),g={href:"https://github.com/wagoodman/dive",target:"_blank",rel:"noopener noreferrer"};function k(_,x){const t=a("RouterLink"),o=a("ExternalLinkIcon");return d(),c("div",null,[m,e("div",v,[p,e("p",null,[n("可以参考另一篇文章"),s(t,{to:"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/DevOps/post81_devops_docker_tip_01.html"},{default:r(()=>[n(" “如何编写高效的Dockerfile”")]),_:1})])]),h,e("ul",null,[e("li",null,[n("也可以使用其他开源工具分析镜像。例如"),b,n("，项目地址 "),e("a",g,[n("wagoodman / dive "),s(o)])])])])}const q=l(u,[["render",k],["__file","post73_devops_docker_cli_cheetsheets.html.vue"]]);export{q as default};
