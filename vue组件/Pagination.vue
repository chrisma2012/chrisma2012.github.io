<template >
  <div class="pagination">
    <AnimationButton v-for="(item, index) in indexArr" :key="index" class="pagination-btn" @click="paginationEvent(item)"></AnimationButton>
  </div>
</template>
<script>
import { throttle } from 'UTILS/utils';

export default {
  name: 'pagination',
  props: {
    pageination: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      indexArr: [0, 1, 2, 3],
    };
  },
  methods: {
    paginationEvent: throttle(function (index) {
      // ["上一页", "首页", "尾页", "下一页"] // 0 ， 1， 2，3
      const { pageination, $toast } = this;
      const { page, pageCount } = pageination;
      if (index < 2 && page <= 1) return $toast('到顶啦~');
      if (index >= 2 && page == pageCount) return $toast('到底啦~');
      this.$emit('currentPage', { 0: page - 1, 1: 1, 2: pageCount, 3: page + 1 }[index]);
    }, 1000),
  },
};
</script>
<style lang="scss" scoped>
@import '../style/_core';

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 532px;
  margin: 41px auto 0;
  .pagination-btn {
    width: 124px;
    height: 38px;
    @extend %bg-setting;

    &:first-child {
      background-image: url('../img/btn/page_prev.png');
    }
    &:nth-child(2) {
      background-image: url('../img/btn/page_first.png');
    }
    &:nth-child(3) {
      background-image: url('../img/btn/page_last.png');
    }
    &:last-child {
      background-image: url('../img/btn/page_next.png');
    }
  }
}
</style>





