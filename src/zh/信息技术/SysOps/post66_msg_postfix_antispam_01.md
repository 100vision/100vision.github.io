---
# 这是文章的标题
title: Postfix系列：防垃圾邮件：SpamAssassin： Bayes实现自动投喂垃圾邮件
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 66
# 设置作者
# 设置写作时间
date: 2023-10-18
# 一个页面可以有多个分类
category:
  - Linux
  - Postfix
  - Messaging

# 一个页面可以有多个标签
tag:

  - 邮件系统
  - Postfix
  - antispam
  - spamassassin
  - 反垃圾邮件
  - sa-learn
  - bayes
  - 贝叶斯

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---



## 前言

`SpamAssassin` 是一款很著名、很强大的防垃圾邮件过滤系统，更多介绍看[官方Wiki](https://cwiki.apache.org/confluence/display/SPAMASSASSIN/Home)

SpamAssassin提供两个机制来过滤邮件：

- 评分规则系统
- 贝叶斯过滤器

## 正文

### SpamAssassin评分

评分规则系统来判定、标识来邮是否是垃圾邮件，这个规则可以通过`/etc/spamassassin/local.cf` （CentOS分支）来自定义规则。这个规则定义了来邮满足什么特征给多少惩罚分，分数越高垃圾邮件嫌疑越大。然后根据分值高低交给`Amavisd-new`做动作（【丢弃】、【投递到隔离邮箱】、【标记提醒】


SpamAssassin评分将在另开一篇介绍，这里不展开。这里有一些 [SpamAssassin规则解释](https://gist.github.com/ychaouche/a2faff159c2a1fea16019156972c7f8b)

### 贝叶斯过滤器 

SpamAssassin还允许管理员训练一个`贝叶斯过滤器`来学习邮件样本，从样本中提取关键字(token)提高识别能力。

SpamAssassin pam是通过一个`sa-learn`程序来学习，管理员需要投喂样本。


投喂垃圾邮件：

```shell
sa-learn --spam --mbox /path/to/spam.mbox 
```

投喂正常邮件：

```shell
sa-learn --ham --mbox /path/to/ham.mbox 
```
:::tip 注意
SpamAssassin Bayes需要投喂200封垃圾邮件和200封正常邮件后才能开始工作. "The bayesian classifier can only score new messages if it already has 200 known spams and 200 known hams"
:::

**投喂方式**

- 手动投喂
- 自动投喂（本文重点）


**手动投喂**

手动投喂就是通过以上命令完成。但实际步骤有点繁琐，简单说一下步骤，管理员首先需要：

- 1、收集垃圾邮件样本。如果是从Outlook邮件客户端取样本，要把这些邮件转换成mbox邮箱格式。
- 2、使用工具把垃圾邮件汇集到一个mbox，把正常邮件汇集到一个mbox文件。（这个工具比较难找，网上有一款[PST to MBOX Converter](https://www.kdetools.com/pst/mbox/) 试用版只能一次性转换30封。
- 3、上传mbox文件到SpamAssassin所在主机；
- 4、执行以上投喂指令；


**自动投喂**

通过以上看出，手动投喂还是比较麻烦的，每次都要把以上步骤操作一遍不能自动。自动投喂是什么效果？

- 邮件管理员平时只要鼠标点点，用肉眼识别一下邮件，如果看到垃圾邮件就拖到指定文件夹；
- SpamAssassin在后台自动从指定文件夹下载样本自动学习；

### 实现自动投喂

看看怎么实现自动投喂，如果你是使用Exchange邮箱，大致要实现几个初始配置：

- 创建一个投喂专用邮箱，可以是Exchange邮箱，并开启IMAP/POP3；
- 在这个邮箱下面创建两个文件夹，一个文件夹用来存放垃圾邮件，另一个正常邮件；
- 在SpamAssassin所在主机上运行`fetchmail`等支持IMAP/POP3的邮件MUA客户端。
- 在SpamAssassin所在主机上绑定两个本地用户到fetchmail里的2个mbox文件；
- 在SpamAssassin所在主机上设置fetchmail定期从那个专用邮箱下载邮件样本；
- 在SpamAssassin所在主机上设置sa-learn从以上两个mbox文件中学习；

以上配置看似步骤很多，但是是一次性初始配置实现自动投喂，一劳永逸。


### 开始
---

- 创建邮箱且开启IMAP

步骤略

>在我的环境和邮件路由是`Exchange -> Postfix网关`,因此我创建Exchange邮箱，例如`quarantine@example.com`。同时，这个邮箱是我部署SpamAssassin指定的目标隔离邮箱，凡是被SpamAssassin判定垃圾邮件嫌疑的都会转发到这个邮箱，因此这个邮箱会有很多垃圾邮件样本。



- 创建邮件文件夹。

创建一个`sa_spam` 和`sa_ham` （文件名可以任意，尽量不用中文和一些特殊字符)

- 在SpamAssassin安装和运行fetchmail

```shell
yum install fetchmail
```

- 在SpamAssassin主机上创建两个本地用户

需要两个本地用户来绑定两个mbox来接收样本邮件，一个对应垃圾样本，一个对应正常样本；

```shell
useradd sa_spam
useradd sa_ham
```
创建后，可以看到`/var/spool/mail/sa_spam` 和 `/var/spool/mail/sa_ham`
这两个文件是mbox文件，也就是用户邮箱,fetchmail下载的邮件将分别存放在这两个邮箱文件中（邮箱可以使用`mailx`查看）

- 在SpamAssassin主机上配置fetchmail来下载样本

:::tip 
fetchmail使用一个配置文件`.fetchmailrc`，注意：文件要在家目录下。 
:::

**在接收垃圾样本的用户下**

创建`.fetchmailrc`,并`chmod 600 .fetchmailrc`


```shell
[root@i ~]su - sa_spam
[sa_spam@i ~]$ cat .fetchmailrc
set daemon 300
set no bouncemail
set postmaster "postmaster@example.com"
set no spambounce
set logfile fetch_spam.log
set limit 1024000
set properties ""
defaults proto imap
poll my-email-server.example.com with proto imap
user 'quarantine@example.com' there with password 'password_for_the_exchange_mailbox' is 'sa_spam' here
smtphost localhost/10025
ssl
# 下载邮箱里的spam文件夹下所有邮件
folder sa_spam
fetchall
```
启动fetchmail

```shell
[sa_spam@i ~]$ fetchmail -vvvv
```

**在接收正常样本的用户下**

创建`.fetchmailrc`,并`chmod 600 .fetchmailrc`


```shell
[root@mailhost ~]su - sa_ham
[sa_spam@i ~]$ cat .fetchmailrc
set daemon 300
set no bouncemail
set postmaster "postmaster@example.com"
set no spambounce
set logfile fetch_ham.log
set properties ""
defaults proto imap
poll my-email-server.example.com with proto imap
user 'quarantine@example.com' there with password 'password_for_the_exchange_mailbox' is 'sa_ham' here

smtphost localhost/10025
ssl
# 邮箱里的sa_ham文件夹
folder sa_spam
fetchall
```

启动fetchmail

```shell
[sa_spam@i ~]$ fetchmail -vvvv
```




- 检查fetchmail运行状况

1. 在专用邮箱里，拖动邮件样本到指定文件夹；
2. 使用`mailx -f /var/spool/mail/sa_spam`检查邮件是否下载
3. 如果有邮件则正常，如果没有检查fetchmail日志


- 配置crontab job定期执行sa-learn学习

```shell
[root@mailhost ~]crontab -l
#Schedule a SpamAssassin SA-Learning 
*/1 * * * *  /usr/bin/sa-learn --spam --mbox /var/spool/mail/sa_spam > /var/log/sa-learn-spam.log
* */3 * * *  /usr/bin/sa-learn --ham --mbox /var/spool/mail/sa_ham > /var/log/sa-learn-ham.log
```

## 扩展：Fetchmail学习

从以上配置看出，整个过程关键部分就是fetchmail的配置最为关键。
因此有必要多了解一下fetchmail的使用。

### How fetchmail works

`Fetchmail`可以在Linux Terminal实现邮件接收和发送，实现：

- 从外部邮箱服务器，例如Gmail/Office365等支持IMAP/POP3下载邮件；
- 把下载后的邮件绑定到Linux本地用户，实现方法是先使用IMAP/POP3接收协议下载，然后通过本地smtp（Mail Delivery Agent),例如`Postfix`、`Sendmail`发给本地用户；

### 配置Fetchmailrc

fetchmail默认使用一个配置文件`.fetchmailrc`，具体使用可以参考：
https://calomel.org/fetchmailrc.html

### Fetchmail排错

- 在fetchmailrc配置中使用`logfile`指定日志文件，查看日志根据具体错误进行排查；
- 一般可能是参数使用或配置错误，例如IMAP邮箱用户名或密码弄错；

### 其他

注意邮箱清理，大量且长期下载邮件可能会造成磁盘空间爆满。可使用cron任务定期清理：

```
@monthly > /var/spool/mail/solex_sa_learn_spam
```
