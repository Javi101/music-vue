<template>
    <div id="soundplay">
        <!-- <button id="stop">停止！</button> -->
        <!-- <audio :src="soundPlayUrl" controls="controls"></audio> -->
        <aplayer
        autoplay
        :showLrc="true"
        :music="{
            title:soundDetails.songname,
            artist:soundDetails.singername,
            src:soundPlayUrl,
            pic:soundImgSmall,
            lrc:soundDuration
          }"
        />
    </div>
</template>
<script>
export default {
  data() {
    return {
      // 歌曲图片获取
      soundImgSmall: "",
      soundPlayUrl: "undefined",
      soundplayOpenIsTrue: false,
      // 歌词
      soundDuration: ""
    };
  },

  computed: {
    // 歌曲详情
    soundDetails: function() {
      let _this = this;
      let soundData = _this.$store.state.soundDetailsisTrue;
      // _this.soundDuration = soundData.duration;
      _this.sunodImgFn(soundData.hash, 200);
      // _this.sunodImgFn(soundData.hash, 400);
      if (!soundData.songname) {
        soundData.songname = soundData.filename.split("- ")[1];
      }
      if (!soundData.singername) {
        soundData.singername = soundData.filename.split(" -")[0];
      }

      console.log(soundData);
      return soundData;
    }
  },
  methods: {
    //拿到歌曲hash值 获取歌曲图片
    sunodImgFn(val, size) {
      let _this = this;
      _this
        .http(
          "get",
          "/v1/singer_header/get_by_hash?hash=" + val + "&size=" + size,
          ""
        )
        .then(function(res) {
          console.log(res);
          _this.soundImgSmall = res.data.url;
        });

      //获取歌曲播放详情(获取歌曲播放地址)
      _this
        .http(
          "get",
          "/app/i/getSongInfo.php?cmd=playInfo&hash=" + val + "&from=mkugou",
          ""
        )
        .then(function(res) {
          _this.soundPlayUrl = res.data.url;
          _this.soundPlayUrlFn(
            res.data.hash,
            res.data.timeLength,
            res.data.filename
          );
        });
    },
    //播放页展开（控制音乐播放）
    soundPlayOpenFn() {
      let _this = this;
      var audio = document.getElementsByTagName("audio")[0];
    },
    soundPlayUrlFn(hash, timeLength, fileName) {
      let _this = this;
      //获取歌曲歌词
      _this
        .httpStr(
          "get",
          "/app/i/krc.php?cmd=100&keyword=" +
            fileName +
            "&hash=" +
            hash +
            "&timelength=" +
            timeLength,
          ""
        )
        .then(function(res) {
          // console.log(res.data);
          _this.soundDuration = res.data;
          setTimeout(function() {
            var audio = document.getElementsByTagName("audio")[0];
            console.log(audio);
            audio.play();
            //时间点设置
            audio.currentTime = 0;
          }, 500);
        });
    }
  }
};
</script>

<style lang="less" scoped>
#soundplay {
  position: fixed;
  bottom: 0;
  z-index: 9999;
  height: 96px;
  width: 100%;
  background: #f2f2f2;
  border-top: 1px solid #f3f3f3;
  .soundplayConLeft {
    height: 100%;
    width: 75%;
    float: left;
    p {
      float: left;
      height: 100%;
      text-align: left;
      &:first-child {
        width: 50px;
        img {
          padding: 7px;
          width: 70%;
          height: 70%;
          border-radius: 50%;
        }
      }
      &:nth-child(2) {
        width: 80%;
        span {
          // display: block;
          // width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:first-child {
            padding-top: 6px;
            font-size: 0.9rem;
          }
          &:nth-child(2) {
            color: #959595;
            padding-top: 2px;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
  .soundplayConRight {
    height: 100%;
    float: right;
    p {
      float: right;
      span {
        line-height: 50px;
        color: #32c27d;
        font-size: 1.5rem;
        &:first-child {
          padding-right: 20px;
        }
        &:nth-child(2) {
          padding-right: 15px;
        }
      }
    }
  }

  .playstart {
    animation: playani 5s infinite;
    -webkit-animation: playani 5s infinite; /* Safari and Chrome */
    -moz-animation: playani 5s; /* Firefox */
    -o-animation: playani 5s; /* Opera */
    animation-fill-mode: forwards;

    animation-timing-function: linear;
    -moz-animation-timing-function: linear; /* Firefox 4 */
    -webkit-animation-timing-function: linear; /* Safari 和 Chrome */
    -o-animation-timing-function: linear; /* Opera */
  }

  //顶部搜索栏动画效果
  @keyframes playani {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes playani /* Safari and Chrome */ {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .pauseWalk {
    -webkit-animation-play-state: paused;

    -moz-animation-play-state: paused;
  }
}

//播放页展开
.soundplayOpen {
  top: 0;
  height: auto !important;
}

.soundplayIn {
  display: none;
}
.aplayer{
    margin: 1px 5px 0 5px;
}
</style>
