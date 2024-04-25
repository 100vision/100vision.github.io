import{_ as e,W as t,X as c,Y as o}from"./framework-b5535326.js";const l={},i=o('<h3 id="sympotm" tabindex="-1"><a class="header-anchor" href="#sympotm" aria-hidden="true">#</a> Sympotm</h3><p>unhealthy client could be:</p><ul><li>a ccm client was marked as <code>inactive</code> in SCCM collection.</li><li>a ccm client not longer reported inventory info to SCCM MP server;</li><li>a ccm client not receiving the policies from SCCM MP server.</li></ul><h3 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting" aria-hidden="true">#</a> Troubleshooting</h3><ul><li>Run a few checks for client health status on client side.</li></ul><blockquote><p>Check: SMS Agent Host service (CCMExec) is up and running</p></blockquote><blockquote><p>Check: <code>CcmEval.log</code> for client health self-check results ( the check scheduled to run by Windows Scheduled Task).</p></blockquote><blockquote><p>Check: <code>ClientIDManager.log</code>. Make sure the client was registered.</p></blockquote><blockquote><p>Check: <code>ClientLocation.log</code>. Make sure the client was reported to correct MP server and boundaries.</p></blockquote><ul><li>Verifty the connectivity between MP and client</li></ul><blockquote><p>Check: client is able to access the url <code>http(s)://&lt;ServerName&gt;/sms_mp/.sms_aut?mplist</code></p></blockquote><blockquote><p>Check: and this one <code>http(s)://&lt;ServerName&gt;/sms_mp/.sms_aut?mpcert</code></p></blockquote>',12),n=[i];function s(r,a){return t(),c("div",null,n)}const d=e(l,[["render",s],["__file","win_sccm_troubleshooting_03_bad_ccm_client.html.vue"]]);export{d as default};
