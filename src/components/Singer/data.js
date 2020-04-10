let normalData = function(obj) {
  let singerList = obj;
  let sortList = {};
  let hot = [];
  // 热门列表
  let hotList = [];
  hot = singerList.slice(0, 10);
  for (let index = 0; index < hot.length; index++) {
    let avator = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${hot[index].Fsinger_mid}.jpg?max_age=2592000`;
    hot[index] = {
      Fsinger_name: hot[index].Fsinger_name,
      Fother_name: hot[index].Fother_name,
      Fsinger_mid: hot[index].Fsinger_mid,
      Fsinger_img: avator
    };
  }
  hotList = [{ Findex: "热门", list: hot }];
  hot = hotList;
  hotList = null;
  //其他列表
  for (let index = 0; index < singerList.length; index++) {
    let {Findex,Fother_name, Fsinger_name, Fsinger_mid } = singerList[index];
    let avator = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000`;
    if (sortList[Findex]) {
      sortList[Findex].push({
        Fsinger_name: Fsinger_name,
        Fother_name: Fother_name,
        Fsinger_mid: Fsinger_mid,
        Fsinger_img: avator
      });
    } else {
      sortList[Findex] = [];
      sortList[Findex].push({
        Fsinger_name: Fsinger_name,
        Fother_name: Fother_name,
        Fsinger_mid: Fsinger_mid,
        Fsinger_img: avator
      });
    }
  }
  let realList = [];
  for (const key in sortList) {
    realList.push({ Findex: key, list: sortList[key] });
  }
  realList.sort((a, b) => {
    return a.Findex.charCodeAt() - b.Findex.charCodeAt();
  });
  realList.splice(0, 1);
  let result = hot.concat(realList);
  realList = null;
  return result;
};

export default normalData;
