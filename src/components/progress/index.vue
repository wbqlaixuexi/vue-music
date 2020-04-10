<template>
  <div class="progress">
    <span>{{ getTime | timeFormat }}</span>
    <div class="wrapper" @click="jump" ref="wrapper">
      <div class="content" ref="content">
        <div
          class="white"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
          ref="white"
        >
          <div class="orange"></div>
        </div>
      </div>
    </div>
    <span>{{ getDurationTime | timeFormat }}</span>
  </div>
</template>

<script>
/**
    进度条功能：点击进度条，进度条能跳过去，圆点也能过去
 */
export default {
  data() {
    return {
      jumptime: 0,
      flag:true
    };
  },
  methods: {
    jump(e) {
      let clickX = e.pageX;
      let contentLeft = e.target.getBoundingClientRect().x;
      let width = this.$refs.wrapper.clientWidth;
      let precent = ((clickX - contentLeft) / width) * 100;
      this.$refs.content.style.width = precent + "%";
      this.$refs.white.style.left = (precent * width) / 100 + "px";
      /**
       * 获取跳转时的时间 用百分比乘以总时长
       */
      this.jumptime = parseInt((precent * this.getDurationTime) / 100);
      console.log(this.jumptime);
    },
    /**
     * 小黄点移动功能:
     * 1、手指按下小黄点，获得抬起时的坐标，计算百分比
     */
    touchstart(e) {
      this.flag = false
      let touchPageX = e.touches[0].pageX
    },
    touchmove(e) {
    //   console.log(e)
      let movePageX = e.touches[0].pageX
      let contentLeft = this.$refs.wrapper.getBoundingClientRect().x
      let precent = ((movePageX - contentLeft)/this.$refs.wrapper.clientWidth) * 100
      this.$refs.white.style.left = precent*this.$refs.wrapper.clientWidth/100 + "px"
      if(parseInt(this.$refs.white.style.left)<=0){
          this.$refs.white.style.left = 0
      }else if(parseInt(this.$refs.white.style.left )>= parseInt(this.$refs.wrapper.clientWidth)){
          this.$refs.white.style.left =  this.$refs.wrapper.clientWidth + 'px'
      }
      this.$refs.content.style.width = precent + "%"
      if(parseInt(this.$refs.content.style.width) >= 100){
          this.$refs.content.style.width = 100+"%";
      }
    },
    touchend(e) {
      this.flag = true
      console.log(e)
      let touchEnd = e.changedTouches[0].pageX
      let contentLeft = this.$refs.wrapper.getBoundingClientRect().x
      let precent = (touchEnd - contentLeft)/this.$refs.wrapper.clientWidth *100
      this.$emit("getJumpTime",precent*this.getDurationTime/100)
    }
  },
  props: {
    getTime: { type: Number },
    getDurationTime: { type: Number }
  },
  filters: {
    timeFormat(data) {
      let time = parseInt(data);
      let m = parseInt(time / 60);
      m = m < 10 ? `0${m}` : m;
      let s = parseInt(time % 60);
      s = s < 10 ? `0${s}` : s;
      return `${m}:${s}`;
    }
  },
  watch: {
    getTime() {
      let precent = parseInt((this.getTime / this.getDurationTime) * 100);
      if(this.flag){
        this.$refs.content.style.width = precent + "%";
        this.$refs.white.style.left = precent * this.$refs.wrapper.clientWidth /100 + 'px'
      }
      
      // console.log(precent *this.$refs.wrapper.clientWidth /100)
    },
    jumptime(newValue) {
      this.$emit("getJumpTime", this.jumptime);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../less/index.less";
.progress {
  width: 80%;
  .h(30);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: absolute;
  bottom: 80px;
  .wrapper {
    width: 80%;
    .h(4);
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0 10px;
    .content {
      height: 100%;
      background-color: @orange;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 0%;
      .white {
        min-width: 16px;
        min-height: 16px;
        .w(16);
        .h(16);
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        transform: translateX(-50%);
        left:0;
        .orange {
          .w(8);
          .h(8);
          background-color: @orange;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
