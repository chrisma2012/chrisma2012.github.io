<template>
  <div class="tab-bar">
    <div :class="`tab-bar-switcher ${customClass?customClass:''}`">
       <!-- :style="{border:'1px solid red'}" -->
      <AnimationButton
        v-for="(item,index) in navBarTextArr"
        :key="index"
        :class="`${tabItemStyle(curSelected,index)}`"
        @click="navBarAction(index)"
      >{{item}}</AnimationButton>
    </div>
    <div class="tab-bar-container">
      <slot v-bind:tabBarData="{tabIndex:curSelected}"></slot>
    </div>
  </div>
</template>
<script>
import { isArray } from "UTILS/utils";

export default {
  name: "TabBar",
  props: {
    tabChangeAction: Function,
    navBarTextArr: Array,
    btnClassArr: Array,
    curTabIndex: Number,
    customClass: String,
  },
  data() {
    return {
      curSelected: this.curTabIndex || 0,
    };
  },
  methods: {
    tabItemStyle(curSelected, index) {
      const { btnClassArr } = this;

      if (!btnClassArr || !btnClassArr.length) return "";
      if (isArray(btnClassArr[0]))
        //按钮纯图片（即所有tab的激活状态、未激活状态都是不同的两张图片）
        return curSelected === index
          ? `${btnClassArr[index][0]} ${btnClassArr[index][1]} `
          : btnClassArr[index][0];
      //按钮由前端文字及两张背景图片组成（即所有tab的激活状态、未激活状态都是相同的两张背景图片）
      return curSelected === index ? btnClassArr[1] : btnClassArr[0];
    },
    navBarAction(index) {
      const { curSelected, tabChangeAction } = this;
      if (curSelected === index) return;
      this.curSelected = index;
      tabChangeAction(index);
    },
  },
  watch: {
    curTabIndex: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.curSelected = val;
        }
      },
      immediate: false,
    },
  },
};
</script>