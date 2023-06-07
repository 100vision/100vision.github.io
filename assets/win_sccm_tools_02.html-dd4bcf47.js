import{_ as e,W as a,X as s,Y as n}from"./framework-2e6688e7.js";const i="/assets/Post32_SCCM_CMPivot_Query_Examples-5ecd9076.jpg",r={},o=n(`<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><blockquote><p>CMPivot 是SCCM内置报表工具。 可用于快速评估环境中设备的状态并采取措施。输入查询时，CMPivot 将在所选集合中当前连接的所有设备上实时运行查询。随后可筛选、组合和完善返回的数据，以解答业务问题、解决环境中的问题或响应安全威胁。。</p></blockquote><h3 id="版本" tabindex="-1"><a class="header-anchor" href="#版本" aria-hidden="true">#</a> 版本</h3><p>SCCM 1802以上版本</p><h3 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能</h3><p>比较常用的:</p><ul><li>获取报告查询客户端的本地管理员组的成员；</li><li>获取报告查询客户端的开启的共享文件夹；</li></ul><h3 id="使用方法和步骤" tabindex="-1"><a class="header-anchor" href="#使用方法和步骤" aria-hidden="true">#</a> 使用方法和步骤</h3><ul><li>选择一个计算机集合 （Windows 10)</li><li>右键集合名称，点击<code>启动CMPivot</code></li><li>新建一个查询；</li><li>（可选）根据查询结果，创建一个新集合；</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>Administrators <span class="token operator">|</span> <span class="token keyword">where</span> Name <span class="token operator">!</span><span class="token keyword">contains</span> <span class="token string">&#39;Administrator&#39;</span> <span class="token operator">and</span> Name <span class="token operator">!</span><span class="token keyword">contains</span> <span class="token string">&#39;Domain Admins&#39;</span> <span class="token operator">and</span> Name <span class="token operator">!</span><span class="token keyword">contains</span> <span class="token string">&#39;Helpdesk Admins&#39;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>图：范例</strong></p><figure><img src="`+i+`" alt="SCCM CMPivot" tabindex="0" loading="lazy"><figcaption>SCCM CMPivot</figcaption></figure><h2 id="题外" tabindex="-1"><a class="header-anchor" href="#题外" aria-hidden="true">#</a> 题外</h2><p>很多时候企业不希望普通用户拥有本地管理员权限。既然刷出了本地管理员报告，顺便说怎么处理移除本地管理员，以遵循安全策略和最佳实践。</p><h3 id="使用sccm基线基准" tabindex="-1"><a class="header-anchor" href="#使用sccm基线基准" aria-hidden="true">#</a> 使用SCCM基线基准</h3><ul><li>在SCCM CMPivot刷出计算机列表后，立马根据报告结果创建一个新的计算机集合。</li><li>在SCCM <code>符合性设置</code>里创建一个基线项目；</li></ul><p><strong>发现脚本（符合条件）</strong></p><div class="language-Powershell line-numbers-mode" data-ext="Powershell"><pre class="language-Powershell"><code>if (Get-LocalGroupMember -Group &quot;Administrators&quot; -Member &quot;My-Domain-Name\\Domain Users&quot; -ErrorAction SilentlyContinue) 
  {   
          return $false 
  }

  else {   
          return $true
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修正脚本</strong></p><div class="language-Powershell line-numbers-mode" data-ext="Powershell"><pre class="language-Powershell"><code>Remove-LocalGroupMember -Group &quot;Administrators&quot; -Member &quot;My-Domain-Name\\Domain Users&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>最后，部署基线到新集合。</li></ul>`,21),l=[o];function t(d,c){return a(),s("div",null,l)}const u=e(r,[["render",t],["__file","win_sccm_tools_02.html.vue"]]);export{u as default};