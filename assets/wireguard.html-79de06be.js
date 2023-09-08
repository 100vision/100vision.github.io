import{_ as n,W as r,X as t,Z as a,$ as s,a0 as p,Y as i,G as l}from"./framework-b5535326.js";const o={},c=i(`<h2 id="什么是wireguard" tabindex="-1"><a class="header-anchor" href="#什么是wireguard" aria-hidden="true">#</a> 什么是WireGuard</h2><p>是一个易于配置、快速且安全的开源 VPN，它利用了最新的加密技术。</p><h2 id="wireguard的优势" tabindex="-1"><a class="header-anchor" href="#wireguard的优势" aria-hidden="true">#</a> WireGuard的优势</h2><p>相比IPSec VPN，WireGuard更快又不失安全,适合小公司或家庭等廉价实现方案。</p><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2><div class="hint-container tip"><p class="hint-container-title">前提条件</p><p>需要至少一个公网IP地址。另外，如果只有一个节点具备公网 IP ，则所有组网流量都需要通过这个公网 IP 的节点进行中转1台云主机(有公网IP地址）作为WireGuard的Hub服务器实现联网</p></div><h3 id="拓扑" tabindex="-1"><a class="header-anchor" href="#拓扑" aria-hidden="true">#</a> 拓扑</h3><ul><li>拓扑选项1：中心化。</li></ul><p>云主机作为WireGuard Gateway，其他站点（子网）都在NAT后面，没有公网IP地址 home(eth0,wg0) &lt;--&gt; ECS(eth0,wg0) &lt;---&gt; Office(wg0,eth0)</p><h3 id="部署注意事项" tabindex="-1"><a class="header-anchor" href="#部署注意事项" aria-hidden="true">#</a> 部署注意事项</h3><ul><li><p>配置文件中的allowed IPs 是指允许路由的目标子网。添加后自动添加相应路由项的路由表.</p></li><li><p>如果hub服务器是部署在云主机，注意云主机上需要放行WG的默认UDP端口<mark>51820</mark></p></li></ul><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h3><ul><li>启动和停止wg tun网卡wg0</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>wg-quick down wg0
wg-quick up wg0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动和停止wg 的systemd服务</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl stop wg-quick@wg0.service
<span class="token function">sudo</span> systemctl start wg-quick@wg0.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例配置" tabindex="-1"><a class="header-anchor" href="#示例配置" aria-hidden="true">#</a> 示例配置</h3><ul><li>1、中心WireGuard服务器配置</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/wireguard/wg0.conf

<span class="token punctuation">[</span>Interface<span class="token punctuation">]</span>
Address <span class="token operator">=</span> <span class="token number">192.0</span>.2.254/32
SaveConfig <span class="token operator">=</span> <span class="token boolean">false</span>
DNS <span class="token operator">=</span> <span class="token number">223.5</span>.5.5
PostUp <span class="token operator">=</span> iptables <span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-i</span> %i <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span> iptables <span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-o</span> %i <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span> iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> POSTROUTING <span class="token parameter variable">-o</span> eth0 <span class="token parameter variable">-j</span> MASQUERADE
PostDown <span class="token operator">=</span> iptables <span class="token parameter variable">-D</span> FORWARD <span class="token parameter variable">-i</span> %i <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span> iptables <span class="token parameter variable">-D</span> FORWARD <span class="token parameter variable">-o</span> %i <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span> iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-D</span> POSTROUTING <span class="token parameter variable">-o</span> eth0 <span class="token parameter variable">-j</span> MASQUERADE
ListenPort <span class="token operator">=</span> <span class="token number">51820</span>
PrivateKey <span class="token operator">=</span> <span class="token operator">&lt;</span>private-key-Hub-server<span class="token operator">&gt;</span>

<span class="token punctuation">[</span>Peer<span class="token punctuation">]</span>
PublicKey <span class="token operator">=</span> <span class="token operator">&lt;</span>public-key-A<span class="token operator">&gt;</span>
AllowedIPs <span class="token operator">=</span> <span class="token number">192.0</span>.2.1/32,192.168.6.0/24,192.168.0.0/24,192.168.11.0/24
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><ol start="2"><li>WireGuard客户端配置示例</li></ol></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>Interface<span class="token punctuation">]</span>
PrivateKey <span class="token operator">=</span> <span class="token operator">&lt;</span>private-key-A<span class="token operator">&gt;</span>
Address <span class="token operator">=</span> <span class="token number">192.0</span>.2.1 <span class="token comment">#隧道IP地址</span>
DNS <span class="token operator">=</span> <span class="token number">192.168</span>.0.24      <span class="token comment">#dns可以配置为内网dns服务器</span>
PostUp   <span class="token operator">=</span> iptables <span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-i</span> %i <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span> iptables <span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-o</span> %i <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span> iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> POSTROUTING <span class="token parameter variable">-o</span> eth0 <span class="token parameter variable">-j</span> MASQUERADE
PostDown <span class="token operator">=</span> iptables <span class="token parameter variable">-D</span> FORWARD <span class="token parameter variable">-i</span> %i <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span> iptables <span class="token parameter variable">-D</span> FORWARD <span class="token parameter variable">-o</span> %i <span class="token parameter variable">-j</span> ACCEPT<span class="token punctuation">;</span> iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-D</span> POSTROUTING <span class="token parameter variable">-o</span> eth0 <span class="token parameter variable">-j</span> MASQUERADE

<span class="token comment">#WireGuard Server/Gateway (tencent ecs with Public IP address)</span>
<span class="token punctuation">[</span>Peer<span class="token punctuation">]</span>
PublicKey <span class="token operator">=</span> <span class="token operator">&lt;</span>Public-key-Hub-server<span class="token operator">&gt;</span>
AllowedIPs <span class="token operator">=</span> <span class="token number">192.0</span>.2.0/24,10.0.20.6/22,10.188.0.0/24  
Endpoint <span class="token operator">=</span> <span class="token number">1.2</span>.3.4:51820   <span class="token comment"># ECS公网IP地址         </span>
PersistentKeepalive <span class="token operator">=</span> <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进阶-使用web-gui管理wireguard配置" tabindex="-1"><a class="header-anchor" href="#进阶-使用web-gui管理wireguard配置" aria-hidden="true">#</a> 进阶：使用Web GUI管理WireGuard配置</h2>`,22),d={href:"https://medium.com/swlh/web-uis-for-wireguard-that-make-configuration-easier-e104710fa7bd",target:"_blank",rel:"noopener noreferrer"};function u(v,b){const e=l("ExternalLinkIcon");return r(),t("div",null,[c,a("p",null,[s("使用一些Web工具方便管理WirGuard的配置和公钥，自动生成配置。 具体参考"),a("a",d,[s("配置参考"),p(e)])])])}const k=n(o,[["render",u],["__file","wireguard.html.vue"]]);export{k as default};