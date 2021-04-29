
//点击空白地方 关闭目标区域 v-blank-area="showSearchResult" showSearchResult显隐变量
function install(Vue, Options) {
    Vue.directive('blank-area', {
        bind(el, binding, vnode, oldVnode) {
            window.blankAreaListener = function (e) {
                if (el.contains(e.target)) return;
                vnode.context[binding.expression] = false;
            }
            document.addEventListener('click', window.blankAreaListener);
        },
        unbind() {
            document.removeEventListener('click', window.blankAreaListener);
        }
    });

}
export default {
    install
}