---
# 这是文章的标题
title: 关于本博客（置顶）
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 67
# 设置作者
# 设置写作时间
date: 2023-10-19
# 一个页面可以有多个分类
category:
  - 随笔
  - 博客
# 一个页面可以有多个标签
tag:
  - 随笔

# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 无版权
---




# 前言 

写篇文章记录如何使用本博客，怕后面忘了。




# 正文

## 主题部署

博客使用的空间是`GitHub Pages`，如何在GitHub Pages上部署可以参考 [官方文章：Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

:::tip 部署位置
博客也支持部署到其他空间，例如国内的`Gitee`。区别是Gitee上可以直接访问,速度也更快，但内容可能不能太敏感。Github呢，使用自己域名不用备案，缺点就是要翻墙访问，各有好处吧。
:::

本博客使用的网站主题是这位大佬 [Hope](https://theme-hope.vuejs.press/zh/) ，大佬还写了很好的小白教程指导怎么部署，移步学习[部署项目到GitHub Pages](https://theme-hope.vuejs.press/zh/cookbook/tutorial/deploy.html)

## 使用博客

> 参看前面部署好博客网站后，开始介绍一下基本使用，例如写博客。

### 准备

- 安装和配置好Git  [下载Git](https://git-scm.com/downloads);
- 安装VS Code等支持Markdown的文本编辑器；[下载Visual Studio Code](https://code.visualstudio.com/download)
- 熟悉以下Markdown基本语法。可以参考[Markdown基本使用](https://theme-hope.vuejs.press/zh/cookbook/markdown：


### 撰写新文章

按照大佬文章部署了主题网站到你的GitHub库，这时库里只有一些主题框架内容。

- git clone远程代码库到本地；
- 使用VS Code等支持Markdown的文本编辑器新建一个Markdown文档；
- 粘贴以下文章头模板信息到Markdown文档最前面。
```markdown
---
# 这是文章的标题
title: 关于本博客
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 26
# 设置作者
# 设置写作时间
date: 2023-05-11
# 一个页面可以有多个分类
category:
  - 随笔
  - 博客
# 一个页面可以有多个标签
tag:
  - 随笔

# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 无版权
---
```

- 在`---` 这个标识下开始写文章内容。
- 使用`git add`,`git commit`,`git push` 推送文章到GitHub远程库。
- 查看文章是否推送成功。如果没有成功，如果是使用了`Github Actions`流水线，可以查看流水线那个动作出错了。
根据我的经验，通常是在文章里面使用了一些特殊字符引起了Vue语法错误导致项目编译出错，下面注意事项区会说。



### 修改文章

修改文章也很简单，把本地git库的文章修改后，然后重新提交到远程库即可。

## 注意事项

### 关于插入图片

>文章里的图片只要不要太大，可以和文章一起放入代码库。

:::tip 
当然，也可以使用[imgUrl](https://imgur.com)等外部公共图床
:::

大佬教程里介绍了几种方式插入图片，我用的是相对路径的方法把图片插入。

步骤：

- 新建一个目录，例如`PostImg`;
- 放入图片到该目录；
- 然后在文章里使用相对路径引用；例如 
```markdown
![这是图片标题](../../images/example.jpeg)
```
::: warning 避坑

不要插入文件扩展名是**英文大写**的静态资源文件。例如`.JPG`、`.PNG`，如果使用了，项目会编译不成功，文章也就不能发布成功，我也不知道为什么。查看我的踩坑故事，移步: [踩坑:关于本主题博客插入图片](../生活随笔/本博客图片插入注意.md)
:::

### 关于特殊字符的使用

- 不要在文章里出现`<>` 尖扩号，否则在Vue下编译不成功，最终文章发布不了。

- 其他没有了。以后碰到了，再记录。