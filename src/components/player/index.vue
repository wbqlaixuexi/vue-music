<template>
  <div class="player">
    <transition name="big">
      <div class="big" v-show="fullScreen">
      <div class="bgc">
        <img :src="currentSong.albumUrl" alt="" />
      </div>
      <div class="header">
        <span @click="toggleFull">v</span>
        <h2>{{ currentSong.songname }}</h2>
        <p>
          {{ currentSong.singer[0] ? currentSong.singer[0].name : "" }}--{{
            currentSong.albumname
          }}
        </p>
      </div>
      <transition-group mode="out-in">
        <div
          class="lyricBox"
          v-show="showLyric"
          @touchstart="touchStart"
          @touchend="touchEnd"
          ref="lyricBox"
          :key="1"
        >
          <div class="content" ref="content" :key="2">
            <p
              v-for="(item, index) in lyricLines"
              :key="index"
              :class="lineNum == index ? 'current' : ''"
              ref= index
              
            >
              {{ item.txt }}
            </p>
          </div>
        </div>

        <div
          class="goRight"
          @touchstart="touchStart"
          @touchend="touchEnd"
          @touchmove="touchMove"
          v-show="!showLyric"
          :key="3"
        >
          <div class="imgBox " ref='imgBox'>
            <img :src="currentSong.albumUrl" alt="" ref="img" />
          </div>
          <audio
            autoplay
            ref="audio"
            @canplay="canplay"
            @playing="playing"
            @pause="pause"
            @ended="ended"
            @timeupdate="timeupdate"
            :src="currentSong.albumAudio"
          ></audio>
          <p class="lyricP" style="font-size:14px">{{ txt }}</p>
        </div>
      </transition-group>

      <MyProgress
        :getTime="nowSongTime"
        :getDurationTime="durationTime"
        @getJumpTime="getJumpTime"
      ></MyProgress>
      <div class="bottom">
        <span @click="changeloop" class="iconfont modeIcon">{{
          loop == 1 ? "&#xe607;" : loop == 2 ? "&#xe649;" : "&#xe66b;"
        }}</span>
        <span @click="prevSong()">上一首</span>
        <p @click="goPlayer" class="iconfont player">
          {{ player ? "&#xe613;" : "&#xe626;" }}
        </p>

        <span @click="nextSong()">下一首</span>
        <span class="iconfont" style="font-size:30px;">&#xe617;</span>
      </div>
    </div>
    </transition>

    <div class="small" v-show="!fullScreen" @click="toggleFull">
      <div class="s-i go " ref="smallimg">
        <img :src="currentSong.albumUrl" alt="" />
      </div>
      <div class="s-info">
        <p>{{ currentSong.songname }}</p>
        <p>
          {{ currentSong.singer[0] ? currentSong.singer[0].name : "" }}--{{
            currentSong.albumname
          }}
        </p>
      </div>
      <div class="s-iconfo">
        <i class="iconfont" @click.stop="goPlayer">{{
          player ? "&#xe613;" : "&#xe626;"
        }}</i>
        <i class="iconfont">{{
          loop == 1 ? "&#xe607;" : loop == 2 ? "&#xe649;" : "&#xe66b;"
        }}</i>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *   歌词：
 *        1、左滑切换歌词列表，播放器隐藏
 */
