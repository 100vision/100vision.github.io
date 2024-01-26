---
title: 工具介绍系列：多媒体：ffmpeg
icon: page
order: 79
date: 2024-01-25
category:
  - 工具
  - 工具利器
  - 效率工具
tags:
  - 视频剪辑
  - ffmpeg
  - 声道
  - 家庭影院

sticky: false
star: true
---



## 前言

大名鼎鼎的`FFmpeg`，很强大的多媒体工具和开源开发工具库，可以用来剪辑、抽取音视频。

[[FFmpeg官网]](https://ffmpeg.org/)




## 正文

### 使用命令行

>使用起来很简单，一条命令行即可。

- 转换视频格式
```
$ ffmpeg -i input.mp4 output.avi
```

- 从视频中抽取全部音频（方法1）。例如：
```
$ ffmpeg -i input.avi -vn -acodec copy output.aac
```
`vn`, 排除视频，no video
`-acodec copy`，拷贝所有声道。

- 从视频中抽取全部音频（方法2），例如：
```
$ ffmpeg -i input.mov -map 0:a -c copy output.m4a
```
- 从视频中抽取部分音频（按时间长度）。例如：

```
$ ffmpeg -i sample.avi -ss 00:03:05 -t 00:00:45.0 -q:a 0 -map a sample.mp3
```

- 从视频中抽取部分音频（按声道）。例如抽取声道4：
```
$ ffmpeg -i input.mkv -map 0:a:3 -c copy output.m4a
```

 ### 使用GUI
还有一些基于`FFmpeg`开发的GUI图形界面，例如`LosslessCut`，项目地址：

[Lossless Cut](https://github.com/mifi/lossless-cut/releases)

## 扩展

### 什么是声道

> 声道是指在声音录制或播放时，根据不同空间位置采集或回放的相互独立的音频信号。声道数通常反映了声音录制时的音源数量或回放时相应扬声器的数量。

- 声音录制或采集时，声道就是指声源。例如5声道就意味着5个声源，前后左右中，从5个不同位置采集。

- 声音播放时，声道就是指几个播放声道，即几个扬声器（喇叭）。

举例：

- 5声道的音乐或视频需要5个扬声器才能有播放所有声道，两个扬声器，就只能播放2个声道。


### 什么是a.b.c声道音响系统 

家庭影院常说7.1.4声道音响,
- 7 是指7个扬声器（音箱），中置1个，左右前置2个，左右环绕2个，左右后置2个
- 1 是指 1个低音炮数量
- 4 是指 4个天空扬声器（吊顶）。

