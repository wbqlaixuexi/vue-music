<template>
  <div class="detail">
    <div class="topheader">
      <div class="header" ref="header">
        <i class="iconfont" @click="back"> &#xe65a;</i>
        <h1>{{ name }}</h1>
      </div>
      <div class="bgc" ref="bgc"></div>
    </div>
    <div class="filter" ref="filter"></div>
    <div class="songList" ref="wrapper">
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in songList"
            @click="player(index)"
            :key="index"
          >
            <h3>{{ item.musicData.songname }}</h3>
            <p>
              {{
                `${item.musicData.singer[0].name}*${item.musicData.albumname}`
              }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import jsonp from "jsonp";
import BScroll from "better-scroll";
import { mapMutations } from "vuex";
import { getMusic, getVkeys } from "../api/api";
import axios from "../axios/axios";

export default {
  data() {
    return {
      songList: [],
      name: ""
    };
  },
  methods: {
    ...mapMutations(["pushSongList"]),
    async player(i) {
      this.$store.state.show = true;
      this.$store.state.fullScreen = true;
      let {songmid} = this.songList[i].musicData
      this.$store.state.vkey = await getVkeys(songmid)
      this.pushSongList({ songList: this.songList, index: i });
    },
    back() {
      console.log(1)
      this.$router.go(-1);
    },
    async getData(Fsinger_mid) {
      let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${Fsinger_mid}`;
      await jsonp(url, { param: "jsonpCallback" }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.$refs.bgc.style.background = `url(https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000)`;
          this.$refs.bgc.style.backgroundAttachment = "fixed";
          this.$refs.bgc.style.backgroundSize = "100%";
          this.initBS();
          this.songList = res.data.list;
          this.name = res.data.singer_name;
        }
      });
    },
    initBS() {
      let BS = document.querySelector(".songList");
      this.$bs = new BScroll(".songList", {
        probeType: 3,
        click: true
      });
      let topClient = this.$refs.bgc.clientHeight;
      this.$bs.on("scroll", ({ y }) => {
        if (Math.abs(y) > topClient - 40 && y < 0) {
          this.$refs.bgc.style.paddingTop = "0";
          this.$refs.bgc.style.zIndex = 20;
          this.$refs.bgc.style.height = "40px";
          this.$refs.filter.style.height = "40px";
          this.$refs.wrapper.style.zIndex = "-1";
        } else if (Math.abs(y) < topClient - 40 && y < 0) {
          this.$refs.bgc.style.paddingTop = "260px";
          this.$refs.bgc.style.zIndex = 1;
          this.$refs.bgc.style.height = "0";
          this.$refs.wrapper.style.zIndex = "3";
          this.$refs.filter.style.height = "260px";
          this.$refs.filter.style.zIndex = "2";
        } else if (y > 0) {
          let precent = 1 + y / 260;
          this.$refs.bgc.style.transform = `scale(${precent})`;
          this.$refs.bgc.style.transformOrigin = `top`;
          this.$refs.filter.style.transform = `scale(${precent})`;
          this.$refs.filter.style.height = `100%`;
          this.$refs.bgc.style.paddingTop = "260px";
        } else {
          this.$refs.bgc.style.transform = `scale(1)`;
          this.$refs.bgc.style.paddingTop = "260px";
          this.$refs.bgc.style.zIndex = 1;
          this.$refs.bgc.style.height = "0";
        }
      });
    }
 
  },
  async created() {
    await this.getData(this.$route.params.Fsinger_mid);
  }
};
</script>

<style lang="less" scoped>
@import "../../less/index.less";
.detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: #222;
  .songList {
    position: fixed;
    top: 260px;
    bottom: 0px;
    // height: 800px;
    // background: pink;
    left: 0;
    right: 0;
    z-index: 2;
    // background-color: #222;
    // min-height: 1000px;
    // background-color: #222;
    .content {
      padding: 20px 30px;
      min-height: 1000px;
      .w(375);
      background-color: #222;
      z-index: -1;
      ul{
        height:120%
      }
      li {
        .w(315);
        .h(60);
        h3 {
          .w(315);
          .h(20);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }
        p {
          .w(315);
          .h(20);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.3);
          margin-top: 3px;
        }
      }
    }
  }
  .header {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 40px;
    .w(375);
    z-index: 12;
    top: 0;
    h1 {
      font-size: 18px;
      color: #fff;
      font-weight: 400;
    }
    i {
      width: 30px;
      height: 30px;
      position: fixed;
      left: 10px;
      font-size: 30px;
      line-height: 30px;
      color: #ffcd32;
    }
  }
  .filter {
    position: fixed;
    top: 0%;
    bottom: 0;
    height: 100%;
    .w(375);
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .bgc {
    .w(375);
    padding-top: 70%;
    // background:url('https://y.gtimg.cn/music/photo_new/T001R300x300M000001BLpXF2DyJe2.jpg?max_age=2592000') fixed no-repeat;
    background-size: 100%;
    // background-color: pink;
  }
}
</style>
