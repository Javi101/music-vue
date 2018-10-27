<template>
    <div id="head">
        <div class="container_head">
          <p  :class="{head_top_move1:headTopMove,head_top_move2:!headTopMove}">
            <span class="fa fa-bars container_head_icon_left"></span>
            <span>音乐馆</span>
            <span class="fa fa-user-circle container_head_icon_right"></span>
          </p>
          <p :class="{'bgcolor':isTrue}">
            <input @click="searchFn" v-model="searchValue" @input="searchlistFn"  type="text" :placeholder="plaText">
            <span v-show="!headTopMove" class="fa fa-search fa-1x"></span>
            <span v-show="!headTopMove">搜索</span>
            <i @click="homeBackFn(0)" v-show="headTopMove" class="fa fa-angle-left" :class="{head_top_back1:headTopMove}"></i>
            <i @click="homeBackFn(1)" v-show="headTopMove" class="fa fa-microphone" :class="{head_top_back2:headTopMove}"></i>
          </p>
        </div>
    </div>
</template>
<script>
export default {
  // 父子组件通信
  // props: ["datas"],
  watch: {
    $route(to, from) {
      console.log(to.path);
      let _this = this;
      if (to.path == "/home") {
        _this.publicHeadFn(false);
      }
    }
  },
  data() {
    return {
      // 搜索值绑定
      searchValue: ""
    };
  },
  computed: {
    isTrue: function() {
      return this.$store.state.headTopMove;
    },
    headTopMove: function() {
      //头部搜索是否变换
      console.log(this.$store.state.headTopMove)
      return this.$store.state.headTopMove;
    },
    plaText: function() {
      return this.$store.state.plaText;
    }
  },
  methods: {
    searchFn() {
      let _this = this;
      //头部搜索是否变换
      _this.$store.commit("updataHeadTopMove", {
        isTrue: true,
        plaText: "搜索音乐、歌手"
      });
      _this.headTopMove = _this.$store.state.headTopMove;

      //跳转到搜索页
      _this.$router.push({
        name: "content",
        query: {
          key: 1
        },
        meta: { keepAlive: true }
      });
    },
    homeBackFn(num) {
      if (num == 0) {
        this.publicHeadFn(true);
      }
    },

    // 头部变化判断公共方法
    publicHeadFn(val) {
      let _this = this;
      //头部搜索是否变换
      _this.$store.commit("updataHeadTopMove", {
        isTrue: val,
        plaText: ""
      });

      _this.headTopMove = _this.$store.state.headTopMove;
      _this.$router.push({
        name: "home"
      });
    },
    // 获取用户输入信息 发送给Searchlist页面
    searchlistFn() {
      console.log(this.searchValue);

      this.$store.commit("updataUserInputValue", {
        userVal: this.searchValue
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url(//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
.container_head_icon_left {
  float: left;
  padding: 12px 0 0 10px;
}
.container_head_icon_right {
  float: right;
  padding: 12px 10px 0 0;
}
.head_top_move1 {
  animation: headanimate1 0.5s;
  -webkit-animation: headanimate1 0.5s; /* Safari and Chrome */
  // -moz-animation: headanimate .5s; /* Firefox */
  // -o-animation: headanimate .5s; /* Opera */
  animation-fill-mode: forwards;
  animation-timing-function: linear 0.5s;
}
//顶部搜索栏动画效果
@keyframes headanimate1 {
  from {
    margin-top: 0;
  }
  to {
    margin-top: -35px;
  }
}
@-webkit-keyframes headanimate1 /* Safari and Chrome */ {
  from {
    margin-top: 0;
  }
  to {
    margin-top: -35px;
  }
}
.head_top_move2 {
  animation: headanimate2 0.5s;
  -webkit-animation: headanimate2 0.5s; /* Safari and Chrome */
  -moz-animation: headanimate2 0.5s; /* Firefox */
  -o-animation: headanimate2 0.5s; /* Opera */
  animation-fill-mode: forwards;
  animation-timing-function: linear 0.5s;
}
//顶部搜索栏动画效果
@keyframes headanimate2 {
  from {
    margin-top: -35px;
  }
  to {
    margin-top: 0;
  }
}
@-webkit-keyframes headanimate2 /* Safari and Chrome */ {
  from {
    margin-top: -35px;
  }
  to {
    margin-top: 0;
  }
}
//搜索左右两边的按钮
.head_top_back1 {
  left: -15px;
  animation: headtopback1 0.8s;
  -webkit-animation: headtopback1 0.8s; /* Safari and Chrome */
  animation-fill-mode: forwards;
  animation-timing-function: linear 0.8s;
}
//顶部搜索栏动画效果
@keyframes headtopback1 {
  from {
    left: -15px;
  }
  to {
    left: 7px;
  }
}
@-webkit-keyframes headtopback1 /* Safari and Chrome */ {
  from {
    left: -15px;
  }
  to {
    left: 7px;
  }
}
.head_top_back2 {
  right: -15px;
  animation: headtopback2 0.8s;
  -webkit-animation: headtopback2 0.8s; /* Safari and Chrome */
  animation-fill-mode: forwards;
  animation-timing-function: linear 0.8s;
}
@keyframes headtopback2 {
  from {
    right: -15px;
  }
  to {
    right: 7px;
  }
}
@-webkit-keyframes headtopback2 /* Safari and Chrome */ {
  from {
    right: -15px;
  }
  to {
    right: 7px;
  }
}

.bgcolor {
  background: #32c27d !important;
}
</style>