import { mapState, mapMutations, mapGetters } from "vuex";
import { getVkeys, getLyric } from "../api/api";
import MyProgress from "../progress/index";
import { Base64 } from "js-base64";
import Lyric from "lyric-parser";
import BS from "better-scroll";
export default {
  components: {
    MyProgress
  },
  data() {
    return {
      player: false,
      loop: 1, //1代表单曲循环，2代表列表循环，3代表随机播放,
      nowSongTime: 0,
      durationTime: 0,
      lyric: "",
      txt: "",
      currentLyric: null,
      jumpTime: 0,
      moveLeft: 0,
      showLyric: false,
      lyricLines: null,
      lineNum: 0,
      BS: null
    };
  },
  computed: {
    ...mapState(["fullScreen", "currentIndex", "songList"]),
    ...mapGetters(["currentSong"])
  },
  methods: {
    ...mapMutations(["toggleFull"]),
    initBS() {
      //当currentNum > 5
      //开始滚动歌词，每次滚动一个元素
      this.BS = new BS(".lyricBox", { click: true, probeType: 3 });
      // let currentNum = this.$refs.content.children[0];
    },
    touchStart(e) {
      this.moveLeft = e.touches[0].pageX;
    },
    touchMove(e) {},
    touchEnd(e) {
      if (this.moveLeft - e.changedTouches[0].pageX > 0) {
        this.showLyric = true;
        this.lineNum = 1
      }
      if (this.moveLeft - e.changedTouches[0].pageX < 0) {
        this.showLyric = false;
      }
    },
    getJumpTime(time) {
      this.jumpTime = time;
      this.$refs.audio.currentTime = time;
    },
    timeupdate(e) {
      this.nowSongTime = e.target.currentTime;
    },
    goPlayer() {
      this.player = !this.player;
    },
    toggleFull() {
      this.$store.commit("toggleFull");
      
    },
    canplay() {
      this.player = true;
      this.durationTime = this.$refs.audio.duration;
    },
    async nextSong(num = 0) {
      if (!this.$refs.img) return;
      this.$refs.img.className = "";
      let i = null;
      if (this.$store.state.currentIndex == this.songList.length - 1) {
        i = 0;
      } else {
        i = this.$store.state.currentIndex + 1;
      }
      if (num !== 0) {
        i = num;
      }
      let { songmid } = this.songList[i].musicData;
      let newvkey = await getVkeys(songmid);
      this.$store.state.vkey = newvkey;
      if (i == 0) {
        this.$store.state.currentIndex = i;
      } else {
        this.$store.state.currentIndex++;
      }
      if (num !== 0) {
        this.$store.state.currentIndex = num;
      }

      this.$refs.img.style.className = "";
    },
    async prevSong() {
      if (!this.$refs.img) return;
      let i = null;
      this.$refs.img.className = "";
      if (this.$store.state.currentIndex == 0) {
        i = this.songList.length - 1;
      } else {
        i = this.$store.state.currentIndex - 1;
      }
      let { songmid } = this.songList[i].musicData;
      let newvkey = await getVkeys(songmid);
      this.$store.state.vkey = newvkey;
      if (i == this.songList.length - 1) {
        this.$store.state.currentIndex = i;
      } else {
        this.$store.state.currentIndex--;
      }
      this.$refs.img.style.className = "";
    },
    playing(e) {
      if (!this.$refs.img) return;
      this.$refs.smallimg.className = "s-i go";
      this.$refs.img.className = "go";
    },
    pause() {
      if (!this.$refs.img) return;
      this.$refs.img.className = "go puase";
      this.$refs.smallimg.className = "s-i go puase";
    },
    //增加功能，单曲循环，列表循环，随机播放
    //1.单曲循环：播放结束后不改变 currentIndex 继续播放
    ended() {
      switch (this.loop) {
        case 1:
          this.$refs.audio.play();
          this.currentLyric.seek(0);
          break;
        case 2:
          this.nextSong();
          console.log(2);
          break;
        case 3:
          let length = this.songList.length - 1;
          let num = parseInt(Math.random() * -length + length);
          this.nextSong(num);
          console.log(3);
          break;
      }
    },
    changeloop() {
      if (this.loop == 3) {
        this.loop = 0;
      }
      this.loop++;
    },
    handleLyric({ lineNum, txt }) {
      this.txt = txt;
      this.lineNum = lineNum;
    }
  },
  watch: {
     showLyric(){
       this.BS.scrollToElement(this.$refs.index[this.lineNum],0)
      console.log(this.$refs.index[this.lineNum])
    },
    player() {
      this.player ? this.$refs.audio.play() : this.$refs.audio.pause();
      if (this.currentLyric === null) {
        return;
      }
      if (!this.player) {
        this.currentLyric.togglePlay();
      } else {
        this.currentLyric.togglePlay();
      }
    },
    async currentIndex(newValue) {
      let { songmid } = this.songList[newValue].musicData;
      let vkey = await getVkeys(songmid);
    },
    loop(newValue) {
      if (newValue !== 1) {
        this.$refs.audio.loop = null;
      } else {
        // this.$refs.audio.loop = "loop";
      }
    },
    async currentSong() {
      let { songmid } = this.currentSong;
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.txt = "";
      }
      await getLyric(songmid)
        .then(res => {
          this.lyric = Base64.decode(res.lyric);
          this.currentLyric = new Lyric(this.lyric, this.handleLyric);
          this.lyricLines = this.currentLyric.lines;
          this.lyricLines = this.lyricLines.concat(['','','','','','','','','','',''])
          if (this.player) {
            this.currentLyric.play();
          }
        })
        .catch(err => {});
      this.$nextTick(() => {
        this.initBS();
      });
    },
    jumpTime() {
      this.currentLyric.seek(this.jumpTime * 1000);
    },
    lineNum() {
      if (this.lineNum > 7) {
        let currentNum = this.$refs.content.children[this.lineNum - 6];
        this.BS.scrollToElement(currentNum, 1000);
      } else {
      this.BS.scrollToElement(this.$refs.content.children[this.lineNum], 1000);

      }
    }
  }
};
</script>

