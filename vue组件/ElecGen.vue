<template>
  <div class="elecgen">
    <div class="index-header">
      <i class="header-title"></i>
      <i class="header-help" @click="$rulePopup"></i>
      <AnimationButton class="header-achieve-btn" @click="to(0)"></AnimationButton>
      <AnimationButton class="header-record-btn" @click="to(1)"></AnimationButton>
    </div>

    <section class="index-body">
      <NoticeBar />
    </section>
    <div class="index-swipe">
      <AwesomeSwiper :swiperData="swiperImg" :swiperOpt="swiperOpt" :width="250" ref="mySwiper">
        <template slot-scope="item">
          <div :class="`swipe-item `">
            <Pic :src="item.data.picture" />
            <div class="swipe-item-info">
              <p>{{ item.data.awardName }}</p>
              <p>{{ item.data.price }}金币</p>
            </div>
          </div>
        </template>
      </AwesomeSwiper>
      <div class="probability-option">
        <AnimationButton @click="probabilityAction(item)" :class="`${item == curProbabilityIndex ? 'active' : ''}`" v-for="(item, index) in probability" :key="index">{{ item }}%</AnimationButton>
      </div>
      <div class="draw-option">
        <AnimationButton class="draw-once" @click="drawAction(1)">
          <span>消耗<Pic :src="prop.imageUrl" />{{ curDrawPrice }}</span>
        </AnimationButton>
      </div>
    </div>
    <p class="index-draw-tips" v-html="drawTips"></p>
    <footer class="index-footer">
      <div class="footer-elec-ball">
        <Pic :src="prop.imageUrl" />：{{ propNumForShow }}<span v-if="showGoldAnimation">{{ '+' + obainNum }}</span>
      </div>
      <div class="footer-tips">送出 <Pic :src="giftEntry.imageUrl" />×{{ giveNum }}可获能量球×{{ awards.num * giveNum }}</div>
      <AnimationButton class="footer-num-select" id="blankArea" @click="showSelect = !showSelect">
        <div class="num-select-list" v-show="showSelect" v-blank-area:blankArea="showSelect">
          <ol>
            <li :class="` ${giveNum === item ? 'selected' : ''}`" v-for="item in giftEntry.giftNumber" :key="item" @click.stop="selectNum(item)">×{{ item }}</li>
          </ol>
        </div>
      </AnimationButton>
      <GiveBtn :propNum="propNum" :giveAction="giveAction" />
    </footer>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import { apiPresent, apiMyChairInfo, apiGetMoney, apiDrawLucky } from '../api';
import { picAnalysis } from 'UTILS/ox';
import { throttle } from 'UTILS/utils';

