<template>
    <div id="Searchlist" :class="{'con_b':bomisTrue}">
        <div class="SearchContent">
            <ul>
                <li @click="soundPlayFn(index)" v-for="(item,index) in dataList" :key="item.audio_id">{{item.filename}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  watch: {
    userInputUpdate(val, valold) {
      this.dataListFn(val);
      this.openMark();
    }
  },
  data() {
    return {
      // 列表数据
      dataList: [],
      // 拿到用户点击的歌曲详情
      soundDetails: []
    };
  },
  computed: {
    //实时更新搜索条件
    userInputUpdate: function() {
      return this.$store.state.userInputValue;
    },
    // 判断soundplay是否存在变量
    bomisTrue: function() {
      return this.$store.state.soundplay;
    }
  },
  activated() {
    this.dataList = [];
  },
  methods: {
    // 弹出层
    openMark() {
      this.$indicator.open();
    },
    // 搜索列表
    dataListFn(val) {
      let _this = this;
      _this
        .http("get", "/v3/search/song?keyword=" + val + "", "")
        .then(function(res) {
          _this.dataList = res.data.info;
          _this.$indicator.close();
          // console.log(_this.dataList);
        });
    },
    //拿到用户点击的歌曲详情
    soundPlayFn(val) {
      console.log(this.dataList);
      this.$store.commit("updataSoundPlay", {
        soundplay: true,
        soundDetails: this.dataList[val]
      });
    }
  }
};
</script>

<style lang="less" scoped>
#Searchlist {
  .SearchContent {
    padding: 0 5px;
    font-size: 0.95rem;
    ul {
      li {
        padding: 10px 5px;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        border-bottom: 1px solid #d2d2d2;
        &:last-child {
          border-bottom: 0 !important;
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
</style>
