import{_ as e,W as i,X as d,Y as n}from"./framework-b5535326.js";const c={},l=n(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>收集一些Docker常用基础命令。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="镜像管理" tabindex="-1"><a class="header-anchor" href="#镜像管理" aria-hidden="true">#</a> 镜像管理</h3><ul><li><p>查看镜像。<code>docker image ls</code></p></li><li><p>拉镜像。<code>docker pull</code></p></li><li><p>推送（上传）镜像。<code>docker push</code></p></li><li><p>使用镜像源的国内镜像。<code>vi /etc/docker/daemon.json </code></p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    {

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
~                                                                                                                                                                                             ~                                                         
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>创建（构建）镜像。<code>docker build -t &lt;image_name&gt; .</code>,需要编写Dockerfile。Dockerfile示例：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Use an official Node.js runtime as the base image
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-daemon管理" tabindex="-1"><a class="header-anchor" href="#docker-daemon管理" aria-hidden="true">#</a> Docker Daemon管理</h3><ul><li>查看dockerd配置信息。<code>docker info</code></li></ul><h3 id="容器管理类型" tabindex="-1"><a class="header-anchor" href="#容器管理类型" aria-hidden="true">#</a> 容器管理类型</h3><ul><li>创建一个docker容器但不启动，<code>docker create ...</code></li><li>创建一个docker而且启动docker。 <code>docker run ...</code>， 等于<code>docker create + docker start...</code></li><li>停止docker。<code>docker stop ...</code></li><li>启动一个docker。<code>docker start ...</code></li><li>检查一个运行中的docker配置元数据。<code>docker inspect &lt;docker name&gt;</code></li><li>查看docker的输出日志. <code>docker logs -f &lt;docker name&gt;</code></li><li>在docker内部里运行命令。<code>docker exec -it &lt;docker name&gt; &lt;shell命令&gt;</code></li></ul><h3 id="清理类" tabindex="-1"><a class="header-anchor" href="#清理类" aria-hidden="true">#</a> 清理类</h3><ul><li>查看docker对象使用的磁盘空间。<code>docker system df</code></li><li>删除docker。 <code>docker rm ...</code>。技巧:删除所有停止状态的docker:</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker rm $(docker ps -a -q)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>删除镜像。清理无用（没有引用的镜像）<code>docker image prune -a</code></p></li><li><p>删除docker build缓存。<code>docker buildx prune -f</code></p></li><li><p>删除所有未使用/未运行的docker对象（危险！！），docker,image等,但不包括volume。<code>docker system prune -f</code>，删除未使用的卷还需要 <code>docker system prune --volumes -a -f</code></p></li></ul>`,18),r=[l];function o(a,s){return i(),d("div",null,r)}const u=e(c,[["render",o],["__file","post73_devops_docker_cli_cheetsheets.html.vue"]]);export{u as default};
