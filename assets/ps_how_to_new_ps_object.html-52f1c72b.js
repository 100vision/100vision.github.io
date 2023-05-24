const e=JSON.parse(`{"key":"v-bef8daf2","path":"/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/ps_how_to_new_ps_object.html","title":"Powershell：基础:自定义对象1：使用PSCustomObject","lang":"zh-CN","frontmatter":{"title":"Powershell：基础:自定义对象1：使用PSCustomObject","icon":"page","order":30,"date":"2023-05-24T00:00:00.000Z","category":["Windows","Powershell"],"tag":["Powershell","脚本编程"],"sticky":false,"star":true,"description":"脚本功能： 使用PSCustomObject构建自定义对象 前提条件 Powershell 3.0 以上版本 2、脚本内容 # Get process info $processes = Get-Process | Select Name, CPU, MemorySize # Construct custom objects #创建一个空集合 $result = @() foreach ($p in $processes) { #使用Hash构建对象，属性值使用前面的Select查询结果填充，并添加对象到集合中； $result += [PSCustomObject] @{ Name = $p.Name CPU = [float] $p.CPU Memory = [int] $p.MemorySize } } # Check types $result[0].GetType().Name # PSCustomObject $result[0].Name.GetType().Name # String $result[0].CPU.GetType().Name # Double $result[0].Memory.GetType().Name # Int32 # 使用筛选 $results | ?{$_.Memory -gt 4000}","head":[["meta",{"property":"og:url","content":"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/SysOps/ps_how_to_new_ps_object.html"}],["meta",{"property":"og:site_name","content":"Tim's Blog"}],["meta",{"property":"og:title","content":"Powershell：基础:自定义对象1：使用PSCustomObject"}],["meta",{"property":"og:description","content":"脚本功能： 使用PSCustomObject构建自定义对象 前提条件 Powershell 3.0 以上版本 2、脚本内容 # Get process info $processes = Get-Process | Select Name, CPU, MemorySize # Construct custom objects #创建一个空集合 $result = @() foreach ($p in $processes) { #使用Hash构建对象，属性值使用前面的Select查询结果填充，并添加对象到集合中； $result += [PSCustomObject] @{ Name = $p.Name CPU = [float] $p.CPU Memory = [int] $p.MemorySize } } # Check types $result[0].GetType().Name # PSCustomObject $result[0].Name.GetType().Name # String $result[0].CPU.GetType().Name # Double $result[0].Memory.GetType().Name # Int32 # 使用筛选 $results | ?{$_.Memory -gt 4000}"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-24T08:14:51.000Z"}],["meta",{"property":"article:tag","content":"Powershell"}],["meta",{"property":"article:tag","content":"脚本编程"}],["meta",{"property":"article:published_time","content":"2023-05-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-24T08:14:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Powershell：基础:自定义对象1：使用PSCustomObject\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-24T00:00:00.000Z\\",\\"dateModified\\":\\"2023-05-24T08:14:51.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"脚本功能： 使用PSCustomObject构建自定义对象","slug":"脚本功能-使用pscustomobject构建自定义对象","link":"#脚本功能-使用pscustomobject构建自定义对象","children":[]},{"level":3,"title":"2、脚本内容","slug":"_2、脚本内容","link":"#_2、脚本内容","children":[]}],"git":{"createdTime":1684896151000,"updatedTime":1684916091000,"contributors":[{"name":"100vision","email":"lin.tixiang@gmail.com","commits":2},{"name":"100vision","email":"30432527+100vision@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":0.79,"words":238},"filePathRelative":"zh/信息技术/SysOps/ps_how_to_new_ps_object.md","localizedDate":"2023年5月24日","excerpt":"<h3> 脚本功能： 使用PSCustomObject构建自定义对象</h3>\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">前提条件</p>\\n<p>Powershell 3.0 以上版本</p>\\n</div>\\n<h3> 2、脚本内容</h3>\\n<div class=\\"language-Powershell line-numbers-mode\\" data-ext=\\"Powershell\\"><pre class=\\"language-Powershell\\"><code># Get process info \\n$processes = Get-Process | Select Name, CPU, MemorySize\\n\\n# Construct custom objects \\n\\n#创建一个空集合\\n$result = @()\\nforeach ($p in $processes) {\\n  #使用Hash构建对象，属性值使用前面的Select查询结果填充，并添加对象到集合中；\\n    $result += [PSCustomObject] @{\\n        Name    = $p.Name\\n        CPU     = [float] $p.CPU     \\n        Memory  = [int] $p.MemorySize\\n    }\\n}\\n\\n\\n# Check types\\n$result[0].GetType().Name     # PSCustomObject \\n$result[0].Name.GetType().Name # String\\n$result[0].CPU.GetType().Name  # Double \\n$result[0].Memory.GetType().Name # Int32 \\n\\n\\n# 使用筛选\\n$results | ?{$_.Memory -gt 4000}\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{e as data};
