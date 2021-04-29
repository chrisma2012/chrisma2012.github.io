<template>
  <div class="input-box">
    <div class="box-container">
      <span class="input-minus" @click="oper('minus')"></span>
      <input
        type="tel"
        :value="localValue"
        @input="format"
        @blur="blur"
        @focus="focus"
        v-on:keyup.enter="input"
        ref="inputBox"
        class="input-value"
      />
      <span class="input-plus" @click="oper"></span>
    </div>
    <span class="input-all" @click="setValue(other.max)"></span>
  </div>
</template>
<script>
export default {
  name: "InputBox",
  props: {
    num: {
      type: Number,
      default: 1,
    },
    min: {
      //所能选择的最小值
      type: Number,
      default: 1,
    },
    max: {
      //所能选择的最大值
      type: Number,
      default: 1,
    },
    showText: {
      type: String,
      default: "",
    },
    other:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      localValue: 1,
      showForShowText: true,
    };
  },
  watch: {
    num: {
      handler(val, oldVal) {
        if (val === oldVal) return;
        this.localValue = val + this.showText;
      },
      immediate: true,
    },
  },
  methods: {
    setValue(value) {
      this.$emit("update:num", value);
      this.localValue = value + this.showText;
    },
    oper(type) {
      let tem = +this.localValue.replace(/[^\d]/g, "");
      tem = type === "minus" ? this.minus(tem) : this.plus(tem);
      this.setValue(tem);
    },
    minus(tem) {
      if (tem > this.min) tem--;
      else {
        tem = this.min;
        this.$toast(`最少购买${this.min}${this.showText}~`);
      }
      return tem;
    },

    plus(tem) {
      if (tem < this.max) tem++;
      else {
        tem = this.max;
        this.$toast(`单次最多可购买${this.max}个哦！`);
      }
      return tem;
    },
    //输入框获得焦点时，将单位隐藏
    focus(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
      this.localValue = e.target.value;
    },

    blur(e) {
      //处理情况： 删除了值但是没有填写值,默认将初始值赋值回去
      e.target.value = e.target.value.replace(/[^\d]/g, "");
      e.target.value = e.target.value === "" ? this.min : e.target.value;
      this.$emit("update:num", +e.target.value);
      e.target.value = e.target.value + this.showText;
    },

    format(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
      //处理情况： 允许清空输入再重新输入值
      if (e.target.value === "") return;
      let value = +e.target.value;
      if (value > this.max) {
        e.target.value = this.max;
        this.$toast(`单次最多可购买${this.max}个哦！`);
      }
      if (value < this.min) {
        e.target.value = this.min;
        this.$toast(`最少购买${this.min}${this.showText}~`);
      }
      this.localValue = e.target.value;
    },

    input(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
      let value = +e.target.value;
      if (value > this.max) this.localValue = this.max;
      if (value < this.min) this.localValue = this.min;
      if (value >= this.min && value <= this.max) this.localValue = value;
      this.setValue(+this.localValue);
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  padding: 0 !important;
  margin: 0;
  outline: none;
  border: none;
}
.input-value-box {
  position: relative;
  //   .input-value{
  //       opacity: 0;
  //   }
  .input-value-show {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    height: 40px;
    line-height: 40px;
    pointer-events: none;
  }
}
</style>
