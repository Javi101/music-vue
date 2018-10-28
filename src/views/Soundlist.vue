<template>
    <div id="soundList" :class="{'con_b':bomisTrue}">
           <div class="soundlistTop" :class="backImgUrl == '' ? '' : 'backImgAni'">
             <img  v-if="backImgUrl != ''" :class="backImgUrl == '' ? '' : 'backImgAni'" :src="backImgUrl">
             <div class="soundlistTopImg">
               <img v-if="backImgUrl != ''" :class="backImgUrl == '' ? '' : 'backImgAni'" :src="backImgUrl">
             </div>
             <div class="soundlistTopText">
               <span>{{specialname}}</span>
             </div>
              <div @click="soundlistTopTipsOpenFn" class="soundlistTopTips">
               <span>{{intro}}</span>
             </div>
           </div>
           <div class="soundlistContent"  :class="intro == '' ? '' : 'backImgAni'">
             <div v-show="introOpen" class="soundlistContentTop">
               <span>{{intro}}</span>
             </div>
             <div class="soundlistContentList">
               <ul>
                 <li @click="soundPlayFn(index)" v-for="(item,index) in soundLists" :key="item.audio_id">
                   <span>{{index + 1}}</span>{{item.filename}}
                  </li>
               </ul>
             </div>
           </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // 歌单背景图
      backImgUrl: "",
      // 歌单名称
      specialname: "",
      // 歌单简介
      intro: "",
      // 歌单简介是否显示
      introOpen: false,
      //歌曲列表
      soundLists: ""
    };
  },

  computed: {
    // 判断soundplay是否存在变量
    bomisTrue: function() {
      return this.$store.state.soundplay;
    }
  },
  activated() {
    this.introOpen = true;
    this.intro = "";
    this.soundLists = "";
    this.topHideFn();
  },
  methods: {
    // 隐藏头部搜索栏
    topHideFn() {
      this.$store.commit("updataHeadTopShow", {
        isTureTop: false
      });
      this.soundListFn();
    },
    // 歌单列表
    soundListFn() {
      let _this = this;
      let specialid = this.$route.query.specialid;
      _this.backImgUrl = "";
      // console.log("specialid:", specialid);
      _this
        .http("get", "/plist/list/" + specialid + "?json=true", "")
        .then(function(res) {
          // console.log(res);
          console.log(res.data.info.list.imgurl);
          _this.backImgUrl =
            res.data.info.list.imgurl.split("{")[0] +
            res.data.info.list.imgurl.split("}")[1].substr(1);
          _this.specialname = res.data.info.list.specialname;
          _this.intro = res.data.info.list.intro;
          _this.soundLists = res.data.list.list.info;
        });
    },
    //打开简介内容
    soundlistTopTipsOpenFn() {
      this.introOpen = !this.introOpen;
    },
    //拿到用户点击的歌曲详情
    soundPlayFn(val) {
      this.$store.commit("updataSoundPlay", {
        soundplay: true,
        soundDetails: this.soundLists[val]
      });
    }
  }
};
</script>

<style lang="less" scoped>
#soundList {
  .soundlistTop {
    height: 165px;
    overflow: hidden;
    & > img {
      width: 100%;
      height: 200%;
      filter: brightness(30%);
      -webkit-filter: brightness(30%);
      -ms-filter: brightness(30%);
      -o-filter: brightness(30%);
    }
    .soundlistTopImg {
      position: absolute;
      top: 40px;
      left: 20px;
      width: 100px;
      height: 100px;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .soundlistTopText {
      position: absolute;
      text-align: left;
      width: calc(100% - 150px);
      top: 40px;
      left: 140px;
      word-wrap: break-word;
      color: #ffffff;
      font-size: 1rem;
    }
    .soundlistTopTips {
      position: absolute;
      text-align: left;
      width: calc(100% - 150px);
      top: 120px;
      left: 140px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #ffffff;
      font-size: 0.8rem;
    }
  }
  .soundlistContent {
    font-size: 0.9rem;
    text-align: left;
    &Top {
      margin: 5px;
      padding: 5px;
      height: 50%;
      // box-shadow: #c5c5c5 0px 0px 3px 1px;
    }
    &List {
      margin: 10px 5px 5px 5px;
      height: 50%;
      padding: 0 5px;
      box-shadow: #e3e3e3 0px 0px 3px 1px;
      ul {
        list-style: none;
        li {
          padding: 10px 5px;
          text-align: left;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          border-bottom: 1px solid #f0f0f0;
          &:last-child {
            border-bottom: 0 !important;
          }
          span {
            font-size: 0.85rem;
            padding-right: 15px;
          }
          &:hover {
            margin-left: -5px;
            border-left: 4px solid #32c27d;
            color: green;
          }
         
        }
      }
    }
  }

  .backImgAni {
    animation: ani 0.5s;
    -webkit-animation: ani 0.5s; /* Safari and Chrome */
    -moz-animation: ani 0.5s; /* Firefox */
    -o-animation: ani 0.5s; /* Opera */
    animation-fill-mode: forwards;
    animation-timing-function: linear 0.5s;
  }
  //顶部搜索栏动画效果
  @keyframes ani {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.9;
    }
  }
  @-webkit-keyframes ani /* Safari and Chrome */ {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.9;
    }
  }
}
</style>
