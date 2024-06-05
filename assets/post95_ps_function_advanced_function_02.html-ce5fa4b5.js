import{_ as n,W as s,X as a,Y as e}from"./framework-b5535326.js";const t={},p=e(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>几个常用Powershell Function参数使用技巧</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><blockquote><p>来自DeepSeek Chat</p></blockquote><p>在 PowerShell 中，你可以通过多种方式来判断是否带上了指定的参数。以下是一些常见的方法：</p><h3 id="判断和检查参数是带值" tabindex="-1"><a class="header-anchor" href="#判断和检查参数是带值" aria-hidden="true">#</a> 判断和检查参数是带值</h3><p>如果你在脚本或函数中使用 <code>Param</code> 关键字定义了参数，你可以通过检查参数的值来判断是否带上了该参数。例如：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token keyword">function</span> <span class="token function">Test-Parameter</span> <span class="token punctuation">{</span>
    <span class="token keyword">Param</span> <span class="token punctuation">(</span>
        <span class="token namespace">[Parameter(Mandatory=$true)]</span>
        <span class="token namespace">[string]</span><span class="token variable">$Name</span>
    <span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$Name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">Write-Output</span> <span class="token string">&quot;Parameter &#39;Name&#39; is provided with value: <span class="token variable">$Name</span>&quot;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">Write-Output</span> <span class="token string">&quot;Parameter &#39;Name&#39; is not provided.&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 调用函数</span>
<span class="token function">Test-Parameter</span> <span class="token operator">-</span>Name <span class="token string">&quot;John&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>$Name</code> 参数是强制性的，函数会检查 <code>$Name</code> 变量是否存在值来判断参数是否被提供。</p><h3 id="判断和检查参数是否被使用" tabindex="-1"><a class="header-anchor" href="#判断和检查参数是否被使用" aria-hidden="true">#</a> 判断和检查参数是否被使用</h3><blockquote><p>这样定义的Function更具有灵活性，根据参数是否存在来运行，比较常用。</p></blockquote><p>如果你使用了 <code>CmdletBinding</code> 和 <code>Parameter</code> 属性来定义参数，你可以使用 <code>$PSBoundParameters</code> 自动变量来检查是否提供了特定的参数。例如：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token keyword">function</span> <span class="token function">Test-Parameter</span> <span class="token punctuation">{</span>
    <span class="token namespace">[CmdletBinding()]</span>
    <span class="token keyword">Param</span> <span class="token punctuation">(</span>
        <span class="token namespace">[Parameter(Mandatory=$false)]</span>
        <span class="token namespace">[string]</span><span class="token variable">$Name</span>
    <span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$PSBoundParameters</span><span class="token punctuation">.</span>ContainsKey<span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">Write-Output</span> <span class="token string">&quot;Parameter &#39;Name&#39; is provided with value: <span class="token variable">$Name</span>&quot;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">Write-Output</span> <span class="token string">&quot;Parameter &#39;Name&#39; is not provided.&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 调用函数</span>
<span class="token function">Test-Parameter</span> <span class="token operator">-</span>Name <span class="token string">&quot;John&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">重点</p><p>在这个例子中，<code>$PSBoundParameters</code> 是一个哈希表，包含了所有被提供的参数及其值。你可以使用 <code>ContainsKey</code> 方法来检查特定的参数是否存在。</p></div><h3 id="使用-argumentcompleter-属性" tabindex="-1"><a class="header-anchor" href="#使用-argumentcompleter-属性" aria-hidden="true">#</a> 使用 <code>ArgumentCompleter</code> 属性</h3><p>如果你希望为参数提供自动完成功能，你可以使用 <code>ArgumentCompleter</code> 属性。这不会直接帮助你判断参数是否被提供，但它可以帮助用户更容易地输入参数。例如：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token keyword">function</span> <span class="token function">Test-Parameter</span> <span class="token punctuation">{</span>
    <span class="token namespace">[CmdletBinding()]</span>
    <span class="token keyword">Param</span> <span class="token punctuation">(</span>
        <span class="token namespace">[Parameter(Mandatory=$true)]</span>
        <span class="token namespace">[string]</span><span class="token variable">$Name</span>
    <span class="token punctuation">)</span>

    <span class="token comment"># 参数自动完成逻辑</span>
    <span class="token punctuation">[</span>ArgumentCompleter<span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token keyword">param</span><span class="token punctuation">(</span><span class="token variable">$commandName</span><span class="token punctuation">,</span> <span class="token variable">$parameterName</span><span class="token punctuation">,</span> <span class="token variable">$wordToComplete</span><span class="token punctuation">,</span> <span class="token variable">$commandAst</span><span class="token punctuation">,</span> <span class="token variable">$fakeBoundParameters</span><span class="token punctuation">)</span>
        <span class="token comment"># 返回可能的完成值</span>
        <span class="token variable">$possibleValues</span> = <span class="token string">&#39;John&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Jane&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Doe&#39;</span>
        <span class="token variable">$possibleValues</span> <span class="token punctuation">|</span> <span class="token function">Where-Object</span> <span class="token punctuation">{</span> <span class="token variable">$_</span> <span class="token operator">-like</span> <span class="token string">&quot;<span class="token variable">$wordToComplete</span>*&quot;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token punctuation">[</span>ValidateSet<span class="token punctuation">(</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Jane&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Doe&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token namespace">[string]</span><span class="token variable">$Name</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$Name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">Write-Output</span> <span class="token string">&quot;Parameter &#39;Name&#39; is provided with value: <span class="token variable">$Name</span>&quot;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">Write-Output</span> <span class="token string">&quot;Parameter &#39;Name&#39; is not provided.&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 调用函数</span>
<span class="token function">Test-Parameter</span> <span class="token operator">-</span>Name <span class="token string">&quot;John&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>ArgumentCompleter</code> 属性定义了参数的自动完成逻辑。</p>`,18),i=[p];function o(c,l){return s(),a("div",null,i)}const r=n(t,[["render",o],["__file","post95_ps_function_advanced_function_02.html.vue"]]);export{r as default};
