import{_ as e,W as s,X as n,Y as a}from"./framework-b5535326.js";const i={},l=a(`<h2 id="方法1-使用pscustomobject构建自定义对象" tabindex="-1"><a class="header-anchor" href="#方法1-使用pscustomobject构建自定义对象" aria-hidden="true">#</a> 方法1: 使用PSCustomObject构建自定义对象</h2><div class="hint-container tip"><p class="hint-container-title">前提条件</p><p>Powershell 3.0 以上版本</p></div><h3 id="_2、脚本内容" tabindex="-1"><a class="header-anchor" href="#_2、脚本内容" aria-hidden="true">#</a> 2、脚本内容</h3><div class="language-Powershell line-numbers-mode" data-ext="Powershell"><pre class="language-Powershell"><code># Get process info 
$processes = Get-Process | Select Name, CPU, MemorySize

# Construct custom objects 

#创建一个空集合
$result = @()
foreach ($p in $processes) {
  #使用Hash构建对象，属性值使用前面的Select查询结果填充，并添加对象到集合中；
    $result += [PSCustomObject] @{
        Name    = $p.Name
        CPU     = [float] $p.CPU     
        Memory  = [int] $p.MemorySize
        DateOfData = [datetime] (Get-Date -Format &quot;yyyy-MM-dd&quot;)
    }
}


# Check types
$result[0].GetType().Name     # PSCustomObject 
$result[0].Name.GetType().Name # String
$result[0].CPU.GetType().Name  # Double 
$result[0].Memory.GetType().Name # Int32 
$result[0].DateOfData.GetType().Name # Datetime


# 使用筛选
$results | ?{$_.Memory -gt 4000}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用add-member方法明确指定自定义对象的属性类型" tabindex="-1"><a class="header-anchor" href="#使用add-member方法明确指定自定义对象的属性类型" aria-hidden="true">#</a> 使用Add-Member方法明确指定自定义对象的属性类型</h3><blockquote><p>有时候要显式指定属性类型。例如在 PowerShell 中，当你将一个数组赋值给自定义对象的属性时，该属性的类型会被自动推断为 System.Object[]，即一个对象数组。这是因为在 PowerShell 中，数组的类型是 System.Object[]，除非你显式指定数组的元素类型。</p></blockquote><p>例如：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 导入 Active Directory 模块</span>
<span class="token function">Import-Module</span> ActiveDirectory

<span class="token comment"># 获取 Active Directory 中的计算机对象</span>
<span class="token variable">$computers</span> = <span class="token function">Get-ADComputer</span> <span class="token operator">-</span><span class="token keyword">Filter</span> <span class="token operator">*</span> <span class="token operator">-</span>Properties Name<span class="token punctuation">,</span> OperatingSystem<span class="token punctuation">,</span> LastLogonDate

<span class="token comment"># 创建一个自定义对象</span>
<span class="token variable">$customObject</span> = <span class="token namespace">[PSCustomObject]</span>@<span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment"># 使用 Add-Member 添加类型明确的 Computers 属性</span>
<span class="token function">Add-Member</span> <span class="token operator">-</span>InputObject <span class="token variable">$customObject</span> <span class="token operator">-</span>MemberType NoteProperty <span class="token operator">-</span>Name <span class="token string">&quot;Computers&quot;</span> <span class="token operator">-</span>Value <span class="token variable">$computers</span> <span class="token operator">-</span>TypeName <span class="token string">&quot;Microsoft.ActiveDirectory.Management.ADComputer[]&quot;</span>

<span class="token comment"># 输出自定义对象</span>
<span class="token variable">$customObject</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法2-使用哈希表创建自定义对象" tabindex="-1"><a class="header-anchor" href="#方法2-使用哈希表创建自定义对象" aria-hidden="true">#</a> 方法2: 使用哈希表创建自定义对象</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建一个哈希表并指定属性类型</span>
<span class="token variable">$hashTable</span> = @<span class="token punctuation">{</span>
    Name  = <span class="token namespace">[string]</span><span class="token string">&quot;John Doe&quot;</span>
    Age   = <span class="token namespace">[int]</span>30
    Email = <span class="token namespace">[string]</span><span class="token string">&quot;john.doe@example.com&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 将哈希表转换为自定义对象</span>
<span class="token variable">$customObject</span> = <span class="token namespace">[PSCustomObject]</span><span class="token variable">$hashTable</span>

<span class="token comment"># 输出对象</span>
<span class="token variable">$customObject</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),t=[l];function c(r,o){return s(),n("div",null,t)}const p=e(i,[["render",c],["__file","ps_how_to_new_ps_object.html.vue"]]);export{p as default};
