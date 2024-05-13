---
# 这是文章的标题
title: SCCM：问题排查3：SCCM客户端异常
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 89
# 设置作者
# 设置写作时间
date: 2024-04-25
# 一个页面可以有多个分类
category:
  - Windows
  - SCCM
# 一个页面可以有多个标签
tag:
  - SCCM
  - 疑难排查
  - Troubeshooting



# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


### Sympotm

unhealthy client could be:

- a ccm client was marked as `inactive` in SCCM collection.
- a ccm client not longer reported inventory info to SCCM MP server;
- a ccm client not receiving the policies from SCCM MP server.

### Troubleshooting

- Run a few checks for client health status on client side.

> Check: make sure that `SMS Agent Host service` (CCMExec) is up and running

> Check: `CcmEval.log` for client health self-check results ( the check scheduled to run by Windows Scheduled Task).

> Check: `ClientIDManager.log`. Make sure the client was registered.

> Check: `ClientLocation.log`. Make sure the client was reported to correct MP server and boundaries.

- Verifty the connectivity between MP and client

> Check: `CcmMessaging.log` for any communiction issue with MP server. for example: ssl error and certificate-related issue if https enabled.

> Check: makes sure that client is able to access the url  `http(s)://<ServerName>/sms_mp/.sms_aut?mplist`


> Check: and this one `http(s)://<ServerName>/sms_mp/.sms_aut?mpcert` 

- Checks for Management Point Server (MP) health states

> CCM Console -> `Monitoring` -> `System Status` - > `Component State` -> `SMS_MP_CONTROL_MANAGER`


### Remediation Actions to involve

- Reinstall the ccm client (in most case always does the trick)
- Repair WMI databases;
- Disable Windows Firewall;
