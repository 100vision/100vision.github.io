import{_ as e,W as n,X as a,Y as s}from"./framework-2e6688e7.js";const c={},t=s(`<h2 id="rsync的字符编码问题" tabindex="-1"><a class="header-anchor" href="#rsync的字符编码问题" aria-hidden="true">#</a> Rsync的字符编码问题</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@myserver ~<span class="token punctuation">]</span><span class="token comment"># rsync -avz --iconv=gbk,utf8 /weaver/ /mnt/lenovo-nas/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要指定字符集<code>--iconv=gbk,utf8</code>,否则同步一些中文文件名会报<code>invalid argument</code></p>`,3),o=[t];function r(i,d){return n(),a("div",null,o)}const u=e(c,[["render",r],["__file","linux_rsync.html.vue"]]);export{u as default};
