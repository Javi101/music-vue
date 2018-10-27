import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //首页内容是否显示
    isTrueHome: true,
    //Head组件 头部搜索是否变换
    headTopMove: false,
    //Head组件 头部搜索文字背景色是否更改
    plaText: "",

    userInputValue: "",
    // 歌曲详情如果为空 不显示播放组件
    soundDetailsisTrue: "",
    // 开始加载歌曲变量
    soundplay: false,
    //头部是否显示
    isTureTop: true
  },
  mutations: {
    //Head组件 头部搜索是否变换
    updataHeadTopMove(state, val) {
      state.headTopMove = val.isTrue;
      state.plaText = val.plaText
    },
    //首页内容是否显示
    updataTrueHome(state, val) {
      state.isTrueHome = val.isTrueHome
    },
    // 获取搜索列表用户输入的值
    updataUserInputValue(state, val) {
      state.userInputValue = val.userVal
    },
    updataSoundPlay(state, val) {
      state.soundplay = val.soundplay
      state.soundDetailsisTrue = val.soundDetails
    },
    updataHeadTopShow(state, val) {
      state.isTureTop = val.isTureTop
    }
  },
  getters: {

  },
  actions: {
    Cache() {
      // console.log(sessionStorage.getItem("aaa"))
    }
  }
});