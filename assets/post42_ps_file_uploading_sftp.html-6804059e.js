import{_ as t,W as o,X as a,Z as e,$ as i,a0 as s,Y as l,G as d}from"./framework-2e6688e7.js";const r="/assets/post42_ps_sftp_generate_key_pairs_step1-bc5e684c.jpg",c="/assets/post42_ps_sftp_generate_key_pairs_step2-49718b92.jpg",v="/assets/post42_ps_sftp_generate_key_pairs_step3-9cc6822d.jpg",u="/assets/post42_ps_sftp_generate_code_template_step1-71312088.jpg",p="/assets/post42_ps_sftp_generate_code_template_step2-770373f3.jpg",m={},b={class:"hint-container tip"},h=e("p",{class:"hint-container-title"},"背景",-1),_={href:"https://blog.solex-inc.com/zh/%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF/%E7%BC%96%E7%A8%8B/post41_ps_run_in_sql_with_sql_agent.html",target:"_blank",rel:"noopener noreferrer"},P=e("h2",{id:"先说winscp",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#先说winscp","aria-hidden":"true"},"#"),i(" 先说WinSCP")],-1),f=e("blockquote",null,[e("p",null,"WinSCP是Windows下一个很常用、很受欢迎的开源FTP/SFTP客户端，版本更新的很快。")],-1),S={href:"https://winscp.net/eng/download.php",target:"_blank",rel:"noopener noreferrer"},C=l(`<pre><code>SFTP (SSH File Transfer Protocol);
FTP (File Transfer Protocol);
SCP (Secure Copy Protocol);
WebDAV (Web Distributed Authoring and Versioning);
S3 (Amazon S3).
</code></pre><blockquote><p>另外，还提供了Assembly（API)，可以编程实现文件上传、下载和同步功能，本文重点。</p></blockquote><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>以下是使用sftp协议举例实现文件上传，FTP实现差不多.</p></div><h3 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h3>`,5),g={href:"https://github.com/drakkan/sftpgo",target:"_blank",rel:"noopener noreferrer"},y=e("li",null,"WinSCP Assembly文件",-1),W=e("li",null,"sftp账户公钥和私钥。",-1),w=e("h3",{id:"脚本",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#脚本","aria-hidden":"true"},"#"),i(" 脚本")],-1),q={href:"https://github.com/100vision/Powershellgallery/blob/master/%E7%BD%91%E7%BB%9C%E7%B1%BB/%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0/Upload-FileBySFTP.ps1",target:"_blank",rel:"noopener noreferrer"},F=l(`<div class="language-Powershell line-numbers-mode" data-ext="Powershell"><pre class="language-Powershell"><code>
&lt;#
 - Function: File Uploading through WinSCP/sftp with SSL Auth option, without clear text password provided
 - Prerequisites: WinSCP Assembly
 - Author: tlin82

#&gt;

Function Upload-FileBySFTP() {

param (
        [string]$LocalFilePath,
        [string]$RemoteFilePath
        )

    #Load WinSCP Assembly
    Add-Type -Path &quot;C:\\ssh\\WinSCPNet.dll&quot;

    # Set up session options for a SFTP Session
    # follow code snippet can be generated by WinSCP Session Code Template Generator. See WinSCP documentation for details.
    $sessionOptions = New-Object WinSCP.SessionOptions -Property @{
        Protocol = [WinSCP.Protocol]::Sftp
        HostName = &quot;my-sftp-server.example.com&quot;
        PortNumber = 2022
        UserName = &quot;test&quot;
        SshHostKeyFingerprint = &quot;ssh-ed25519 255 QDYKkMIo/hIkobREzJBLeI1KyHkXDwrkGGJtmISVwwc&quot;
        ##Private Key
        SshPrivateKeyPath = &quot;C:\\ssh\\private.ppk&quot;
        # Use Pass phrase to protect the private key
        PrivateKeyPassphrase = &quot;acJ-Ub-YHgloHh7hbR6a&quot;

    }



    # Set up transfer options
    $transferOptions = New-Object WinSCP.TransferOptions
    $transferOptions.TransferMode = [WinSCP.TransferMode]::Binary
    #Speed limit to 500KB/s
    $transferOptions.SpeedLimit = 500
    # Enable Resume Support for all files.
    $transferOptions.ResumeSupport.State = [WinSCP.TransferResumeSupportState]::On


    $session = New-Object WinSCP.Session
    try
    {
        # Connection
        $session.Open($sessionOptions)

      # Upload the file to the FTP server
        $session.PutFiles($LocalFilePath, $RemoteFilePath, $False, $transferOptions).Check()

    }

    finally
    {
        $session.Dispose()
    }
    

}




if (Test-Path -Path &quot;C:\\ssh\\WinSCPNet.dll&quot;) {

    Upload-FileBySFTP -LocalFilePath &quot;D:\\source\\file_to_be_uploaded.zip&quot; -RemoteFilePath &quot;/file_to_be_uploaded.zip&quot;


  }


# Provision WinSCP assembly on the server where the file is uploaded from. The assebmly can be found in WinSCP install directory.
# if not available on the server, either download from a http server that holds the WinSCP assembly. In this case, the http server is served with Node.js Express, a simple http server.
# Alternatively get a copy of the assembly files from anywhere else . Whatever,as long as the assembly is available for the file uploading function to load.


else {
        $url_lib = &quot;http://http-server:3000/download/1&quot;
        $outputPath_lib = &quot;C:\\ssh\\WinSCPNet.dll&quot;

        $url_exec = &quot;http://http-server:3000/download/2&quot;
        $outputPath_exec = &quot;C:\\ssh\\WinSCP.exe&quot;

        $url_sslKey = &quot;http://http-server:3000/download/3&quot;
        $outputPath_sslKey = &quot;C:\\ssh\\private.ppk&quot;

        $webClient = New-Object System.Net.WebClient
        $webClient.DownloadFile($url_lib, $outputPath_lib)
        $webClient.DownloadFile($url_exec, $outputPath_exec)
        $webClient.DownloadFile($url_sslKey, $outputPath_sslKey)

        Upload-FileBySFTP -LocalFilePath &quot;D:\\source\\file_to_be_uploaded.zip&quot; -RemoteFilePath &quot;/file_to_be_uploaded.zip&quot;
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="脚本详细说明" tabindex="-1"><a class="header-anchor" href="#脚本详细说明" aria-hidden="true">#</a> 脚本详细说明</h3><ol><li><strong>关于WinSCP Assembly文件准备细节</strong></li></ol><ul><li>WinSCP Assembly文件至关重要，需要在要上传的主机（在本例，是在一台远程SQL Server) 上准备好，这样上传脚本才能工作。</li><li>这些Assembly文件是： <code>WinSCP.exe</code> 和 <code>WinSCPNet.dll</code>,均可以在WinSCP安装目录中找到。如果上传主机没有安装WinSCP,可以通过其他方法准备一份(例如通过http)，放到一个上传主机的某个指定目录下。</li><li>最后在脚本中使用<code>Add-Type</code>指令指定并加载。</li></ul><div class="hint-container note"><p class="hint-container-title">注</p><p><code>WinSCP.exe</code> 和 <code>WinSCPNet.dll</code> 必须在同一目录下,在例子，我指定了<code>C:\\ssh</code>。。</p></div><ol start="2"><li><strong>如果上传主机上没有安装WinSCP Assembly文件</strong></li></ol><p>可以搭建一个简单的HTTP服务器，并使用脚本的<code>webclient</code>对象实现下载一个副本。本例中，是使用<code>Node.js</code> 的express部署一个http，提供下载WinSCP.exe和WinSCPNet.dll，以及sftp ssh私钥key。</p><ol start="3"><li><strong>关于免密登录sftp服务器的实现细节</strong></li></ol><p>免密登录是因为使用了SSH密钥对.</p><ul><li>密钥对通过WinSCP/putty工具生成。</li><li>然后提前把公钥通过WinSCP下的putty上传到sftp用户主目录下。本例中使用的sftp服务器是sftpGo，是把公钥文本拷贝粘贴到用户profile里保存（通过sftpGO Web admin portal)。</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>可以先通过WinSCP工具测试是否可以免密登录sftp服务器。</p></div><ol start="4"><li><strong>关于脚本中sftp SessionOption对象会话选项参数</strong></li></ol><p>WinSCP的会话参数是通过WinSCP会话工具代码模板生成器生成的，比较方便。使用方法是：</p><ul><li><p>启动WinSCP，新建站点，并生成密钥对用于登录sftp服务器； <img src="`+r+'" alt="1" loading="lazy"><img src="'+c+'" alt="2" loading="lazy"><img src="'+v+'" alt="3" loading="lazy"></p></li><li><p>登录成功后，点击菜单上的【会话】，点击【代码生成】如下图： <img src="'+u+'" alt="1" loading="lazy"><img src="'+p+'" alt="1" loading="lazy"></p></li><li><p>复制代码模板到Powershell ISE或其他IDE，最后再写文件上传代码</p></li></ul>',14);function $(A,k){const n=d("ExternalLinkIcon");return o(),a("div",null,[e("div",b,[h,e("p",null,[i("前篇文章 "),e("a",_,[i("在SQL Agent里运行Powershell实现文件上传"),s(n)]),i("介绍了一个文件上传需求，把远程SQLServer上的一个文件上传到sftp服务器。具体实现是通过Powershell调用WinSCP的Assembly实现的，本篇详细介绍。")])]),P,f,e("p",null,[i("官方主页 "),e("a",S,[i("https://winscp.net/eng/download.php"),s(n)]),i(" sha'g WinSCP supports five transfer protocols:")]),C,e("ul",null,[e("li",null,[i("1台可运行sftp服务器（可以使用 "),e("a",g,[i("sftpGo"),s(n)]),i(" 实现部署）和账户，步骤略。")]),y,W]),w,e("p",null,[e("a",q,[i("完整脚本"),s(n)])]),F])}const T=t(m,[["render",$],["__file","post42_ps_file_uploading_sftp.html.vue"]]);export{T as default};