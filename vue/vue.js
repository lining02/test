class Vue {
  constructor(options) {
    this.$data = options.data; // 保存data选项
    this.$options = options;
    this.observe(this.$data); // 执行响应式
    this.$compile = new Compile(options.el, this);
  }
  observe(data) {
    if (!data || typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach(key => {
      let val = data[key];
      this.observe(val); // 递归查找嵌套属性
      // 创建Dep
      const dep = new Dep();
      // 为data对象定义属性
      Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: true, // 可修改或删除
        get() {
          Dep.target && dep.addDep(Dep.target);
          console.log(dep.deps);
          return val;
        },
        set(newVal) {
          if (newVal === val) {
            return;
          }
          val = newVal;
          dep.notify();
        }
      });

      // 为vue的data做属性代理
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key];
        },
        set(newVal) {
          this.$data[key] = newVal;
        }
      });
    });
  }
}

// 依赖管理器：负责将视图中所有依赖收集管理，包括依赖添加和通知
class Dep {
  constructor() {
    this.deps = []; // deps里面存放的是Watcher的实例
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  // 通知所有watcher执行更新
  notify() {
    this.deps.forEach(dep => {
      dep.update();
    });
  }
}

// Watcher: 具体的更新执行者
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    // 将来new一个监听器时，将当前Watcher实例附加到Dep.target
    Dep.target = this;
    this.vm[key];
    Dep.target = null;
  }
  // 更新
  update() {
    this.cb.call(this.vm, this.vm[this.key]);
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    let $el = document.querySelector(el);
    if ($el) {
      const $fragment = document.createDocumentFragment();
      let child;
      while ((child = $el.firstChild)) {
        $fragment.appendChild(child);
      }
      this.compile($fragment);
      $el.appendChild($fragment);
    }
  }
  // 编译指定片段
  compile(el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if (node.nodeType == 1) {
        const { attributes } = node;
        Array.from(attributes).forEach(attr => {
          const { name, value } = attr;
          this.update(node, this.$vm, value, name);
        });
      } else if (node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)) {
        // 文本节点，只关心{{xx}}格式
        this.update(node, this.$vm, RegExp.$1.trim(), "text");
      }
      // 遍历可能存在的子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }
  fn(node, vm, value, dir, exp) {
    switch (dir) {
      case "v-html":
        node.innerHTML = value;
        break;
      case "v-text":
      case "text":
        node.textContent = value;
        break;
      case "v-model":
        node.value = value;
        // 双绑还要处理视图对模型的更新
        node.addEventListener("input", e => {
          vm[exp] = e.target.value;
        });
        break;
      case "@click":
        let clickfn = vm.$options.methods[exp];
        node.addEventListener("click", clickfn.bind(vm), false);
        break;
      default:
    }
  }
  // 更新
  update(node, vm, exp, dir) {
    let value = vm[exp];
    let self = this;
    this.fn(node, vm, value, dir, exp);
    new Watcher(vm, exp, function(value) {
      self.fn(node, vm, value, dir, exp);
    });
  }
}
