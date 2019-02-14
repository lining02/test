import Notice from '@/components/common/notice.vue';
import Vue from 'vue';

Notice.getInstance = (props) => {
  // 挂载实例
  const instance = new Vue({
    render: h => h(Notice, props)
  }).$mount()
  document.body.appendChild(instance.$el)
  return instance.$children[0];
}

// 单例模式
let msgInstance = null;
function getInstance() {
  msgInstance = msgInstance || Notice.getInstance();
  return msgInstance;
}
// 抛出方法
export default {
  info({ content = '', duration = 2 }) {
    getInstance().add({ content, duration })
  }
}