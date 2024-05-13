---
# 这是文章的标题
title: SCCM：问题排查3：CI Stopped working after client upgrade
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 92
# 设置作者
# 设置写作时间
date: 2024-05-13
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


### Symptom and behavior 

Client upgraded to `5.000.9058.1018` from `5.00.8790.1007`
SCCM Server upgarded to `CB 2107` from `CB 2002`

- All existing CI on client side no longer worked and unable to be evaluated with a compliance status "Error" alongside with CI entries in `Configuration Manager`.

- all remediation scripts no longer executed and triggerd.

- `Access check failed for <domain user>` discovverd in client log file `CIDownloader.log`

- `Supplied sender token is null. Using GetUserTokenFromSid to find sender's token`

- CI jobs and DCM jobs were executed from `DCMAgent.log`

- Client and MP server communication looked fine. Policies were being downloaded



### Cause

No idea what caused this behavior.  Seemed that nothing was broken other than CI was affected. 

### Solution

> Googgled a lot and found a solution from a post on Microsoft Tech

- Make a minor modification to all existing CIs from CCM admi console . The purpose is just to generate a new revision of CI and policy. To achive that ,you can just change the descrition of CI.

- Then wait for the policies to kick in on the clients or manually trigger a client notification to client for an immediate policy check-in.

-That's it. 


