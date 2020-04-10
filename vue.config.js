module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://ustbhuangyi.com",
        changOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/xixi": {
        target: "http://aqqmusic.tc.qq.com",
        changeOrigin: true,
        pathRewrite: {
          "^/xixi": "" //将路径中多余的暗号 删除
        },
        
      },
      '/qq': {
        target:"https://c.y.qq.com",
        changeOrigin:true,
        pathRewrite:{
          "^/qq":""
        }
      },
      '/ustb':{//http://ustbhuangyi.com
        target:"http://ustbhuangyi.com",
        changeOrigin:true,
        pathRewrite:{
          "^/ustb":""
        }
      }
    }
  }
};
