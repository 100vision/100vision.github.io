---
# 这是文章的标题
title: Linux：很牛B的一些Shell命令
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 4
# 设置作者
# 设置写作时间
date: 2023-02-14
# 一个页面可以有多个分类
category:
  - Linux
# 一个页面可以有多个标签
tag:
  - Linux
  - Shell
  - 脚本编程

# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

### 1. 以sudo运行上条命令
```shell
$sudo !!
```
通常出现的情况是，敲完命令执行后报错才发现忘了sudo。这时候，一般会：按上箭头，按左箭头，盯着光标回到开始处，输入sudo，回车；高手用户就蛋定多了，按Ctrl-p，按Ctrl-a，输入sudo，回车。


### 2、使用python起一个HTTP服务器共享当前文件夹
```shell
$python -m SimpleHTTPServer 8080
```

python3则
```shell
python3 -m http.server 8080
```

### 3. 普通用户保存特权文件

```shell
:w!sudo tee %
```

### 4. 快速拷贝一个文件
```shell
$cp filename{,.bak}
```

### 5、 替换上一个命令行的字符并执行
```shell
$ !!:s/foo/FOO
```
当你需要上一个命令的一些字符并重新执行

### 原创
https://plantegg.github.io/2017/01/01/top_linux_commands/