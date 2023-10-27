import{_ as r,W as l,X as d,Z as e,$ as n,a0 as a,Y as t,G as s}from"./framework-b5535326.js";const o={},c=t(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>从V站学习到的一个知识，更快打包SpringBoot项目，分层构建Docker。</p><h2 id="传统打包springboot项目" tabindex="-1"><a class="header-anchor" href="#传统打包springboot项目" aria-hidden="true">#</a> 传统打包SpringBoot项目</h2><p>SpringBoot默认使用了<code>org.springframework.boot:spring-boot-maven-plugin</code> 打包项目，把项目打包成jar包，每次打包的时候会把所有内容，比如依赖库、业务代码等打包，然后在项目中使用Dockerfile构建docker，推送到镜像库。</p><h3 id="不足" tabindex="-1"><a class="header-anchor" href="#不足" aria-hidden="true">#</a> 不足</h3><p>有时稍微改动一点业务代码，整个项目资源都要全部重新打包构建，比较耗时。</p><h2 id="新方法" tabindex="-1"><a class="header-anchor" href="#新方法" aria-hidden="true">#</a> 新方法</h2><p>自Springboot <code>2.3.0</code> 起，引入打包分层技术。只需要把项目变化的打包和构建，加快构建速度。</p><h3 id="使用新方法" tabindex="-1"><a class="header-anchor" href="#使用新方法" aria-hidden="true">#</a> 使用新方法</h3><ul><li>修改项目Pom，升级项目到<code>2.3.0</code></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;2.3.0.RELEASE&lt;/version&gt;
        &lt;relativePath/&gt;
    &lt;/parent&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改项目pom文件，开启分层。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
                &lt;configuration&gt;
                    &lt;layers&gt;
                        &lt;enabled&gt;true&lt;/enabled&gt;
                    &lt;/layers&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>编写Docker文件。范例</li></ul><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>FROM openjdk:8-jre as builder

WORKDIR application

ADD ./target/*.jar ./app.jar

RUN java -Djarmode=layertools -jar app.jar extract

FROM openjdk:8-jre


WORKDIR application

COPY --from=builder application/dependencies/ ./

COPY --from=builder application/spring-boot-loader/ ./

COPY --from=builder application/snapshot-dependencies/ ./

COPY --from=builder application/application/ ./

EXPOSE 8080

ENTRYPOINT [&quot;java&quot;, &quot;org.springframework.boot.loader.JarLauncher&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改业务代码，然后构建Docker</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker build . --cache-from my-registry.docker.com:5000/my-image:2.0.0

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h3><blockquote><p>把docker进行更细的分层，项目依赖和业务代码分开分层。实现则需要通过编写dockerfile文件也改成相应的格式后，确实能达到我们预期的效果。我们每次重新上传的只是我们自己写的代码，第三方依赖、SpringBoot内部配置、快照依赖 ，这些SpringBoot都为我们打包到不同的文件夹下，再依靠docker的分层特征，分次加入文件即可达到分层打包的效果。</p></blockquote><blockquote><p>这样，修改了业务代码，只有对业务层重新封装打包，项目依赖等其他层不会变化。最终改善了打包速度。</p></blockquote><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,21),u={href:"https://www.v2ex.com/t/956719",target:"_blank",rel:"noopener noreferrer"},v={href:"https://blog.csdn.net/ttzommed/article/details/106759670",target:"_blank",rel:"noopener noreferrer"};function b(p,m){const i=s("ExternalLinkIcon");return l(),d("div",null,[c,e("p",null,[e("a",u,[n("V2EX : docker image 分层的问题"),a(i)])]),e("p",null,[e("a",v,[n("CSDN:SpringBoot2.3.0 + Docker实现分层打包"),a(i)])])])}const h=r(o,[["render",b],["__file","post47_docker_layered_with_springboot.html.vue"]]);export{h as default};
