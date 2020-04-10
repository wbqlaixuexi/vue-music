import axios from "../axios/axios";
import { commonParams, options } from "../api/config";
import jsonp from "jsonp";
let getSong = () => {
  let url =
    "/api/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.7404949493260609";
  return axios.get(url);
};

let getInfo = () => {
  let url =
    "/api/music/api/getTopBanner?g_tk=1928093487&inCharset=utf8&outCharset=utf-8&notice=0&format=json&platform=yqq.json&hostUin=0&needNewCode=0&-=recom8199889999778165&data=%7B%22comm%22:%7B%22ct%22:24%7D,%22category%22:%7B%22method%22:%22get_hot_category%22,%22param%22:%7B%22qq%22:%22%22%7D,%22module%22:%22music.web_category_svr%22%7D,%22recomPlaylist%22:%7B%22method%22:%22get_hot_recommend%22,%22param%22:%7B%22async%22:1,%22cmd%22:2%7D,%22module%22:%22playlist.HotRecommendServer%22%7D,%22playlist%22:%7B%22method%22:%22get_playlist_by_category%22,%22param%22:%7B%22id%22:8,%22curPage%22:1,%22size%22:40,%22order%22:5,%22titleid%22:8%7D,%22module%22:%22playlist.PlayListPlazaServer%22%7D,%22new_song%22:%7B%22module%22:%22newsong.NewSongServer%22,%22method%22:%22get_new_song_info%22,%22param%22:%7B%22type%22:5%7D%7D,%22new_album%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_info%22,%22param%22:%7B%22area%22:1,%22sin%22:0,%22num%22:10%7D%7D,%22new_album_tag%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_area%22,%22param%22:%7B%7D%7D,%22toplist%22:%7B%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:%7B%7D%7D,%22focus%22:%7B%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetFocus%22,%22param%22:%7B%7D%7D%7D";
  return axios.get(url);
};

let getCurrentAudio = () => {
  let url = "/api/fcj/music/singerList";
  return axios.get(url);
};
let getVkeys = async function(songmid) {
  let data = {
    g_tk: 5381,
    jsonpCallback: "MusicJsonCallback8128692786796425",
    loginUin: 0,
    hostUin: 0,
    format: "json",
    inCharset: "utf-8",
    outCharset: "utf-8",
    nptice: 0,
    platform: "yqq",
    needNewCode: 0,
    cid: 205361747,
    callback: "MusicJsonCallback8128692786796425",
    uin: 0,
    songmid,
    filename: `C400${songmid}.m4a`,
    guid: 1544982268,
    fromtag: 38
  };
  let vkey = ''
  await axios
    .get("/qq/base/fcgi-bin/fcg_music_express_mobile3.fcg", { params: data })
    .then(res => {
      let result = res
        .match(/\"vkey\":\"\w+/gi)[0]
        .split(":")[1]
        .replace('"', "");
      vkey = result;
    })
    .catch(err => {
      console.log(err);
    });
    return vkey
};
let getLyric = function(songmid){
  let url = `/api/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1585120257171`
            //http://ustbhuangyi.com/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=001TXSYu1Gwuwv&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1585120257171
  return axios.get(url)
}

export { getSong, getInfo, getCurrentAudio, getVkeys,getLyric };
