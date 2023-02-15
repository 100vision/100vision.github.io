import{_ as n,W as i,X as t,Z as e,$ as a,a0 as r,Y as l,G as d}from"./framework-2e6688e7.js";const o={},c=l(`<h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h3><div class="language-Powershell line-numbers-mode" data-ext="Powershell"><pre class="language-Powershell"><code>function Get-DfsnAllFolderTargets ()
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="原创链接" tabindex="-1"><a class="header-anchor" href="#原创链接" aria-hidden="true">#</a> 原创链接</h3>`,3),v={href:"https://britv8.com/powershell-get-list-of-all-folder-targets-in-domain-namespace/",target:"_blank",rel:"noopener noreferrer"};function m(u,h){const s=d("ExternalLinkIcon");return i(),t("div",null,[c,e("p",null,[e("a",v,[a("https://britv8.com/powershell-get-list-of-all-folder-targets-in-domain-namespace/"),r(s)])])])}const b=n(o,[["render",m],["__file","ps_list_dfs_target_folders.html.vue"]]);export{b as default};
