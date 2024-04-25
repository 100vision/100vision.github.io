---
title: 推荐：中文输入法：rime输入框架和雾凇拼音
icon: page
order: 76
date: 2024-04-22
category:
  - 随笔
  - 原创
  - 生活常识
tags:
  - 随笔
  - 观点
  - 输入法


sticky: false
star: true
footer: 
copyright: 无版权
---




## 前言 

经常上网的对输入法应用收集个人信息一定有耳闻，如果注意个人隐私保护可以考虑使用现在网上很多开源的输入法。

其中以`rime`输入法框架开发的输入法比较受好评，你会说比`某狗输入法`或是好在哪里？

- 隐私保护好，不会收集个人数据(这是本人最在意的)。其他输入法很少做得到吧。

- 简洁。外观简洁，没有花里胡哨的功能。
- 高度定制化。可以增加很多词库。Windows系统自带的`微软拼音` 好像词库不多，功能比较简陋，也不支持换皮肤。

如果你既要又要，有一点动手能力，可以考虑使用`rime + 雾凇拼音` 组合方案。

## 正文

步骤：

### 安装rime输入法框架

- 下载[rime输入法框架引擎](https://rime.im/download/)。如果是 Windows平台，下载它的框架叫`小狼毫`。

- 安装rime输入法引擎

一路next即可。

### 安装和设置雾凇拼音

> 框架默认安装后，自带一个`明月拼音`，不太好用, 所以使用雾凇拼音替换。

- 下载和安装`雾凇拼音`。[下载地址](https://github.com/iDvel/rime-ice)

- 下载后解压，然后用里面的内容替换和覆盖掉`%appdata\rime`下所有文件。
- 右键系统右下角的rime输入法图标，点击【重新部署】。

- 右键设定，勾起【雾凇拼音】方案。
- 在输入法状态，按F4，指定【雾凇拼音】作为默认输入方案。


### 基本使用 

- 按左shift键，中英文切换；
- 按 `+` 向下翻更多候选词，按`-` 向上翻候选词；
- 更多使用方法。👉[用户手册](https://dvel.me/posts/rime-ice/)

### 更新词库

 - 定期下载[下载地址](https://github.com/iDvel/rime-ice)
 - 覆盖`%appdata\rime\cn_dicts` 和 `%appdata\rime\en_dicts`
 - 重新部署。


### 自定义配置

> 自定义配置后，都需要【重新部署】是配置生效。

- 增加候选词。

默认是5个，有点少。可以修改`%appdata\rime\default.custom.yaml`文件。使用`notepad ++`等工具增加一行（注意：缩进不能用tab, 用2个空格）：

```yaml
patch:
  menu/page_size: 9
```
- 左右shift键都可以中英文切换(默认只有左shift)
```yaml
patch:
  menu/page_size: 9
  "ascii_composer/switch_key/Shift_L": commit_code
  "ascii_composer/switch_key/Shift_R": commit_code 
```
- 修改雾凇输入法初始状态。

默认是中文。定位到雾凇拼音的`%appdata%\rime\rime_ice.schema.yaml`，
修改reset的值为`1`

```yaml
switches:
  - name: ascii_mode
    states: [ 中, Ａ ]
    reset: 1
```    



## 补充

### Ubuntu平台上使用rime/雾凇拼音

> Ubuntu上使用rime输入法引擎，有两种选择：

- `IBus输入法框架 + rime + 雾凇拼音`
- `fcitx5 + rime + 雾凇拼音`

`IBus`和 `fcitx5`只能选一个，我选择`IBUS`因为`fcitx5`试了很多次都不成功。

### 安装和配置IBus + rime + 雾凇拼音

- 安装Plum 
- 安装Rime
- 修改系统键盘配置

具体步骤参考 [网友KLangHu](https://www.cnblogs.com/KLangHu/p/17699295.html) 








