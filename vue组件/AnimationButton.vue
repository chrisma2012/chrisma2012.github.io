 

<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  render(createElement) {
    const { $listeners, $attrs, $slots, addAnimation, active, tag } = this;

    return createElement(
      tag,
      {
        class: {
          animationButtonActive: active,
        },
        attrs: $attrs,
        on: {
          click: () => {
            addAnimation();
            $listeners.click && $listeners.click();
          },
        },
      },
      $slots.default
    );
  },
  methods: {
    addAnimation() {
      this.active = true;
      setTimeout(() => (this.active = false), 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.animationButtonActive {
  animation: animationButtonActive 0.2s;
}
@keyframes animationButtonActive {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  75% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
