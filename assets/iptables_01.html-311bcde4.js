import{_ as a,W as e,X as s,Y as i}from"./framework-b5535326.js";const n={},l=i(`<div class="hint-container tip"><p class="hint-container-title">开始学习</p><ul><li><p>为什么学iptables。个人觉得，iptables的学习挺重要的，应用也很广，例如k8s和vpn底层都使用了iptables做网络基础。</p></li><li><p>怎么学: 重点和难点个人觉得就是表和链的使用。什么时候用什么表，用什么链。</p></li></ul></div><h2 id="iptables的常用表" tabindex="-1"><a class="header-anchor" href="#iptables的常用表" aria-hidden="true">#</a> iptables的常用表</h2><blockquote><p>表是iptables规则的集合，表中包含了若干个链.</p></blockquote><ul><li>filter表 (iptables默认表，用来过滤网络包)</li><li>nat表 （该表用于处理网络地址转换和端口转发等操作）</li><li>mangle表(较少用，允许管理员修改数据包的TTL等)</li></ul><h2 id="链" tabindex="-1"><a class="header-anchor" href="#链" aria-hidden="true">#</a> 链</h2><p>以下都是个人粗解。</p><ul><li>INPUT (用在filter表，用来防火墙过滤进入主机防火墙的包)</li><li>OUTPUT （用在filter表和NAT表，用来控制离开主机的数据包）</li><li>PREROUTING</li><li>POSTROUTING</li><li>FORWARD</li></ul><h3 id="prerouting-链" tabindex="-1"><a class="header-anchor" href="#prerouting-链" aria-hidden="true">#</a> PREROUTING 链</h3><p>多用在nat表，PREROUTING链用于处理数据包到达本地主机，一般是目的地址转换DNAT和目的端口转发，不会路由选择（需要Forward链），实现服务器映射和对外发布</p><p>举例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-d</span> <span class="token number">203.0</span>.113.10 <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">192.168</span>.1.2

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>目的端口转发：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">192.168</span>.0.100:80

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="postrouting-链" tabindex="-1"><a class="header-anchor" href="#postrouting-链" aria-hidden="true">#</a> POSTROUTING 链</h3><p>用在nat表，用来做离开主机后的数据包的网络地址转换和端口转发，常和SNAT搭配使用。POSTROUTING链是在数据包离开本地路由器之前进行修改的最后一个机会。因此，使用POSTROUTING链进行SNAT会使源IP地址在发往目的地之前发生变化。这通常是一种将内部站点连接到互联网的常见方法。</p><p>举例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> POSTROUTING <span class="token parameter variable">-o</span> eth0 <span class="token parameter variable">-j</span> SNAT --to-source <span class="token operator">&lt;</span>router_public_ip<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">关于MASQUERADE</p><p>地址伪装，在iptables中有着和SNAT相近的效果，但也有一些区别： SNAT，DNAT，MASQUERADE都是NAT，<code>MASQUERADE是SNAT的一个特例</code>。SNAT是指在数据包从网卡发送出去的时候，把数据包中的源地址部分替换为指定的IP，这样，接收方就认为数据包的来源是被替换的那个IP的主机。MASQUERADE是用发送数据的网卡上的IP来替换源IP，因此，<strong>对于那些IP不固定的场合，比如拨号网络或者通过dhcp分配IP的情况下，就得用MASQUERADE</strong></p></div><h3 id="forward-链" tabindex="-1"><a class="header-anchor" href="#forward-链" aria-hidden="true">#</a> FORWARD 链</h3><p>FORWARD链用于处理网络上<strong>流经本机</strong>的数据包，所以适用于将其他网络中的流量转发到其他网络或本地主机上。</p><p>一般做法是允许所有数据包流经本机转发：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>iptables <span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-j</span> ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="链表执行顺序" tabindex="-1"><a class="header-anchor" href="#链表执行顺序" aria-hidden="true">#</a> 链表执行顺序</h2><h3 id="iptables网关接收过程" tabindex="-1"><a class="header-anchor" href="#iptables网关接收过程" aria-hidden="true">#</a> iptables网关接收过程</h3><ol><li>PREROUTING</li><li>&lt;路由选择&gt;，如果时数据包目的地址时本机时，进入INPUT链；如果是他机时，进入FORWARD链；</li></ol><ul><li>2.1 INPUT链</li><li>2.2 FORWARD链</li></ul><h3 id="发送过程" tabindex="-1"><a class="header-anchor" href="#发送过程" aria-hidden="true">#</a> 发送过程</h3><ol><li>路由选择。目的地址时本机的，进入OUTPUT链；如果时他机，进入FORWARD链；</li><li></li></ol><ul><li>目的地址时本机的走OUTPUT链；</li><li>目的地址非本机的走FORWARD链</li></ul><ol start="3"><li>POSTROUTING</li></ol>`,30),r=[l];function t(p,d){return e(),s("div",null,r)}const c=a(n,[["render",t],["__file","iptables_01.html.vue"]]);export{c as default};