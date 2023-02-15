---
# 这是文章的标题
title: Powershell：列出所有DFS命名空间下的共享文件夹
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 5
# 设置作者
# 设置写作时间
date: 2023-02-15
# 一个页面可以有多个分类
category:
  - Windows
  - Powershell
# 一个页面可以有多个标签
tag:
  - Powershell
  - 脚本编程
  - 转载

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

### 
```Powershell
function Get-DfsnAllFolderTargets ()
{
    #Get a list of all Namespaces in the Domain
    Write-Progress -Activity "1/3 - Getting List of Domain NameSpaces"
    $RootList = Get-DfsnRoot -ComputerName dfs-serer-name

    #Get a list of all FolderPaths in the Namespaces
    Write-Progress -Activity "2/3 - Getting List of Domain Folder Paths"
    $FolderPaths = foreach ($item in $RootList)
    {
        Get-DfsnFolder -Path "$($item.path)\*"
    }

    #Get a list of all Folder Targets in the Folder Paths, in the Namespaces"
    Write-Progress -Activity "2/3 - Getting List of Folder Targets"
    $FolderTargets = foreach ($item in $FolderPaths)
    {
        Get-DfsnFolderTarget -Path $item.Path    
    }
    return $FolderTargets
}
Get-DfsnAllFolderTargets | Export-Csv -Path D:\temp\dfs_targets.csv -Encoding UTF8 -NoTypeInformation
```


### 原创链接
https://britv8.com/powershell-get-list-of-all-folder-targets-in-domain-namespace/