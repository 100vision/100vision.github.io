import{_ as s,W as n,X as e,Y as a}from"./framework-b5535326.js";const i={},l=a(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>处理死锁问题一般都是杀死会话，一般是DBA角色来执行，或是用户授予了使用<code>alter system kill session</code></p><p>但如果想让普通用户在不拥有DBA角色，或不能拥有alter system的情况下杀死会话，可以考虑</p><p>以下方法授权给普通用户。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="实现方式" tabindex="-1"><a class="header-anchor" href="#实现方式" aria-hidden="true">#</a> 实现方式</h3><ul><li><p>授权这个普通用户可以查询v$session</p></li><li><p>指定1个普通用户创建一个Package,改package的body中包含<code>alter system kill session</code></p></li><li><p>授权这个普通用户可以执行该package</p></li><li><p>授权这个普通用户可以执行<code>alter system</code></p></li><li><p>Oracle Single instance (Source) to Single instance(target)</p></li><li><p>Netbackup Data Backup Environment</p></li></ul><h3 id="实现步骤" tabindex="-1"><a class="header-anchor" href="#实现步骤" aria-hidden="true">#</a> 实现步骤</h3><ul><li>普通用户创建Package。</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>
<span class="token comment">-- 创建包</span>
<span class="token keyword">CREATE</span> <span class="token operator">OR</span> <span class="token keyword">REPLACE</span> PACKAGE kill_sessions <span class="token keyword">AS</span>
<span class="token keyword">PROCEDURE</span> <span class="token keyword">kill</span><span class="token punctuation">(</span>p_sid <span class="token operator">IN</span> NUMBER<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 参数为会话的SID</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
<span class="token operator">/</span>

<span class="token comment">-- 编译包体</span>
<span class="token keyword">ALTER</span> PACKAGE kill_sessions COMPILE BODY<span class="token punctuation">;</span>
<span class="token operator">/</span>

<span class="token comment">-- 创建存储过程</span>
<span class="token keyword">CREATE</span> <span class="token operator">OR</span> <span class="token keyword">REPLACE</span> PACKAGE BODY kill_sessions <span class="token operator">IS</span>
<span class="token keyword">PROCEDURE</span> <span class="token keyword">kill</span><span class="token punctuation">(</span>p_sid <span class="token operator">IN</span> NUMBER<span class="token punctuation">)</span> <span class="token operator">IS</span>
v_serial<span class="token comment"># NUMBER := -1;</span>
<span class="token keyword">BEGIN</span>
<span class="token keyword">SELECT</span> <span class="token keyword">serial</span><span class="token comment"># INTO v_serial# FROM sys.v$session WHERE sid = p_sid;</span>

    <span class="token keyword">IF</span> v_serial<span class="token comment"># &gt; 0 THEN</span>
        <span class="token keyword">EXECUTE</span> IMMEDIATE <span class="token string">&#39;ALTER SYSTEM KILL SESSION &#39;&#39;&#39;</span> <span class="token operator">||</span> p_sid <span class="token operator">||</span> <span class="token string">&#39;, &#39;</span> <span class="token operator">||</span> v_serial<span class="token comment"># || &#39;&#39;&#39;&#39;;</span>
        DBMS_OUTPUT<span class="token punctuation">.</span>put_line<span class="token punctuation">(</span><span class="token string">&#39;Session killed successfully!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">ELSE</span>
        DBMS_OUTPUT<span class="token punctuation">.</span>put_line<span class="token punctuation">(</span><span class="token string">&#39;Invalid session ID or the session is not active.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">END</span> <span class="token keyword">IF</span><span class="token punctuation">;</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>授权普通用户以下权限</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SQL&gt; grant select on v$session to &lt;the_user&gt;;
SQL&gt; grant execute on kill_sessions to &lt;the_user&gt;;
SQL&gt; grant alter system to &lt;the_user&gt;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><ul><li>查询死锁会话</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select username, lockwait, status, machine, program
from v$session
where sid in (select session_id from v$locked_object);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT l.SESSION_ID, l.OS_USER_NAME, s.USERNAME, l.OBJECT_ID, l.ORACLE_USERNAME
FROM v$locked_object l,
     v$session s
WHERE l.SESSION_ID = s.SID;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>杀会话</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 杀掉会话227
BEGIN
  KILL_SESSIONS.KILL(227);
END;


## 参考

Granting ALTER SYSTEM KILL SESSION to users
http://dba-oracle.com/t_granting_alter_system_kill_session.htm</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),t=[l];function c(d,o){return n(),e("div",null,t)}const r=s(i,[["render",c],["__file","post78_db_orcl_02.html.vue"]]);export{r as default};
