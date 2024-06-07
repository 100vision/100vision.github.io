import{_ as s,W as a,X as i,Z as n,$ as l,a0 as o,Y as t,G as c}from"./framework-b5535326.js";const d={},r=t(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>Powrshell自带的很多Function都支持远程执行，例如<code>Restart-Computer</code> 支持参数<code>Computer</code>指定远程计算机或是本地系统实现远程重启计算机。</p><p>我们自定义的Function要实现在远程计算机上执行，则可以借用<code>Invoke-Command</code>来实现。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><ul><li>1、使用<code>Invoke-Command</code>来执行本地Function。 举例：</li></ul><div class="language-Powershell line-numbers-mode" data-ext="Powershell"><pre class="language-Powershell"><code>#自定义函数
Function MyFunction {

    [CmdletBinding()]
    Param (
        [Parameter(Position = 1)] #显式指定参数位置，第2个参数。如果不显式指定，默认按定义顺序排序
        [String] $Message,
        [Parameter(Position = 0)] #显式指定参数位置，第1个参数
        [Int]$Count
    )


    &quot;Say $Message for $Count times.&quot; | Out-File C:\\AdminPack\\PSRemoteExec.log

}

#在远程计算机上执行本地Function &quot;MyFunction&quot;, 使用ArugementList指定参数值列表
Invoke-Command -ComputerName &quot;Remote_Computer_Name&quot; -ScriptBlock \${Function:MyFunction} -ArgumentList 5,&quot;Hello&quot;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h2><ul><li>也可以使用<code>Invoke-Command</code>来实现Function的内部远程执行能力。 举例：</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>
<span class="token comment">#自定义函数</span>
<span class="token keyword">Function</span> MyFunction <span class="token punctuation">{</span>

    <span class="token namespace">[CmdletBinding()]</span>
    <span class="token keyword">Param</span> <span class="token punctuation">(</span>

        <span class="token namespace">[Parameter(Position = 1)]</span> <span class="token comment">#显式指定参数位置，第2个参数。如果不显式指定，默认按定义顺序排序</span>
        <span class="token namespace">[String]</span> <span class="token variable">$Message</span><span class="token punctuation">,</span>

        <span class="token namespace">[Parameter(Position = 0)]</span> <span class="token comment">#显式指定参数位置，第1个参数</span>
        <span class="token namespace">[Int]</span><span class="token variable">$Count</span><span class="token punctuation">,</span>

        <span class="token namespace">[Parameter(Position = 2)]</span> <span class="token comment">#显式指定参数位置，第3个参数</span>
        <span class="token namespace">[String]</span><span class="token variable">$ComputerName</span>=<span class="token variable">$env</span>:COMPUTERNAME

    <span class="token punctuation">)</span>


    <span class="token comment">#在远程计算机上执行Get-Process</span>
    <span class="token function">Invoke-Command</span> <span class="token operator">-</span>ComputerName <span class="token variable">$ComputerName</span> <span class="token operator">-</span>ScriptBlock <span class="token punctuation">{</span> <span class="token function">Get-Process</span> <span class="token operator">-</span>Name explorer<span class="token punctuation">}</span> 

<span class="token punctuation">}</span>

<span class="token comment">#使用</span>

MyFunction <span class="token operator">-</span>ComputerName <span class="token string">&quot;Remote_Computer_Name&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,10),u={href:"https://duffney.io/run-local-functions-remotely-in-powershell/",target:"_blank",rel:"noopener noreferrer"};function p(m,v){const e=c("ExternalLinkIcon");return a(),i("div",null,[r,n("p",null,[n("a",u,[l("Run Local Functions Remotely in PowerShell"),o(e)])])])}const k=s(d,[["render",p],["__file","post95_ps_function_advanced_function_03.html.vue"]]);export{k as default};
