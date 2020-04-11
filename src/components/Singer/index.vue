<template>
  <div class="singer">
    <transition name='go'>
      <router-view v-if='showDetail'></router-view> 
    </transition>
    <ul
      class="AZlist"
      @touchstart="touchStart"
      @touchmove="touchMove"
    >
      <li
        v-for="(item, index) in AZlist1"
        :key="index"
        :class="index == activeClass ? 'active' : ''"
        @click="clickhandle(index)"
      >
        {{ item }}
      </li>
    </ul>
    <div class="fixed" v-show="activeFixed" @click='jump(topElement)'>{{ topElement }}</div>
    <div class="wrapper" ref="wrapper">
      <div class="content" ref="content">
        <ul class="all">
          <li class="allList" v-for="(item, index) in sortList" :key="index">
            <div class="title" :ref="index">
              {{ item.Findex }}
            </div>
            <ul>
              <li
                class="singerList"
                v-for="(item1, index) in item.list"
                :key="index"
                @click='goDetail(item1.Fsinger_mid)'
              >
                <img :src="item1.Fsinger_img" alt="" />
                <span>{{ item1.Fsinger_name }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
    
  </div>
</template>

<script>
import jsonp from "jsonp";
import BScroll from "better-scroll";
import normalData from "./data";
export default {
  data() {
    return {
      singerList: [],
      sortList: {},
      activeFixed: false,
      activeClass: 0,
      clientData: [],
      topElement: "",
      topIndex:0,
      topClient:0,
      clientWidth:0,
      showDetail:false
    };
  },
  methods: {
    goDetail(Fsinger_mid){
      this.showDetail = true
      this.$router.push(`/Singer/${Fsinger_mid}`,() => {},e => console.log(e))
},
    jump(obj){
      this.$scroll.scrollTo(0,-this.clientData[this.topIndex],400)
    },
    touchStart(e) {
      this.startDomClient = e.touches[0].clientY - this.topClient;
      let move = this.caclMove(this.startDomClient);
      this.activeClass = move;
      this.$scroll.scrollTo(0, -this.clientData[move], 200);
    },
    caclMove(num) {
      let move = parseInt(Math.abs(num / this.clientWidth));
      if (move >= this.clientData.length - 1) {
        move = this.clientData.length - 1;
      } else if (move <= 0) {
        move = 0;
      }
      return move;
    },
    touchMove(e) {
      let num = e.touches[0].clientY - this.topClient;
      let move = this.caclMove(num);
      this.$scroll.scrollTo(0, -this.clientData[move], 200);
    },
    getInfo() {
      let url =
        "https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq";
      return new Promise((resolve, reject) => {
        jsonp(url, { param: "jsonpCallback" }, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    },
    initBScroll() {
      this.$scroll = new BScroll(".wrapper", { probeType: 3,click:true });
      this.$scroll.on("scroll", res => {
        let scrollClient = Math.abs(res.y);
        if (scrollClient > 300) {
          this.activeFixed = true;
        } else {
          this.activeFixed = false;
        }
        for (let index = 0; index < this.clientData.length; index++) {
          if (
            scrollClient >= this.clientData[index] &&
            scrollClient < this.clientData[index + 1]
          ) {
            this.activeClass = index;
            this.topElement = this.sortList[index].Findex;
            this.topIndex = index
          } else if (
            scrollClient >= this.clientData[this.clientData.length - 1]
          ) {
            this.activeClass = this.clientData.length - 1;
            this.topElement = this.sortList[this.sortList.length - 1].Findex;
            this.topIndex = this.sortList.length -1
          }
        }
      });
    },
    getClient() {
      for (const key in this.$refs) {
        if (Array.isArray(this.$refs[key])) {
          this.clientData.push(this.$refs[key][0].offsetTop);
        }
      }
    },
    clickhandle(i) {
      this.$scroll.scrollTo(0, -this.clientData[i], 400);
    }
  },
  created() {
    this.getInfo()
      .then(res => {
        this.singerList = res.data.list;
        this.sortList = normalData(this.singerList);
        console.log(this.sortList)
        this.$nextTick(() => {
          let hot = document.querySelector("ul").children[0]
          this.topClient = hot.getBoundingClientRect().y
          this.clientWidth = hot.getBoundingClientRect().height
          this.initBScroll();
          this.getClient();
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    AZlist1() {
      let AZList = [];
      for (let index = 0; index < this.sortList.length; index++) {
        AZList.push(this.sortList[index].Findex);
      }
      AZList.splice(0, 1, "热");
      return AZList;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../less/index.less";
@import '../animate/index.css';
.singer {
  .fixed {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    .padLeft(20);
    height: 30px;
    .w(375);
    background-color: #333;
    line-height: 30px;
    z-index: 9;
    position: fixed;
    top: 89px;
  }
  .wrapper {
    .w(375);
    position: fixed;
    top: 88px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    .allList {
      .w(375);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 10px 0;
      .title {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        .padLeft(20);
        height: 30px;
        .w(375);
        background-color: #333;
        line-height: 30px;
      }
      .singerList {
        box-sizing: border-box;
        padding: 20px 0 0 30px;
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        span {
          font-size: 14px;
          display: inline-block;
          margin-left: 20px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  .AZlist {
    position: absolute;
    right: 0;
    top: 149px;
    .w(20);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 12px;
    padding: 20px 0;
    border-radius: 10px;
    z-index: 9;
    li {
      color: rgba(255, 255, 255, 0.5);
      padding: 3px;
      font-family: Helvetica;
      height: 12px;
    }
    .active {
      color: @orange;
    }
  }
}
</style>
