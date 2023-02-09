---
# This is the title of the article
title: networking 1#
# This is the icon of the page
icon: page
# This control sidebar order
order: 1
# Set author
author: tlin82
# Set writing time
date: 2020-01-01
# A page can have multiple categories
category:
  - Guide
# A page can have multiple tags
tag:
  - Page config
  - Guide
# this page is sticky in article list
sticky: true
# this page will appear in starred articles
star: true
# You can customize footer content
footer: Footer content for test
# You can customize copyright content
copyright: No Copyright
---

Content before `more` comment is regarded as page excerpt.

<!-- more -->

## Page Information

You can set page information in Markdown’s Frontmatter.

- The author is Ms.Hope.
- The writing date is January 1, 2020
- Category is "Guide"
- Tags are "Page Config" and "Guide"

## Page Content

You are free to write your Markdown here.

::: tip Assets

- You can place images besides your Markdown files, but you should use **relative links** (i.e.: starting with `./`) for them.

- For images in `.vuepress/public` directory, please use absolute links (i.e.: starting with `/`) for them.

:::

The theme contains a custom badge:

> A dark blue badge text badge at the end of line. <Badge text="Badge text" color="#242378" />



```java
public void getValues (Integer counter,String name) {
	system.out() "what's wrong with this "
}
```

## images
![image](./images/access_denied.png)
