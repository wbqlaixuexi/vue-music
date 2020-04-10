<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <routerView></routerView>
    <Player v-show='show'></Player>
  </div>
</template>

<script>
import Header from "./components/Header"
import Tab from "./components/tab"
import Player from './components/player'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components: {
    Header,
    Tab,
    Player
  },
  computed:{
    ...mapState({show:state => state.show})    
  },
  mounted(){
    console.log(this.$store)
  }
}
</script>

<style lang='less' scoped>
@import './less/index.less';


</style>  
