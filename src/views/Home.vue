<template>
  <div id="Home" class="home">
    <Head v-if="isTureTop" />
    <HomeContent v-if="isTrueHome"></HomeContent>
     <keep-alive>
       <router-view/>
     </keep-alive>
    <Soundplay v-if="isTruesoundplay"/>
  </div>
</template>

<script>
import Head from "@/components/Home/Head";
import HomeContent from "@/components/Home/HomeContent";
import Soundplay from "@/components/Home/soundplay";
export default {
  watch: {
    $route(to, from) {
      console.log(to.path);
      if (to.path == "/home") {
        this.$store.commit("updataTrueHome", {
          isTrueHome: true
        });
        if (
          document.getElementById("soundplay") &&
          document.getElementById("soundplay") != ""
        ) {
          document.getElementById("soundplay").className = "";
          document.getElementsByClassName("aplayer")[0].className = "aplayer";
        }

        // 显示头部搜索栏
        this.$store.commit("updataHeadTopShow", {
          isTureTop: true
        });
      } else {
        this.$store.commit("updataTrueHome", {
          isTrueHome: false
        });
      }
    }
  },
  data() {
    return {
      // 返回home页顶部搜索栏展开
      // isTrue: false
    };
  },
  created() {},
  computed: {
    //是否有歌曲在播放变量
    isTruesoundplay: function() {
      return this.$store.state.soundplay;
    },
    isTureTop: function() {
      return this.$store.state.isTureTop;
    },
    // 判断是否显示首页内容
    isTrueHome: function() {
      console.log(this.$store.state.isTrueHome);
      return this.$store.state.isTrueHome;
    }
  },
  components: {
    Head,
    HomeContent,
    Soundplay
  }
};
</script>