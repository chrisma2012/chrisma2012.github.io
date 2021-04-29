<template>
  <div class="sailing-success">
    <div class="sailing-success-header"></div>
    <div class="sailing-success-tips">遇到危险时，可消耗KK果实魅惑对方，渡过难关</div>
    <!-- <img class="navigation-map" src="../../img/map.jpg" alt /> -->
    <div class="canvas-warp" :style="{zoom:1/devicePixelRatio}">
      <canvas :width="canvasWidth * devicePixelRatio " :height="canvasWidth * devicePixelRatio " ref="canvas" class="navigation-map"></canvas>
    </div>
    <div class="cur-longest-distance">最远到达海里: {{distanceLongest}}</div>
    <div class="cur-owned-fruits">携带果实: {{kkFruitAmount}}个</div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { throttle } from "UTILS/utils";

const unitTo = value =>
  parseInt((document.documentElement.clientWidth / 750) * value);

export default {
  name: "PopupSailingSuccess",
  data() {
    return {
      canvasWidth: unitTo(571),
      canvasDom: null,
      imageLoadCount: 0,
      devicePixelRatio:
        window.devicePixelRatio < 2 || !window.devicePixelRatio
          ? 2
          : window.devicePixelRatio,
      isMounted: false, //组件是否已挂载
      curShipIndex: this.$route.fullPath === "/shipInstruction" ? parseInt(localStorage.getItem("shipInstructionIndex")) || 0 : parseInt(localStorage.getItem("shipIndex")) || 0, //船索引
      needLoadImgArr: [
        require("../../img/map/gab.jpg"),
        require("../../img/map/miaomiao.png"),
        require("../../img/map/human_fish.png"),
        require("../../img/map/rabbit_small.png"),
        require("../../img/map/haohao_small.png"),
        require("../../img/map/youth_small.png"),
        require("../../img/map/sea_star.png"),
        require("../../img/map/whale.png")
      ]
    };
  },
  computed: {
    ...mapState({
      lotteryPointArr: state => state.activity.lotteryPointArr
    }),
    ...mapGetters({
      kkFruitAmount: "activity/kkFruitAmount"
    }),
    distanceLongest() {
      const { lotteryPointArr, curShipIndex } = this;
      return lotteryPointArr
        ? lotteryPointArr[curShipIndex] * [1, 10, 50][curShipIndex]
        : 0;
    }
  },
  created() {
    this.imageInit();
  },

  mounted() {
    this.canvasDom = this.$refs.canvas;
    this.isMounted = true;
    this.canvasDraw(this.canvasDom);

    // alert(window.devicePixelRatio);
  },
  watch: {
    imageLoadCount: {
      handler(val) {
        const { needLoadImgArr, isMounted, canvasDraw, canvasDom } = this;
        if (val === needLoadImgArr.length && isMounted) {
          canvasDraw(canvasDom);
        }
      },
      immediate: true
    },
    checkboxValue: {
      handler(val, oldValue) {
        if (val !== oldValue && val) {
          this.$store.dispatch("base/getTimestamp").then(res => {
            const date = dayjs(res.current).format("YYYY-MM-DD");
            localStorage.setItem("checkboxValue", date);
          });
        } else {
          localStorage.removeItem("checkboxValue");
        }
      }
    }
  },
  methods: {
    imageInit() {
      const { needLoadImgArr, curShipIndex } = this;
      for (let i = 0; i < needLoadImgArr.length; i++) {
        let imageDom = new Image();
        imageDom.src = needLoadImgArr[i];
        imageDom.onload = () => this.imageLoadCount++;
      }
    },
    canvasDraw(canvasDom) {
      const {
        devicePixelRatio,
        needLoadImgArr,
        curShipIndex,
        imageLoadCount
      } = this;

      if (imageLoadCount !== needLoadImgArr.length) return;
      const ctx = canvasDom.getContext("2d");
      ctx.globalCompositeOperation = "source-over";
      //背景图
      const ImgDomArr = needLoadImgArr.map(item => {
        let temDom = new Image();
        temDom.src = item;
        return temDom;
      });
      const pathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      let seaStarPath = `M130,200 C150,150 90,90 180,80 Z`;
      let miaomiaopath = `M130,200 C-20,350 -10,450 100,450 Z`;
      let humanFishPath = `M130,200 C360,300 180,550 360,450 Z`;
      let whalePath = `M130,200 C180,90 330,140 390,220 C390,240 390,260 390,240 Z`;

      const routeIndex = Math.round((Math.random() / 3) * 10); //路线索引，随机
      let realRoute = [seaStarPath, miaomiaopath, humanFishPath, whalePath][
        routeIndex
      ];
      realRoute = realRoute.replace(/[0-9]+/g, val =>
        unitTo(val * devicePixelRatio)
      );
      pathElement.setAttributeNS(null, "d", realRoute);
      const totalLength = pathElement.getTotalLength();

      const ImageDraw = (dom, positioX, positionY) => {
        ctx.drawImage(
          dom,
          0,
          0,
          dom.width,
          dom.height,
          positioX,
          positionY,
          unitTo(dom.width) * devicePixelRatio,
          unitTo(dom.height) * devicePixelRatio
        );
      };

      const [canvasImgDom, miaomiaoDom, humanFishDom] = ImgDomArr;
      const shipImgDom = ImgDomArr[3 + curShipIndex];
      canvasImgDom.onload = function () {
        ImageDraw(canvasImgDom, 0, 0);
        animation(this.canvasWidth);
      };

      let curStep = 0;
      const animation = canvasWidth => {
        const position = pathElement.getPointAtLength(curStep);
        if (curStep >= totalLength / 2) {
          this.$emit("popupevent", {
            popupType: "PopupSailingSuccess",
            closeType: 3
          });

          this.$store.dispatch("activity/drawLucky").then(res => {
            if (res.weHaveError) return;
            this.$parent.$emit("popupevent", {
              popupType: "PopupSailingResult",
              closeType: 3
            });
          });

          return;
        }
        ctx.clearRect(
          0,
          0,
          canvasWidth * devicePixelRatio,
          canvasWidth * devicePixelRatio
        );
        ImageDraw(canvasImgDom, 0, 0); //背景图
        ImageDraw(
          humanFishDom,
          (300 / 2) * devicePixelRatio,
          (350 / 2) * devicePixelRatio
        ); //人鱼岛

        //喵喵岛
        if (curStep < totalLength / 25 || curStep >= totalLength / 4)
          ImageDraw(
            miaomiaoDom,
            (20 / 2) * devicePixelRatio,
            (300 / 2) * devicePixelRatio
          );

        //船
        ImageDraw(
          shipImgDom,
          position.x - unitTo(shipImgDom.width) / 2,
          position.y - unitTo(shipImgDom.height) / 2
        );
        if (curStep >= totalLength / 25 && curStep < totalLength / 4) {
          ImageDraw(
            miaomiaoDom,
            (20 / 2) * devicePixelRatio,
            (300 / 2) * devicePixelRatio
          );
        }
        curStep = curStep + devicePixelRatio + 1;
        window.requestAnimationFrame(animation);
      };
    }
  }
};
</script>
<style lang="scss">
@import "../../style/_core";
.sailing-success {
  position: relative;
  padding-top: 112px;
  width: 717px;
  height: 894px;
  background-image: url("../../img/rabbit_bg.png");
  @include bg_setting;
  .sailing-success-header {
    width: 631px;
    height: 126px;
    background-image: url("../../img/go_to_sea.png");
    @include bg_setting;
    position: absolute;
    top: -55px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .sailing-success-tips {
    font-size: 28px;
    font-weight: 500;
    text-align: center;
    color: #54310b;
  }
  .navigation-map {
    display: block;
    // width: 571px;
    margin: 23px auto 0;
  }
  .cur-longest-distance {
    font-size: 28px;
    font-weight: 500;
    text-align: center;
    color: #54310b;
    line-height: 34px;
    margin-top: 25px;
  }
  .cur-owned-fruits {
    font-size: 28px;
    font-weight: 500;
    text-align: center;
    color: #54310b;
    line-height: 34px;
    margin-top: 15px;
  }
}
</style>
