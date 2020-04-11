<template>
  <div class="search">
    <div class="searchBox">
      <i class="iconfont">&#xe62f;</i>
      <input
        type="text"
        ref = 'input'
        v-model="value"
      />
    </div>
    <div class="wrapper">
      <div class="content">
        <ul class="songList">
          <li v-for="item in songList" :key="item.songmid"
                @click="play"
          >
            <i class="iconfont">&#xe604;</i>
            <p>{{ item.songname }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import { getSearch } from "../api/api";
import BScroll from "better-scroll";
// import { throttle } from "../throttle/throttle";
import axios from "../axios/axios";
export default {
  data() {
    return {
      value: "",
      songList: []
    };
  },
  methods: {
    search() {
       this.$refs.input.addEventListener('input',this.throttle(this.getSearch,1000))
    },
    getSearch() {
      let url = `/api/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=${this.value}&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5`;
      axios.get(url).then(res => {
        this.songList = res.data.song.list;

      });
    },
    initBS() {
      this.BS = new BScroll(".wrapper", { probeType: 3, click: true });
    },
    throttle(fn, time = 1000) {
      let prev = 0;
      return function() {
        let now = Date.now();
        let content = this;
        if (now - prev >= time) {
            fn.call(content);
            prev = now
        } else {
          return;
        }
      };
    },
    play(){
        
    }
  },
  mounted() {
    this.$nextTick(() => {
    this.$refs.input.addEventListener('input',this.throttle(this.getSearch,1000))
      this.initBS();
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../less/index.less";
.search {
  padding: 0 20px;
  .searchBox {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    .h(40);
    background-color: #333;
    border-radius: 12px;
    overflow: hidden;
    i {
      .h(24);
      .w(24);
      text-align: center;
      line-height: 24px;
      font-size: 18px;
      padding: 0 10px;
    }
    input {
      background-color: rgba(0, 0, 0, 0);
      border: 0;
      width: 80%;
      outline: none;
      color: @orange;
    }
  }
  .wrapper {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 20px;
    right: 20px;
    top: 132px;
    overflow: hidden;
    .content {
    }
    .songList {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.3);
      overflow: hidden;
      li {
        display: flex;
        align-items: center;
        padding: 6px 0;
      }
      i {
        padding: 0 10px;
      }
    }
  }
}
</style>
