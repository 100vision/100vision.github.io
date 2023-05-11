import{_ as r,W as s,X as t,Z as e,$ as i,a0 as o,Y as a,G as d}from"./framework-2e6688e7.js";const l="/assets/post26_error_blog_github_workflow_build_err-3a7e9d4b.jpg",c={},u=e("h2",{id:"本博客程序插入图片问题",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#本博客程序插入图片问题","aria-hidden":"true"},"#"),i(" 本博客程序插入图片问题")],-1),v=e("div",{class:"hint-container tip"},[e("p",{class:"hint-container-title"},"先说结论"),e("p",null,"博客不支持插入JPG图片，还没有查出原因, 写篇笔记提醒自己。")],-1),_={href:"https://github.com/vuepress-theme-hope/vuepress-theme-hope",target:"_blank",rel:"noopener noreferrer"},h=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- Initializing and preparing data
✔ Initializing and preparing data - done in 1.32s
- Compiling with vite
[vite:build-import-analysis] Parse error @:4:152
file: /home/runner/work/100vision.github.io/100vision.github.io/src/zh/PostImages/post18_locate_policy_id.JPG:4:151

（省略其他）

✖ Compiling with vite - failed in 5.12s
Error: Parse error @:4:152
    at parse$e (file:///home/runner/work/100vision.github.io/100vision.github.io/node_modules/vite/dist/node/chunks/dep-5e7f419b.js:14710:355)
    at Object.transform (file:///home/runner/work/100vision.github.io/100vision.github.io/node_modules/vite/dist/node/chunks/dep-5e7f419b.js:43370:27)
Error: Process completed with exit code 1.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+l+'" alt="vite_build_error" tabindex="0" loading="lazy"><figcaption>vite_build_error</figcaption></figure><p>这个错误导致编译打包不成功，最后文章自然也无法发布。</p><h3 id="分析-瞎摸" tabindex="-1"><a class="header-anchor" href="#分析-瞎摸" aria-hidden="true">#</a> 分析（瞎摸）</h3><p>不懂前端开发，试着瞎排查。</p><ul><li>根据报错，Google半天也没有找到有用信息。</li><li>以为可能是文件目录不支持中文字符或下划线，该英文等待还不行；</li><li>以为是文件扩展名大写不支持，换了还不行；</li><li>最后试出，是编译组件vite不支持<code>.JPG</code>扩展名文件。也不知道vite是个啥，最后把JPG换成<code>.png</code>,最后居然编译通过，图片也能发布成功。</li></ul>',6);function p(m,b){const n=d("ExternalLinkIcon");return s(),t("div",null,[u,v,e("p",null,[i("博客主题"),e("a",_,[i("Hope-theme-Vuepress"),o(n)]),i(", 支持用Markdown插入图片到笔记，但不知道为什么每次都不成功。在本地markdown插入图片预览都正常，可一提交到Github, 就停在Github Action流水线的`Build Docs' 阶段报错无法继续，错误如下：")]),h])}const f=r(c,[["render",p],["__file","本博客图片插入注意.html.vue"]]);export{f as default};
