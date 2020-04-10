import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    show: false,
    fullScreen: true,
    songList: [],
    currentIndex: -1,
    vkey: ""
  },
  mutations: {
    toggleFull(state) {
      state.fullScreen = !state.fullScreen;
    },
    pushSongList(state, { songList, index }) {
      state.songList = songList;
      state.currentIndex = index;
    }
  },
  getters: {
    currentSong(state,getters) {
      if(state.currentIndex == -1){
        return {
          albummid:0,
          albumname:0,
          songmid:0,
          songname:0,
          singer:0,
          strMediaMid:0,
          albumUrl:0,
          albumAudio:0
        }
      }
      let {
        albummid,
        albumname,
        songmid,
        songname,
        singer,
        strMediaMid
      } = state.songList[state.currentIndex].musicData;
      let albumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
      let albumAudio = `/xixi/amobile.music.tc.qq.com/C400${songmid}.m4a?guid=1544982268&vkey=${getters.vkey1}&uin=0&fromtag=38`;
      return {
        albummid,
        albumname,
        songmid,
        songname,
        singer,
        strMediaMid,
        albumUrl,
        albumAudio
      };
    },
    vkey1(state){
      return state.vkey
    },

  },
  actions: {}
});

export default store;
// 第一，currentIndex变化了，就要重新获得数据
// 需要获取当前下标的歌曲信息
//
