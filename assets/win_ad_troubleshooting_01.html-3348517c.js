import{_ as a,W as t,X as n,Z as e,$ as r,a0 as i,Y as l,G as s}from"./framework-2e6688e7.js";const d={},c=l('<h2 id="症状" tabindex="-1"><a class="header-anchor" href="#症状" aria-hidden="true">#</a> 症状</h2><ul><li>sysvol共享文件夹在每个域控制器都不同步，复制失败；</li><li><code>repladmin /replsummary</code> 看不到任何错误；</li><li><code>dcdiag</code>也没有报任何错误；看起来正常；</li><li>DFS管理查看没有看到Domain SysVol Volumes复制组；</li><li>DFS日志没有看到event id <code>2012</code>（DFS数据库脏关闭的信息）；</li><li>使用WMIC查看数据库健康，输出<code>没有可用实例</code></li><li>其他复制正常</li></ul><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><ul><li>DC域控都是从Windows Server 2008升级到Windows Server 2016</li><li>Sysvol复制协议从FRS升级到了DFSr</li></ul><h2 id="问题影响" tabindex="-1"><a class="header-anchor" href="#问题影响" aria-hidden="true">#</a> 问题影响</h2><ul><li>主要是影响组策略无法下发因为sysvol文件不同步；</li></ul><h2 id="解决办法" tabindex="-1"><a class="header-anchor" href="#解决办法" aria-hidden="true">#</a> 解决办法：</h2><p>（以后填坑）</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>',9),h={href:"https://community.spiceworks.com/how_to/160786-how-to-re-build-sysvol-dfsr-replication-group-without-demoting-promoting-dc",target:"_blank",rel:"noopener noreferrer"},u={href:"https://serverfault.com/questions/745599/deleted-domain-system-volume-how-do-i-recreate-it-i-have-no-backups",target:"_blank",rel:"noopener noreferrer"};function m(_,p){const o=s("ExternalLinkIcon");return t(),n("div",null,[c,e("p",null,[e("a",h,[r("https://community.spiceworks.com/how_to/160786-how-to-re-build-sysvol-dfsr-replication-group-without-demoting-promoting-dc"),i(o)])]),e("p",null,[e("a",u,[r("https://serverfault.com/questions/745599/deleted-domain-system-volume-how-do-i-recreate-it-i-have-no-backups"),i(o)])])])}const v=a(d,[["render",m],["__file","win_ad_troubleshooting_01.html.vue"]]);export{v as default};
