<template>
  <div class="banner">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
          <img :data-src="item.picUrl" class="swiper-lazy" />
          <!-- <img data-src="/favicon.ico" alt="" /> -->
          <div class="swiper-lazy-preloader"></div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { getInfo } from "../api/api";
export default {
  data() {
    return {
      bannerList: []
    };
  },
  methods: {
    initBanner() {
      new Swiper(".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination"
          //   bulletClass: "colorBlack"
        },
        effect: "fade",
        autoplay: true,
        lazy: {
          loadPrevNext: true
          //    loadOnTransitionStart: false,
        }
      });
    }
    //  getInfo() {
    //   let url =
    //     "/api/music/api/getTopBanner?g_tk=1928093487&inCharset=utf8&outCharset=utf-8&notice=0&format=json&platform=yqq.json&hostUin=0&needNewCode=0&-=recom8199889999778165&data=%7B%22comm%22:%7B%22ct%22:24%7D,%22category%22:%7B%22method%22:%22get_hot_category%22,%22param%22:%7B%22qq%22:%22%22%7D,%22module%22:%22music.web_category_svr%22%7D,%22recomPlaylist%22:%7B%22method%22:%22get_hot_recommend%22,%22param%22:%7B%22async%22:1,%22cmd%22:2%7D,%22module%22:%22playlist.HotRecommendServer%22%7D,%22playlist%22:%7B%22method%22:%22get_playlist_by_category%22,%22param%22:%7B%22id%22:8,%22curPage%22:1,%22size%22:40,%22order%22:5,%22titleid%22:8%7D,%22module%22:%22playlist.PlayListPlazaServer%22%7D,%22new_song%22:%7B%22module%22:%22newsong.NewSongServer%22,%22method%22:%22get_new_song_info%22,%22param%22:%7B%22type%22:5%7D%7D,%22new_album%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_info%22,%22param%22:%7B%22area%22:1,%22sin%22:0,%22num%22:10%7D%7D,%22new_album_tag%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_area%22,%22param%22:%7B%7D%7D,%22toplist%22:%7B%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:%7B%7D%7D,%22focus%22:%7B%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetFocus%22,%22param%22:%7B%7D%7D%7D";
    //    this.$axios
    //     .get(url)
    //     .then(res => {
    //       this.bannerList = res.data.slider;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  },
  created() {
    getInfo()
      .then(res => {
        this.bannerList = res.data.slider;
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    bannerList() {
      this.$nextTick(() => {
        this.initBanner();
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../less/index.less";
@import "~swiper/css/swiper.min.css";
.swiper-container {
  .w(375);
  .h(150);
  // height: 300px;
  //   background-color: pink;
  img {
    width: 100%;
    height: 100%;
  }

  --swiper-pagination-color: #ffcd32;
  --swiper-preloader-color: #ffcd32;
}
</style>
