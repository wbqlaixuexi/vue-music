<template>
  <div class="recommend">
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <Banner></Banner>
        <div class="titile">热门歌单推荐</div>
        <ul>
          <li v-for="item in songList" :key="item.dissid" ref="li">
            <div class="imgBox">
              <img v-lazy="item.imgurl" alt="" />
            </div>
            <div class="word">
              <p>{{ item.creator.name }}</p>
              <span>{{ item.dissname }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../Banner";
import BScroll from "better-scroll";
import { getSong } from "../api/api";
export default {
  data() {
    return {
      songList: []
    };
  },
  methods: {
    initBScroll() {
      let wrapper = document.querySelector(".wrapper");
      this.$scroll = new BScroll(".wrapper");
    }
  },
  components: {
    Banner
  },
  created() {
    getSong()
      .then(res => {
        
        this.songList = res.data.list;
        this.$nextTick(() => {
          
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  updated(){
    this.initBScroll();
  }
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
.recommend {
  .wrapper {
    .w(375);
    position: fixed;
    top: 88px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    .content {
      .w(375);
      .titile {
        .w(375);
        .h(65);
        display: flex;
        justify-content: center;
        align-items: center;
        .fontSize(16px);
        color: #ffcd32;
      }
      li {
        padding-top: 0;
        .padBtm(20px);
        .padRight(20px);
        .padLeft(20px);
        box-sizing: border-box;
        .w(375);
        .h(82);
        .imgBox {
          .w(60);
          .h(60);
          .padRight(20px);
          display: inline-block;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .word {
          display: inline-block;
          vertical-align: top;
          p {
            .fontSize(16);
            .padBtm(10);
            .padTop(6);
            color: #fff;
          }
          span {
            .fontSize(16);
            vertical-align: top;
            color: rgba(255, 255, 255, 0.3);
          }
        }
      }
    }
  }
}
</style>
