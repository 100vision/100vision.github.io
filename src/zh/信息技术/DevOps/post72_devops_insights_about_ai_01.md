---
title: AI：ChatGPT: ChatGPT和ChatGPT提示语技巧
icon: page
order: 72
date: 2023-11-06
category:
  - ai
  - 转载
tags:
  - ChatGPT
  - 观点
  - 技巧
  - 效率工具
  - 提示语
  - prompt

sticky: true
star: true
footer: 
copyright: 无版权
---




## 前言 

推上看到的，使用一个好的提示语(prompt)，可以让`ChatGPT`更好地、精确输出你想要的内容。否则，ChatGPT只会给出模糊的答案，让你觉得AI也不过如此。

## 正文

一个好的提示，提问，应该是：

>明确提问目的：在提问之前，请先明确你想要获取的信息类型，是专业知识、建议、指导还是其他类型的信息。

>简洁明了：尽量让问题简洁明了，避免使用复杂或者模糊的措辞，以便让ChatGPT更准确地理解你的需求。

>提供背景信息：在提问时，提供足够的背景信息可以帮助ChatGPT更好地了解问题的上下文，从而给出更准确的答案。

>使用关键词：在问题中包含关键词，有助于ChatGPT快速定位到相关领域的知识，提高回答的准确性。

>分步提问：对于复杂的问题，可以考虑将其拆分成多个简单的问题，逐一询问。

>检查回答：在获得回答后，务必检查兴准确性和相关性。ChatGPT可能会犯错误或者提供不完全正确的信息

##个人总结

### 关于提示语

- 以上prompt我总结，开口提问第一句应是`我要你扮演XXX角色，帮助我.....`来明确A限定AI的专业角色。
- 应该适用于各家的AI。 比如`Google Bard`和`Claude AI`
- 写运维脚本的好帮手，是助手、也是老师。
- 如果不想自己写提示语，看看一些模板。

**提示语模板网站**

- https://github.com/f/awesome-chatgpt-prompts 
- https://www.aishort.top/。 

**提示语举例**

1、苏格拉底问答

>假设你是一个始终用苏格拉底风格回答问题的导师。你不会直接给我答案，而是会引导我去思考，可以吗？

2、一个Linux终端。

>I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first command is pwd




### 关于AI使用

目前有AI服务商都提供两种访问方式，一是使用浏览器访问AI服务商，另一种是申请AI服务商的API。

- 使用浏览器访问AI服务。

我最常用的是用浏览器访问微软`new Bing`，点[这里访问](https://www.bing.com/new)。因为可以免费使用GPT-4，最稳定，其他的服务商只是GPT 3.5水平；

- 使用AI服务商的API

AI服务商提供的API，有付费也有免费的。Open Chat有3个月试用体验，其他家的不要申请，还有地区限制。

有了API，就需要配合一些浏览器插件，或是桌面来使用。例如Chrome就有`ChatHub`（付费）

- 另外网上还有一些套壳`Open ChatGPT`、`Claude AI` API的站点，但都不靠谱，要不收费要不一阵子就不能用了。
