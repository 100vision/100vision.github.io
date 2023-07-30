import{_ as e,W as d,X as i,Y as a}from"./framework-b5535326.js";const n={},s=a(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>介绍使用Nginx功能强大的反向代理功能中的Proxy模块阶段的<code>proxy_redirect</code>，实现改写上游upstream的http header的location字段，返回给用户浏览器（或前端）。</p><h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2><p>改写上游upstream的http header的location字段。这样确保用户浏览器（或前端）每次会发起改写后的request url，正确的URL。 这样在API网关Nginx上解决前、后端url不一致导致的<code>http 404</code>的问题。</p><h2 id="使用举例" tabindex="-1"><a class="header-anchor" href="#使用举例" aria-hidden="true">#</a> 使用举例</h2><blockquote><p>例如：上游后端有个用户身份验证接口服务url <code>/auth</code>, 反向代理url或前端请求url是<code>/user/auth</code>。</p></blockquote><ul><li>首先，反向代理配置使用了<code>proxy_pass</code>指定反向代理到一个上游后端服务.</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location ^~ /user {
  proxy_pass proxy_pass http://svc_auth
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后，使用<code>rewrite</code> 指令改写浏览器请求url <code>/user/auth</code> 为 <code>/auth</code>。这样实现了<code>在转发给后端前改写</code>， 因为上游后端无法识别<code>/user/auth</code>（因为没有），否则会404。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location ^~ /user {
  rewrite ^/user(/.*)$ $1 break; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>最后，把上游后端的返回url(location) 从<code>/auth</code>改写到<code>/user/auth</code>。<code>在转发给用户浏览器前</code>改写, 这样确保后续每次前端(或浏览器)发起的都是<code>/user/auth</code>，而不是后端默认返回的<code>/auth</code>。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location ^~ /user {
   proxy_redirect ~^(https?:\\/\\/[^\\\\\\/:]+)(:(\\d+))?(.*) $1$2/user$4; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="完整配置" tabindex="-1"><a class="header-anchor" href="#完整配置" aria-hidden="true">#</a> 完整配置</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream svc_auth {
   server 192.168.0.101:443
}

location  ^~ /user {

        rewrite ^/user(/.*)$ $1 break;   
        proxy_pass https://svc_auth;
        proxy_redirect ~^(https?:\\/\\/[^\\\\\\/:]+)(:(\\d+))?(.*) $1$2/user$4;  

    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),r=[s];function c(t,l){return d(),i("div",null,r)}const o=e(n,[["render",c],["__file","post49_nginx_config_01.html.vue"]]);export{o as default};
