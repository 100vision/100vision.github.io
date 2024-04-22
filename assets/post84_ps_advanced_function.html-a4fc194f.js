import{_ as l,W as i,X as c,Z as n,$ as e,a0 as a,Y as o,G as t}from"./framework-b5535326.js";const p={},r=o(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>最近使用Powershell踩了一个坑，后来回想起来，这个坑上回不也踩过吗？也是来回摸索很长时间。记性不如烂笔头，记录一下。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><blockquote><p>我的一个函数使用一个参数从管道接收一个对象集合或是数组（又多个对象），结果每次只处理一个输入对象，真奇怪啊.调试了半天，百思不得其解。</p></blockquote><p>关键字<code>管道接收</code>、<code>对象集合</code>。</p><p>示例代码：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token keyword">Function</span> <span class="token function">Get-MyUserNameById</span> <span class="token punctuation">{</span>

<span class="token keyword">param</span><span class="token punctuation">(</span>
        <span class="token namespace">[Parameter(ValueFromPipeline=$true)]</span>      
        <span class="token namespace">[string[]]</span><span class="token variable">$EmployeeId</span>
        <span class="token punctuation">)</span>


<span class="token variable">$EmployeeId</span> <span class="token punctuation">|</span> <span class="token function">ForEach-Object</span> <span class="token punctuation">{</span> <span class="token function">Write-Host</span> <span class="token string">&quot;User name is : <span class="token variable">$_</span>&quot;</span><span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token string">&quot;E01&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;E02&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;A08&quot;</span> <span class="token punctuation">|</span> <span class="token function">Get-MyUserNameById</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上是一个很简单的函数。定义了一个输入参数<code>EmployeeId</code>，该参数使用<code>[Parameter(ValueFromPipeline=$true)] </code> 属性允许从管道接收输入值（字符串集合）， 然后使用<code>ForEach-Ojbect</code> 遍历打印输出3个字符串。 可是它没按预期打印出3个字符串，而是只打印出一个：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>User name <span class="token keyword">for</span> Id A08 is : User-A08
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为什么呢？ <code>直接上答案</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;如果函数参数设置为接受管道输入且未定义process块，则记录逐条处理将失败。&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>意思是说，</p><ul><li><p>凡来自管道的对象集合，一定要在<code>process</code>代码块里来实现遍历，否则只会处理一条。这就解释了以上奇怪现象，即使使用了ForEach也只打印一条；</p></li><li><p>了解到，<code>process</code>代码块内置一个专门枚举器<code>enumerator</code> 来专门处理管道输入的自动输入对象，即<code>$_</code>。这样，<code>process</code>里面处理管道输入，可以不使用<code>foreach</code>。</p></li><li><p>通过其他传参（非管道），我们的函数可以不需要<code>process</code>，使用普通的遍历循环也可以处理；</p></li><li><p>如何希望函数既能处理管道输入，也能处理普通传参，可以在<code>process</code>代码块使用foreach来覆盖process的枚举行为。像這樣：</p></li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token keyword">Function</span> <span class="token function">Get-MyUserNameById</span> <span class="token punctuation">{</span>

    <span class="token keyword">param</span><span class="token punctuation">(</span>  
            <span class="token namespace">[string[]]</span><span class="token variable">$EmployeeId</span>
            <span class="token punctuation">)</span>

    <span class="token keyword">Process</span> <span class="token punctuation">{</span>
    
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$id</span> in <span class="token variable">$EmployeeId</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">write-host</span> <span class="token variable">$id</span>
        <span class="token punctuation">}</span>
      
      <span class="token punctuation">}</span>

    
<span class="token punctuation">}</span>

<span class="token comment">#函數可以這樣 （普通傳參數）：</span>

<span class="token variable">$IDs</span> = <span class="token string">&quot;E01&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;E02&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;A08&quot;</span>
<span class="token function">Get-MyUserNameById</span> <span class="token operator">-</span>EmployeeId <span class="token variable">$IDs</span>

<span class="token comment">#也可以這樣：從管道接收</span>

<span class="token string">&quot;E01&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;E02&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;A08&quot;</span> <span class="token punctuation">|</span><span class="token function">Get-MyUserNameById</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最後，這個函數則提供更多靈活性。</p><h2 id="參考" tabindex="-1"><a class="header-anchor" href="#參考" aria-hidden="true">#</a> 參考</h2>`,16),d={href:"https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced_methods?view=powershell-7.4",target:"_blank",rel:"noopener noreferrer"},u=o("<p>这篇文章深入探讨了PowerShell中的Begin、Process和End块，这些块是PowerShell高级函数内置的控制流，有助于开发者维护代码工作流程。文章通过比喻和示例，解释了每个块的具体目的和常见用例。</p><ol><li><p><strong>Begin块</strong>：用于设置函数，包括指定变量和数组，这些变量和数组将在函数中使用。Begin块是可选的，如果只使用Process或End块，则不需要它。Begin块中的所有内容只会在函数调用时运行一次，类似于日常工作中的准备阶段。</p></li><li><p><strong>Process块</strong>：这是PowerShell高级函数中完成工作的地方。它处理参数和通过管道输入到函数中的数据。Process块可以单独使用，不需要Begin或End块。如果函数接受单个参数值，则Process块将只处理该单个值。如果函数接受管道输入，则Process块将处理每个传入的值。文章通过示例展示了如何处理单个值和通过管道传递的数组。</p></li><li><p><strong>End块</strong>：用于执行必要的清理工作。如果在Begin或Process块中创建了对象、变量、文件等，则应在End块中清理这些资源。End块也是可选的，如果只使用Process或Begin块，则不需要它。与Process块不同，无论通过管道传递了多少个数组元素，End块中的代码都只会执行一次。</p></li></ol><p>文章通过比喻和例子强调了每个块的作用，如将一天的开始比作Begin块的初始化，将处理日常任务比作Process块的工作，将结束一天的工作并回家比作End块的清理。文章还提到了PowerShell函数应该做好一件事，并强调了将函数分解为Begin、Process和End块的重要性，以实现清晰的逻辑分离和更好的维护性。</p>",3),v={href:"https://4sysops.com/archives/understanding-powershell-begin-process-and-end-blocks/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://jeffbrown.tech/powershell-begin-process-end/",target:"_blank",rel:"noopener noreferrer"};function k(b,h){const s=t("ExternalLinkIcon");return i(),c("div",null,[r,n("ul",null,[n("li",null,[n("a",d,[e("https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced_methods?view=powershell-7.4"),a(s)])])]),u,n("ul",null,[n("li",null,[n("p",null,[n("a",v,[e("https://4sysops.com/archives/understanding-powershell-begin-process-and-end-blocks/"),a(s)])])]),n("li",null,[n("p",null,[n("a",m,[e("https://jeffbrown.tech/powershell-begin-process-end/"),a(s)])])])])])}const _=l(p,[["render",k],["__file","post84_ps_advanced_function.html.vue"]]);export{_ as default};
