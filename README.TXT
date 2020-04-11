### 项目开始
接口数据来自vue-music 黄轶老师的数据接口
通过vue.config.js里的devServer proxy实现正向代理，解决跨域问题
首页包括头部，导航栏，内容区域
通过点击导航栏，切换不同的组件，展示不同的内容

### 项目第一天
通过axios发起请求，获取轮播图数据，通过第三方插件swiper渲染轮播图
better-scroll插件实现滚动效果
flex实现布局

完成页面布局之后，通过vue-lazyLoad实现图片懒加载

### 项目第二天
渲染歌手组件
通过jsonp获取歌手信息，并对数据进行处理，如[{index:'热门',singer:[{singerName:'薛之谦'...},{singerName:"周杰伦"...}]}]
处理好数据之后，渲染页面会变得非常简单

接着也是通过better-scroll插件实现滚动效果
侧边快速入口与歌手列表的联动实现效果见博客：https://www.cnblogs.com/vnwith/p/12528351.html

### 项目第三天
点击歌手，进入歌手歌单页面，通过动态路由传参的方式，再点击某个歌手时，动态传入一个ID，获取该歌手的数据信息
通过better-scroll插件实现滚动效果

### 项目第四天
点击音乐，进入音乐播放，点击歌曲时，获取该歌曲的songid，通过axios获取歌曲的信息，进行播放
也是通过songid获取歌曲播放地址，布局，通过vuex管理播放器状态

到此项目完结
个人遇到的问题，第一个是如何再不需要后端配合的情况下进行跨域访问，后来通过devServer解决
第二个问题是使用的第三次插件better-scroll插件有问题，当用谷歌浏览器打开页面时，页面无法滚动，刷新后恢复正常，手机端浏览不需要刷新也可正常使用

第三个问题 使用better-scroll实现歌词滚动有bug
手动用transition 和 transfrom 实现歌词滚动
歌词页加载后，this.$nextTick获取Dom更新后第一个元素的offsetTop，transfrom滚动到页面顶端
播放歌曲时，监听歌曲当前的行，lineNum，元素的行高 乘以 lineNum，获取滚动距离

