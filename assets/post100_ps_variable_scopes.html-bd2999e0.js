import{_ as e,W as s,X as n,Y as l}from"./framework-b5535326.js";const a={},o=l(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>在一次使用过程中，1个变量一直获取不到值，调试了很久，最后搞明白是这个变量在不同作用域重复使用了。于是通过AI理解和学习一遍Powershell变量的作用域，夯实一下基础。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><p>在 PowerShell 中，作用域（Scope）决定了变量的可见性和生命周期。PowerShell 中有几种不同的作用域类型：</p><ol><li><strong>全局作用域（Global Scope）</strong>：在整个会话中都可见。</li><li><strong>脚本作用域（Script Scope）</strong>：仅在定义它们的脚本文件中可见。</li><li><strong>本地作用域（Local Scope）</strong>：仅在定义它们的函数或脚本块中可见。</li><li><strong>私有作用域（Private Scope）</strong>：仅在定义它们的函数或脚本块中可见，并且不能被外部访问。</li></ol><h3 id="global-前缀" tabindex="-1"><a class="header-anchor" href="#global-前缀" aria-hidden="true">#</a> <code>$global:</code> 前缀</h3><p><code>$global:</code> 前缀用于定义和访问全局作用域（Global Scope）的变量。全局作用域的变量在整个 PowerShell 会话中都可见，无论是在脚本文件、函数还是交互式命令行中。</p><p>在脚本任何位置可以通过<code>$global</code>引用全局变量。</p><p><strong>示例：使用 <code>$global:</code> 前缀</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 定义一个全局作用域的变量</span>
<span class="token variable">$global</span>:globalValue = <span class="token string">&quot;Hello, World!&quot;</span>

<span class="token comment"># 输出全局作用域的变量</span>
<span class="token function">Write-Host</span> <span class="token string">&quot;全局变量的值: <span class="token variable">$global</span>:globalValue&quot;</span>

<span class="token comment"># 定义一个函数，访问全局作用域的变量</span>
<span class="token keyword">function</span> <span class="token function">Get-GlobalValue</span> <span class="token punctuation">{</span>
    <span class="token comment"># 访问全局作用域的变量</span>
    <span class="token function">Write-Host</span> <span class="token string">&quot;函数中访问的全局变量的值: <span class="token variable">$global</span>:globalValue&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 调用函数</span>
<span class="token function">Get-GlobalValue</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解释：</strong></p><ul><li><code>$global:globalValue = &quot;Hello, World!&quot;</code>：定义一个全局作用域的变量 <code>$globalValue</code>，并赋值为 <code>&quot;Hello, World!&quot;</code>。</li><li><code>Write-Host &quot;全局变量的值: $global:globalValue&quot;</code>：输出全局作用域的变量的值。</li><li><code>function Get-GlobalValue</code>：定义一个名为 <code>Get-GlobalValue</code> 的函数。</li><li><code>Write-Host &quot;函数中访问的全局变量的值: $global:globalValue&quot;</code>：在函数中访问全局作用域的变量。</li><li><code>Get-GlobalValue</code>：调用函数。</li></ul><h3 id="script-前缀" tabindex="-1"><a class="header-anchor" href="#script-前缀" aria-hidden="true">#</a> <code>$script:</code> 前缀</h3><p><code>$script:</code> 前缀用于定义和访问脚本作用域（Script-Scoped）的变量。脚本作用域的变量仅在定义它们的脚本文件中可见，并且不会在脚本文件之外的范围内可见。</p><p>在脚本任何位置可以通过<code>$script</code>引用脚本域的变量。</p><p><strong>示例：在函数中使用 <code>$script:</code> 前缀</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 定义一个脚本作用域的变量</span>
<span class="token variable">$script</span>:scriptValue = <span class="token string">&quot;Hello, World!&quot;</span>

<span class="token comment"># 输出脚本作用域的变量</span>
<span class="token function">Write-Host</span> <span class="token string">&quot;脚本变量的值: <span class="token variable">$script</span>:scriptValue&quot;</span>

<span class="token comment"># 定义一个函数，访问脚本作用域的变量</span>
<span class="token keyword">function</span> <span class="token function">Get-ScriptValue</span> <span class="token punctuation">{</span>
    <span class="token comment"># 访问脚本作用域的变量</span>
    <span class="token function">Write-Host</span> <span class="token string">&quot;函数中访问的脚本变量的值: <span class="token variable">$script</span>:scriptValue&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 调用函数</span>
<span class="token function">Get-ScriptValue</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解释：</strong></p><ul><li><code>$script:scriptValue = &quot;Hello, World!&quot;</code>：定义一个脚本作用域的变量 <code>$scriptValue</code>，并赋值为 <code>&quot;Hello, World!&quot;</code>。</li><li><code>Write-Host &quot;脚本变量的值: $script:scriptValue&quot;</code>：输出脚本作用域的变量的值。</li><li><code>function Get-ScriptValue</code>：定义一个名为 <code>Get-ScriptValue</code> 的函数。</li><li><code>Write-Host &quot;函数中访问的脚本变量的值: $script:scriptValue&quot;</code>：在函数中访问脚本作用域的变量。</li><li><code>Get-ScriptValue</code>：调用函数。</li></ul><h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h3><ul><li><strong>全局变量的持久性</strong>：全局变量在整个 PowerShell 会话中都存在，直到会话结束或变量被显式删除。</li><li><strong>命名冲突</strong>：由于全局变量在整个会话中都可见，可能会与其他脚本或函数中的变量命名冲突，因此在使用全局变量时需要谨慎。</li><li><strong>脚本变量的作用域</strong>：脚本变量仅在定义它们的脚本文件中可见，不会影响其他脚本文件或交互式命令行。</li></ul><p>通过使用 <code>$global:</code> 和 <code>$script:</code> 前缀，你可以明确指定变量的作用域，并在不同的脚本文件、函数和交互式命令行中共享和访问这些变量。</p>`,22),i=[o];function c(t,d){return s(),n("div",null,i)}const p=e(a,[["render",c],["__file","post100_ps_variable_scopes.html.vue"]]);export{p as default};
