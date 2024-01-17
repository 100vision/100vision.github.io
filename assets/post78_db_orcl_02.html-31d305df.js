import{_ as a,W as e,X as l,Z as s,$ as t,a0 as i,Y as o,G as c}from"./framework-b5535326.js";const p={},r=o(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>处理死锁问题一般都是杀死会话，一般是DBA角色来执行，或是用户授予了使用<code>alter system kill session</code></p><p>但如果想让普通用户在不拥有DBA角色，或不能拥有alter system的情况下杀死会话，可以考虑</p><p>以下方法授权给普通用户。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="实现方式" tabindex="-1"><a class="header-anchor" href="#实现方式" aria-hidden="true">#</a> 实现方式</h3><ul><li>授权一个高级用户，例如system可以查询v$session</li><li>授权这个高级用户可以执行<code>alter system</code>特权；</li><li>这个高级用户身份下创建一个Package或procedure,核心语句是授权package的body中包含<code>alter system kill session</code></li><li>授权1个普通用户可以执行该package或procedure。</li></ul><p>以上看出，普通用户在没有<code>alter system</code>权限情况下，可以通过一个高权限的专用package/procedure杀掉会话。</p><h3 id="实现步骤" tabindex="-1"><a class="header-anchor" href="#实现步骤" aria-hidden="true">#</a> 实现步骤</h3><ul><li>System用户创建Package。</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>
<span class="token comment">-- 创建包</span>
<span class="token keyword">CREATE</span> <span class="token operator">OR</span> <span class="token keyword">REPLACE</span> PACKAGE kill_session <span class="token keyword">AS</span>
<span class="token keyword">PROCEDURE</span> <span class="token keyword">kill</span><span class="token punctuation">(</span>pn_sid <span class="token operator">IN</span> NUMBER<span class="token punctuation">,</span>pn_serial <span class="token operator">IN</span> NUMBER<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 参数为会话的SID,和会话序列号</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
<span class="token operator">/</span>

<span class="token comment">-- 编译包体</span>
<span class="token keyword">ALTER</span> PACKAGE kill_session COMPILE BODY<span class="token punctuation">;</span>
<span class="token operator">/</span>

<span class="token comment">-- 创建存储过程</span>
<span class="token keyword">CREATE</span> <span class="token operator">OR</span> <span class="token keyword">REPLACE</span> <span class="token keyword">PROCEDURE</span> <span class="token keyword">kill</span><span class="token punctuation">(</span>
    pn_sid NUMBER<span class="token punctuation">,</span>
    pn_serial NUMBER
<span class="token punctuation">)</span> <span class="token keyword">AS</span>
    lv_user VARCHAR2<span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">BEGIN</span>
    <span class="token keyword">SELECT</span> username <span class="token keyword">INTO</span> lv_user <span class="token keyword">FROM</span> SYS<span class="token punctuation">.</span>V_$<span class="token keyword">SESSION</span>
    <span class="token keyword">WHERE</span> sid <span class="token operator">=</span> pn_sid <span class="token operator">AND</span> <span class="token keyword">serial</span><span class="token comment"># = pn_serial;</span>
<span class="token comment">-- 安全起见，限制普通用户只能杀掉指定用户的会话，不能杀掉其他用户（例如dba的会话</span>
    <span class="token keyword">IF</span> lv_user <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token operator">AND</span> lv_user <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token string">&#39;svc_dbuser01&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;svc_dbuser02&#39;</span><span class="token punctuation">)</span> <span class="token keyword">THEN</span>
        <span class="token keyword">EXECUTE</span> IMMEDIATE <span class="token string">&#39;ALTER SYSTEM KILL SESSION &#39;&#39;&#39;</span> <span class="token operator">||</span> pn_sid <span class="token operator">||</span> <span class="token string">&#39;,&#39;</span> <span class="token operator">||</span> pn_serial <span class="token operator">||</span> <span class="token string">&#39;&#39;&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">ELSE</span>
        RAISE_APPLICATION_ERROR<span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">20000</span><span class="token punctuation">,</span> <span class="token string">&#39;Attempt to kill protected system session has been blocked.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">END</span> <span class="token keyword">IF</span><span class="token punctuation">;</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>


<span class="token comment">-- 创建一个同义词给普通用户</span>
<span class="token keyword">Create</span> synonym <span class="token operator">&lt;</span>username<span class="token operator">&gt;</span><span class="token punctuation">.</span>kill_session <span class="token keyword">for</span> system<span class="token punctuation">.</span>kill_session<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>授权package的owner,即system用户以下权限</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SQL&gt; grant select on v$session to system;
SQL&gt; grant alter system to system;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>授权普通用户可以执行package</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SQL&gt; grant execute on kill_session to &lt;the_user&gt;;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><ul><li>查询死锁会话</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select username, lockwait, status, machine, program
from v$session
where sid in (select session_id from v$locked_object);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT l.SESSION_ID, l.OS_USER_NAME, s.USERNAME, s.serial#,l.OBJECT_ID, l.ORACLE_USERNAME
FROM v$locked_object l,
     v$session s
WHERE l.SESSION_ID = s.SID;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>杀会话</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 普通用户在PL/SQL里杀掉会话227，序号311
BEGIN
  KILL_SESSION.KILL(222,311);
END;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>普通用户在sqlplus杀掉会话
SQL&gt; exec kill_session.kill(222,311)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2><p>Granting ALTER SYSTEM KILL SESSION to users</p>`,24),d={href:"http://dba-oracle.com/t_granting_alter_system_kill_session.htm",target:"_blank",rel:"noopener noreferrer"};function u(k,v){const n=c("ExternalLinkIcon");return e(),l("div",null,[r,s("p",null,[s("a",d,[t("http://dba-oracle.com/t_granting_alter_system_kill_session.htm"),i(n)])])])}const b=a(p,[["render",u],["__file","post78_db_orcl_02.html.vue"]]);export{b as default};
