import{_ as s,W as n,X as a,Z as e,$ as t,a0 as l,Y as r,G as d}from"./framework-2e6688e7.js";const o={},c=r(`<h3 id="脚本功能-列出所有dfs空间下的共享目标文件夹" tabindex="-1"><a class="header-anchor" href="#脚本功能-列出所有dfs空间下的共享目标文件夹" aria-hidden="true">#</a> 脚本功能： 列出所有DFS空间下的共享目标文件夹</h3><div class="hint-container tip"><p class="hint-container-title">前提条件</p><p>需要安装DFSN模块到Powershell</p></div><h3 id="_1、安装dfsn模块" tabindex="-1"><a class="header-anchor" href="#_1、安装dfsn模块" aria-hidden="true">#</a> 1、安装DFSN模块</h3><ul><li>Windows 2012 管理可选特色</li><li>添加功能</li><li>选择RSAT 文件服务工具</li></ul><h3 id="_2、脚本内容" tabindex="-1"><a class="header-anchor" href="#_2、脚本内容" aria-hidden="true">#</a> 2、脚本内容</h3><div class="language-Powershell line-numbers-mode" data-ext="Powershell"><pre class="language-Powershell"><code>function Get-DfsnAllFolderTargets ()
{
    #Get a list of all Namespaces in the Domain
    Write-Progress -Activity &quot;1/3 - Getting List of Domain NameSpaces&quot;
    $RootList = Get-DfsnRoot -ComputerName dfs-serer-name

    #Get a list of all FolderPaths in the Namespaces
    Write-Progress -Activity &quot;2/3 - Getting List of Domain Folder Paths&quot;
    $FolderPaths = foreach ($item in $RootList)
    {
        Get-DfsnFolder -Path &quot;$($item.path)\\*&quot;
    }

    #Get a list of all Folder Targets in the Folder Paths, in the Namespaces&quot;
    Write-Progress -Activity &quot;2/3 - Getting List of Folder Targets&quot;
    $FolderTargets = foreach ($item in $FolderPaths)
    {
        Get-DfsnFolderTarget -Path $item.Path    
    }
    return $FolderTargets
}
Get-DfsnAllFolderTargets | Export-Csv -Path D:\\temp\\dfs_targets.csv -Encoding UTF8 -NoTypeInformation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="原创链接" tabindex="-1"><a class="header-anchor" href="#原创链接" aria-hidden="true">#</a> 原创链接</h3>`,7),v={href:"https://britv8.com/powershell-get-list-of-all-folder-targets-in-domain-namespace/",target:"_blank",rel:"noopener noreferrer"};function h(m,u){const i=d("ExternalLinkIcon");return n(),a("div",null,[c,e("p",null,[e("a",v,[t("https://britv8.com/powershell-get-list-of-all-folder-targets-in-domain-namespace/"),l(i)])])])}const p=s(o,[["render",h],["__file","ps_list_dfs_target_folders.html.vue"]]);export{p as default};
