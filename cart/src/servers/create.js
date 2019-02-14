import Vue from "vue";

function create(Component, props) {
  const instance = new Vue({
    render(h) {
      return h(Component, { props });
    }
  }).$mount();
  document.body.appendChild(instance.$el);
  const comp = instance.$children[0];
  comp.remove = () => {
    instance.$destroy(); // 销毁实例，释放内存
  }
  return comp;
};

export default create;
