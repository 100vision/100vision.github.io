import{_ as e,W as o,X as i,Y as t}from"./framework-b5535326.js";const n={},a=t('<h3 id="symptom-and-behavior" tabindex="-1"><a class="header-anchor" href="#symptom-and-behavior" aria-hidden="true">#</a> Symptom and behavior</h3><p>Client upgraded to <code>5.000.9058.1018</code> from <code>5.00.8790.1007</code> SCCM Server upgarded to <code>CB 2107</code> from <code>CB 2002</code></p><ul><li><p>All existing CI on client side no longer worked and unable to be evaluated with a compliance status &quot;Error&quot; alongside with CI entries in <code>Configuration Manager</code>.</p></li><li><p>all remediation scripts no longer executed and triggerd.</p></li><li><p><code>Access check failed for &lt;domain user&gt;</code> discovverd in client log file <code>CIDownloader.log</code></p></li><li><p><code>Supplied sender token is null. Using GetUserTokenFromSid to find sender&#39;s token</code></p></li><li><p>CI jobs and DCM jobs were executed from <code>DCMAgent.log</code></p></li><li><p>Client and MP server communication looked fine. Policies were being downloaded</p></li></ul><h3 id="cause" tabindex="-1"><a class="header-anchor" href="#cause" aria-hidden="true">#</a> Cause</h3><p>No idea what caused this behavior. Seemed that nothing was broken other than CI was affected.</p><h3 id="solution" tabindex="-1"><a class="header-anchor" href="#solution" aria-hidden="true">#</a> Solution</h3><blockquote><p>Googgled a lot and found a solution from a post on Microsoft Tech</p></blockquote><ul><li><p>Make a minor modification to all existing CIs from CCM admi console . The purpose is just to generate a new revision of CI and policy. To achive that ,you can just change the descrition of CI.</p></li><li><p>Then wait for the policies to kick in on the clients or manually trigger a client notification to client for an immediate policy check-in.</p></li></ul><p>-That&#39;s it.</p>',9),d=[a];function r(c,l){return o(),i("div",null,d)}const h=e(n,[["render",r],["__file","win_sccm_troubleshooting_04_CI_Not_Working_after_client_upgrade.html.vue"]]);export{h as default};
