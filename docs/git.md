---
title: Git 常用
---

## [官方文档](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)

## [git提交规范](https://juejin.cn/post/6934292467160514567#heading-14)

type指本次提交的类型，为必填项，必须为以下之一：

```code
feat: 一项新功能  
fix: 一个错误修复  
docs: 仅文档更改 readme changelog  
style: 不影响代码含义的更改（空白，格式，缺少分号等）  
refactor: 既不修正错误也不增加功能的代码更改（重构）  
perf: 改进性能的代码更改  
test: 添加缺失或更正现有测试,测试用例 单元测试、集成测试  
build: 影响构建系统或外部依赖项的更改（gulp，npm等）  
ci: 对CI配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs）  
chore: 更改构建过程或辅助工具和库，例如文档生成  
revert：回滚  
release: 发布新版本  
workflow:工作流  
```

## [git进阶整理](https://juejin.cn/post/7133045617877581831)

### branch 管理

```shell
git checkout -b test 克隆当前分支到新分支test，并切换到test分支
git checkout -b test master 克隆本地分支master到本地test，并切换到test分支
git checkout -b test origin/master 克隆远程分支origin/master到本地test，并切换到test分支
git merge [branchName] 将branchName合并到当前分支
git merge [branchName] --squash 将branchName分支合并到当前分支，并将branchName上的所有提交记录合并成一次提交
git commit --amend 修改上次提交的message，不会新增commit记录，会修改commithash
git branch -D [branchName] 删除本地分支
git push -D origin [branchName] 删除远程分支

git branch -a 查看所有分支，包括远程分支
git branch -vv 查看本地分支与远程分支的映射关系
git branch -u origin/[branchName] 绑定本地分支与远程分支的映射
git branch --set-upstream-to=origin/[branchName] 绑定本地分支与远程分支的映射
git branch --unset-upstream 删除当前分支与远程分支的映射关系
```

### [rebase变基](https://blog.csdn.net/the_power/article/details/104651772/)

```shell
git rebase origin/[branchName]

// 假设当前分支dev, commit 为 a b c d e
// 假设master分支, commit 为 a b f g h
git rebase origin/master
// 当前分支dev commit 变为 a b f g h c d e
// 如果有冲突
// 处理冲突 git add 冲突文件
// 继续 git rebase --continue
// 回到命令前 git rebase --abort
```

#### rebase -i 提交整理

场景：使用merge导致git提交线乱七八糟，提交日志过多非常难看。自从使用了rebase提交线变得无比丝滑，使用rebase -i合并每个需求的所有提交成1个，使日志变得清晰

- 所有的提交按时间倒序排列
- 被s的会合并到上一次commit,也就是当前排列的上一个里面

```shell
git rebase -i HEAD~10 // 调整最近10次提交的日志、或合并多次提交为1次，让log更好看更清晰
```

### stash贮藏代码

场景：当你的功能还没开发完不能commit但是现在需要rebase下master,缓存区的代码该咋办？当你写了几行代码，但是现在需要切到其他分支去改bug，缓存区的代码该咋办？ 用git stash就好啦

```shell
git stash 贮藏代码
git stash save 'message' 带备注贮藏代码
git stash –keep-index “message” 只会备份那些没有被add的文件，即改动和删除文件在保存进度后不会将暂存区重置。默认会将暂存区和工作区强制重置。
git stash apply  恢复最新添加的贮藏代码
git stash apply [stashName] 恢复指定贮藏代码
pop 用法与apply一样 只是在不冲突时会删掉stashid
git stash list 贮藏列表
git stash show -p  [stashName] 显示最新（指定）贮藏改动
```

### 提交代码

```shell
git commit -a -m 'message' 直接提交全部工作区内容(新文件不行)
git commit -m -n 强制提交不走钩子
git push -f 强制提交代码本地代码覆盖远程
git push --force-with-lease  强制推送 比较安全
```

[Git 更安全的强制推送，--force-with-lease](https://blog.csdn.net/WPwalter/article/details/80371264)

### [回退](https://blog.konghy.cn/2018/04/28/git-reset/)

```shell
git log 查看提交日志
git reset 将所有暂存区回退到工作区
git checkout . 丢弃工作区所有更改
git reset --hard 丢弃工作区、暂存区所有更改
git reset --hard [commit hash] 将从commithash(不包括此hash)之后的丢弃
git reset --hard HEAD~1 回退最近1次提交
git reset --soft [commit hash] 将从commithash(不包括此hash)之后的提交回退到暂存区
git reset --soft HEAD~1 回退最近1次提交到暂存区
```

### [revert](https://blog.csdn.net/liuxiao723846/article/details/122691779)

场景：revert 可以撤销指定的提交内容，撤销后会生成一个新的commit。

```shell
git revert [commit hash] 非merge的commit
git revert -m [1|2] [commit hash] merge类型的commit
```

### [cherry-pick 复制某个commit](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

场景：对于多分支的代码库，将代码从一个分支转移到另一个分支是常见需求。
这时分两种情况。一种情况是，你需要另一个分支的所有代码变动，那么就采用合并（git merge）。另一种情况是，你只需要部分代码变动（某几个提交），这时可以采用 Cherry pick。

### 删除(忽略)文件

删除本地文件

```shell
git rm test.txt (删除文件)
git rm -r test (删除文件夹)
// 再commit->push远程
```

不删除本地文件，只是不加入git

```shell
// 把xxx.js加到`.gitignore`里面忽略掉，然后提交使.gitignore生效，也既是
git rm -r --cached xxx.js　　//-r 是递归的意思   当最后面是文件夹的时候有用
// 再commit->push远程
```

### [IntelliJ IDEA 中的 Git Stash 与 Shelve](https://blog.csdn.net/weixin_43274002/article/details/124079432)

1. Stash是Git提供的功能，而shevle是IDEA本身提供的功能。
2. Stash只能针对当前整个分支所有未commit的文件进行操作；而Shelve更灵活，可以对单个或多个未commit的文件进行操作；
3. 要恢复stash的文件时（unstash操作），如果本地有尚未commit的修改，那么此次unstash操作会失败。IDEA右下角会弹出提醒：你的本地修改将会被merge覆盖。请commit，stash或revert它们之后再继续。而恢复shelve的文件时（unshelve操作），无论本地有没有被修改的文件都不会影响。解决可能产生的冲突即可。
4. Stash的文件是放在.git文件中；Shelve的文件是放在.idea/shelf文件中。这意味着Stash的文件比Shelve的文件有更强的可移植性。
