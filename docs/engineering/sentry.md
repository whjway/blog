---
title: sentry 前端监控从0部署
---

## [安装docker](https://docs.docker.com/engine/install/centos/)

1.查看centOS 版本

```bash
cat /etc/redhat-release

> CentOS Linux release 7.6.1810 (Core)
```

2.卸载旧版本

```bash
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
```

3.设置存储库

```bash
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

> 报错 `Could not fetch/save url https://download.docker.com/linux/centos/docker-ce.repo to file /etc/yum.repos.d/docker-ce.repo: [Errno 14] curl#6 - "Could not resolve host: download.docker.com; 未知的错误"`

>解决办法：
    1.`vim /etc/sysconfig/network-scripts/ifcfg-ens33`
    2.DNS1=8.8.8.8
    DNS2=114.114.114.114
    PEERDNS="no"
    3.service network restart

4.安装Docker引擎

```bash
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

> 报错

```bash
错误：软件包：docker-ce-rootless-extras-20.10.21-3.el7.x86_64 (docker-ce-stable)
          需要：fuse-overlayfs >= 0.7
错误：软件包：docker-ce-rootless-extras-20.10.21-3.el7.x86_64 (docker-ce-stable)
          需要：slirp4netns >= 0.4
错误：软件包：containerd.io-1.6.9-3.1.el7.x86_64 (docker-ce-stable)
          需要：container-selinux >= 2:2.74
错误：软件包：3:docker-ce-20.10.21-3.el7.x86_64 (docker-ce-stable)
          需要：container-selinux >= 2:2.74
 您可以尝试添加 --skip-broken 选项来解决该问题
 您可以尝试执行：rpm -Va --nofiles --nodigest
```

> 解决办法

```bash
#进入yum 源配置文件夹
cd /etc/yum.repos.d
mv CentOS-Base.repo CentOS-Base.repo_bak

在文件顶部添加一个条目/etc/yum.repos.d/docker-ce.repo，内容如下：
[centos-extras]
name=Centos extras - $basearch
baseurl=http://mirror.centos.org/centos/7/extras/x86_64
enabled=1
gpgcheck=0

# 保存退出


#然后安装命令：
yum -y install slirp4netns fuse-overlayfs container-selinux
```

5.启动

```bash
sudo systemctl start docker
```

6.开机启动

```bash
sudo systemctl enable docker
```

7.关闭Docker

```bash
sudo systemctl stop docker
```

## [安装docker-compose](https://docs.docker.com/compose/install/other/)

1.下载docker-compose
    `curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
2.赋予执行权限
    `chmod +x /usr/local/bin/docker-compose`
3.测试、查看版本
    `docker-compose  version`

## [安装sentry](https://develop.sentry.dev/self-hosted/)

### [拉取git项目](https://blog.csdn.net/Jason_Math/article/details/123940302)

- 安装git
`yum install git`
- 服务器生成授信证书
`ssh-keygen -t rsa -C 'xxx@126.com'`
- 注册github账号设置并ssh
`点击 github 网页右上角的用户头像->settings->SSH and GPG keys->New SSH key`

### 安装sentry

1.执行`./install.sh`
2.安装成功后`docker-compose up -d`
3.默认`http://ip:9000`

> 问题：下载镜像太慢

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://tczcq49z.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

// "http://hub-mirror.c.163.com"
```

### docker-compose 命令

1.基于docker-compose.yml启动管理的容器
    docker-compose -up -d
2.查看docker-compose管理的容器
    docker-compose ps
3.开启、重启、停止正在运行的容器
    docker-compose start
    docker-compose restart
    docker-compose stop
4.关闭并删除容器
    docker-compose down
5.查看日志
    docker-compose logs
6.删除所有（停止状态的）服务容器
    docker-compose rm
    删除所有（包括非停止状态的）服务容器
    docker-compose rm -f
7.查看版本
    docker-compose version

## 配置source-map

1. 安装[sentry-webpack-plugin](https://github.com/getsentry/sentry-webpack-plugin)
2. 获取一个token`左上角账户-API keys-Createds New Token` 勾选project:write

3. usage
   - `release`要一致
   - 对应好`org` `project` 以及资源路径

```javascript
// main.js
Sentry.init({
  Vue,
  dsn: "xxx,
  release: process.env.RELEASE,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
});
```

```javascript
// vue.config.js
const SentryPlugin = require("@sentry/webpack-plugin");
const TIMESTAMP = Date.parse(new Date());

configureWebpack: {
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                RELEASE: TIMESTAMP,
            },
        }),
        new SentryPlugin({
            include: path.join(__dirname, `./dist/static/${TIMESTAMP}`), // 需要上传到sentry服务器的资源目录,会自动匹配js 以及map文件
            release: process.env.RELEASE, // 版本号
            url: "服务器地址",
            org: "sentry",
            project: "51credit",
            authToken:
                "token",
            // cleanArtifacts: true, //每次先清除已经存在的文件，再上传
            urlPrefix: `${CDN_ADDRESS.static}`, //  线上对应的url资源的相对路径
        }),
    ],
},

```

## 参考文档

- [CentOS 安装 docker详解](https://blog.csdn.net/qq_36793589/article/details/121134988)
- [为你的项目搭建sentry并且通过企微推送](https://ericli.blog.csdn.net/article/details/126161122#comments_23825500)
- [安装docker报错 Requires: fuse-overlayfs ＞= 0.7](https://blog.csdn.net/redamancy_0227/article/details/120991752)
- [Docker镜像相关操作（切换镜像源、查询、获取、查看、创建、上传、保存、删除等）](https://blog.csdn.net/Fighting_hawk/article/details/122706496)
- [sentry上传source-map](https://blog.csdn.net/qq_41883423/article/details/120218983)
