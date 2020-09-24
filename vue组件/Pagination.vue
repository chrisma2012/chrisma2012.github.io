<template >
  <div class="pagination">
    <AnimationButton
      v-for="(item,index) in pageinationText"
      :key="index"
      class="pagination-btn"
      @click="paginationEvent(index)"
    >{{item}}</AnimationButton>
  </div>
</template>
<script>
import { throttle } from "UTILS/utils";

export default {
  name: "pagination",
  props: {
    requestAction: {
      type: Function,
      required: true,
    },
    pageination: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pageinationText: ["上一页", "首页", "尾页", "下一页"], // 0 ， 1， 2，3
    };
  },
  methods: {
    paginationEvent: throttle(function (index) {
      // ["上一页", "首页", "尾页", "下一页"] // 0 ， 1， 2，3
      const { pageination, $toast, $store, requestAction } = this;
      const { currentPage, pageCount } = pageination;
      if (index < 2 && currentPage <= 1)
        return $store.dispatch("showToast", "到顶啦~");
      if (index >= 2 && currentPage == pageCount)
        return $store.dispatch("showToast", "到底啦~");

      requestAction({
        pageNumber: {
          0: currentPage - 1,
          1: 1,
          2: pageCount,
          3: currentPage + 1,
        }[index],
      });
    }, 1000),
  },
};
</script>
<style lang="scss" scoped>
@import "../style/_core";

.pagination {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 118px;
  background-color: #573eb4;
  margin: auto;
  .pagination-btn {
    width: 132px;
    height: 54px;
    line-height: 54px;
    text-align: center;
    color: white;
    font-size: 24px;
    font-weight: 500;
    background: linear-gradient(#9191ff 1%, #6f54e6 99%);
    box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.74) inset;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>





