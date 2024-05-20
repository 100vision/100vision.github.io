import{_ as n,W as s,X as a,Y as e}from"./framework-b5535326.js";const t={},o=e(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>几个常用Powershell参数修饰词</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token keyword">function</span> <span class="token function">Write-Log</span>
<span class="token punctuation">{</span>
    <span class="token namespace">[CmdletBinding()]</span>
    <span class="token keyword">Param</span>
    <span class="token punctuation">(</span>
        <span class="token namespace">[Parameter(Mandatory=$true,
                   ValueFromPipelineByPropertyName=$true)]</span>
        <span class="token namespace">[ValidateNotNullOrEmpty()]</span>
        <span class="token punctuation">[</span>Alias<span class="token punctuation">(</span><span class="token string">&quot;LogContent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token namespace">[string]</span><span class="token variable">$Message</span><span class="token punctuation">,</span>

        <span class="token namespace">[Parameter(Mandatory=$false)]</span>
        <span class="token punctuation">[</span>Alias<span class="token punctuation">(</span><span class="token string">&#39;LogPath&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token namespace">[string]</span><span class="token variable">$Path</span>=<span class="token string">&#39;C:\\Logs\\PowerShellLog.log&#39;</span><span class="token punctuation">,</span>
        
        <span class="token namespace">[Parameter(Mandatory=$false)]</span>
        <span class="token punctuation">[</span>ValidateSet<span class="token punctuation">(</span><span class="token string">&quot;Error&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;Warn&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;Info&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token namespace">[string]</span><span class="token variable">$Level</span>=<span class="token string">&quot;Info&quot;</span><span class="token punctuation">,</span>
        
        <span class="token namespace">[Parameter(Mandatory=$false)]</span>
        <span class="token namespace">[switch]</span><span class="token variable">$NoClobber</span>
    <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>Mandatory=$true | false</code> 修饰参数，是否强制要求函数带上这个参数</li><li><code>ValueFromPipelineByPropertyName=$true | false</code> ，是否从管道接收属性值，比较常用如果从上一个cmdlet的输出当输入</li><li><code>[ValidateNotNullOrEmpty()]</code>，验证参数值是否null</li><li><code>[Alias(&quot;LogContent&quot;)]</code>， 参数别名</li><li><code>[ValidateSet(&quot;Error&quot;,&quot;Warn&quot;,&quot;Info&quot;)]</code> 限定参数可选值</li><li><code>[switch]$NoClobber</code>， 定义一个开关布尔值数，使用 <code>-NoClobber</code>。带上默认值则<code>true</code>,不带则<code>false</code></li></ul>`,5),l=[o];function i(c,p){return s(),a("div",null,l)}const u=n(t,[["render",i],["__file","post93_ps_function_commonly_used_parameter_options.html.vue"]]);export{u as default};
