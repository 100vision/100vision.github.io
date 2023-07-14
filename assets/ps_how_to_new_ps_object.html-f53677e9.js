import{_ as e,W as s,X as i,Y as n}from"./framework-b5535326.js";const l={},a=n(`<h3 id="脚本功能-使用pscustomobject构建自定义对象" tabindex="-1"><a class="header-anchor" href="#脚本功能-使用pscustomobject构建自定义对象" aria-hidden="true">#</a> 脚本功能： 使用PSCustomObject构建自定义对象</h3><div class="hint-container tip"><p class="hint-container-title">前提条件</p><p>Powershell 3.0 以上版本</p></div><h3 id="_2、脚本内容" tabindex="-1"><a class="header-anchor" href="#_2、脚本内容" aria-hidden="true">#</a> 2、脚本内容</h3><div class="language-Powershell line-numbers-mode" data-ext="Powershell"><pre class="language-Powershell"><code># Get process info 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),d=[a];function t(r,c){return s(),i("div",null,d)}const m=e(l,[["render",t],["__file","ps_how_to_new_ps_object.html.vue"]]);export{m as default};
