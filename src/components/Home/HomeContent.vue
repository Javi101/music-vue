<template>
    <!-- :class="{head_top_move1:headTopMove,head_top_move2:!headTopMove}" -->
    <!-- head_top_down -->
    <div id="HomeContent" class="head_top_down">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange"
                         ref="loadmore">
                <div>
                    <mt-swipe ref="swipe" :defaultIndex="activeIndex" :auto="4000">
                        <mt-swipe-item v-for="item in bannerlist" :key="item.id">
                            <img :src="item.imgurl">
                        </mt-swipe-item>

                    </mt-swipe>
                    <section>
                        <div class="Content-nav">
                            <p>
                                <span class="icon iconfont icon-renxiang"></span>
                                <span>歌手</span>
                            </p>
                            <p>
                                <span class="icon iconfont icon-paihangbang"></span>
                                <span>排行</span>
                            </p>
                            <p>
                                <span class="icon iconfont icon-kinds"></span>
                                <span>分类歌单</span>
                            </p>
                            <p>
                                <span class="icon iconfont icon-jingminglaba"></span>
                                <span>电台</span>
                            </p>
                            <p>
                                <span class="icon iconfont icon-shipin-tianchong"></span>
                                <span>视频</span>
                            </p>
                        </div>
                        <div class="Content-list">
                            <p class="Content-list-text">为你推荐歌单</p>
                            <div class="Content-lists">
                                <p @click="soundListFn(datalist.list1Specialid[index])" v-for="(item,index) in datalist.list1" :key="item.specialid">
                                  <span>
                                    <img class="imgani" :src="item.imgurl">
                                  </span>
                                    <span>{{item.specialname}}</span>
                                </p>
                            </div>
                            <div class="Content-lists">
                                <p @click="soundListFn(datalist.list2Specialid[index])" v-for="(item,index) in datalist.list2" :key="item.specialid">
                                  <span>
                                     <img class="imgani" :src="item.imgurl">
                                  </span>
                                    <span>{{item.specialname}}</span>
                                </p>
                            </div>
                            <div class="Content-lists">
                                <p @click="soundListFn(datalist.list3Specialid[index])" v-for="(item,index) in datalist.list3" :key="item.specialid">
                                  <span>
                                     <img class="imgani" :src="item.imgurl">
                                  </span>
                                    <span>{{item.specialname}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="Content-list-btn fa-1x" :class="{'con_b':bomisTrue}">
                            <button @click="reloadlistFn">
                                <span class="fa fa-refresh"></span>
                                <span>换一批</span>
                            </button>
                        </div>
                    </section>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
export default {
  watch: {
    $route(to, from) {
      console.log(to.path);
      if (to.path == "/home") {
        this.activeIndex = 0;
        console.log(this.activeIndex);
      }
    }
  },
  data() {
    return {
      // 轮播图Index
      activeIndex: 0,
      wrapperHeight: 0,
      bannerlist: "",
      datalist: {
        list1: [],
        list2: [],
        list3: [],
        list1Specialid: [],
        list2Specialid: [],
        list3Specialid: []
      },
      // "换一批"功能变量
      reloadlistNum: 0,
      // 首页歌单数据总条数
      reloadlistTotal: 0
    };
  },
  created() {
    this.bannerlistFn();
    this.datalistFn(this.reloadlistNum);
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top -
      85;
  },
  methods: {
    // 首页bannertu接口
    bannerlistFn() {
      let _this = this;
      //接口的特殊情況（項目中尽量不会出现）
      _this.http("get", "/dapi?json=true", "").then(function(res) {
        _this.bannerlist = res.data.banner;
        // console.log(_this.bannerlist);
      });
    },
    // m.kugou.com/index?json=true
    // 歌单请求数据接口
    datalistFn(num) {
      let _this = this;
      _this.http("get", "/plist/index?json=true", "").then(function(res) {
        console.log(res);
        _this.datalist.list1 = [];
        _this.datalist.list2 = [];
        _this.datalist.list3 = [];
        _this.datalist.list1Specialid = [];
        _this.datalist.list2Specialid = [];
        _this.datalist.list3Specialid = [];
        console.log(res);
        _this.reloadlistTotal = res.data.plist.list.info.length;
        console.log(res.data.plist.list.info);
        res.data.plist.list.info.map((val, index) => {
          // console.log(val.imgurl)
          let imgurlres =
            val.imgurl.split("{")[0] + val.imgurl.split("}")[1].substr(1);
          if (index >= num && index < num + 3) {
            val.imgurl = imgurlres;
            _this.datalist.list1.push(val);
            _this.datalist.list1Specialid.push(val.specialid);
          } else if (index >= num + 3 && index < num + 6) {
            val.imgurl = imgurlres;
            _this.datalist.list2.push(val);
            _this.datalist.list2Specialid.push(val.specialid);
          } else if (index >= num + 6 && index < num + 9) {
            val.imgurl = imgurlres;
            _this.datalist.list3.push(val);
            _this.datalist.list3Specialid.push(val.specialid);
          }
        });
      });
    },
    // 换一批
    reloadlistFn() {
      if (this.reloadlistNum + 9 <= this.reloadlistTotal) {
        this.reloadlistNum += 9;
        this.datalistFn(this.reloadlistNum);
      } else {
        this.reloadlistNum = 0;
        this.datalistFn(this.reloadlistNum);
      }
      console.log(this.reloadlistNum);
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    translateChange(translate) {
      const translateNum = +translate;
      this.translate = translateNum.toFixed(2);
      this.moveTranslate = (1 + translateNum / 70).toFixed(2);
    },
    loadTop() {
      setTimeout(() => {
        this.datalist.list1 = [];
        this.datalist.list2 = [];
        this.reloadlistNum = 0;
        this.bannerlistFn();
        this.datalistFn(this.reloadlistNum);
        this.$refs.loadmore.onTopLoaded();
      }, 1500);
    },
    // 歌单详情
    soundListFn(val) {
      console.log(val);
      let _this = this;
      _this.$router.push({
        name: "soundlist",
        query: {
          specialid: val
        }
      });
    }
  },
  computed: {
    // 判断soundplay是否存在变量
    bomisTrue: function() {
      return this.$store.state.soundplay;
    }
  }
};
</script>
<style lang="less">
#HomeContent {
  padding-top: 50px;
  .mint-swipe,
  .mint-swipe-items-wrap {
    height: 170px;
  }
  .mint-swipe .mint-swipe-items-wrap > div img {
    width: 100%;
    height: 100%;
  }
  .mint-swipe-indicators .mint-swipe-indicator {
    opacity: 0.6;
  }
  section {
    margin-top: 15px;
    .Content-nav {
      display: table;
      width: 100%;
      p {
        display: table-cell;
        text-align: center;
        width: 20%;
        span {
          text-align: center;
          text-align: -moz-center; /*Firefox*/
          text-align: -webkit-center; /*Chrome*/
          display: -webkit-box;
          display: -moz-box;
          display: block;
          &:first-child {
            color: #2fc579;
            padding-bottom: 3px;
            font-size: 1.3rem;
          }

          &:nth-child(2) {
            font-size: 0.85rem !important;
          }
        }


      }
    }
    .Content-list {
      font-size: 1rem;
      .Content-list-text {
        padding: 15px 0 8px 0;
        letter-spacing: 0.5rem;
      }

      .Content-lists {
        display: table;
        width: 100%;
        table-layout: fixed;
        word-wrap: break-word;
        p {
          float: left;
          display: block;
          word-break: break-all;
          width: 33.3%;
          height: 100%;
          background: #ffffff;
          span {
            text-align: center;
            text-align: -moz-center; /*Firefox*/
            text-align: -webkit-center; /*Chrome*/
            display: block;
            width: 98%;
            // background: #c5c5c5;
            &:first-child {
              height: 110px;
            }
            &:nth-child(2) {
              width: 92%;
              text-align: left;
              padding: 0 0 0 3%;
              padding-top: 4px;
              padding-bottom: 4px;
              font-size: 0.8rem;
            }
            img {
              opacity: 0;
              width: 100%;
              height: 100%;
            }
          }
          &:last-child {
            span {
              width: 100%;
              &:nth-child(2) {
                width: 92%;
              }
            }
          }
        }
      }
    }
    .Content-list-btn {
      margin: 20px 0 30px 0;
      button {
        font-size: 0.8rem;
        padding: 5px 10px;
        background: #ffffff;
        outline: none;
        border: 1px solid #999999;
        span:first-child {
          padding-right: 7px;
        }
      }
    }
  }
}

.imgani {
  animation: opacityani 1s;
  -webkit-animation: opacityani 1s; /* Safari and Chrome */
  animation-fill-mode: forwards;
  animation-timing-function: linear 1s;
}

.head_top_down {
  right: -15px;
  animation: headtopback 0.7s;
  -webkit-animation: headtopback 0.7s; /* Safari and Chrome */
  animation-fill-mode: forwards;
  animation-timing-function: linear 0.7s;
}

@keyframes opacityani {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes headtopback {
  from {
    padding-top: 55px;
  }
  to {
    padding-top: 85px;
  }
}

@-webkit-keyframes headtopback /* Safari and Chrome */ {
  from {
    padding-top: 55px;
  }
  to {
    padding-top: 85px;
  }
}
</style>
