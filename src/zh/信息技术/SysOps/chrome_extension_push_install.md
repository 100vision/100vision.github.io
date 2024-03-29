---
# 这是文章的标题
title: Google Chrome：扩展的推送安装(Push Install)
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 20
# 设置作者
# 设置写作时间
date: 2023-05-06
# 一个页面可以有多个分类
category:
  - Chrome
  - 浏览器
# 一个页面可以有多个标签
tag:
  - Google Enterprise
  - 部署
  - Google扩展
  - 组策略
  - Chrome Web Store


# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---


## 需求和背景

解决一些需求：

- 用户计算机没法访问Google官方商店安装扩展，则需要使用本地自建商店推送安装；
- 推送自开发的扩展（需要本地自建商店）；
- 管理员推送必安装的扩展（可以官方，也可以本地自建商店；

:::tip 关于推送工具
如果有AD域环境，一般使用组策略推送下去。策略模板可以在Google有企业版Chrome Enterprise Bundle找到。模板文件上传到域控的PolicyDefinitions。
:::


## 如果通过官方商店的推送扩展

比较简单，但前提用户电脑可以科学上网。

- 在Chrome Web商店里，找到要推送的扩展，并记下它的`Extension Id`。等下会用到；
- 新建一条组策略；编辑策略找到`Computer Configuration/Administrative Templates/Google/Extensions/Configure the list of force-installed apps and extensions`
- 填入上面记下的**Extension Id**。
- 链接策略到计算机OU或用户OU；
- 如果策略推送成功，用户的Chrome就会自动安装该扩展；

## 如果通过本地自建商店推送扩展

麻烦一点，有3个任务：

- 搭建本地商店；
- 打包自己的扩展（需要源码）；
- 推送扩展；

### 搭建本地商店

搭建本地商店就是需要一个简单的Web服务器。IIS/Apache等都可以，但不管哪个，都要注意以下：

:::note 注意
1. Web服务器要允许匿名访问，不做认证；2. 需要设置和添加一个文件扩展名.crx的 `application/x-chrome-extension` （Chrome据此判断crx文件是否可以可以安装）
:::

以IIS为例，步骤：

- 新建一个文件夹目录，例如MyStore。设置目录ACL,添加`IIS_USR`本地账户，可读可执行；如下图：

![IIS Folder Permission](../../PostImages\post20_iis_foder_perm_required.jpg)
- 新建一个IIS站点，指定一个未使用的端口；网站主目录指向新建的目录 MyStore;
- 添加一个MIME类型。文件扩展名输入`.crx` , MIME类型填入 `application/x-chrome-extension`,如下图：

![add new MIME Type](../../PostImages/post20_iis_create_new_content_type.jpg)
- 测试商店是否工作正常。主要是验证文件是否可以下载。
  -  在网站目录下放一个测试文件；
  - 使用浏览器可以成下载一个测试文件，我的例子就是：

```plain
http://example.com:8080/mystore/test.txt
```


### 准备扩展程序(Extension)

- **如果是没有打包好的扩展**，即扩展源码，参考以下步骤先打包：
  - 准备好扩展的源码；
  - 打开Chrome，打开【扩展】，右上角，选中【开发者模式】；
  - 点击【加载已解压的扩展程序】载入；根据需求配置扩展选项，验证扩展工作正常；
  - 点击【打包扩展程序】，指向源码文件夹，输出打包好的扩展, 默认是`<源码文件夹名>.crx`；

- **如果是打包好的扩展**，即crx文件, 跳过以上步骤，执行以下步骤。

- 临时安装扩展获取扩展ID。把打包好的crx文件，直接拖入到扩展程序窗口安装。安装好的扩展默认是禁用的，不可以使用，可以不理会。记下它的ID，32位，例如obpdhkhgjdcobgnomfhokfnlaofbcpcg。然后移除这个禁用的扩展，不需要了。
- 使用以上ID重命名crx文件，例如obpdhkhgjdcobgnomfhokfnlaofbcpcg.crx



### 准备推送扩展程序

- 把 obpdhkhgjdcobgnomfhokfnlaofbcpcg.crx 拷贝到前面准备好的本地商店的MyStore目录下；
- 验证文件是否可以下载。使用浏览器打开下载url，我的例子就是：

```plain
http://example.com:8080/mystore/obpdhkhgjdcobgnomfhokfnlaofbcpcg.crx
```
- 如果没有弹窗认证，直接下载窗口就可以了；
- 编写扩展安装的manifest XML文件,取名update.xml。样本如下：

```plain
<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
  <app appid='obpdhkhgjdcobgnomfhokfnlaofbcpcg
'>
    <updatecheck codebase='https://example.com/mystore/obpdhkhgjdcobgnomfhokfnlaofbcpcg.crx' version='1.0' />
  </app>
</gupdate>
```
- 把`update.xml`拷贝到扩展文件同一目录并测试它的url；
- 记下update.xml的url；


### 开始推送扩展

开始之前，确保以下都有：

- Extension ID 就绪；
- manifest XML的下载url就绪；

**开始**

- 新建一条组策略；编辑策略找到`Computer Configuration/Administrative Templates/Google/Extensions/Configure the list of force-installed apps and extensions`

- 填入上面记下的**Extension Id** 和manifest XML的url,它们之间使用英文分号分开，例如：
```plain
obpdhkhgjdcobgnomfhokfnlaofbcpcg;http://example.com/mystore/update.xml
```
- 测试策略。链接策略到一个测试计算机对象OU。
- 验证结果。1. 查看Google策略项是否应用成功。查看chrome://policy 2.  如果扩展推送成功，用户Chrome应该可以看到扩展，且不可以删除。



## 参考

[Google Enterprise: Hosting your extension](https://docs.google.com/document/d/1pT0ZSbGdrbGvuCsVD2jjxrw-GVz-80rMS2dgkkquhTY/edit#)
