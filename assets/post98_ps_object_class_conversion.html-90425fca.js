import{_ as s,W as n,X as a,Y as e}from"./framework-b5535326.js";const l={},i=e(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>数据类型之间的判断和转换</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="is-关键字" tabindex="-1"><a class="header-anchor" href="#is-关键字" aria-hidden="true">#</a> is 关键字</h3><blockquote><p>可以使用<code>-is</code>关键字来比较和判断数据类型。</p></blockquote><ul><li>例1。简单判断是否是整数型</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>1 <span class="token operator">-is</span> <span class="token namespace">[int]</span>
True
<span class="token string">&quot;1&quot;</span> <span class="token operator">-is</span> <span class="token namespace">[int]</span>
False
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>例2，使用在<code>if</code>条件</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token variable">$var</span> = <span class="token string">&quot;abc&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$var</span> <span class="token operator">-is</span> <span class="token namespace">[int]</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token boolean">$true</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
   <span class="token boolean">$false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="as-关键字" tabindex="-1"><a class="header-anchor" href="#as-关键字" aria-hidden="true">#</a> as 关键字</h3><blockquote><p>可以使用<code>-as</code>关键字来比较和判断数据类型。</p></blockquote><ul><li>例1, 简单转换。</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token variable">$var1</span> = <span class="token string">&quot;5&quot;</span>

<span class="token comment"># 字符串转换为整数</span>
<span class="token variable">$var2</span> = <span class="token variable">$var1</span> <span class="token operator">-as</span> <span class="token namespace">[int]</span>

<span class="token comment">#打印转换前的数据类型</span>
<span class="token variable">$var1</span><span class="token punctuation">.</span>GetType<span class="token punctuation">(</span><span class="token punctuation">)</span>

 <span class="token variable">$var2</span><span class="token punctuation">.</span>GetType<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>例2，转换用户输入</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token variable">$input</span> = <span class="token function">read-host</span> <span class="token string">&quot;please enter a number&quot;</span>

<span class="token variable">$number</span> = <span class="token variable">$input</span> <span class="token operator">-as</span> <span class="token namespace">[int]</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$number</span> <span class="token operator">-is</span> <span class="token namespace">[int]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">write-host</span> <span class="token string">&quot;vaild input&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">#do something</span>
<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
      <span class="token function">write-host</span> <span class="token string">&quot;invaild input. You must enter a numberic value&quot;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),t=[i];function p(o,c){return n(),a("div",null,t)}const d=s(l,[["render",p],["__file","post98_ps_object_class_conversion.html.vue"]]);export{d as default};
