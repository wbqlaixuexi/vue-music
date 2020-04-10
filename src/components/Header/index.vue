<template>
    <div class="header">
        <img src="/2.png" alt="">
        <span>NZMUSIC</span>
    </div>
</template>

<script>

  export default {
      
  }
</script>

<style lang='less' scoped>
@import "../../less/index.less";
.header{
  .w(375);
  height: 44px;
  color:white;
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    display: inline-block;
    font-size: 16px;
    color:#ffc534;

  }
  img{
    width: 30px;
    height: 32px;
    margin-right: 4px;
  }
}
</style>