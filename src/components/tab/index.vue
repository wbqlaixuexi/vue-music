<template>
    <div class="tab">
        <router-link to="/recommend" active-class="orange" tag="div"><span>推荐</span></router-link>
        <router-link to="/Singer" active-class="orange" tag="div"><span>歌手</span></router-link>
        <router-link to="/Rank" active-class="orange" tag="div"><span>排行</span></router-link>
        <router-link to="/Search" active-class="orange" tag="div"><span>搜索</span></router-link>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang='less' scoped>
@import "../../less/index.less";
.tab{
    display: flex;
    font-size: @fs-s;
    justify-content: space-around;
    div{
        width: 25%;
        height: 44px;
        text-align: center;
        line-height: 44px;
        color:rgba(255, 255, 255, 0.5);
        font-size: 100%;
    }
    .orange{
        color:#ffcd32;
        span{
            border-bottom: 2px solid #ffcd32;
            display: inline-block;
            height: 36px;
            width: 34px;
            font-size:14px;
        }
    }
}
</style>