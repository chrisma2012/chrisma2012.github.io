<template functional>
  <div class="wrapper-box">
    <slot name="title"></slot>
    <div class="wrapper-box_header"></div>
    <div class="wrapper-box_body"></div>
    <div class="wrapper-box_footer">
      <slot name="bottom"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import '../style/_core';
.wrapper-box {
  width: 706px;
  // margin: 40px auto 0;
  margin: auto;
  position: relative;
  &_header {
    height: 101px;
    width: 100%;
    background-image: url('../img/bg/box_top.png');
    @include bg-setting();
    background-position: top;
    position: absolute;
    top: 0;
  }
  &_body {
    // padding: 0 40px;
    background-image: url('../img/bg/box_middle.png');
    @include bg-setting();
    background-repeat: repeat-y;
    width: 100%;
    min-height: 1px;
    position: absolute;
    top: 101px;
    bottom: 101px;
  }
  &_footer {
    width: 100%;
    height: 101px;
    background-image: url('../img/bg/box_bottom.png');
    @include bg-setting();
    position: absolute;
    bottom: 0;
  }
}
</style>