<style lang="less">
@import "../../less/index.less";
.touming{
  visibility:hidden;
}
.xianshi{
  visibility: visible;
}
.v-enter {
  opacity: 0;
  // transform: translateX(300px);
}
.v-enter-to {
  opacity: 1;
  // transform: translateX(0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s linear;
}
.v-leave {
  //  transform: translate(0);
  opacity: 0;
}
.v-leave-to {
  // transform: translateX(300px);
  opacity: 1;
}

.big-enter {
  opacity: 0;
  transform: translate(-150px,400px);
}
.big-enter-to {
  opacity: 0.5;
  transform: translate(0,0);
  // transform: translateX(0);
}
.big-enter-active,
.big-leave-active {
  transition: all 0.2s linear;
}
.big-leave {
  //  transform: translate(0);
  transform: translate(0,0);
  opacity: 1;
}
.big-leave-to {
  // transform: translateX(300px);
  transform: translate(-150px,300px);
  opacity: 0;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.go {
  animation: rotate 25s linear infinite;
}

.puase {
  animation-play-state: paused;
}
.player {
  span {
    z-index: 30;
  }
  .big {
    background-color: #222;
    z-index: 99;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    .lyricP {
      width: 80vw;
      .h(20);
      text-align: center;
    }
    .lyricBox {
      margin-top: 20px;
      width: 100%;
      .h(458);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // background-color: red;
      overflow: hidden;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      position: absolute;
      left: 0;
      .current {
        color: #fff;
      }
      p {
        width: 100%;
        .h(30);
        text-align: center;
        line-height: 30px;
      }
    }
    .goRight {
      width: 100%;
      .h(467);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
    }
    .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        position: absolute;
        top: 10px;
        left: 20px;
      }
      h2 {
        .h(40);
        width: 100%;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-weight: 400;
        text-align: center;
      }
      p {
        .h(20);
        width: 100%;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
      }
    }
    .playerDesc {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      margin: 20px auto 0;
    }
    .imgBox {
      margin-top: 20px;
      // background-color: lightgreen;
      .w(300);
      .h(300);
      border-radius: 50%;
      overflow: hidden;
      border: 10px solid hsla(0, 0%, 100%, 0.1);
      margin-bottom: 30px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        // padding:20px;
      }
    }
    span {
      font-size: 12px;
    }
    .bottom {
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 30px;
      font-size: 38px;
      color: @orange;
      .modeIcon {
        text-align: center;
        color: @orange;
        font-size: 100%;
      }
      .player {
        width: 30px;
        height: 30px;
        color: @orange;
        text-align: center;
        line-height: 30px;
        font-size: 100%;
      }
    }
  }
  .bgc {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    img {
      width: 100%;
      height: 100%;
    }
    z-index: -9;
    filter: blur(30px);
  }
  .small {
    background-color: #333;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .h(60);
    width: 100%;
    z-index: 20;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    .s-i {
      .w(44);
      .h(40);
      img {
        .w(44);
        height: 100%;
        border-radius: 50%;
      }
    }
    .s-info {
      .w(200);
      .h(44);
      p {
        .h(20);
        width: 100%;
        font-size: 12px;
        text-align: left;
        line-height: 20px;
      }
    }
    .s-iconfo {
      i {
        .w(32);
        .h(32);
        font-size: 38px;
        padding-right: 10px;
        color: #ffcd32;
      }
    }
  }
}
</style>