export default {
  name: 'ElecGen',
  data() {
    const _self = this;
    return {
      roomOwnerId: 0,
      gold: 0,
      giveNum: 10, //送礼的数量
      curLotteryIndex: 0,
      showSelect: false,
      isSliding: false, //奖池转动过程中，不能抽奖
      showGoldAnimation: false, //控制展示增加数字动画
      obainNum: '', // 左下角能量球增加的数字
      curProbabilityIndex: 10, //当前概率池索引
      marqueeList: [],
      giveHandler: null, //赠送礼物的延时请求
      roomPlayer: null, //房主信息
      isLoading: false, //正在加载数据
      isPC: /PCMiz/i.test(navigator.userAgent),
      swiperOpt: {
        effect: 'coverflow',
        coverflowEffect: { //配合自定义样式 实现设计效果！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！注意点
          rotate: 0,
          stretch: -6,
          depth: 40,
          modifier: 3,
          slideShadows: false,
        },
        initialSlide: 0,
        loopAdditionalSlides: 1,
        slideActiveClass: 'my-slide-active', //配合自定义样式 实现设计效果！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！注意点
        loop: true, // 循环
        speed: 1000, //切换速度
        mousewheelControl: false, // 禁止鼠标滚轮切换
        lazy: {
          loadPrevNext: true,
        },
        centeredSlidesBounds: true,
        watchSlidesProgress: true,
        centeredSlides: true, //设定为true时，活动块会居中，而不是默认状态下的居左。
        followFinger: false,
        spaceBetween: 10,
        slidesPerView: 3,
        loopedSlides: 5,
        observer: true,
        slideToClickedSlide: true,
        observeParents: true,
        observer: true,
        on: {
          slideChangeTransitionEnd: function () {
            _self.curLotteryIndex = this.realIndex;
            _self.isSliding = false;
          },
          slideChangeTransitionStart: function () {
            _self.isSliding = true;
          },
        },
      },
    };
  },
  activated() {
    const { drawConfIndex } = this.$route.params;
    if (drawConfIndex === undefined || !this.$refs.mySwiper) return;
    this.curProbabilityIndex = 10;
    this.$nextTick(() => {
      this.$refs.mySwiper.$refs.swiper.$swiper.slideToLoop(drawConfIndex, 400); //slideToLoop循环滚动用这个方法
    });
  },
  computed: {
    ...mapState({
      welfare: state => state.activity.welfare,
      lottery2: state => state.activity.lottery2,
      bagObj: state => state.assets.bagObj,
      giftObj: state => state.gifts.giftObj,
      isReady: state => state.activity.isReady,
      player: state => state.user.player,
      isEnd: state => state.data.isEnd,
    }),
    ...mapGetters('activity', ['actPic', 'actContent', 'curRel']),
    ...mapGetters('data', ['probability', 'probabilityDrawConf']),
    exchangeText() {
      return this.actContent.exchangeText;
    },
    drawTips() {
      return this.actContent.drawTips;
    },

    swiperImg() {
      return this.probability ? this.probabilityDrawConf[this.curProbabilityIndex] : [];
    },

    awardPool() {
      if (!this.lottery2.length) return {};
      let tem = {};
      this.lottery2.forEach(item => {
        item.awardPool.forEach(subItem => {
          tem[subItem.lotteryAwardId] = subItem;
        });
      });

      return tem;
    },

    curLotteryConf() {
      return this.swiperImg[this.curLotteryIndex] ? this.swiperImg[this.curLotteryIndex].lotteryConf : { assignItems: [{ num: '--' }] };
    },
    //指定礼物的id
    giftEntryId() {
      return +this.actContent.giftEntryId;
    },
    //指定礼物
    giftEntry() {
      let giftEntry = this.giftObj[this.giftEntryId] || {};
      giftEntry.imageUrl = picAnalysis(giftEntry.imageUrl);
      return giftEntry;
    },
    awards() {
      return this.welfare[0] ? this.welfare[0].awards[0] : {};
    },
    //道具id
    propId() {
      return this.awards.prizeId || 0;
    },
    //道具对象
    prop() {
      let prop = this.giftObj[this.propId] || {};
      prop.imageUrl = picAnalysis(prop.imageUrl);
      return prop;
    },
    propNumForShow() {
      const { bagObj, propId } = this;
      const target = bagObj[propId];
      if (target) return target.amount >= 10000 ? target.amount / 10000 + 'w' : target.amount;
      return 0;
    },
    propNum() {
      const { bagObj, propId } = this;
      const target = bagObj[propId];
      return target ? target.amount : 0;
    },
    curDrawPrice() {
      return this.curLotteryConf.assignItems[0].num || 0;
    },
  },
  watch: {
    propNum: {
      handler(val, oldVal) {
        if (!val || !oldVal || val - oldVal < 0) return;
        this.showGoldAnimation = true;
        this.obainNum = val - oldVal;
        setTimeout(() => {
          this.showGoldAnimation = false;
        }, 1500);
      },
      immediate: true,
    },

    swiperImg: {
      handler(val) {
        if (!val.length || !this.$refs.mySwiper || !this.$refs.mySwiper.$refs.swiper) return;
      },
      deep: true,
      immediate: true,
    },
    isReady: {
      handler(val, oldVal) {
        if (!val) return;
        this.getRoomOwnerId();
        this.getMoney();
      },
      immediate: true,
    },
  },

  methods: {
    async getMoney() {
      const res = await apiGetMoney();
      this.gold = res.money.gold;
    },

    async getRoomOwnerId() {
      const res = await apiMyChairInfo();
      this.roomOwnerId = res.roomId;
    },

    async giveAction(num) {
      if (this.isEnd) return this.$toast('活动已结束！');
      const tem = typeof num !== 'number' ? this.giveNum : num;

      if (this.player.id === this.roomOwnerId) return this.$toast('该礼物不能送给自己呦~');
      if (this.gold < this.giftEntry.price * tem) return this.$noGoldPopup();
      if (!localStorage.getItem('elecGen_firstGive')) {
        localStorage.setItem('elecGen_firstGive', true);
        await this.$giveTipsPopup();
        return this.present();
      }
      this.present(tem);
    },
    //送礼
    present: throttle(async function (num) {
      try {
        await apiPresent({ toId: this.roomOwnerId, giftEntry: this.giftEntryId, giftNum: num || this.giveNum, msg: '', auctionId: '' });
      } catch (err) {
        console.log(err);
      }
      if (this.giveHandler) clearTimeout(this.giveHandler);
      this.isLoading = true;
      this.giveHandler = setTimeout(async () => {
        this.getMoney();
        await this.$store.dispatch('assets/getBag');
        this.isLoading = false;
      }, 600);
    }, 600),

    checkPropsNum(count) {
      if (!this.bagObj[this.propId] || this.bagObj[this.propId].amount < count * this.curDrawPrice) {
        window.resultPopup && window.resultPopup.close();
        if (this.player.id === this.roomOwnerId) {
          this.$toast(`能量球不足，可通过赠送礼物[${this.giftEntry.name}]获得`);
          return false;
        }
        if (this.isLoading) {
          this.$toast('能量球获取中...');
          return false;
        }
        this.$noPropPopup({ data: { player: this.player, giftEntry: this.giftEntry, roomPlayer: this.roomPlayer } })
          .then(res => this.giveAction(res.count))
          .catch(e => console.log(e));
        return false;
      }
      return true;
    },
    probabilityAction(item) {
      if (this.isSliding) return;
      this.curProbabilityIndex = item;
    },
    //抽奖
    drawAction: throttle(async function (count, isManyDraw) {
      if (this.isEnd) return this.$toast('活动已结束！');
      if (this.isSliding) return; //轮播中，不能抽奖
      //道具不足
      if (!this.checkPropsNum(count)) return;

      let res = null;
      try {
        res = await apiDrawLucky({ relId: this.curLotteryConf.relId, num: count, lotteryId: this.curLotteryConf.confId, assignId: this.propId });
      } catch (err) {
        if (err.ret === 10003) return this.$toast('诶呀好痛！慢一点按~');
        return console.error(err);
      }
      this.$store.dispatch('assets/getBag');
      this.$store.dispatch('activity/getWelfare'); //更新福利状态

      const { awards } = res;
      let newRes = [];

      for (let key in awards) {
        if (this.awardPool[key].weight !== 3) return this.$resultPopup({ data: undefined, drawData: this.swiperImg[this.curLotteryIndex], drawAction: this.drawAction, isManyDraw, titleIndex }).catch(err => console.log(err));
        newRes.push({ ...awards[key].list[0], ...this.awardPool[key] });
      }

      let totalVal = 0;
      newRes = newRes.map(item => {
        let tem = { ...this.giftObj[item.prizeId], ...item };
        item.awards.forEach(subItem => {
          totalVal += item.num * subItem.price;
        });
        tem.imageUrl = picAnalysis(tem.imageUrl);
        return tem;
      });

      const titleIndex = +(this.curDrawPrice * count < totalVal / 100);
      this.$resultPopup({ data: newRes, drawData: this.swiperImg[this.curLotteryIndex], drawAction: this.drawAction, isManyDraw, titleIndex }).catch(err => console.log(err));
    }, 1200),

    selectNum(num) {
      this.giveNum = num;
      this.showSelect = false;
    },
    to(type) {
      this.$router.push(`/achieveRecord/${type}`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/_core.scss';

@keyframes goldAnimation {
  0% {
    opacity: 1;
    bottom: 10px;
  }
  100% {
    opacity: 0;
    bottom: 50px;
  }
}

@keyframes noPropAnimation {
  0% {
    transform-origin: center;
    transform: rotate(0) scale(1);
  }
  25% {
    transform-origin: center;
    transform: rotate(15deg) scale(1.1);
  }
  50% {
    transform-origin: center;
    transform: rotate(0) scale(1);
  }
  75% {
    transform-origin: center;
    transform: rotate(-15deg) scale(1.1);
  }
  100% {
    transform-origin: center;
    transform: rotate(0) scale(1);
  }
}
.animation-class {
  animation: noPropAnimation 1s linear 0s 1 forwards;
}

.elecgen {
  position: relative;
  width: 100%;
  .index-header {
    display: flex;
    align-items: center;
    padding: 19px 11px 0;
    .header-title {
      display: block;
      width: 222px;
      height: 74px;
      background-image: url('../img/title/title@2x.png');
      @include bg-setting();
    }
    .header-help {
      margin: 0 auto 0 5px;
      display: block;
      width: 44px;
      height: 43px;
      background-image: url('../img/icon/quote@2x.png');
      @include bg-setting();
      cursor: pointer;
    }
    .header-record-btn {
      display: block;
      width: 93px;
      height: 41px;
      background-image: url('../img/btn/record_btn@2x.png');
      @include bg-setting();
      cursor: pointer;
    }
    .header-achieve-btn {
      display: block;
      width: 93px;
      height: 41px;
      background-image: url('../img/btn/achieve_btn@2x.png');
      @include bg-setting();
      margin-right: 8px;
      cursor: pointer;
    }
  }

  .index-body {
    margin-top: 10px;

    .value-progress {
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      font-weight: 700;
      color: #d3426e;
      margin: 10px 0 17px 0;
      img {
        display: block;
        width: 90px;
        height: auto;
      }
    }
    /deep/ .body-exchange-text {
      margin-top: -30px;
      p,
      .rule2 {
        font-size: 22px;
        font-weight: 500;
        text-align: center;
        color: #f02f78;
        height: 22px;
        line-height: 22px;
        margin-bottom: 9px;
      }
      .rule1 {
        font-size: 22px;
        font-weight: 500;
        text-align: center;
        color: #f02f78;
      }
    }
  }
  .index-swipe {
    margin-top: 55px;
    position: relative;
    z-index: 0;
    /deep/ .swiper-slide-prev {
      transition: all 1s;
    }

    /deep/ .my-slide-active {
      display: flex;
      justify-content: center;
      .swipe-item {
        transition: all 1s;
        flex: 0 0 337px;
        height: 401px;
        flex-direction: columns;
        background-image: url('../img/bg/gift_active_bg@2x.png');
        @include bg-setting();
        img {
          width: 157px;
          height: 169px;
          transition: all 1s;
          margin: 37px 0 3px;
        }
      }
      .swipe-item-special {
        background-image: url('../img/bg/gift_active_spcial_bg@2x.png');
      }
    }

    /deep/ .swipe-item {
      width: 100%;
      min-height: 360px;
      background-image: url('../img/bg/gift_bg@2x.png');
      @include bg-setting();
      display: flex;
      // justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      img {
        width: 90px;
        height: auto;
        margin-top: 90px;
      }
      .swipe-item-info {
        width: 190px;
        height: 61px;
        margin-top: 3px;
        background-image: url('../img/bg/text_bg@2x.png');
        @include bg-setting();
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          height: 21px;
          line-height: 21px;
          font-size: 23px;
          font-weight: 700;
          text-align: center;
          color: white;
          -webkit-text-stroke: 0.3px #ea2275;
          &:last-child {
            margin-top: 8px;
          }
        }
      }
    }
    .swipe-item-special {
      background-image: url('../img/bg/gift_special_bg@2x.png');
    }
    .probability-option {
      width: 250px;
      margin: -120px auto 20px;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        width: 74px;
        height: 71px;
        background-image: url('../img/btn/probability_btn.png');
        @include bg-setting();
        background-size: 67px 70px;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        font-weight: 700;
        text-align: center;
        color: #ea5482;
      }
      div.active {
        background-image: url('../img/btn/probability_active_btn.png');
        font-size: 25px;
        background-size: 74px 71px;
      }
    }
    .draw-option {
      display: flex;
      justify-content: center;
      position: relative;
      z-index: 1;
      .draw-once {
        cursor: pointer;
        width: 222px;
        height: 77px;
        font-size: 19px;
        font-weight: 500;
        text-align: center;
        color: white;
        position: relative;
        margin-right: 5px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        span {
          margin-bottom: 9px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          img {
            width: 19px;
            height: auto;
            display: inline-block;
          }
        }
      }
      .draw-once {
        background-image: url('../img/btn/draw_btn.png');
        @include bg-setting();
      }
    }
  }
  .index-draw-tips {
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    color: #f02f78;
    height: 22px;
    line-height: 22px;
    margin-top: 20px;
  }
  .index-footer {
    display: flex;
    align-items: center;
    width: 100%;
    height: 85px;
    padding: 0 50px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0 28px;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    background-image: url('../img/bg/bottom_bg@2x.png');
    @include bg-setting(contain, false);
    .footer-elec-ball {
      margin: 0 auto 0 0;
      position: relative;
      display: flex;
      align-items: center;
      img {
        width: 29px;
        height: auto;
      }
      span {
        position: absolute;
        right: 3px;
        animation: goldAnimation 1s linear forwards;
      }
    }
    .footer-tips {
      display: flex;
      align-items: center;
      img {
        width: 29px;
        height: auto;
      }
    }
    .footer-num-select {
      width: 30px;
      height: 30px;
      background-image: url('../img/btn/up_btn@2x.png');
      @include bg-setting(contain, false);
      position: relative;
      margin-left: 10px;
      cursor: pointer;
      .num-select-list {
        position: absolute;
        left: -130%;
        right: 0;
        margin: auto;
        bottom: 40px;
        z-index: 1;
        padding: 10px 0;
        width: 92px;
        // height: 57px;
        box-sizing: border-box;
        padding: 6px 8px;
        background: #ff75a6;
        border-radius: 5px;

        // bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        max-height: 200px;
        ol {
          overflow-y: scroll;

          li {
            margin: 0 13px;
            padding: 0 4px;
            height: 26px;
            line-height: 26px;
            margin-bottom: 10px;
            border-radius: 6px;
            font-size: 22px;
            font-weight: 500;
            text-align: center;
            color: #ffffff;
            cursor: pointer;
          }
          li.selected {
            background: #ff478c;
          }
          // }
        }
      }
    }
  }
}
</style>